---
title: "Quickstart"
layout: default
nav_order: 1
parent: "Build"
---

# Quickstart

Generate your first energy forecast in three steps. No API key required — the freemium endpoint is open.

## Step 1: Prepare a CSV

Create a file `sample.csv` with historical solar production data:

```csv
Timestamp,Power (kW)
2025-12-01T00:00:00Z,0
2025-12-01T06:00:00Z,55.2
2025-12-01T12:00:00Z,1850.2
2025-12-01T18:00:00Z,120.7
```

## Step 2: Call the API

```bash
curl -X POST \
  -F "file=@sample.csv" \
  -F "email=you@example.com" \
  -F "site_name=My Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

## Step 3: View the response

```json
{
  "status": "success",
  "forecast": {
    "site_name": "My Solar Site",
    "forecast_hours": 24,
    "forecasts": [
      { "timestamp": "2025-12-30T11:00:00Z", "kWh_forecast": 15.5, "confidence": 0.85 },
      { "timestamp": "2025-12-30T12:00:00Z", "kWh_forecast": 65.2, "confidence": 0.85 }
    ]
  }
}
```

## Next steps

- [Developer Guide](/guides/developer-guide) — SDK setup and authenticated API access
- [Preparing Data](/guides/data-management/preparing-data) — Data format requirements
- [Uploading Data](/guides/data-management/uploading-data) — Training and nowcast data upload
- [Freemium Forecast API](/api-reference/forecasting/freemium-forecast) — Full endpoint reference
