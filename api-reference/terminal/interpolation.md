---
layout: default
---
# Terminal API: Interpolation Results

Retrieve stored interpolation (gap-filling) results for your sites. This endpoint provides access to ML-powered data interpolation that fills missing data gaps in your time series.

## Endpoint

```
POST https://api.asoba.co/terminal/interpolation
```

## Request Body

The request body schema is defined in `TerminalInterpolationRequest.json`.

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

The response schema is defined in `TerminalInterpolationResponse.json`.

### Successful Response

```json
{
  "success": true,
  "customer_id": "demo-customer",
  "interpolation_results": [
    {
      "result_id": "interp_20250123_120000",
      "site_id": "Sibaya",
      "processed_at": "2025-01-23T12:00:00Z",
      "method": "adaptive_lstm",
      "asset_ids": ["INV-001", "INV-002"],
      "data_window": {
        "start": "2025-01-01T00:00:00Z",
        "end": "2025-01-23T23:59:59Z"
      },
      "gap_statistics": {
        "total_gaps": 12,
        "average_gap_minutes": 45.5,
        "largest_gap_minutes": 180.0,
        "coverage_improvement_percent": 15.2
      },
      "performance_metrics": {
        "rmse_kw": 2.34,
        "mae_kw": 1.89,
        "r2_score": 0.99,
        "nrmse_percent": 1.2
      },
      "weather_features": {
        "mean_temperature_c": 25.5,
        "mean_irradiance_wm2": 850.0
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
| `interpolation_results` | array | Array of interpolation result objects |
| `interpolation_results[].result_id` | string | Unique identifier for the result |
| `interpolation_results[].site_id` | string | Site identifier |
| `interpolation_results[].processed_at` | string (ISO 8601) | When the interpolation was processed |
| `interpolation_results[].method` | string | Interpolation method used (e.g., "adaptive_lstm", "linear", "spline") |
| `interpolation_results[].asset_ids` | array | List of asset IDs that were interpolated |
| `interpolation_results[].data_window` | object | Time range of the interpolated data |
| `interpolation_results[].data_window.start` | string (ISO 8601) | Start timestamp |
| `interpolation_results[].data_window.end` | string (ISO 8601) | End timestamp |
| `interpolation_results[].gap_statistics` | object | Statistics about gaps that were filled |
| `interpolation_results[].gap_statistics.total_gaps` | integer | Total number of gaps identified |
| `interpolation_results[].gap_statistics.average_gap_minutes` | number | Average gap duration in minutes |
| `interpolation_results[].gap_statistics.largest_gap_minutes` | number | Largest gap duration in minutes |
| `interpolation_results[].gap_statistics.coverage_improvement_percent` | number | Percentage improvement in data coverage |
| `interpolation_results[].performance_metrics` | object | Model performance metrics |
| `interpolation_results[].performance_metrics.rmse_kw` | number | Root mean square error in kilowatts |
| `interpolation_results[].performance_metrics.mae_kw` | number | Mean absolute error in kilowatts |
| `interpolation_results[].performance_metrics.r2_score` | number | R² score (0-1, higher is better) |
| `interpolation_results[].performance_metrics.nrmse_percent` | number | Normalized RMSE as percentage |
| `interpolation_results[].weather_features` | object | Weather conditions during interpolation |
| `interpolation_results[].weather_features.mean_temperature_c` | number | Mean temperature in Celsius |
| `interpolation_results[].weather_features.mean_irradiance_wm2` | number | Mean irradiance in W/m² |
| `count` | integer | Number of results returned |

## cURL Example

```bash
curl -X POST https://api.asoba.co/terminal/interpolation \
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
| `404 Not Found` | `No interpolation results found` | No results exist for this customer |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |

## Interpolation Methods

The service uses ML-powered interpolation methods that adapt to your data patterns:

- **Adaptive LSTM**: Deep learning model that learns patterns from historical data (R² > 0.99)
- **Linear Interpolation**: Simple linear interpolation for short gaps
- **Spline Interpolation**: Smooth curve fitting for medium gaps
- **Weather-Aware**: Incorporates weather data to improve accuracy

## Use Cases

- **Data Quality Improvement**: Fill missing data gaps to improve forecast accuracy
- **Compliance Reporting**: Ensure complete time series for regulatory reporting
- **Performance Analysis**: Analyze performance metrics without data gaps
- **Training Data Preparation**: Prepare complete datasets for ML model training

## See Also

- [Terminal API Overview](./overview.md) - Complete API reference
- [Data Management Guides](../../guides/data-management/overview.md) - How-to guides for data preparation
- [Technical Concepts](../../technical-concepts/data-standardization.md) - Data standardization details
