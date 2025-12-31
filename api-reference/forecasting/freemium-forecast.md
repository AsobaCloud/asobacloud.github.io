---
layout: default
---
# API Reference: Freemium Forecasting API

This document provides a detailed reference for the Freemium Forecasting API, which allows you to generate a 24-hour forecast from a CSV file of historical data. This is a simplified endpoint designed for quick testing and evaluation.

**Note**: For production use with trained models, see the [Generate Forecast](./forecast) endpoint which uses the `ForecastResponse.json` schema.

This API is designed for **Developers**.

## Endpoint

```
POST https://api.asoba.co/v1/freemium-forecast
```

This endpoint accepts a `multipart/form-data` request.

## Request Parameters

The following parameters must be included in your `multipart/form-data` request:

| Parameter   | Type   | Description                                                                                             |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------ |
| `file`      | File   | A CSV file containing historical solar production data. Must have a timestamp and a power/energy column. |
| `email`     | String | Your email address. This is used to identify your requests and create a customer record.                 |
| `site_name` | String | A descriptive name for the solar site (e.g., "My First Solar Site").                                     |
| `location`  | String | The general location of the site (e.g., "Durban"). This is used to incorporate weather data.             |

### cURL Example

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My First Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

## Response Format

A successful request will return a `200 OK` status code and a JSON object with the forecast data.

### Successful Response Body

```json
{
  "status": "success",
  "forecast": {
    "site_name": "My First Solar Site",
    "location": "Durban",
    "manufacturer": "Huawei",
    "forecast_hours": 24,
    "generated_at": "2025-12-30T10:00:00Z",
    "model_type": "generic",
    "forecasts": [
      {
        "timestamp": "2025-12-30T11:00:00Z",
        "hour_ahead": 1,
        "kWh_forecast": 15.5,
        "confidence": 0.85
      },
      {
        "timestamp": "2025-12-30T12:00:00Z",
        "hour_ahead": 2,
        "kWh_forecast": 65.2,
        "confidence": 0.85
      }
    ],
    "summary": {
      "total_kwh_24h": 28500.5,
      "peak_hour": "2025-12-30T14:00:00Z",
      "peak_kwh": 1850.2,
      "average_hourly_kwh": 1187.5
    }
  }
}
```

## Error Responses

If the request is invalid or an error occurs during processing, the API will return an appropriate HTTP status code and a JSON error object.

| Status Code | Error Message                | Description                                                                 |
| :---------- | :--------------------------- | :-------------------------------------------------------------------------- |
| `400 Bad Request` | `CSV file is required`       | The `file` parameter was missing from the request.                          |
| `400 Bad Request` | `Invalid email address format` | The provided `email` was not a valid email address.                       |
| `400 Bad Request` | `Invalid CSV Format`         | The provided file was not a valid CSV or was missing a required column.   |
| `500 Internal Server Error` | `Forecast generation failed` | An unexpected error occurred on our server. Please try again later. | 

### Example Error Response (`400 Bad Request`)

```json
{
  "status": "error",
  "error": "CSV file is required"
}
```
