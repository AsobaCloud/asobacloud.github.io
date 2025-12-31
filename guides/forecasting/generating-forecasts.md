---
layout: default
---
# Generating Forecasts

As shown in the [Get Started](../../get-started) guide, generating a forecast is as simple as making a `POST` request to the `/api/v1/freemium-forecast` endpoint with your historical data. This guide provides detailed instructions for both the freemium API (for quick testing) and the full forecasting API (for production use).

## Using the Freemium API

The freemium API is perfect for quick testing and evaluation. It requires no authentication and provides immediate results:

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My First Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

**Parameters:**
- `file`: The path to your historical data CSV file
- `email`: Your email address (used to identify your requests)
- `site_name`: A descriptive name for your site
- `location`: The general location of the site (city or region)

## Using the Full Forecasting API

For production use, use the full forecasting API with authentication:

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "site_id": "site_123",
    "forecast_hours": 24,
    "model_type": "customer_specific"
  }' \
  https://api.asoba.co/v1/forecast
```

**Parameters:**
- `site_id`: Your site identifier (from data upload)
- `forecast_hours`: Number of hours to forecast (1-720)
- `model_type`: "generic" or "customer_specific"

## Data Requirements

The quality of your forecast depends heavily on the quality of the data you provide. Key requirements include:

- **Format**: CSV file with timestamp and power/energy columns
- **Resolution**: Hourly or better resolution recommended
- **Coverage**: Complete data with minimal gaps
- **History**: At least 30 days of historical data for best results

See the [Data Management](../data-management/overview) guide for detailed data preparation instructions.

## Response Handling

Successful requests return a JSON response with forecast data:

- **Forecasts**: Array of hourly predictions with timestamps
- **Summary**: Total energy, peak hours, average values
- **Metadata**: Site information, model type, generation timestamp
- **Confidence**: Uncertainty estimates for predictions

## Common Issues

**Missing Data**: Ensure your CSV file includes all required columns (timestamp and power/energy)

**Format Errors**: Verify timestamp format (ISO 8601) and numeric values

**Authentication**: For production API, ensure API key is correctly included in headers

**File Size**: Keep CSV files under 10MB for optimal performance

## Next Steps

After generating your first forecast:

1. **Interpret Results**: Learn how to read forecast output in [Interpreting Results](./interpreting-results)
2. **Improve Accuracy**: Follow tips in [Improving Accuracy](./improving-accuracy)
3. **Prepare Data**: Review [Data Management](../data-management/overview) for best practices
4. **Explore API**: Check [API Reference](../../api-reference/forecasting/overview) for complete documentation

## See Also

- [Get Started](../../get-started) - Quick start tutorial
- [Data Management](../data-management/overview) - Data preparation guide
- [API Reference](../../api-reference/forecasting/freemium-forecast) - Complete API documentation
- [Interpreting Results](./interpreting-results) - Understanding forecast output
