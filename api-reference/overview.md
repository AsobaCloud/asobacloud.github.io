---
layout: default
---
# API Reference Overview

This section provides a detailed, parameter-level reference for all public APIs of the Ona Intelligence Layer. It is designed for **Developers** who are building applications on top of our platform.

## What You Can Find Here

### Authentication & Setup

*   **[Authentication](./authentication.md)**: Learn how to authenticate your requests to the API.

### Forecasting APIs

*   **[Forecasting API](./forecasting/overview.md)**: Generate energy production forecasts
  *   [Freemium Forecast](./forecasting/freemium-forecast.md): Generate a 24-hour forecast from a CSV file (free tier)

### Terminal API (OODA Workflow)

The Terminal API provides endpoints for the complete OODA (Observe-Orient-Decide-Act) workflow:

*   **[Terminal API Overview](./terminal/overview.md)**: Complete reference for OODA workflow APIs
  *   **[Asset Management](./terminal/assets.md)**: Create, list, and retrieve solar assets
  *   **[Fault Detection](./terminal/detect.md)**: Run fault detection on assets (Observe)
  *   **[AI Diagnostics](./terminal/diagnose.md)**: Execute AI diagnostics on faults (Orient)
  *   **[Maintenance Scheduling](./terminal/schedule.md)**: Create maintenance schedules (Decide)
  *   **[Bill of Materials](./terminal/bom.md)**: Generate BOMs for maintenance
  *   **[Work Orders](./terminal/order.md)**: Create and manage work orders (Act)
  *   **[Job Tracking](./terminal/track.md)**: Subscribe to job status updates

### ML Integration APIs

*   **[Forecast Results](./terminal/forecast.md)**: Retrieve stored ML forecast results
*   **[Interpolation Results](./terminal/interpolation.md)**: Retrieve gap-filling interpolation results
*   **[ML Model Registry](./terminal/ml-models.md)**: Access catalog of available ML models
*   **[OODA Summaries](./terminal/ooda.md)**: Retrieve ML-enhanced OODA summaries with severity and energy-at-risk

### Data Ingestion APIs

*   **[Data Ingestion API Overview](./data-ingestion/overview.md)**: Upload historical and real-time data
  *   **[Upload Training Data](./data-ingestion/upload-train.md)**: Upload historical data for model training
  *   **[Upload Nowcast Data](./data-ingestion/upload-nowcast.md)**: Upload real-time data for forecasting

## API Design Principles

Our APIs are designed to be predictable and intuitive. We follow standard RESTful conventions and use standard HTTP response codes to indicate API errors.

### Request Format

All `POST` requests should be sent with a `Content-Type` of `application/json` or `multipart/form-data`, depending on the endpoint.

### Response Format

All API responses, including errors, are returned in JSON format. A successful response will have a `status` of `"success"`. An error response will have a `status` of `"error"` and include a descriptive `error` message.

**Example Success Response:**
```json
{
  "status": "success",
  "data": { ... }
}
```

**Example Error Response:**
```json
{
  "status": "error",
  "error": "A description of what went wrong."
}
```
