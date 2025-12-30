# Guide: Forecasting

This guide covers the essentials of generating and interpreting forecasts with the Ona Intelligence Layer.

## Generating a Forecast

As shown in the [Get Started](./../get-started.md) guide, generating a forecast is as simple as making a `POST` request to the `/api/v1/freemium-forecast` endpoint with your historical data.

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My First Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

The quality of your forecast depends heavily on the quality of the data you provide. See the [Data Management](./data-management.md) guide for more details.

## Interpreting the Results

The API returns a rich JSON object with your forecast. Let's break down the key components:

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
      // ... array of hourly forecasts
    ],
    "summary": {
      // ... summary metrics
    }
  }
}
```

*   **`model_type`**: This tells you which type of model was used.
    *   `"generic"`: The forecast was generated using our global pre-trained model. This is the default for the freemium endpoint.
    *   `"customer_specific"`: A model that has been fine-tuned on your specific site's data. This provides higher accuracy and is available in our enterprise plans.
*   **`forecasts`**: An array of hourly predictions for the next 24 hours. Each object includes:
    *   `timestamp`: The UTC timestamp for the forecasted hour.
    *   `kWh_forecast`: The predicted energy production in kWh.
    *   `confidence`: A score indicating the model's confidence in this specific prediction.
*   **`summary`**: Key metrics for the 24-hour forecast period, including total production, the peak production hour, and the average hourly production.

## Understanding Forecast Accuracy

Forecast accuracy is influenced by several factors:

*   **Data Quality**: The more clean, high-resolution historical data you provide, the better the forecast.
*   **Weather**: Our models incorporate weather predictions, but unforeseen weather events can impact accuracy.
*   **Model Type**: Customer-specific models will always outperform generic models.

For a deeper dive into the machine learning models we use, see the [Machine Learning Models](./../technical-concepts/machine-learning-models.md) page in our Technical Concepts section.
