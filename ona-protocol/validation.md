---
layout: default
title: "Validation Guide"
parent: "Ona Protocol (ODS-E)"
nav_order: 5
---

# Validation Guide

ODS-E validation ensures your data meets schema requirements and semantic constraints before processing.

## Validation Levels

| Level | What it Checks | Use Case |
|-------|----------------|----------|
| **Schema** | Required fields, types, enums | Basic compliance |
| **Semantic** | Physical plausibility, bounds | Data quality |
| **Temporal** | Timestamps, sequence, gaps | Time series integrity |
| **Cross-field** | Field relationships | Logical consistency |

---

## Quick Start

### Python

```python
from ods_e import validate

# Validate a single record
result = validate({
    "timestamp": "2026-02-05T14:00:00Z",
    "kWh": 847.5,
    "error_type": "normal"
})

print(result.is_valid)  # True
print(result.level)     # "schema"

# Validate with semantic checks
result = validate(data, level="semantic", capacity_kw=500)

# Validate a file
result = validate_file("production_data.json")
for error in result.errors:
    print(f"Line {error.line}: {error.message}")
```

### CLI

```bash
# Basic validation
ods-e validate data.json

# Semantic validation with capacity
ods-e validate --level semantic --capacity 500 data.json

# Validate CSV (auto-detects format)
ods-e validate production_export.csv

# Output as JSON for CI/CD
ods-e validate --format json data.json > validation_report.json
```

---

## Schema Validation

Checks JSON Schema compliance.

### Required Fields

```python
# Missing required field
result = validate({
    "timestamp": "2026-02-05T14:00:00Z",
    "kWh": 847.5
    # error_type missing
})

# result.errors[0]:
# {
#   "path": "$.error_type",
#   "message": "Required field 'error_type' is missing",
#   "code": "REQUIRED_FIELD_MISSING"
# }
```

### Type Validation

```python
# Wrong type
result = validate({
    "timestamp": "2026-02-05T14:00:00Z",
    "kWh": "not a number",  # Should be number
    "error_type": "normal"
})

# result.errors[0]:
# {
#   "path": "$.kWh",
#   "message": "Expected number, got string",
#   "code": "TYPE_MISMATCH"
# }
```

### Enum Validation

```python
# Invalid enum value
result = validate({
    "timestamp": "2026-02-05T14:00:00Z",
    "kWh": 847.5,
    "error_type": "broken"  # Not in enum
})

# result.errors[0]:
# {
#   "path": "$.error_type",
#   "message": "Value 'broken' not in enum [normal, warning, critical, fault, offline, standby, unknown]",
#   "code": "ENUM_MISMATCH"
# }
```

### Timestamp Format

```python
# Invalid timestamp
result = validate({
    "timestamp": "02/05/2026 2:00 PM",  # Wrong format
    "kWh": 847.5,
    "error_type": "normal"
})

# result.errors[0]:
# {
#   "path": "$.timestamp",
#   "message": "Invalid ISO 8601 format. Expected: YYYY-MM-DDTHH:MM:SSZ",
#   "code": "INVALID_TIMESTAMP"
# }
```

---

## Semantic Validation

Checks physical plausibility and domain constraints.

### Enable Semantic Validation

```python
from ods_e import validate

result = validate(
    data,
    level="semantic",
    capacity_kw=500,           # Required for bounds checking
    latitude=-26.2041,         # Optional: for solar angle checks
    longitude=28.0473
)
```

### Physical Bounds

```python
# kWh exceeds physical maximum
result = validate({
    "timestamp": "2026-02-05T14:00:00Z",
    "kWh": 600,  # Exceeds 500kW capacity for 1-hour interval
    "error_type": "normal"
}, level="semantic", capacity_kw=500)

# result.warnings[0]:
# {
#   "path": "$.kWh",
#   "message": "kWh (600) exceeds maximum possible (550) for 500kW capacity",
#   "code": "EXCEEDS_PHYSICAL_MAXIMUM"
# }
```

### Power Factor Bounds

```python
# PF out of range
result = validate({
    "timestamp": "2026-02-05T14:00:00Z",
    "kWh": 100,
    "error_type": "normal",
    "PF": 1.05  # Impossible
}, level="semantic")

# result.errors[0]:
# {
#   "path": "$.PF",
#   "message": "Power factor must be between 0 and 1",
#   "code": "OUT_OF_BOUNDS"
# }
```

### Production vs Error State

```python
# High production but error state
result = validate({
    "timestamp": "2026-02-05T14:00:00Z",
    "kWh": 400,
    "error_type": "offline"  # Offline but producing?
}, level="semantic")

# result.warnings[0]:
# {
#   "message": "Significant production (400 kWh) reported with error_type 'offline'",
#   "code": "STATE_PRODUCTION_MISMATCH"
# }
```

### Nighttime Production

```python
# Production at night without location
result = validate({
    "timestamp": "2026-02-05T02:00:00Z",  # 2 AM
    "kWh": 100,
    "error_type": "normal"
}, level="semantic", latitude=-26.2041, longitude=28.0473)

# result.warnings[0]:
# {
#   "message": "Non-zero production (100 kWh) during nighttime hours",
#   "code": "NIGHTTIME_PRODUCTION"
# }
```

---

## Temporal Validation

Checks time series integrity.

### Enable Temporal Validation

```python
from ods_e import validate_timeseries

result = validate_timeseries(
    records,
    expected_interval="15min",  # or "5min", "1h"
    max_gap="4h"
)
```

### Monotonic Timestamps

```python
records = [
    {"timestamp": "2026-02-05T14:00:00Z", "kWh": 100, "error_type": "normal"},
    {"timestamp": "2026-02-05T13:00:00Z", "kWh": 95, "error_type": "normal"},  # Out of order
    {"timestamp": "2026-02-05T15:00:00Z", "kWh": 110, "error_type": "normal"},
]

result = validate_timeseries(records)

# result.errors[0]:
# {
#   "index": 1,
#   "message": "Timestamp 2026-02-05T13:00:00Z is before previous (2026-02-05T14:00:00Z)",
#   "code": "NON_MONOTONIC_TIMESTAMP"
# }
```

### Gap Detection

```python
records = [
    {"timestamp": "2026-02-05T14:00:00Z", ...},
    {"timestamp": "2026-02-05T15:00:00Z", ...},
    # Missing 16:00, 17:00, 18:00, 19:00, 20:00
    {"timestamp": "2026-02-05T21:00:00Z", ...},
]

result = validate_timeseries(records, expected_interval="1h", max_gap="4h")

# result.warnings[0]:
# {
#   "message": "Gap of 6 hours detected (15:00 to 21:00), exceeds max_gap of 4h",
#   "code": "EXCESSIVE_GAP"
# }
```

### Duplicate Timestamps

```python
records = [
    {"timestamp": "2026-02-05T14:00:00Z", "kWh": 100, ...},
    {"timestamp": "2026-02-05T14:00:00Z", "kWh": 100, ...},  # Duplicate
]

result = validate_timeseries(records)

# result.errors[0]:
# {
#   "index": 1,
#   "message": "Duplicate timestamp: 2026-02-05T14:00:00Z",
#   "code": "DUPLICATE_TIMESTAMP"
# }
```

---

## Batch Validation

### Validate Files

```python
from ods_e import validate_file

# JSON file
result = validate_file("data.json", level="semantic", capacity_kw=500)

# CSV file (auto-detects ODS-E CSV format)
result = validate_file("data.csv")

# With specific schema
result = validate_file("assets.json", schema="asset-metadata")
```

### Streaming Validation

```python
from ods_e import validate_stream

# For large files
errors = []
for i, result in enumerate(validate_stream("large_file.json")):
    if not result.is_valid:
        errors.append((i, result.errors))
        if len(errors) > 100:
            break  # Stop after 100 errors
```

### CLI Batch Validation

```bash
# Validate multiple files
ods-e validate *.json

# Stop on first error
ods-e validate --fail-fast data/*.json

# Summarize results
ods-e validate --summary data/*.json
# Output:
# Validated 15 files
# ✓ 12 valid
# ✗ 3 invalid (45 errors total)
```

---

## Error Codes Reference

### Schema Errors

| Code | Description |
|------|-------------|
| `REQUIRED_FIELD_MISSING` | Required field not present |
| `TYPE_MISMATCH` | Field type doesn't match schema |
| `ENUM_MISMATCH` | Value not in allowed enum |
| `INVALID_TIMESTAMP` | Timestamp not ISO 8601 |
| `ADDITIONAL_PROPERTY` | Unexpected field (strict mode) |

### Semantic Errors

| Code | Description |
|------|-------------|
| `NEGATIVE_ENERGY` | kWh < 0 |
| `EXCEEDS_PHYSICAL_MAXIMUM` | kWh > capacity * interval * 1.1 |
| `OUT_OF_BOUNDS` | Value outside valid range |
| `STATE_PRODUCTION_MISMATCH` | Production inconsistent with error_type |
| `NIGHTTIME_PRODUCTION` | Solar production during night |

### Temporal Errors

| Code | Description |
|------|-------------|
| `NON_MONOTONIC_TIMESTAMP` | Timestamps not in order |
| `DUPLICATE_TIMESTAMP` | Same timestamp appears twice |
| `EXCESSIVE_GAP` | Gap exceeds configured maximum |
| `IRREGULAR_INTERVAL` | Interval doesn't match expected |

---

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/validate.yml
name: Validate ODS-E Data

on:
  push:
    paths:
      - 'data/**/*.json'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install ods-e
        run: pip install odse

      - name: Validate data files
        run: |
          ods-e validate --format json data/*.json > validation.json

      - name: Check for errors
        run: |
          if jq -e '.errors | length > 0' validation.json; then
            echo "Validation failed"
            jq '.errors' validation.json
            exit 1
          fi
```

### Pre-commit Hook

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: ods-e-validate
        name: Validate ODS-E data
        entry: ods-e validate
        language: system
        files: \.json$
        types: [json]
```
