---
layout: default
nav_exclude: true
---
# API Reference Overview

This section provides a detailed, parameter-level reference for all public APIs of the Ona Intelligence Layer. It is designed for **Developers** who are building applications on top of our platform.

## SDK (Recommended)

The fastest way to use these APIs is through the Ona SDK, which handles authentication, retries, cursor pagination, and streaming for you.

**Install:**
```bash
# Python
git clone https://github.com/AsobaCloud/sdk.git && cd sdk/python && pip3 install -e .

# JavaScript
git clone https://github.com/AsobaCloud/sdk.git && cd sdk/javascript && npm install
```

**Live APIs available now:**

| API | SDK client | Endpoint |
|-----|-----------|----------|
| Inverter Telemetry | `client.inverter_telemetry` / `sdk.inverterTelemetry` | `https://af5jy5ob3e.execute-api.af-south-1.amazonaws.com/prod` |
| OODA Terminal Alerts | `client.ooda_terminal` / `sdk.oodaTerminal` | `https://3lpq00xevg.execute-api.af-south-1.amazonaws.com/prod` |
| Partner API | `client.partner_api` / `sdk.partnerApi` | `https://<endpoint>.execute-api.af-south-1.amazonaws.com/prod` |

See the [SDK repository](https://github.com/AsobaCloud/sdk) for full examples.

---


## What You Can Find Here

### Authentication & Setup

*   **[Authentication](./authentication)**: Learn how to authenticate your requests to the API.

### Partner API (Snapshots)

*   **[Partner API Overview](./partner/overview)**: High-performance pre-computed JSON snapshots for embedding

### Forecasting APIs

*   **[Forecasting API](./forecasting/overview)**: Generate energy production forecasts
  *   [Freemium Forecast](./forecasting/freemium-forecast): Generate a 24-hour forecast from a CSV file (free tier)

### Terminal API (OODA Workflow)

The Terminal API provides endpoints for the complete OODA (Observe-Orient-Decide-Act) workflow:

*   **[Terminal API Overview](./terminal/overview)**: Complete reference for OODA workflow APIs
  *   **[Asset Management](./terminal/assets)**: Create, list, and retrieve solar assets
  *   **[Fault Detection](./terminal/detect)**: Run fault detection on assets (Observe)
  *   **[AI Diagnostics](./terminal/diagnose)**: Execute AI diagnostics on faults (Orient)
  *   **[Maintenance Scheduling](./terminal/schedule)**: Create maintenance schedules (Decide)
  *   **[Bill of Materials](./terminal/bom)**: Generate BOMs for maintenance
  *   **[Work Orders](./terminal/order)**: Create and manage work orders (Act)
  *   **[Job Tracking](./terminal/track)**: Subscribe to job status updates

### ML Integration APIs

*   **[Forecast Results](./terminal/forecast)**: Retrieve stored ML forecast results
*   **[Interpolation Results](./terminal/interpolation)**: Retrieve gap-filling interpolation results
*   **[ML Model Registry](./terminal/ml-models)**: Access catalog of available ML models
*   **[OODA Summaries](./terminal/ooda)**: Retrieve ML-enhanced OODA summaries with severity and energy-at-risk

### Data Ingestion APIs

*   **[Data Ingestion API Overview](./data-ingestion/overview)**: Upload historical and real-time data
  *   **[Upload Training Data](./data-ingestion/upload-train)**: Upload historical data for model training
  *   **[Upload Nowcast Data](./data-ingestion/upload-nowcast)**: Upload real-time data for forecasting

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
