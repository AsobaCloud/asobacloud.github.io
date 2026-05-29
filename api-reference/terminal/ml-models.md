---
title: "ML Models"
layout: default
nav_order: 7
parent: "Terminal API"
grand_parent: "Reference"
---
# Terminal API: ML Model Registry

Retrieve the shared catalog of all available ML models. This endpoint provides metadata about trained models including performance metrics, training parameters, and artifact locations.

## Endpoint

```
POST https://api.asoba.org/terminal/ml-models
```

## Request Body

The request body is optional. To list all models:

```json
{}
```

Or to filter by customer:

```json
{
  "customer_id": "demo-customer"
}
```

## Request Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customer_id` | string | No | Filter results by customer ID |

## Response Format

The response schema is defined in `TerminalMLModelsResponse.json`.

### Successful Response

```json
{
  "success": true,
  "model_metrics": [
    {
      "model_name": "customer_validation_lstm",
      "model_version": "v1.2.0",
      "model_type": "forecasting",
      "status": "production",
      "last_trained_at": "2025-01-23T12:00:00Z",
      "training_data_window": {
        "start": "2024-01-01T00:00:00Z",
        "end": "2024-12-31T23:59:59Z"
      },
      "hyperparameters": {
        "layers": [256, 256, 128],
        "learning_rate": 0.0005,
        "dropout": 0.3,
        "optimizer": "adam"
      },
      "training_metrics": {
        "epochs": 18,
        "train_loss": 0.0234,
        "validation_loss": 0.0289,
        "early_stop_epoch": 18
      },
      "artifact_locations": {
        "model": "s3://sa-api-client-output/customer_tailored/demo-customer/models/customer_validation_model_demo-customer_20250123_120000.h5",
        "encoders": "s3://sa-api-client-output/customer_tailored/demo-customer/models/customer_validation_encoders_demo-customer_20250123_120000.pkl",
        "config": "s3://sa-api-client-output/customer_tailored/demo-customer/models/validation_model_config_20250123_120000.json"
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
| `model_metrics` | array | Array of model metadata objects |
| `model_metrics[].model_name` | string | Name of the model |
| `model_metrics[].model_version` | string | Version identifier |
| `model_metrics[].model_type` | string | Type of model (e.g., "forecasting", "interpolation", "diagnostics") |
| `model_metrics[].status` | string | Model status ("production", "challenger", "archived") |
| `model_metrics[].last_trained_at` | string (ISO 8601) | When the model was last trained |
| `model_metrics[].training_data_window` | object | Time range of training data |
| `model_metrics[].training_data_window.start` | string (ISO 8601) | Start timestamp |
| `model_metrics[].training_data_window.end` | string (ISO 8601) | End timestamp |
| `model_metrics[].hyperparameters` | object | Model hyperparameters |
| `model_metrics[].hyperparameters.layers` | array | LSTM layer sizes |
| `model_metrics[].hyperparameters.learning_rate` | number | Learning rate used |
| `model_metrics[].hyperparameters.dropout` | number | Dropout rate |
| `model_metrics[].hyperparameters.optimizer` | string | Optimizer used |
| `model_metrics[].training_metrics` | object | Training performance metrics |
| `model_metrics[].training_metrics.epochs` | integer | Number of epochs trained |
| `model_metrics[].training_metrics.train_loss` | number | Final training loss |
| `model_metrics[].training_metrics.validation_loss` | number | Final validation loss |
| `model_metrics[].training_metrics.early_stop_epoch` | integer | Epoch where early stopping occurred |
| `model_metrics[].artifact_locations` | object | S3 locations of model artifacts |
| `model_metrics[].artifact_locations.model` | string (URI) | Model file location |
| `model_metrics[].artifact_locations.encoders` | string (URI) | Encoder file location |
| `model_metrics[].artifact_locations.config` | string (URI) | Config file location |
| `count` | integer | Number of models returned |

## cURL Example

```bash
curl -X POST https://api.asoba.org/terminal/ml-models \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |
| `500 Internal Server Error` | `Failed to retrieve model registry` | Server error occurred |

## Model Types

- **Forecasting**: LSTM models for energy production forecasting
- **Interpolation**: Models for filling missing data gaps
- **Diagnostics**: Models for fault detection and root cause analysis

## Model Status

- **Production**: Currently active and used for predictions
- **Challenger**: New model being evaluated against production
- **Archived**: Historical model no longer in use

## Use Cases

- **Model Monitoring**: Track model versions and performance over time
- **A/B Testing**: Compare challenger models against production
- **Audit Trail**: Maintain records of model training and deployment
- **Debugging**: Inspect model configurations and training parameters

## See Also

- [Terminal API Overview](./overview) - Complete API reference
- [Forecast Results](./forecast) - Retrieve forecast predictions
- [Technical Concepts](../../technical-concepts/machine-learning/overview) - ML model details
