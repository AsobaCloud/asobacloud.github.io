---
layout: default
title: "Overview"
parent: "Ona Protocol (ODS-E)"
nav_order: 1
---

# Ona Protocol (ODS-E)

The Open Data Schema for Energy (ODS-E) is a specification for standardizing energy asset data from IoT devices. This documentation covers the schema definitions, transform specifications, and reference implementation.

## Quick Start

```bash
pip install odse
```

```python
from ods_e import validate, transform

# Validate ODS-E data
result = validate("production_data.json")
print(result.is_valid)  # True

# Transform from OEM format
ods_data = transform("huawei_export.csv", source="huawei")
```

## What is ODS-E?

ODS-E solves a fundamental problem in energy asset management: every OEM (Huawei, Enphase, Solarman, etc.) exports data in proprietary formats with different schemas, error codes, and conventions. This creates:

- **Integration overhead**: Custom parsers for every OEM
- **Vendor lock-in**: Data trapped in proprietary formats
- **Analytics friction**: Inconsistent schemas break pipelines

ODS-E provides:

| Component | Purpose |
|-----------|---------|
| **JSON Schemas** | Validate data structure and types |
| **Error Taxonomy** | Standardized 7-category error classification |
| **Transform Specs** | Declarative OEM → ODS-E mappings |
| **Reference Implementation** | Python library and CLI tools |

## Core Concepts

### Production Timeseries

The primary schema for energy production data:

```json
{
  "timestamp": "2026-02-05T14:00:00Z",
  "kWh": 847.5,
  "error_type": "normal",
  "error_code": "0",
  "PF": 0.98
}
```

**Required fields:**
- `timestamp` - ISO 8601 format with timezone
- `kWh` - Active energy, must be ≥ 0
- `error_type` - One of: `normal`, `warning`, `critical`, `fault`, `offline`, `standby`, `unknown`

**Optional fields:**
- `error_code` - Original OEM error code (preserved for reference)
- `kVArh` - Reactive energy
- `kVA` - Apparent power
- `PF` - Power factor (0-1)

### Error Taxonomy

ODS-E normalizes hundreds of OEM-specific error codes into seven categories:

| Category | Description | Typical OEM Codes |
|----------|-------------|-------------------|
| `normal` | Operating normally | Huawei: 0, 1, 2, 256 |
| `warning` | Degraded but operational | Huawei: 513, 514 |
| `critical` | Requires immediate attention | Huawei: 768, 770 |
| `fault` | Equipment failure | OEM fault codes |
| `offline` | No communication | Connection timeout |
| `standby` | Intentionally idle | Nighttime, maintenance |
| `unknown` | Unclassified | New/unmapped codes |

### Asset Metadata

Companion schema for site and equipment information:

```json
{
  "asset_id": "site-001-inv-a",
  "location": {
    "latitude": -26.2041,
    "longitude": 28.0473,
    "timezone": "Africa/Johannesburg",
    "region": "Gauteng"
  },
  "capacity_kw": 500,
  "oem": "Huawei",
  "commissioning_date": "2024-03-15"
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Your Analytics Platform                                │
│  (Forecasting, Anomaly Detection, Carbon Tracking)      │
└────────────────────────┬────────────────────────────────┘
                         │ ODS-E Format
┌────────────────────────┴────────────────────────────────┐
│  ODS-E Layer                                            │
│  ┌────────────────┐  ┌────────────────┐                │
│  │ Validator      │  │ Transformer    │                │
│  │ (JSON Schema)  │  │ (YAML specs)   │                │
│  └────────────────┘  └────────────────┘                │
└────────────────────────┬────────────────────────────────┘
                         │ Raw OEM Data
┌──────────┬─────────────┼─────────────┬──────────────────┐
│ Huawei   │   Enphase   │   Solarman  │   Your OEM      │
│ CSV/API  │   JSON/API  │   CSV/API   │   ???           │
└──────────┴─────────────┴─────────────┴──────────────────┘
```

## Supported OEMs

Pre-built transform specifications:

| OEM | Format | Transform Status |
|-----|--------|------------------|
| Huawei FusionSolar | CSV, API | ✅ Included |
| Enphase Envoy | JSON, API | ✅ Included |
| Solarman Logger | CSV | ✅ Included |
| SMA Sunny Portal | CSV | 🚧 Community |
| Fronius Solar.web | CSV | 🚧 Community |

Adding a new OEM? See [Creating Transform Specs](./transforms.md).

## Installation

### Python (Recommended)

```bash
pip install odse
```

### From Source

```bash
git clone https://github.com/asobacloud/ona-protocol.git
cd ona-protocol
pip install -e .
```

### CLI Only

```bash
pipx install ods-e
```

## Next Steps

- [Schema Reference](./schemas.md) - Complete field specifications
- [Transform Specifications](./transforms.md) - OEM mapping details
- [Validation Guide](./validation.md) - Using the validator
- [Certification Program](./certification.md) - ODS-E Certified™ requirements

### Platform Integration

ODS-E is the native format for the Ona Intelligence Layer APIs:

- [Data Ingestion API](/api-reference/data-ingestion/overview) - Upload ODS-E formatted data
- [Forecasting API](/api-reference/forecasting/overview) - Generate forecasts from ODS-E data
- [Terminal API](/api-reference/terminal/overview) - Full OODA workflow
