---
layout: default
---
# Forecasting API Overview

This section provides complete documentation for all forecasting-related API endpoints. Our forecasting APIs enable you to generate accurate energy forecasts for renewable energy assets, supporting use cases from energy trading to maintenance planning.

Our APIs follow RESTful conventions and return JSON responses. All endpoints require authentication via API keys, and we provide comprehensive request/response examples for each endpoint. Whether you're using our freemium API for testing or the full forecasting API for production, this documentation covers everything you need.

## Quick Start

To generate your first forecast, see the [Get Started](../../get-started) guide. This tutorial walks you through making your first API call using our freemium endpoint.

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My First Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

## Endpoints

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>Generate Forecast</h3>
    <p>Generate forecasts using trained ML models with the full forecasting API. This endpoint supports customer-specific models, custom forecast horizons, and advanced parameters. Uses the `ForecastResponse.json` schema for structured responses.</p>
    <a href="./forecast" class="card-link">View Endpoint →</a>
  </div>
  
  <div class="overview-card">
    <h3>Freemium Forecast</h3>
    <p>Generate a 24-hour forecast from a CSV file using our free tier API. Perfect for testing and evaluation, this endpoint requires no authentication and provides immediate results. Ideal for quick prototyping and initial assessments.</p>
    <a href="./freemium-forecast" class="card-link">View Endpoint →</a>
  </div>
  
  <div class="overview-card">
    <h3>Authentication</h3>
    <p>Learn how to authenticate API requests using API keys and tokens. This guide covers key management, request signing, and security best practices. Required for all production endpoints.</p>
    <a href="../authentication" class="card-link">View Guide →</a>
  </div>
</div>

## API Design Principles

Our forecasting APIs follow standard RESTful conventions:

- **HTTP Methods**: All requests use `POST` method for forecast generation
- **Response Format**: Responses are returned in JSON format with consistent structure
- **Status Codes**: Standard HTTP status codes indicate success (200) or errors (400, 401, 500)
- **Error Handling**: Comprehensive error responses with descriptive messages
- **Examples**: Complete request/response examples provided for each endpoint

## Request Structure

All forecasting API requests follow a consistent structure:

- **Headers**: Include `Content-Type` and authentication headers
- **Body**: JSON payload for full API, multipart/form-data for freemium API
- **Parameters**: Site identifiers, forecast horizons, and optional parameters
- **Authentication**: API keys required for production endpoints

## Response Structure

Forecast responses include:

- **Forecast Data**: Hourly predictions with timestamps and values
- **Metadata**: Site information, model type, generation timestamp
- **Summary Statistics**: Total energy, peak hours, average values
- **Confidence Intervals**: Uncertainty estimates for predictions

## Popular Endpoints

These endpoints are most frequently used:

- **[Freemium Forecast](./freemium-forecast)**: Quick testing and evaluation
- **[Generate Forecast](./forecast)**: Production forecasting with custom models
- **[Authentication](../authentication)**: API key management

## Next Steps

Now that you understand the forecasting APIs:

1. **Try Freemium API**: Start with [Freemium Forecast](./freemium-forecast) for quick testing
2. **Set Up Authentication**: Review [Authentication](../authentication) for API keys
3. **Generate Forecasts**: Use [Generate Forecast](./forecast) for production use
4. **Explore Guides**: Check [Forecasting Guides](../../guides/forecasting/overview) for best practices
5. **Review Technical Details**: Learn about [ML Models](../../technical-concepts/machine-learning/forecasting-models)

## See Also

- [Get Started](../../get-started) - Quick start tutorial
- [Forecasting Guides](../../guides/forecasting/overview) - How-to guides for forecasting
- [Technical Concepts](../../technical-concepts/machine-learning/forecasting-models) - ML model details
- [API Reference Overview](../overview) - Complete API documentation index
