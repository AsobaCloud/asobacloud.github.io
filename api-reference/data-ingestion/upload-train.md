---
title: "Upload Training Data"
layout: default
nav_order: 1
parent: "Data Ingestion"
grand_parent: "Reference"
---
# Data Ingestion API: Upload Training Data

Upload historical solar production data for model training. This endpoint accepts CSV files and triggers the automated training pipeline.

## Endpoint

```
POST https://api.asoba.co/upload_train
```

## Request Format

This endpoint accepts `multipart/form-data` requests with a CSV file, or `application/json` with metadata.

### CSV Upload

Upload a CSV file directly:

```bash
curl -X POST https://api.asoba.co/upload_train \
  -F "file=@/path/to/historical_data.csv" \
  -F "customer_id=demo-customer" \
  -F "site_id=Sibaya" \
  -F "region=af-south-1" \
  -F "location=Durban"
```

### JSON Metadata

Send metadata about the upload:

```bash
curl -X POST https://api.asoba.co/upload_train \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "customer_id": "demo-customer",
    "site_id": "Sibaya",
    "region": "af-south-1",
    "location": "Durban",
    "manufacturer": "Huawei",
    "s3_path": "s3://bucket/path/to/data.csv"
  }'
```

## Request Parameters

### CSV Upload Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | CSV file containing historical data |
| `customer_id` | string | Yes | Customer identifier |
| `site_id` | string | Yes | Site identifier |
| `region` | string | Yes | AWS region (e.g., "af-south-1") |
| `location` | string | Yes | Geographic location (e.g., "Durban") |
| `manufacturer` | string | No | Equipment manufacturer (auto-detected if not provided) |

### JSON Metadata Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customer_id` | string | Yes | Customer identifier |
| `site_id` | string | Yes | Site identifier |
| `region` | string | Yes | AWS region |
| `location` | string | Yes | Geographic location |
| `manufacturer` | string | No | Equipment manufacturer |
| `s3_path` | string | Yes | S3 path to the data file |

## CSV Format Requirements

Your CSV file must include:

- **Timestamp column**: ISO 8601 format timestamps
- **Power/Energy column**: kWh, kW, or power values
- **Optional columns**: kVArh, kVA, PF, temperature, irradiance, etc.

See [Preparing Data](../../guides/data-management/preparing-data) for detailed format requirements.

## Response Format

### Successful Response

```json
{
  "status": "success",
  "message": "Upload triggered successfully",
  "s3_path": "s3://sa-api-client-input/historical/demo-customer/Sibaya/af-south-1/Durban/Huawei/20250123_120000_historical.csv",
  "processing_status": "queued"
}
```

## Processing Pipeline

After upload, your data goes through:

1. **S3 Storage**: File saved to `historical/{client_id}/{customer_id}/{region}/{location}/{manufacturer}/`
2. **Standardization**: Data standardized to common schema
3. **Weather Enrichment**: Weather data added for training period
4. **Model Training**: Automatic model training triggered (if sufficient data)
5. **Model Registry**: Trained model saved and registered

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `CSV file is required` | File parameter missing |
| `400 Bad Request` | `Invalid CSV format` | CSV format doesn't match requirements |
| `400 Bad Request` | `Missing required parameter: customer_id` | Required parameter missing |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |
| `500 Internal Server Error` | `Upload failed` | Server error during upload |

## Use Cases

- **Initial Onboarding**: Upload historical data to train your first model
- **Model Retraining**: Upload new data to retrain models with latest patterns
- **Multi-Site Setup**: Upload data for multiple sites in your portfolio
- **Data Refresh**: Update training data with recent historical records

## See Also

- [Data Ingestion API Overview](./overview) - Complete API reference
- [Upload Nowcast Data](./upload-nowcast) - Upload real-time data
- [Preparing Data](../../guides/data-management/preparing-data) - Data format guide
- [Data Quality](../../guides/data-management/data-quality) - Data quality requirements
