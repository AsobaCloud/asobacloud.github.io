# API Reference Overview

This section provides a detailed, parameter-level reference for all public APIs of the Ona Intelligence Layer. It is designed for **Developers** who are building applications on top of our platform.

## What You Can Find Here

*   **[Authentication](./authentication.md)**: Learn how to authenticate your requests to the API.
*   **[Freemium Forecasting API](./freemium-forecasting-api.md)**: A detailed breakdown of the endpoint for generating forecasts from a CSV file.

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
