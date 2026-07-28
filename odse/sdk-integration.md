---
title: "ODS-E & the SDK"
layout: default
nav_order: 2
parent: "ODS-E & Architecture"
---

# ODS-E & the SDK

The Ona SDK ([github.com/AsobaCloud/sdk](https://github.com/AsobaCloud/sdk)) provides Python and JavaScript clients for the Ona Intelligence Layer. ODS-E is the data contract between your assets and the platform — the SDK validates incoming data against ODS-E schemas before ingestion, and the SDK's model definitions mirror the ODS-E specification.

## SDK ODS-E Models

The SDK's `ona_platform.models.odse` module encodes the full ODS-E energy-timeseries schema as Python constants. These are used by the SDK's validation utilities and can be imported directly:

```python
from ona_platform.models.odse import (
    ODSE_REQUIRED_FIELDS,
    ODSE_ALLOWED_FIELDS,
    ODSE_PROFILES,
    ODSE_ENUM_FIELDS,
    ODSE_NUMERIC_RANGES,
)
```

| Constant | Description |
|----------|-------------|
| `ODSE_REQUIRED_FIELDS` | The 3 required fields: `timestamp`, `kWh`, `error_type` |
| `ODSE_ALLOWED_FIELDS` | Full 65-field whitelist (plus `asset_id`, `device_id` for backward compat) |
| `ODSE_PROFILES` | 6 conformance profiles with required fields and value constraints |
| `ODSE_ENUM_FIELDS` | 13 enum-constrained fields mapped to allowed value sets |
| `ODSE_NUMERIC_RANGES` | Numeric bounds (e.g., `soc` 0–100, `PF` 0–1, `nacelle_direction_deg` 0–360) |

The SDK also ships JSON schema files for record validation:

- **`ODSERecord.json`** — canonical schema for a single ODS-E production-timeseries record. Requires `timestamp`, `kWh`, `error_type`. Includes core telemetry fields (`error_code`, `kVArh`, `kVA`, `PF`, `asset_id`, `device_id`).
- **`StandardizedTelemetry.json`** — extended schema for standardized telemetry across the platform, adding `power`, `temperature`, `voltage`, `irradiance`, `wind_speed`, `inverter_state`, `efficiency`, `mppt_power`, `day_cap`, `total_cap`.

## Standardization Service

The SDK's `StandardizationClient` invokes a server-side Lambda function (`dataStandardizationService`) that normalizes and validates datasets against ODS-E schemas:

```python
from ona_platform import OnaClient

client = OnaClient()

result = client.standardization.standardize(
    customer_id="Sibaya",
    dataset_key="s3://bucket/path/to/dataset.csv",
)
```

This service runs server-side normalization — it applies ODS-E field mapping, type coercion, and enum validation to raw datasets stored in S3. For client-side validation before upload, use the local validation utilities instead.

## Data Ingestion Service

The `DataIngestionClient` accepts ODS-E-formatted records and triggers server-side ingestion. It also provides a local validation method that checks records against the full ODS-E schema without making a service call:

```python
from ona_platform import OnaClient

client = OnaClient()

# Validate locally before uploading (no API call)
records = [
    {"timestamp": "2025-01-01T00:00:00Z", "kWh": 100.5, "error_type": "normal", "asset_id": "INV001"},
    {"timestamp": "invalid-date", "kWh": "not-a-number", "error_type": "unknown"},
]

result = client.data_ingestion.validate_local_records(records)
print(f"Valid: {result['summary']['valid']}/{result['summary']['total']}")
# Valid: 1/2

for item in result['invalid_records']:
    print(f"Errors: {item['errors']}")
```

To trigger server-side ingestion:

```python
status = client.data_ingestion.ingest(
    customer_id="Sibaya",
    dataset_key="s3://bucket/path/to/validated_data.jsonl",
)
```

## Recommended Workflow: Validate → Upload

The recommended pattern is to validate locally against ODS-E schemas before uploading to the Ona platform. This catches schema violations, type mismatches, enum errors, and out-of-bounds values early — without consuming API quota or incurring service costs.

### Step 1: Validate with ODS-E

Use the ODS-E reference runtime to transform and validate vendor data:

```python
from odse import transform, validate_batch

# Transform vendor CSV to ODS-E records
records = transform(
    "examples/fixtures/huawei_sample.csv",
    source="huawei",
    asset_id="SITE-HW-001",
)

# Validate against the full 65-field schema
result = validate_batch(records, level="schema")
print(result.summary)
# 100/100 valid, 0 errors
```

For trading workflows, apply a conformance profile:

```python
from odse import validate

result = validate(record, level="schema", profile="bilateral")
print(result.is_valid)  # True or False
```

See the [Validation Guide](/odse/validation) for all validation levels and profiles.

### Step 2: Upload via the SDK

Once records pass validation, upload them through the SDK's data ingestion service:

```python
from ona_platform import OnaClient

client = OnaClient()

# Upload validated records
for record in valid_records:
    client.data_ingestion.ingest(
        customer_id="Sibaya",
        record=record,
    )
```

Or use the SDK's local validation as a pre-upload check:

```python
# Validate locally using SDK's built-in ODS-E validation
result = client.data_ingestion.validate_local_records(records)

if result['summary']['invalid'] > 0:
    for item in result['invalid_records']:
        print(f"Record {item.get('record_index')}: {item['errors']}")
    raise ValueError("Fix validation errors before upload")

# All valid — safe to ingest
client.data_ingestion.ingest(customer_id="Sibaya", records=records)
```

## Validation Details

The SDK's local validation (`ona_platform.utils.validation`) checks:

- **Required fields** — `timestamp`, `kWh`, `error_type` must be present
- **Allowed field whitelist** — rejects unknown fields not in the 65-field schema
- **Numeric bounds** — `soc`/`soh` 0–100, `PF` 0–1, `nacelle_direction_deg` 0–360, etc.
- **Timestamp format** — must be valid ISO 8601 date-time
- **Enum matching** — 13 enum-constrained fields validated against allowed values
- **Conformance profiles** — 6 profiles enforce context-specific required fields

## Related Pages

- [SDK Data Ingestion Guide](/sdk/services/data-ingestion-training)
- [ODS-E Validation Guide](/odse/validation)
- [Schema Reference](/odse/schemas)
- [Ona Intelligence Layer Architecture](/odse/architecture)
- SDK repo: [github.com/AsobaCloud/sdk](https://github.com/AsobaCloud/sdk)
- ODS-E repo: [github.com/AsobaCloud/odse](https://github.com/AsobaCloud/odse)
