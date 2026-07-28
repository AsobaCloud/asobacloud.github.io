---
title: "ODS-E & Architecture"
layout: default
nav_order: 4
has_children: true
---

# ODS-E & Architecture

ODS-E (Open Data Schema for Energy) is an open specification for interoperable energy asset data across generation, consumption, and net metering. It ships with versioned JSON schemas, vendor transforms, a Python reference runtime with CLI, and integration guides for inverters, industrial protocols, SCADA, and utility data portals.

## The Problem

Every OEM — Huawei, Enphase, SolarEdge, Fronius, SMA, Vestas, and dozens more — exposes telemetry through proprietary APIs, CSV exports, and SCADA protocols with different field names, units, and error taxonomies. Integrating each new vendor typically costs **120–160 hours** of engineering effort: mapping columns, normalizing timestamps, classifying error states, and writing bespoke validation. With 20+ common OEMs across solar PV, wind, BESS, and utility metering, the integration tax compounds rapidly.

ODS-E eliminates this by defining a single canonical schema. OEM-specific data is transformed into ODS-E records via declarative YAML specs, validated against versioned schemas, and then consumed by any downstream system — analytics platforms, ML pipelines, billing engines, or market settlement workflows — without re-integration.

## Components

### JSON Schemas

Versioned JSON Schema (Draft 2020-12) definitions for energy data structures:

- **`energy-timeseries.json`** — 65-field canonical record for a single energy reading (3 required fields, 62 optional). Covers core telemetry, market settlement, wheeling, tariffs, curtailment, BESS dispatch, wind SCADA, and renewable certificates.
- **`asset-metadata.json`** — asset configuration, location, and grid connection details.
- **`equipment-register.json`** — equipment hierarchy and technical attributes from ERP/EAM systems.
- 5 additional schemas for equipment ID mapping, maintenance history, spare parts, failure taxonomy, and more.

### Error Taxonomy

Seven standardized error categories that replace OEM-specific error codes:

| Category | Description |
|----------|-------------|
| `normal` | Equipment operating normally |
| `warning` | Degraded but functional (e.g., grid over-voltage, temperature limited) |
| `critical` | Severe condition requiring attention (e.g., DC arc fault, emergency stop) |
| `fault` | Equipment fault (e.g., residual current fault, grid lost) |
| `offline` | No data received from the asset |
| `standby` | Asset idle (e.g., nighttime, initializing) |
| `unknown` | Unclassified state |

### Transform Specifications

Declarative YAML files that map OEM-specific data to ODS-E records. Each spec defines input column aliases, output field mappings, error code mappings, and validation bounds. 20 vendor transforms are included — see [Transform Specifications](/odse/transforms).

### Python Reference Runtime + CLI

A Python package (`odse`) providing:

- `transform()` — convert vendor data to ODS-E records
- `validate()` / `validate_batch()` — validate records against schemas and conformance profiles
- `to_json()` / `to_parquet()` — persist validated records
- CLI commands: `odse transform` and `odse validate`

## Quick Start

### Install

```bash
pip install -e src/python[parquet]
```

### Transform vendor data

```bash
odse transform --source generic_csv \
  --input examples/fixtures/quickstart_scada.csv \
  --column-map timestamp=Timestamp,kWh=ActiveEnergy,asset_id=Asset \
  --output examples/output/quickstart.cleaned.json
```

### Validate

```bash
odse validate --input examples/output/quickstart.cleaned.json --level schema
```

Expected output:

```
3/3 valid, 0 errors
```

### In Python

```python
from pathlib import Path
from odse import transform, validate_batch, to_parquet

records = transform(
    Path("examples/fixtures/quickstart_scada.csv"),
    source="generic_csv",
    column_map={
        "timestamp": "Timestamp",
        "kWh": "ActiveEnergy",
        "asset_id": "Asset",
    },
)

result = validate_batch(records, level="schema")
print(result.summary)
# 3/3 valid, 0 errors

to_parquet(records, "output/", partition_by=["asset_id", "year", "month", "day"])
```

## What's Next

- [Ona Intelligence Layer Architecture](/odse/architecture) — how ODS-E fits within the broader platform
- [ODS-E & the SDK](/odse/sdk-integration) — using ODS-E with the Ona SDK
- [Schema Reference](/odse/schemas) — field-level documentation for all schemas
- [Transform Specifications](/odse/transforms) — vendor transform catalog and usage
- [Validation Guide](/odse/validation) — validation levels and conformance profiles

## Repository

**Source code and schemas:** [github.com/AsobaCloud/odse](https://github.com/AsobaCloud/odse)

**Licensing:**

- Specification, schemas, transforms: CC-BY-SA 4.0
- Reference implementation and tools: Apache 2.0

Maintained by [Asoba Corporation](https://asoba.co).
