---
title: "Freemium Forecasting"
layout: default
nav_order: 4
parent: "Service Guides"
grand_parent: "SDK"
---

# Freemium Forecasting

Generate a 24-hour solar energy forecast from a CSV file. **No API key required.** The service uses a two-step email-verification flow.

**Endpoint:** `https://forecasting.api.asoba.org` (hardcoded — no env var needed)

---

## Two-Step Email Verification Flow

1. **Request verification code** — a one-time code is emailed to your address
2. **Submit CSV with code** — the forecast is generated and returned

You must accept the Terms of Use (`tou_accepted=True`) to use this service.

---

## Python

```python
from ona_platform import OnaClient

client = OnaClient()

# Step 1 — request a one-time verification code (emailed to you)
client.freemium_forecast.request_verification_code(email="you@example.com")

verification_code = input("Enter the verification code from your email: ").strip()

# Step 2 — submit the CSV with the code and installed capacity
result = client.freemium_forecast.get_forecast(
    csv_path="data/historical_production.csv",
    email="you@example.com",
    verification_code=verification_code,
    site_name="My Solar Site",
    location="Durban",
    capacity_kw=500.0,
    tou_accepted=True,        # required — must accept Terms of Use
    marketing_opt_in=False,   # optional
)

forecast = result["forecast"]
print(f"Site:          {forecast['site_name']}")
print(f"Location:      {forecast['location']}")
print(f"Model type:    {forecast['model_type']}")
print(f"Generated at:  {forecast['generated_at']}")

summary = forecast.get("summary", {})
print(f"Total 24h:   {summary.get('total_kwh_24h', 'N/A')} kWh")
print(f"Peak hour:   {summary.get('peak_hour', 'N/A')}")
print(f"Peak output: {summary.get('peak_kwh', 'N/A')} kWh")

for point in forecast["forecasts"][:6]:
    print(f"  {point['timestamp']}  {point['kWh_forecast']:>8.1f} kWh  confidence={point['confidence']:.0%}")
```

---

## JavaScript

```javascript
const { OnaSDK } = require('./src/index');

const sdk = new OnaSDK();

// Step 1 — request a one-time verification code (emailed to you)
await sdk.freemiumForecast.requestVerificationCode({ email: 'you@example.com' });

const verificationCode = await prompt('Enter the verification code from your email: ');

// Step 2 — submit the CSV with the code and installed capacity
const result = await sdk.freemiumForecast.getForecast({
  csvPath: 'data/historical_production.csv',
  email: 'you@example.com',
  verificationCode,
  siteName: 'My Solar Site',
  location: 'Durban',
  capacityKw: 500,
  touAccepted: true,      // required — must accept Terms of Use
  marketingOptIn: false,   // optional
});

const { forecast } = result;
console.log(`Site:         ${forecast.site_name}`);
console.log(`Location:     ${forecast.location}`);
console.log(`Model type:   ${forecast.model_type}`);
console.log(`Generated at: ${forecast.generated_at}`);

const s = forecast.summary || {};
console.log(`Total 24h:   ${s.total_kwh_24h ?? 'N/A'} kWh`);
console.log(`Peak hour:   ${s.peak_hour ?? 'N/A'}`);
console.log(`Peak output: ${s.peak_kwh ?? 'N/A'} kWh`);

forecast.forecasts.slice(0, 6).forEach(p => {
  console.log(`  ${p.timestamp}  ${p.kWh_forecast.toFixed(1)} kWh  confidence=${(p.confidence * 100).toFixed(0)}%`);
});
```

---

## CSV Format

The CSV file must contain a timestamp column and a power/energy column:

```csv
Timestamp,Power (kW)
2025-12-01T00:00:00Z,0
2025-12-01T06:00:00Z,55.2
2025-12-01T07:00:00Z,120.7
2025-12-01T12:00:00Z,1850.2
2025-12-01T13:00:00Z,1780.5
2025-12-01T14:00:00Z,1620.9
2025-12-01T18:00:00Z,80.3
```

---

## Capacity Specification

The `capacity_kw` parameter specifies the installed capacity of the solar installation in kilowatts. This is used to scale and validate the forecast. Set it accurately for best results.

```python
result = client.freemium_forecast.get_forecast(
    csv_path="data.csv",
    email="you@example.com",
    verification_code="123456",
    site_name="My Solar Site",
    location="Durban",
    capacity_kw=500.0,  # 500 kW installed capacity
    tou_accepted=True,
)
```

---

## Method Reference

| Python | JavaScript | Description |
|--------|------------|-------------|
| `request_verification_code()` | `requestVerificationCode()` | Request one-time code via email |
| `get_forecast()` | `getForecast()` | Submit CSV and generate 24-hour forecast |

### `get_forecast` Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `csv_path` / `csvPath` | string | ✅ | Path to CSV file with historical production data |
| `email` | string | ✅ | Email address (must match verification request) |
| `verification_code` / `verificationCode` | string | ✅ | One-time code from email |
| `site_name` / `siteName` | string | ✅ | Descriptive name for the solar site |
| `location` | string | ✅ | General location (e.g. "Durban") |
| `capacity_kw` / `capacityKw` | float | ✅ | Installed capacity in kW |
| `tou_accepted` / `touAccepted` | bool | ✅ | Must be `True` to accept Terms of Use |
| `marketing_opt_in` / `marketingOptIn` | bool | ❌ | Optional marketing consent (default: False) |

---

## Full Example

- [Python](https://github.com/AsobaCloud/sdk/blob/main/python/examples/freemium_forecast_example.py)
- [JavaScript](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/freemium-forecast-example.js)
