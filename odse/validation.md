---
title: "Validation Guide"
layout: default
nav_order: 5
parent: "ODS-E & Architecture"
---

# Validation Guide

ODS-E provides a multi-level validation system that checks energy records against JSON schemas, semantic rules, and conformance profiles. Validation runs locally — no service calls required — making it suitable for CI/CD pipelines, pre-upload checks, and data quality monitoring.

## Validation Levels

### Schema Validation (`level="schema"`)

The default level. Checks each record against the `energy-timeseries.json` schema:

- **Required fields** — `timestamp`, `kWh`, `error_type` must be present
- **Type checking** — `kWh` must be a number, `error_code` must be a string, `curtailment_flag` must be boolean, etc.
- **Enum matching** — 13 enum-constrained fields validated against allowed values (e.g., `error_type` must be one of 7 categories, `dispatch_mode` must be one of 4 values)
- **Numeric bounds** — `kVA` ≥ 0, `PF` 0–1, `soc` 0–100, `soh` 0–100, `nacelle_direction_deg` 0–360, `cell_voltage_min_v` ≥ 0, etc.
- **Pattern matching** — party IDs must match `^[a-z0-9._-]+:[a-z0-9._-]+:[a-zA-Z0-9._-]+$`, tariff currency must be `^[A-Z]{3}$`, tariff schedule IDs must match `authority:municipality:code:vN`
- **Conditional rules** — `kWh` must be ≥ 0 when `direction` is `generation` or `consumption` (negative allowed only for `net`)

### Semantic Validation (`level="semantic"`)

Builds on schema validation and adds physical plausibility checks. Requires `capacity_kw` (and optionally `latitude`/`longitude` for nighttime detection):

- **Physical bounds** — `kWh` must not exceed `capacity_kw × interval_hours × 1.1`. Exceeding this generates a warning (`EXCEEDS_PHYSICAL_MAXIMUM`).
- **State/production consistency** — if `error_type` is `offline` but `kWh` > 10, a warning is raised (`STATE_PRODUCTION_MISMATCH`).

Semantic issues are returned as **warnings**, not errors — they don't fail validation but flag records for review.

### Temporal Validation

Temporal bounds are defined in transform specs (e.g., expected 5-minute intervals, max 4-hour gap) and applied during the transform step. These checks are configured per-vendor in the transform YAML:

```yaml
validation:
  temporal:
    expected_interval: "5min"
    max_gap: "4h"
```

## Conformance Profiles

Profiles are a validator-level concept layered on top of the schema. They specify which fields must be present (and which values are allowed) for a given operating context. Six profiles are defined:

### 1. `bilateral` — PPA / Bilateral Trade Settlement

For power purchase agreements and bilateral trades. Both trading parties, the settlement window, contract reference, and settlement type must be present.

| Required Field | Value Constraint |
|----------------|------------------|
| `seller_party_id` | — |
| `buyer_party_id` | — |
| `settlement_period_start` | — |
| `settlement_period_end` | — |
| `contract_reference` | — |
| `settlement_type` | must be `"bilateral"` |

### 2. `wheeling` — Wheeled Energy Across Networks

A superset of `bilateral`. All bilateral fields plus network operator, wheeling model, injection/offtake points, reconciliation status, and loss factor.

| Additional Required Field | Value Constraint |
|---------------------------|------------------|
| `network_operator_id` | — |
| `wheeling_type` | — |
| `injection_point_id` | — |
| `offtake_point_id` | — |
| `wheeling_status` | — |
| `loss_factor` | — |

### 3. `sawem_brp` — Wholesale Market (SAWEM) Settlement

For Balance Responsible Parties in the South African Wholesale Electricity Market.

| Required Field | Value Constraint |
|----------------|------------------|
| `seller_party_id` | — |
| `balance_responsible_party_id` | — |
| `settlement_type` | one of `sawem_day_ahead`, `sawem_intra_day`, `balancing`, `ancillary` |
| `forecast_kWh` | — |
| `settlement_period_start` | — |
| `settlement_period_end` | — |

### 4. `municipal_recon` — Municipal Billing / Reconciliation

For municipal billing and reconciliation workflows.

| Required Field | Value Constraint |
|----------------|------------------|
| `buyer_party_id` | — |
| `billing_period` | — |
| `billed_kWh` | — |
| `billing_status` | — |

### 5. `bess_dispatch` — BESS Dispatch Validation (SEP-026)

For battery energy storage system dispatch records.

| Required Field | Value Constraint |
|----------------|------------------|
| `dispatch_mode` | one of `charging`, `discharging`, `standby`, `balancing` |
| `soc` | — |

### 6. `wind_scada` — Wind Turbine SCADA Validation (SEP-025)

For wind turbine SCADA records.

| Required Field | Value Constraint |
|----------------|------------------|
| `wind_speed_ms` | — |

Profile validation runs **after** schema validation passes. If schema validation produces errors, profile validation is skipped to avoid confusing duplicate messages.

## CLI Usage

```bash
# Schema-level validation
odse validate --input output/records.json --level schema

# Semantic validation (requires capacity_kw in asset metadata)
odse validate --input output/records.json --level semantic
```

Expected output:

```
3/3 valid, 0 errors
```

With errors:

```
2/3 valid, 2 errors: 1x TYPE_MISMATCH, 1x ENUM_MISMATCH
```

## Python API

### Single record validation

```python
from odse import validate

record = {
    "timestamp": "2025-01-01T00:00:00Z",
    "kWh": 45.2,
    "error_type": "normal",
    "direction": "generation",
}

# Schema validation
result = validate(record, level="schema")
print(result.is_valid)   # True
print(result.errors)     # []
print(result.level)      # "schema"

# Semantic validation with capacity check
result = validate(record, level="semantic", capacity_kw=50.0)
print(result.is_valid)   # True
print(result.warnings)   # [] (45.2 kWh < 50 × 1.1 = 55)
```

### Batch validation

```python
from odse import validate_batch

records = [
    {"timestamp": "2025-01-01T00:00:00Z", "kWh": 100.5, "error_type": "normal"},
    {"timestamp": "invalid-date", "kWh": "not-a-number", "error_type": "unknown"},
    {"timestamp": "2025-01-01T01:00:00Z", "kWh": 50.0, "error_type": "normal"},
]

result = validate_batch(records, level="schema")
print(result.summary)
# 2/3 valid, 2 errors: 1x TYPE_MISMATCH, 1x REQUIRED_FIELD_MISSING

print(f"Total: {result.total}")    # 3
print(f"Valid: {result.valid}")    # 2
print(f"Invalid: {result.invalid}")  # 1
```

### Profile validation

```python
from odse import validate

# Bilateral trade record
bilateral_record = {
    "timestamp": "2026-06-27T14:00:00+02:00",
    "kWh": 87.3,
    "error_type": "normal",
    "seller_party_id": "nersa:gen:SOLARPK-001",
    "buyer_party_id": "nersa:offtaker:MUN042",
    "settlement_period_start": "2026-06-27T14:00:00+02:00",
    "settlement_period_end": "2026-06-27T14:30:00+02:00",
    "contract_reference": "PPA-SOLARPK-MUN042-2025-003",
    "settlement_type": "bilateral",
}

result = validate(bilateral_record, level="schema", profile="bilateral")
print(result.is_valid)  # True

# BESS dispatch record
bess_record = {
    "timestamp": "2026-06-27T10:00:00Z",
    "kWh": 50.0,
    "error_type": "normal",
    "dispatch_mode": "charging",
    "soc": 75.0,
}

result = validate(bess_record, level="schema", profile="bess_dispatch")
print(result.is_valid)  # True

# Wind SCADA record
wind_record = {
    "timestamp": "2026-06-27T10:00:00Z",
    "kWh": 320.0,
    "error_type": "normal",
    "wind_speed_ms": 8.5,
}

result = validate(wind_record, level="schema", profile="wind_scada")
print(result.is_valid)  # True
```

### Batch validation with profiles

```python
from odse import validate_batch

result = validate_batch(records, level="schema", profile="wheeling")
print(result.summary)
# 5/5 valid, 0 errors
```

## Error Codes

| Code | Level | Description |
|------|-------|-------------|
| `REQUIRED_FIELD_MISSING` | schema | A required field (`timestamp`, `kWh`, `error_type`) is absent |
| `TYPE_MISMATCH` | schema | Field value is wrong type (e.g., string where number expected) |
| `ENUM_MISMATCH` | schema | Value not in allowed enum set |
| `OUT_OF_BOUNDS` | schema | Numeric value outside allowed range |
| `PATTERN_MISMATCH` | schema | String doesn't match required regex pattern |
| `EXCEEDS_PHYSICAL_MAXIMUM` | semantic (warning) | kWh exceeds theoretical max for asset capacity |
| `STATE_PRODUCTION_MISMATCH` | semantic (warning) | Significant production reported with `offline` status |
| `UNKNOWN_PROFILE` | profile | Profile name not recognized |
| `PROFILE_FIELD_MISSING` | profile | Field required by the profile is absent |
| `PROFILE_VALUE_MISMATCH` | profile | Field value doesn't satisfy profile constraint |

## Result Data Classes

```python
@dataclass
class ValidationError:
    path: str       # JSON path, e.g., "$.kWh"
    message: str    # Human-readable description
    code: str       # Error code from the table above

@dataclass
class ValidationResult:
    is_valid: bool
    errors: List[ValidationError]
    warnings: List[ValidationError]
    level: str      # "schema" or "semantic"

@dataclass
class BatchValidationResult:
    total: int
    valid: int
    invalid: int
    errors: List[Tuple[int, ValidationError]]  # (record_index, error)
    summary: str   # e.g., "2/3 valid, 2 errors: 1x TYPE_MISMATCH"
```

## Related Pages

- [ODS-E Overview](/odse/overview) — components and quick start
- [Schema Reference](/odse/schemas) — field definitions and error taxonomy
- [Transform Specifications](/odse/transforms) — vendor transforms with temporal validation
- [ODS-E & the SDK](/odse/sdk-integration) — SDK-side validation utilities
- ODS-E repo: [github.com/AsobaCloud/odse](https://github.com/AsobaCloud/odse)
