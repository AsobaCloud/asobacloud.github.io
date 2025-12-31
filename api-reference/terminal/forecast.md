---
layout: default
---
# Terminal API: Forecast Results

Retrieve stored ML forecast results for your sites. This endpoint provides access to previously generated forecasts with detailed metrics and confidence intervals.

## Endpoint

```
POST https://api.asoba.co/terminal/forecast
```

## Request Body

The request body schema is defined in `TerminalForecastRequest.json`.

```json
{
  "customer_id": "demo-customer"
}
```

## Request Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customer_id` | string | Yes | The identifier for the customer |

## Response Format

The response schema is defined in `TerminalForecastResponse.json`.

### Successful Response

```json
{
  "success": true,
  "customer_id": "demo-customer",
  "forecast_results": [
    {
      "forecast_id": "fc_20250123_120000",
      "site_id": "Sibaya",
      "generated_at": "2025-01-23T12:00:00Z",
      "model_name": "customer_validation_lstm",
      "model_version": "v1.2.0",
      "horizon_hours": 48,
      "forecast_points": [
        {
          "timestamp": "2025-01-23T13:00:00Z",
          "hour_ahead": 1,
          "predicted_power_kw": 1250.5,
          "lower_conf_kw": 1100.2,
          "upper_conf_kw": 1400.8
        },
        {
          "timestamp": "2025-01-23T14:00:00Z",
          "hour_ahead": 2,
          "predicted_power_kw": 1850.3,
          "lower_conf_kw": 1650.1,
          "upper_conf_kw": 2050.5
        }
      ],
      "metrics": {
        "training_rmse": 0.0234,
        "validation_rmse": 0.0289,
        "mape_percent": 5.2,
        "smape_percent": 5.1
      },
      "weather_context": {
        "avg_temperature_c": 25.5,
        "avg_irradiance_wm2": 850.0,
        "avg_wind_speed_ms": 3.2
      }
    }
  ],
  "count": 1
}
```

## Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether the request was successful |
| `customer_id` | string | The customer identifier |
| `forecast_results` | array | Array of forecast result objects |
| `forecast_results[].forecast_id` | string | Unique identifier for the forecast |
| `forecast_results[].site_id` | string | Site identifier |
| `forecast_results[].generated_at` | string (ISO 8601) | When the forecast was generated |
| `forecast_results[].model_name` | string | Name of the ML model used |
| `forecast_results[].model_version` | string | Version of the model |
| `forecast_results[].horizon_hours` | integer | Forecast horizon in hours |
| `forecast_results[].forecast_points` | array | Array of forecast data points |
| `forecast_results[].forecast_points[].timestamp` | string (ISO 8601) | Timestamp for the forecast point |
| `forecast_results[].forecast_points[].hour_ahead` | integer | Hours ahead from generation time |
| `forecast_results[].forecast_points[].predicted_power_kw` | number | Predicted power in kilowatts |
| `forecast_results[].forecast_points[].lower_conf_kw` | number | Lower confidence bound |
| `forecast_results[].forecast_points[].upper_conf_kw` | number | Upper confidence bound |
| `forecast_results[].metrics` | object | Model performance metrics |
| `forecast_results[].metrics.training_rmse` | number | Training root mean square error |
| `forecast_results[].metrics.validation_rmse` | number | Validation RMSE |
| `forecast_results[].metrics.mape_percent` | number | Mean absolute percentage error |
| `forecast_results[].metrics.smape_percent` | number | Symmetric MAPE |
| `forecast_results[].weather_context` | object | Weather conditions during forecast period |
| `forecast_results[].weather_context.avg_temperature_c` | number | Average temperature in Celsius |
| `forecast_results[].weather_context.avg_irradiance_wm2` | number | Average irradiance in W/m² |
| `forecast_results[].weather_context.avg_wind_speed_ms` | number | Average wind speed in m/s |
| `count` | integer | Number of forecast results returned |

## cURL Example

```bash
curl -X POST https://api.asoba.co/terminal/forecast \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "demo-customer"
  }'
```

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `Missing required field: customer_id` | Customer ID was not provided |
| `404 Not Found` | `No forecast results found` | No forecasts exist for this customer |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |

## Use Cases

- **Portfolio Monitoring**: Retrieve forecasts for all sites in your portfolio
- **Performance Analysis**: Compare forecast accuracy metrics across sites
- **Energy Trading**: Use forecast data for trading decisions
- **Maintenance Planning**: Plan maintenance windows based on forecasted production

## See Also

- [Terminal API Overview](./overview.md) - Complete API reference
- [Forecasting API](../forecasting/overview.md) - Generate new forecasts
- [ML Model Registry](./ml-models.md) - View available models
- [Forecasting Guides](../../guides/forecasting/overview.md) - How-to guides
