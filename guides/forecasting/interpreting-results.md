---
title: "Interpreting Results"
layout: default
nav_order: 8
parent: "Build"
---
# Interpreting Forecast Results

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

## See Also

- [Generating Forecasts](./generating-forecasts) - How to generate forecasts
- [Improving Accuracy](./improving-accuracy) - Tips for better forecast accuracy
- [API Reference](../../api-reference/forecasting/freemium-forecast) - Complete response schema
