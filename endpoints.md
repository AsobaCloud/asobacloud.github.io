---
title: "API Endpoints"
layout: default
nav_order: 2
---

## API Endpoints Documentation

This guide details the APIs available in the Ona ecosystem, including their base URLs, endpoints, request parameters, and response structures. The API system dynamically routes requests to the appropriate regional endpoint based on a `region` query parameter, processed via CloudFront and Lambda\@Edge.

---

## **Introduction to API Routing**

### **Base URL for Users**

```
https://ona.asoba.co
```

Users interact with a single global base URL, `https://ona.asoba.co`. Requests include a `region` query parameter, which dynamically routes traffic to the correct regional API Gateway endpoint. The `region` parameter is based on the continent in which the device resides. For example, uploading data from a smart meter or inverter located in Lagos, Nigeria would use the "africa" region, while a device based in New York City, New York would use the "northamerica" region.

This ensures:

- **Low Latency**: Requests are processed in the nearest region.
- **Data Sovereignty**: Compliance with regional regulations by routing traffic to region-specific infrastructures.

### **How Routing Works**

1. **Request**: Users send API calls to `https://ona.asoba.co` with the `region` query parameter (e.g., `?region=africa`).
2. **Lambda\@Edge**: Processes the `region` parameter to determine the appropriate regional endpoint.
3. **Region-Specific API Gateway**: Forwards the request to the correct API Gateway and backend service in the specified region.

### **Supported Regions**

- `africa` (mapped to `af-south-1`):
  - Example Gateway: `https://xkg3s0npv0.execute-api.af-south-1.amazonaws.com/prod`
- `northamerica` (mapped to `us-east-1`):
  - Example Gateway: `https://odq9ixv2y0.execute-api.us-east-1.amazonaws.com/prod`

### **Example Request**

Original:

```
https://ona.asoba.co/upload_nowcast?region=africa&customer_id=1001&filename=test_file.csv&customer_type=prosumer
```

Rewritten by Lambda\@Edge:

```
https://xkg3s0npv0.execute-api.af-south-1.amazonaws.com/prod/upload_nowcast?customer_id=1001&filename=test_file.csv&customer_type=prosumer
```

---

## **1. ingestHistoricalLoadData API**

### **Base URL**

```
https://ona.asoba.co/ingestHistoricalLoadData
```

### \*\*Endpoint: POST \*\***`/upload_historical`**

**Description**: Uploads historical load or production data to S3 for preprocessing and model training.

**Request**:

- **Query Parameters**:

  - `region` (string, required): Target region for routing (e.g., `africa`, `northamerica`).
  - `filename` (string, required): The name of the file being uploaded. Must be in CSV format for now.
  - `customer_id` (string, required): The unique ID of the customer.
  - `manufacturer` (string, required): Manufacturer of the data source.
  - `location` (string, required): Geographical location of the data source.

- **Headers**:

  - `x-api-key`: API key for authentication.

- **Request Body**:

  - Binary file data.

**Example Request**:

```http
POST /upload_historical?region=africa&filename=data.csv&customer_id=12345&manufacturer=SolarCorp&location=Boston HTTP/1.1
Host: ona.asoba.co
x-api-key: your-api-key
Content-Type: application/octet-stream

(binary file data)
```

**Response**:

- **200 OK**: File uploaded successfully.

  ```json
  {
    "message": "File uploaded successfully. You will receive a notification when model training is complete."
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

## **2. ingestNowcastLoadData API**

### **Base URL**

```
https://ona.asoba.co/ingestNowcastLoadData
```

### \*\*Endpoint: POST \*\***`/upload_nowcast`**

**Description**: Uploads nowcast data for real-time forecasting workflows.

**Request**:

- **Query Parameters**:

  - `region` (string, required): Target region for routing (e.g., `africa`, `northamerica`).
  - `customer_id` (string, required): The unique ID of the customer.
  - `customer_type` (string, required): Type of customer (e.g., `residential`, `commercial`).
  - `filename` (string, required): The name of the file being uploaded. Must be in CSV format for now.

- **Headers**:

  - `x-api-key`: API key for authentication.
  - `Content-Type`: `application/json`.

- **Request Body**:

  ```json
  {
    "parameters": {
      "forecast_window": 24,
      "additional_info": "optional data"
    }
  }
  ```

**Example Request**:

```http
POST /upload_nowcast?region=northamerica&customer_id=67890&customer_type=residential&filename=file.csv HTTP/1.1
Host: ona.asoba.co
x-api-key: your-api-key
Content-Type: application/json

{
  "parameters": {
    "forecast_window": 24,
    "additional_info": "optional data"
  }
}
```

**Response**:

- **200 OK**: Data uploaded successfully.

  ```json
  {
    "status": "success",
    "message": "Nowcast data uploaded successfully."
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

## **3. interpolateData API**

### **Base URL**

```
https://ona.asoba.co/dataInterpolation
```

### \*\*Endpoint: POST \*\***`/interpolate`**

**Description**: Fills missing data using advanced machine learning models like LightGBM and LSTM.

**Request**:

- **Query Parameters**:

  - `region` (string, required): Target region for routing (e.g., `africa`, `northamerica`).
  - `customer_id` (string, required): Unique ID of the customer.
  - `serial_number` (string, required): Serial number of the data source.
  - `location` (string, required): Geographical location of the data source.
  - `filename` (string, required): Name of the input data file. Must be in CSV format.
  - `type` (string, required): Data type (e.g., solar).
  - `date_start` (string, required): Start date for interpolation.
  - `date_end` (string, required): End date for interpolation.
  - `interpolation_mode` (string, required): Mode of interpolation (e.g., `lightgbm`, `lstm`).

- **Headers**:

  - `Content-Type`: `application/json`.

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

```http
POST /interpolate?region=africa&customer_id=45678&serial_number=SN567&location=Denver&filename=data.csv&type=solar&date_start=2024-01-01&date_end=2024-01-31&interpolation_mode=lightgbm HTTP/1.1
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

## **Additional API Details**

### **Authentication**

- API keys are generated by the Asoba team and rotated every 6 months.
- Users must include the `x-api-key` header in all requests.

### **Rate Limits**

- **Rate**: 1 request per second.
- **Burst**: 10 requests.
- **Quota**: 100 requests per day.
- Users exceeding these limits will receive a `429 Too Many Requests` error.

### **Environment-Specific Notes**

- **Production**: `prod` Endpoints for live usage by clients.
- **Test**: `test` Internal staging environment used for validation and pre-release testing.

### **Versioning**

- APIs follow semantic versioning:
  - Bug fixes increment the last digit: `X.X.5`.
  - Minor updates increment the middle digit: `X.1.X`.
  - Major updates increment the first digit: `1.X.X`.
- Currently, only the latest version is exposed to users.

### **CloudFront Logs**

- Logs for all API requests are stored in the `ona-cloudfront-logs` S3 bucket.
- Available upon request from the Asoba team.

---

## **Error Handling**

### **Common Error Codes and Resolutions**

| **HTTP Code** | **Error**                | **Cause**                      | **Resolution**                                              |
| ------------- | ------------------------ | ------------------------------ | ----------------------------------------------------------- |
| 400           | Invalid query parameters | Missing or invalid parameters  | Verify that all required parameters are included and valid. |
| 401           | Unauthorized             | API key missing or invalid     | Ensure the correct `x-api-key` is included.                 |
| 429           | Too Many Requests        | Rate limit exceeded            | Reduce request rate and retry after some time.              |
| 500           | Internal Server Error    | System error during processing | Retry the request or contact support.                       |

### **Request Validation**

- Ensure that:
  - `region` is valid (`africa`, `northamerica`).
  - `filename` ends with `.csv`.
  - All required query parameters are provided.

---

## **FAQ**

1. **What happens if the ************************`region`************************ parameter is omitted?**

   - The request will fail with a `400 Bad Request` error.

2. **How do I handle expired API keys?**

   - Contact the Asoba team for a new API key.

3. **Is there a size limit for uploads?**

   - Yes, the maximum file size is currently 10 MB.

4. **Can I upload multiple files at once?**

   - No, only one file can be uploaded per request.

---

## **Workflow Examples**

### Example Workflow: Forecast Generation Using Patchy Historical Data

1. **Interpolate Missing Data**:

   - Use the `/interpolate` endpoint to process the uploaded historical data file and fill in missing blocks. This generates a pre-processed training dataset.
   - Output: `s3://api-client-output/<customer_id>/data/<date>_historical_preprocessed.csv`

2. **Kick Off Model Training**:

   - Use the `/upload_historical` endpoint with the interpolated dataset to initiate model training. Model training takes approximately 30 minutes to 1 hour.
   - Output: `s3://api-client-output/<customer_id>/training_output/<date timestamp>/<training files>`

3. **Generate Forecasts**:

   - Use the `/upload_nowcast` endpoint with interval data from the last 7 days to run inference on the trained model and generate forecasts.  Forecasts generation takes approximately 60 to 90 seconds, but often less than that.
   - Output: `s3://api-client-output/<customer_id>/<forecast_output>/<date timestamp>/<forecast files>`

4. **Retrieve Outputs**:

   - Download pre-processed training data, model training outputs, and forecasts from the respective S3 buckets.

### **Additional Notes**

Contact the Asoba team if additional data integration workflows are required, such as:

- Automated pushes aligned with trading or service workflows.
- Advanced data engineering or governance solutions.
- Direct integration of outputs within existing user-facing product or service

---

## **Contact Information for Support**

For additional support, please contact the Asoba team at `support@asoba.co` or through the API management portal.

