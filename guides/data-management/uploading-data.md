# Uploading Your Data

You can upload your data via the API as shown in the [Get Started](../../get-started.md) guide. This guide provides detailed instructions for uploading both training data (for model training) and nowcast data (for real-time forecasting).

## Upload Methods

We support two types of data uploads:

### Training Data Upload

Training data is used to train customer-specific models. Upload historical data with complete coverage for optimal model performance:

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@/path/to/training_data.csv" \
  -F "site_id=site_123" \
  -F "data_type=training" \
  https://api.asoba.co/v1/data-ingestion/upload-train
```

**Parameters:**
- `file`: CSV file with historical training data
- `site_id`: Your site identifier
- `data_type`: "training" for model training

### Nowcast Data Upload

Nowcast data is used for real-time forecasting. Upload current data to generate immediate forecasts:

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@/path/to/nowcast_data.csv" \
  -F "site_id=site_123" \
  -F "data_type=nowcast" \
  https://api.asoba.co/v1/data-ingestion/upload-nowcast
```

**Parameters:**
- `file`: CSV file with current/recent data
- `site_id`: Your site identifier
- `data_type`: "nowcast" for real-time forecasting

## File Format

The API expects files as part of a `multipart/form-data` request. Your CSV file must include:

- **Timestamp Column**: ISO 8601 format timestamps
- **Power/Energy Column**: Numeric values (kW or kWh)
- **Optional Metadata**: Site name, location, etc.

See [Preparing Data](./preparing-data.md) for detailed format requirements.

## Authentication

All data upload endpoints require authentication via API keys. Include your API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

See [Authentication](../../api-reference/authentication.md) for API key management.

## Response Handling

Successful uploads return a JSON response with:

- **Status**: Upload success confirmation
- **Site ID**: Your site identifier
- **Data Points**: Number of records processed
- **Validation**: Data quality checks performed

## Common Issues

**File Format**: Ensure CSV file matches required format (see [Preparing Data](./preparing-data.md))

**Authentication**: Verify API key is correctly included in headers

**File Size**: Keep files under 10MB for optimal performance

**Data Quality**: Check [Data Quality](./data-quality.md) guide for validation requirements

## Next Steps

After uploading your data:

1. **Prepare Data**: Review [Preparing Data](./preparing-data.md) for format requirements
2. **Check Quality**: Understand [Data Quality](./data-quality.md) validation
3. **Generate Forecasts**: Use [Forecasting Guide](../forecasting/overview.md) to create forecasts
4. **Review API**: Check [Data Ingestion API](../../api-reference/data-ingestion/overview.md) documentation

## See Also

- [Preparing Data](./preparing-data.md) - Data format requirements
- [Data Quality](./data-quality.md) - Understanding data standardization
- [API Reference](../../api-reference/forecasting/freemium-forecast.md) - Complete API documentation
- [Authentication](../../api-reference/authentication.md) - API key management
