---
title: "Data Ingestion & Training"
layout: default
nav_order: 9
parent: "Service Guides"
grand_parent: "SDK"
---

# Data Ingestion & Training

The SDK provides clients for uploading data to the Ona Intelligence Layer, managing ML model training jobs, and standardizing data against the ODS-E schema. These services power the pipeline that turns raw telemetry into trained forecasting models.

## Service Overview

| Service | Python Client | JS Client | Purpose |
|---------|--------------|-----------|---------|
| Data Ingestion | `client.data_ingestion` | `sdk.dataIngestion` | Trigger data ingestion and preprocessing |
| Training | `client.training` | — | Start and monitor ML model training jobs |
| Standardization | `client.standardization` | — | Normalize datasets to ODS-E format |
| Gap Detection | `client.gap_detection` | — | Detect missing data in time series |
| Interpolation | `client.interpolation` | — | Fill gaps in telemetry data |

> **Note**: JavaScript SDK coverage is limited to data ingestion. Training, standardization, gap detection, and interpolation are Python-only.

---

## Data Ingestion

Upload training and nowcast data to the platform for processing.

### Python

```python
from asoba import OnaClient

client = OnaClient()

# ── Trigger data ingestion ──
result = client.data_ingestion.ingest(
    customer_id="customer123",
    source="s3",
    bucket="my-data-bucket",
    key="telemetry/2025-11.csv",
    data_type="training"  # or "nowcast"
)
print(f"Ingestion status: {result['status']}")

# ── Validate records locally before uploading ──
records = [
    {"timestamp": "2025-11-01T00:00:00Z", "kWh": 45.2, "error_type": "normal"},
    {"timestamp": "2025-11-01T00:05:00Z", "kWh": 47.8, "error_type": "normal"},
    {"timestamp": "2025-11-01T00:10:00Z", "kWh": -5.0, "error_type": "fault"},
]

validation = client.data_ingestion.validate_local_records(records)
print(f"Valid: {len(validation['valid_records'])}")
print(f"Invalid: {len(validation['invalid_records'])}")
print(f"Summary: {validation['summary']}")
```

### JavaScript

```javascript
const { OnaSDK } = require('@asobacloud/sdk');

const sdk = new OnaSDK({
  region: 'af-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Trigger data ingestion
const result = await sdk.dataIngestion.ingest({
  customer_id: 'customer123',
  source: 's3',
  bucket: 'my-data-bucket',
  key: 'telemetry/2025-11.csv',
  data_type: 'training'
});
console.log('Ingestion status:', result.status);
```

---

## ML Model Training

Start, monitor, and list training jobs.

### Python

```python
# ── Start a training job ──
job = client.training.start_training(
    model_type="solar_forecast",
    training_data_key="processed/customer123/training_set.csv",
    model_params={
        "epochs": 50,
        "learning_rate": 0.001,
        "sequence_length": 24
    }
)
print(f"Job ID: {job['job_id']}")
print(f"Status: {job['status']}")

# ── Check training status ──
status = client.training.get_training_status(job['job_id'])
print(f"Status: {status['status']}")
print(f"Progress: {status.get('progress', 'N/A')}")
if status.get('metrics'):
    print(f"Metrics: {status['metrics']}")

# ── List all trained models ──
models = client.training.list_models()
for model in models.get('models', []):
    print(f"  - {model['model_id']} ({model['model_type']}): {model['status']}")
```

---

## Data Standardization

Normalize datasets to the ODS-E format before ingestion or training.

### Python

```python
# ── Standardize a dataset ──
result = client.standardization.standardize(
    customer_id="customer123",
    dataset_key="raw/customer123/telemetry.csv"
)
print(f"Standardized records: {result.get('record_count')}")
print(f"Output key: {result.get('output_key')}")
```

See [ODS-E & the SDK](/odse/sdk-integration) for details on how standardization connects to ODS-E validation.

---

## Gap Detection & Interpolation

Detect missing data in time series and fill gaps with ML-powered interpolation.

### Python

```python
# ── Detect data gaps ──
gaps = client.gap_detection.detect_gaps(
    customer_id="customer123",
    asset_id="INV001",
    start_time="2025-11-01T00:00:00Z",
    end_time="2025-11-07T00:00:00Z"
)
print(f"Found {len(gaps.get('gaps', []))} gaps")
for gap in gaps.get('gaps', []):
    print(f"  {gap['start']} → {gap['end']} ({gap['duration_minutes']} min)")

# ── Interpolate missing data ──
interpolated = client.interpolation.interpolate(
    customer_id="customer123",
    asset_id="INV001",
    start_time="2025-11-01T00:00:00Z",
    end_time="2025-11-07T00:00:00Z"
)
print(f"Interpolated {interpolated.get('records_filled')} records")
```

---

## Full Example

- [Python: complete_workflow_example.py](https://github.com/AsobaCloud/sdk/blob/main/python/examples/complete_workflow_example.py) — Multi-service workflow including training

## See Also

- [ODS-E & the SDK](/odse/sdk-integration) — How ODS-E validation connects to data ingestion
- [Forecasting](/sdk/services/forecasting) — Using trained models for predictions
- [Error Handling](/sdk/error-handling) — Retry logic for long-running jobs
