# Get Started with the Ona Intelligence Layer

This guide provides a hands-on walkthrough to make your first API call and generate a 24-hour energy forecast. It is designed for **Beginners** and requires no prior knowledge of our APIs.

## Your Goal: Get a Forecast in 5 Minutes

By the end of this guide, you will have:
1.  Sent a CSV file with historical energy data to our API.
2.  Received a complete 24-hour forecast.

## Step 1: Prepare Your Data

You will need a simple CSV file with historical solar production data. The file must contain at least two columns: one for the timestamp and one for the power or energy reading.

**Example `sample.csv`:**
```csv
Timestamp,Power (kW)
2025-12-01T00:00:00Z,0
2025-12-01T01:00:00Z,0
2025-12-01T02:00:00Z,0
2025-12-01T03:00:00Z,0
2025-12-01T04:00:00Z,0
2025-12-01T05:00:00Z,10.5
2025-12-01T06:00:00Z,55.2
2025-12-01T07:00:00Z,120.7
...
```

## Step 2: Make the API Call

You can use any tool that sends HTTP requests. We'll use cURL for this example as it's available on most systems.

Open your terminal, and execute the following command. Make sure to replace `/path/to/your/sample.csv` with the actual path to your file.

### cURL Command
```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My First Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```
*   `file`: The path to your historical data file.
*   `email`: Your email address. This is used to identify your requests.
*   `site_name`: A name for your site.
*   `location`: The general location of the site.

## Step 3: View the Response

If successful, the API will return a JSON object containing your 24-hour forecast.

### Expected JSON Response
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
      },
      {
        "timestamp": "2025-12-30T13:00:00Z",
        "hour_ahead": 3,
        "kWh_forecast": 130.1,
        "confidence": 0.85
      }
      // ... 21 more hours
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

## Congratulations!

You have successfully generated your first forecast using the Ona Intelligence Layer.

## Next Steps

Now that you have a basic understanding of how to use the API, you can:

*   **Explore our Guides**: Learn more about [Forecasting](./guides/forecasting/overview.md) and [Data Management](./guides/data-management/overview.md).
*   **Dive into the API Reference**: Get detailed information about the [Freemium Forecasting API](./api-reference/forecasting/freemium-forecast.md).
