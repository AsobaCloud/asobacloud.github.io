---
title: "Forecasting"
layout: default
nav_order: 3
parent: "Service Guides"
grand_parent: "SDK"
---

# Forecasting

Generate solar energy forecasts at device, site, or customer levels. The forecasting service runs on AWS Lambda and requires AWS credentials.

**Requires:** AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`) and a forecasting endpoint.

---

## Forecast Levels

| Level | Method | Description |
|-------|--------|-------------|
| Device | `get_device_forecast()` / `getDeviceForecast()` | Forecast for a single inverter |
| Site | `get_site_forecast()` / `getSiteForecast()` | Aggregated forecast across all devices at a site |
| Customer | `get_customer_forecast()` / `getCustomerForecast()` | Legacy LSTM path (maps UUID → site name) |

---

## Python

```python
from asoba import OnaClient

client = OnaClient()

# Device-level forecast
device_forecast = client.forecasting.get_device_forecast(
    site_id='Sibaya',
    device_id='INV001',
    forecast_hours=24
)
print(f"Site: {device_forecast['site_id']}")
print(f"Device: {device_forecast['device_id']}")
print(f"Forecast hours: {len(device_forecast['forecasts'])}")
print(f"First forecast: {device_forecast['forecasts'][0]}")

# Site-level aggregated forecast (with device breakdown)
site_forecast = client.forecasting.get_site_forecast(
    site_id='Sibaya',
    forecast_hours=24,
    include_device_breakdown=True
)
print(f"Site: {site_forecast['site_id']}")
print(f"Devices included: {site_forecast['devices_included']}")
print(f"First hour total kWh: {site_forecast['forecasts'][0]['kWh_forecast']}")

# Customer-level forecast (legacy)
customer_forecast = client.forecasting.get_customer_forecast(
    customer_id='customer123',
    forecast_hours=24
)
print(f"Customer: {customer_forecast['customer_id']}")
print(f"Model info: {customer_forecast['model_info']}")
```

---

## JavaScript

```javascript
const { OnaSDK } = require('@asobacloud/sdk');

const sdk = new OnaSDK({
  region: 'af-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  endpoints: {
    forecasting: process.env.ONA_FORECASTING_ENDPOINT || 'https://forecasting.api.asoba.co'
  }
});

// Device-level forecast
const deviceForecast = await sdk.forecasting.getDeviceForecast({
  site_id: 'Sibaya',
  device_id: 'INV001',
  forecast_hours: 24
});
console.log(`Device: ${deviceForecast.device_id} at site ${deviceForecast.site_id}`);
console.log(`Model type: ${deviceForecast.model_info.model_type}`);
console.log(`Generated at: ${deviceForecast.generated_at}`);

deviceForecast.forecasts.slice(0, 5).forEach(point => {
  console.log(`  ${point.timestamp}: ${point.kWh_forecast?.toFixed(2)} kWh (${point.hour_ahead}h ahead)`);
});

// Site-level forecast (aggregated)
const siteForecast = await sdk.forecasting.getSiteForecast({
  site_id: 'Sibaya',
  forecast_hours: 48,
  include_device_breakdown: true
});
console.log(`Site: ${siteForecast.site_id}`);
console.log(`Devices included: ${siteForecast.device_count}`);
console.log(`Aggregation method: ${siteForecast.model_info.aggregation_method}`);

siteForecast.forecasts.slice(0, 5).forEach(point => {
  console.log(`  ${point.timestamp}: ${point.kWh_forecast?.toFixed(2)} kWh (${point.hour_ahead}h ahead)`);
});

// Calculate peak forecast
const peakForecast = siteForecast.forecasts.reduce((max, point) => {
  return (point.kWh_forecast || 0) > (max.kWh_forecast || 0) ? point : max;
});
console.log(`Peak forecast: ${peakForecast.kWh_forecast?.toFixed(2)} kWh at ${peakForecast.timestamp}`);

// Customer-level forecast (legacy)
const customerForecast = await sdk.forecasting.getCustomerForecast({
  customer_id: 'customer123',
  forecast_hours: 24
});
console.log(`Customer: ${customerForecast.customer_id}`);
console.log(`Model type: ${customerForecast.model_info.model_type}`);

// Calculate total energy forecast
const totalEnergy = customerForecast.forecasts.reduce((sum, point) => {
  return sum + (point.kWh_forecast || 0);
}, 0);
console.log(`Total forecasted energy (24h): ${totalEnergy.toFixed(2)} kWh`);
console.log(`Average hourly generation: ${(totalEnergy / 24).toFixed(2)} kWh`);
```

---

## Interpreting Forecast Output

Each forecast response contains a `forecasts` array with hourly prediction points:

```json
{
  "timestamp": "2025-11-01T13:00:00",
  "kWh_forecast": 1450.8,
  "hour_ahead": 1,
  "confidence": 0.92
}
```

| Field | Description |
|-------|-------------|
| `timestamp` | ISO timestamp for the forecast interval |
| `kWh_forecast` | Predicted energy output in kWh |
| `hour_ahead` | Hours from generation time |
| `confidence` | Model confidence score (0–1) |

The `model_info` object provides metadata about the model used:

```json
{
  "model_type": "lstm",
  "aggregation_method": "sum",
  "customer_validation_loss": 0.0034
}
```

---

## Method Reference

| Python | JavaScript | Description |
|--------|------------|-------------|
| `get_device_forecast()` | `getDeviceForecast()` | Forecast for a specific device |
| `get_site_forecast()` | `getSiteForecast()` | Aggregated site-level forecast |
| `get_customer_forecast()` | `getCustomerForecast()` | Legacy customer-level forecast |

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `site_id` | string | required | Site identifier |
| `device_id` | string | required (device) | Device identifier |
| `customer_id` | string | required (customer) | Customer identifier (UUID or legacy) |
| `forecast_hours` | int | 24 | Number of hours to forecast |
| `include_device_breakdown` | bool | False | Include individual device forecasts (site only) |

---

## Full Example

- [Python](https://github.com/AsobaCloud/sdk/blob/main/python/examples/forecasting_example.py)
- [JavaScript](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/forecasting-example.js)
