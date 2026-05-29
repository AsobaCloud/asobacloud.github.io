---
title: "Upload Nowcast Data"
layout: default
nav_order: 2
parent: "Data Ingestion"
grand_parent: "Reference"
---
# Data Ingestion API: Upload Nowcast Data

Upload real-time solar production data for forecasting and monitoring. This endpoint accepts CSV files and triggers real-time processing pipelines.

## Endpoint

```
POST https://api.asoba.org/upload_nowcast
```

## Request Format

This endpoint accepts `multipart/form-data` requests with a CSV file, or `application/json` with metadata.

### CSV Upload

Upload a CSV file directly:

```bash
curl -X POST https://api.asoba.org/upload_nowcast \
  -F "file=@/path/to/realtime_data.csv" \
  -F "customer_id=demo-customer" \
  -F "site_id=Sibaya" \
  -F "region=af-south-1" \
  -F "location=Durban"
```

### JSON Metadata

Send metadata about the upload:

```bash
curl -X POST https://api.asoba.org/upload_nowcast \
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
| `file` | File | Yes | CSV file containing real-time data |
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

- **Timestamp column**: ISO 8601 format timestamps (most recent data)
- **Power/Energy column**: Current kWh, kW, or power values
- **Optional columns**: kVArh, kVA, PF, temperature, irradiance, etc.

See [Preparing Data](../../guides/data-management/preparing-data) for detailed format requirements.

## Response Format

### Successful Response

```json
{
  "status": "success",
  "message": "Upload triggered successfully",
  "s3_path": "s3://sa-api-client-input/nowcast/demo-customer/Sibaya/af-south-1/Durban/Huawei/20250123_120000_realtime.csv",
  "processing_status": "queued"
}
```

## Processing Pipeline

After upload, your data goes through:

1. **S3 Storage**: File saved to `nowcast/{client_id}/{customer_id}/{region}/{location}/{manufacturer}/`
2. **Real-Time Processing**: Data processed for immediate use
3. **Weather Integration**: Current weather data added
4. **Forecast Generation**: Enables forecast generation with latest data
5. **OODA Workflow**: Data available for fault detection and diagnostics

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `CSV file is required` | File parameter missing |
| `400 Bad Request` | `Invalid CSV format` | CSV format doesn't match requirements |
| `400 Bad Request` | `Missing required parameter: customer_id` | Required parameter missing |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |
| `500 Internal Server Error` | `Upload failed` | Server error during upload |

## Use Cases

- **Real-Time Monitoring**: Upload current production data for live dashboards
- **Forecast Updates**: Provide latest data for accurate forecasts
- **Fault Detection**: Enable real-time anomaly detection
- **Performance Tracking**: Track current performance vs. forecasts

## See Also

- [Data Ingestion API Overview](./overview) - Complete API reference
- [Upload Training Data](./upload-train) - Upload historical data
- [Preparing Data](../../guides/data-management/preparing-data) - Data format guide
- [Forecasting API](../forecasting/overview) - Generate forecasts
