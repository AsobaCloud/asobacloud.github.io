# Uploading Your Data

You can upload your data via the API as shown in the [Get Started](../../get-started.md) guide.

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

The API expects the file as part of a `multipart/form-data` request.

## See Also

- [Preparing Data](./preparing-data.md) - Data format requirements
- [Data Quality](./data-quality.md) - Understanding data standardization
- [API Reference](../../api-reference/forecasting/freemium-forecast.md) - Complete API documentation
