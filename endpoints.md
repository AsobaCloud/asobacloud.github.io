---
title: "API Endpoints"
layout: default
nav_order: 2
---

## API Endpoints

This guide details each of the API's available in the Ona ecosystem, along with their various endpoints, request parameters, and response structures.

## ingestHistoricalLoadData API

### Context
This REST API is used for ingesting historical data to train models for forecasting.

### Base URL
```
https://ona.asoba.co/ingestHistoricalLoadData
```

### Endpoints

#### POST `/upload_historical`

**Description**: Allows for uploading historical data to the system.

**Request**:

- **Query Parameters**:
  - `customer_id` (int, required): The unique ID of the customer.
  - `serial_number` (string, required): Serial number of the data source.
  - `location` (string, required): Geographical location of the data source.
  - `filename` (string, required): The name of the file being uploaded.
  - `type` (string, required): Data type (e.g., solar).

- **Headers**:
  - `Content-Type`: `application/json`

**Example Request**:
```
POST /upload_historical?customer_id=12345&serial_number=SN123&location=Lagos&filename=data.csv&type=solar HTTP/1.1
Host: ona.asoba.co
Content-Type: application/json

{
  "additional_data": "optional data if required"
}
```

**Response**:

- **200 OK**: Data was successfully uploaded.
  ```json
  {
    "status": "success",
    "message": "Data uploaded successfully."
  }
  ```

- **400 Bad Request**: Missing or invalid parameters.
  ```json
  {
    "error": "Invalid or missing query parameter."
  }
  ```

- **500 Internal Server Error**: An unexpected error occurred.
  ```json
  {
    "error": "Internal server error."
  }
  ```

---

## ingestNowcastLoadData API

### Context
This REST API is used to ingest nowcast data to generate forecasts.

### Base URL
```
https://ona.asoba.co/ingestNowcastLoadData
```

### Endpoints

#### POST `/upload_nowcast`

**Description**: Allows for uploading nowcast data to the system.

**Request**:

- **Query Parameters**:
  - `customer_id` (int, required): The unique ID of the customer.
  - `serial_number` (string, required): Serial number of the data source.
  - `location` (string, required): Geographical location of the data source.
  - `filename` (string, required): The name of the file being uploaded.
  - `type` (string, required): Data type (e.g., solar).

- **Headers**:
  - `Content-Type`: `application/json`

**Example Request**:
```
POST /upload_nowcast?customer_id=12345&serial_number=SN456&location=NewYork&filename=nowcast_data.csv&type=solar HTTP/1.1
Host: ona.asoba.co
Content-Type: application/json

{
  "additional_data": "optional data if required"
}
```

**Response**:

- **200 OK**: Data was successfully uploaded.
  ```json
  {
    "status": "success",
    "message": "Data uploaded successfully."
  }
  ```

- **400 Bad Request**: Missing or invalid parameters.
  ```json
  {
    "error": "Invalid or missing query parameter."
  }
  ```

- **500 Internal Server Error**: An unexpected error occurred.
  ```json
  {
    "error": "Internal server error."
  }
  ```

---

## interpolateData API

### Context
This REST API is used for data interpolation, leveraging machine learning models like LightGBM and LSTM.

### Base URL
```
https://ona.asoba.co/dataInterpolation
```

### Endpoints

#### POST `/interpolate`

**Description**: Fills missing production data using advanced machine learning and time-series models.

**Request**:

- **Query Parameters**:
  - `customer_id` (int, required): Unique ID of the customer.
  - `serial_number` (string, required): Serial number of the data source.
  - `location` (string, required): Geographical location of the data source.
  - `filename` (string, required): Name of the input data file.
  - `type` (string, required): Data type (e.g., solar).
  - `date_start` (string, required): Start date for interpolation.
  - `date_end` (string, required): End date for interpolation.
  - `interpolation_mode` (string, required): Mode of interpolation (e.g., `lightgbm`, `lightgbm_lstm`).
  - `api_key` (string, required): API key for authentication.

- **Headers**:
  - `Content-Type`: application/json

- **Request Body**:
  ```json
  {
    "parameters": {
      "time_window": 24,
      "refinement": true
    }
  }
  ```

**Example Request**:
```
POST /interpolate?customer_id=67890&serial_number=SN789&location=Chicago&filename=missing_data.csv&type=solar&date_start=2024-07-01&date_end=2024-07-31&interpolation_mode=lightgbm_lstm&api_key=xyz123 HTTP/1.1
Host: ona.asoba.co
Content-Type: application/json

{
  "parameters": {
    "time_window": 24,
    "refinement": true
  }
}
```

**Response**:

- **200 OK**: Data interpolated successfully.
  ```json
  {
    "status": "success",
    "message": "Data interpolated successfully.",
    "output_file": "interpolated_data.csv"
  }
  ```

- **400 Bad Request**: Missing or invalid parameters.
  ```json
  {
    "error": "Invalid query or body parameters."
  }
  ```

- **500 Internal Server Error**: An unexpected error occurred.
  ```json
  {
    "error": "Internal server error."
  }
  ```

---
