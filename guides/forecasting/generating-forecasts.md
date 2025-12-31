# Generating Forecasts

As shown in the [Get Started](../../get-started.md) guide, generating a forecast is as simple as making a `POST` request to the `/api/v1/freemium-forecast` endpoint with your historical data.

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My First Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

The quality of your forecast depends heavily on the quality of the data you provide. See the [Data Management](../data-management/overview.md) guide for more details.

## See Also

- [Get Started](../../get-started.md) - Quick start tutorial
- [Data Management](../data-management/overview.md) - Data preparation guide
- [API Reference](../../api-reference/forecasting/freemium-forecast.md) - Complete API documentation
