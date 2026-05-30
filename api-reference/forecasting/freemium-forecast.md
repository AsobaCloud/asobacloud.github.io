---
title: "Freemium Forecast"
layout: default
nav_order: 2
parent: "Forecasting API"
grand_parent: "Reference"
---
# API Reference: Freemium Forecasting API

This document provides a detailed reference for the Freemium Forecasting API, which allows you to generate a 24-hour forecast from a CSV file of historical data. This is a simplified endpoint designed for quick testing and evaluation.

**Note**: For production use with trained models, see the [Generate Forecast](./forecast) endpoint which uses the `ForecastResponse.json` schema.

This API is designed for **Developers**.

## Endpoints

The freemium API is served from its own branded domain, `forecasting.api.asoba.org`,
and uses a **two-step email-verification flow**:

```
POST https://forecasting.api.asoba.org/api/v1/freemium-forecast/verify   # Step 1: request a code
POST https://forecasting.api.asoba.org/api/v1/freemium-forecast          # Step 2: submit the forecast
```

> `forecasting.api.asoba.org` is the **freemium tier** only. The metered/production
> forecasting endpoint (`/forecast`) is served from `api.asoba.org` — see
> [Generate Forecast](./forecast).

### Step 1 — Request a verification code

`POST /api/v1/freemium-forecast/verify` with a JSON body containing your email. A one-time
code is emailed to that address.

```json
{ "email": "you@example.com" }
```

### Step 2 — Submit the forecast request

`POST /api/v1/freemium-forecast` as a `multipart/form-data` request with the parameters below.

## Request Parameters (Step 2)

The following parameters must be included in your `multipart/form-data` request:

| Parameter           | Type   | Description                                                                                             |
| :------------------ | :----- | :------------------------------------------------------------------------------------------------------ |
| `file`              | File   | A CSV file containing historical solar production data. Must have a timestamp and a power/energy column. |
| `email`             | String | Your email address. This is used to identify your requests and create a customer record.                 |
| `verification_code` | String | The one-time code emailed to you in Step 1.                                                              |
| `site_name`         | String | A descriptive name for the solar site (e.g., "My First Solar Site").                                     |
| `location`          | String | The general location of the site (e.g., "Durban"). This is used to incorporate weather data.             |
| `capacity_kw`       | Number | Installed capacity of the solar installation, in kW.                                                     |
| `tou_accepted`      | Boolean | **Required.** Must be `true` to accept the Terms of Use. Requests without it are rejected with HTTP 400. |
| `marketing_opt_in`  | Boolean | Optional. Set `true` to opt into marketing communications. Defaults to `false`.                          |


## SDK (Recommended)

Install the SDK from [github.com/AsobaCloud/sdk](https://github.com/AsobaCloud/sdk). No API key needed.

**Python:**
```python
from ona_platform import OnaClient

client = OnaClient()

# Step 1 — request a one-time code (emailed to you)
client.freemium_forecast.request_verification_code(email="you@example.com")

# Step 2 — submit the CSV with the code from your email
result = client.freemium_forecast.get_forecast(
    csv_path="data.csv",
    email="you@example.com",
    verification_code="123456",
    site_name="My Solar Site",
    location="Durban",
    capacity_kw=500.0,
    tou_accepted=True,       # required: accept the Terms of Use
    marketing_opt_in=False,  # optional
)

forecast = result["forecast"]
print(f"Total 24h: {forecast['summary']['total_kwh_24h']} kWh")

for point in forecast["forecasts"]:
    print(f"{point['timestamp']}: {point['kWh_forecast']} kWh")
```

**JavaScript:**
```javascript
const { OnaSDK } = require('./src/index');

const sdk = new OnaSDK();

// Step 1 — request a one-time code (emailed to you)
await sdk.freemiumForecast.requestVerificationCode({ email: 'you@example.com' });

// Step 2 — submit the CSV with the code from your email
const result = await sdk.freemiumForecast.getForecast({
  csvPath: 'data.csv',
  email: 'you@example.com',
  verificationCode: '123456',
  siteName: 'My Solar Site',
  location: 'Durban',
  capacityKw: 500.0,
  touAccepted: true,      // required: accept the Terms of Use
  marketingOptIn: false,  // optional
});

const { forecast } = result;
console.log(`Total 24h: ${forecast.summary.total_kwh_24h} kWh`);

forecast.forecasts.forEach(p =>
  console.log(`${p.timestamp}: ${p.kWh_forecast} kWh`)
);
```

Full runnable examples:
- [Python example](https://github.com/AsobaCloud/sdk/blob/main/python/examples/freemium_forecast_example.py)
- [JavaScript example](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/freemium-forecast-example.js)

---

### cURL Example

```bash
# Step 1 — request a verification code (emailed to you)
curl -X POST https://forecasting.api.asoba.org/api/v1/freemium-forecast/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# Step 2 — submit the CSV with the code from your email
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "verification_code=123456" \
  -F "site_name=My First Solar Site" \
  -F "location=Durban" \
  -F "capacity_kw=500" \
  -F "tou_accepted=true" \
  https://forecasting.api.asoba.org/api/v1/freemium-forecast
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
