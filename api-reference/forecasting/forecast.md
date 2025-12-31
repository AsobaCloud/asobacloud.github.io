# Forecasting API: Generate Forecast

Generate an energy production forecast for a customer and site. This endpoint uses trained ML models to predict future energy production based on historical patterns and weather forecasts.

## Endpoint

```
GET https://api.asoba.co/forecast
```

## Request Parameters

The request uses query parameters. The response schema is defined in `ForecastResponse.json`.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customer_id` | string | Yes | Customer identifier |
| `site_id` | string | No | Specific site identifier (if not provided, returns forecasts for all sites) |
| `horizon_hours` | integer | No | Forecast horizon in hours (default: 48) |

## Request Example

```bash
curl -X GET "https://api.asoba.co/forecast?customer_id=demo-customer&site_id=Sibaya&horizon_hours=48" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Response Format

The response schema is defined in `ForecastResponse.json`.

### Successful Response

```json
{
  "forecast_id": "fc_20250123_120000",
  "customer_id": "demo-customer",
  "site_id": "Sibaya",
  "generated_at": "2025-01-23T12:00:00Z",
  "horizon_hours": 48,
  "forecasts": [
    {
      "timestamp": "2025-01-23T13:00:00Z",
      "predicted_power_kw": 1250.5,
      "confidence_interval": {
        "lower": 1100.2,
        "upper": 1400.8
      },
      "weather_conditions": {
        "temperature_c": 25.5,
        "irradiance_w_m2": 850.0,
        "wind_speed_m_s": 3.2
      }
    },
    {
      "timestamp": "2025-01-23T14:00:00Z",
      "predicted_power_kw": 1850.3,
      "confidence_interval": {
        "lower": 1650.1,
        "upper": 2050.5
      },
      "weather_conditions": {
        "temperature_c": 26.0,
        "irradiance_w_m2": 920.0,
        "wind_speed_m_s": 3.5
      }
    }
  ],
  "metadata": {
    "model_version": "v1.2.0",
    "training_data_points": 8760,
    "model_accuracy": 0.95
  }
}
```

## Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `forecast_id` | string | Unique identifier for the forecast |
| `customer_id` | string | Customer identifier |
| `site_id` | string | Site identifier |
| `generated_at` | string (ISO 8601) | When the forecast was generated |
| `horizon_hours` | integer | Forecast horizon in hours |
| `forecasts` | array | Array of forecast data points |
| `forecasts[].timestamp` | string (ISO 8601) | Timestamp for the forecast point |
| `forecasts[].predicted_power_kw` | number | Predicted power in kilowatts |
| `forecasts[].confidence_interval` | object | Confidence interval bounds |
| `forecasts[].confidence_interval.lower` | number | Lower confidence bound |
| `forecasts[].confidence_interval.upper` | number | Upper confidence bound |
| `forecasts[].weather_conditions` | object | Weather conditions for the forecast point |
| `forecasts[].weather_conditions.temperature_c` | number | Temperature in Celsius |
| `forecasts[].weather_conditions.irradiance_w_m2` | number | Solar irradiance in W/m² |
| `forecasts[].weather_conditions.wind_speed_m_s` | number | Wind speed in m/s |
| `metadata` | object | Model metadata |
| `metadata.model_version` | string | Version of the model used |
| `metadata.training_data_points` | integer | Number of data points used for training |
| `metadata.model_accuracy` | number | Model accuracy score (0-1) |

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `Missing required parameter: customer_id` | Customer ID was not provided |
| `404 Not Found` | `No model found for customer` | No trained model exists for this customer |
| `404 Not Found` | `Site not found` | Site ID does not exist for this customer |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |
| `500 Internal Server Error` | `Forecast generation failed` | Server error during forecast generation |

## Model Requirements

Before generating forecasts, ensure:

1. **Historical Data**: Customer has uploaded sufficient historical data (minimum 6 months)
2. **Model Training**: Model has been trained via the global training service
3. **Real-Time Data**: Recent nowcast data is available (for accurate forecasts)

## Use Cases

- **Energy Trading**: Use forecasts for trading decisions and market participation
- **Grid Integration**: Plan grid interactions based on expected production
- **Maintenance Planning**: Schedule maintenance during low-production periods
- **Performance Monitoring**: Compare actual vs. forecasted production

## See Also

- [Forecasting API Overview](./overview.md) - Complete API reference
- [Freemium Forecast](./freemium-forecast.md) - Free tier CSV-based forecast
- [Terminal API: Forecast Results](../terminal/forecast.md) - Retrieve stored forecast results
- [Forecasting Guides](../../guides/forecasting/overview.md) - How-to guides
- [Technical Concepts](../../technical-concepts/machine-learning/forecasting-models.md) - ML model details
