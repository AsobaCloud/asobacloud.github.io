---
title: "API Endpoints"
layout: default
nav_order: 2
---

## API Endpoints Documentation

This guide details the APIs available in the Ona ecosystem, including their base URLs, endpoints, request parameters, and response structures. The API system dynamically routes requests to the appropriate regional endpoint based on a `region` query parameter, processed via CloudFront and Lambda\@Edge.

---

## **1. ingestHistoricalLoadData API**

### **Base URL**

```
https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod
```

### **Endpoint: POST** **`/upload_historical`**

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

#### Python
```python
import requests

url = "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/upload_historical"
params = {
    "customer_id": "12345",
    "filename": "data.csv",
    "manufacturer": "exampleCorp",
    "location": "CapeTown",
    "region": "af-south-1"
}
headers = {
    "x-api-key": "your-api-key",
    "Content-Type": "application/octet-stream"
}

with open('data.csv', 'rb') as file_data:
    response = requests.post(url, params=params, headers=headers, data=file_data)
    print(response.status_code, response.json())
```

**Response Example**:

- **200 OK**:

  ```json
  {
    "message": "File uploaded successfully. You will receive a notification when model training is complete.",
    "upload_details": {
      "filename": "data.csv",
      "customer_id": "12345",
      "region": "af-south-1",
      "location": "CapeTown",
      "manufacturer": "exampleCorp"
    }
  }
  ```

- **400 Bad Request**:

  ```json
  {
    "error": "Invalid query or body parameters.",
    "details": {
      "missing_parameters": ["customer_id", "filename"],
      "invalid_parameters": ["region"]
    }
  }
  ```

- **500 Internal Server Error**:

  ```json
  {
    "error": "Internal server error.",
    "trace_id": "abc123xyz",
    "timestamp": "2023-10-01T12:00:00Z"
  }
  ```

---

## **2. ingestNowcastLoadData API**

### **Base URL**

```
https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod
```

### **Endpoint: POST** **`/upload_nowcast`**

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

#### Python
```python
import requests

url = "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/upload_nowcast"
params = {
    "customer_id": "67890",
    "filename": "nowcast.csv",
    "manufacturer": "exampleCorp",
    "region": "af-south-1",
    "customer_type": "residential"
}
headers = {
    "x-api-key": "your-api-key",
    "Content-Type": "application/json"
}
data = {
    "parameters": {
      "forecast_window": 24,
      "additional_info": "optional data"
    }
}

response = requests.post(url, params=params, json=data, headers=headers)
print(response.status_code, response.json())
```

**Response Example**:

- **200 OK**:

  ```json
  {
    "status": "success",
    "message": "Nowcast data uploaded successfully.",
    "upload_details": {
      "filename": "nowcast.csv",
      "customer_id": "67890",
      "region": "af-south-1",
      "customer_type": "residential"
    }
  }
  ```

- **400 Bad Request**:

  ```json
  {
    "error": "Invalid query or body parameters.",
    "details": {
      "missing_parameters": ["customer_type"],
      "invalid_parameters": ["filename"]
    }
  }
  ```

- **500 Internal Server Error**:

  ```json
  {
    "error": "Internal server error.",
    "trace_id": "def456uvw",
    "timestamp": "2023-10-01T12:05:00Z"
  }
  ```

---

## **3. trainForecaster API**

### **Base URL**

```
https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod
```

### **Endpoint: POST** **`/train`**

**Description**: Triggers a training job for forecasting models using historical data.

**Request**:

- **Query Parameters**:

  - `region` (string, required): Target region for routing (e.g., `africa`, `northamerica`).
  - `customer_id` (string, required): The unique ID of the customer.
  - `location` (string, required): Geographical location of the data source.
  - `manufacturer` (string, required): Manufacturer of the data source.
  - `serial_number` (string, required): Serial number of the device.
  - `testing` (boolean, required): Indicates if the job is a test run.

- **Headers**:

  - `x-api-key`: API key for authentication.

**Example Request**:

#### Python
```python
import requests

url = "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/train"
params = {
    "customer_id": "12345",
    "location": "CapeTown",
    "region": "af-south-1",
    "manufacturer": "exampleCorp",
    "serial_number": "SN123456",
    "testing": "True"
}
headers = {
    "x-api-key": "your-api-key"
}

response = requests.post(url, params=params, headers=headers)
print(response.status_code, response.json())
```

**Response Example**:

- **200 OK**:

  ```json
  {
    "message": "Training job created successfully.",
    "TrainingJobArn": "arn:aws:sagemaker:region:account-id:training-job/job-name",
    "job_details": {
      "customer_id": "12345",
      "location": "CapeTown",
      "region": "af-south-1",
      "manufacturer": "exampleCorp",
      "serial_number": "SN123456",
      "testing": true
    }
  }
  ```

- **400 Bad Request**:

  ```json
  {
    "error": "Invalid query parameters.",
    "details": {
      "missing_parameters": ["serial_number"],
      "invalid_parameters": ["testing"]
    }
  }
  ```

- **500 Internal Server Error**:

  ```json
  {
    "error": "Internal server error.",
    "trace_id": "ghi789rst",
    "timestamp": "2023-10-01T12:10:00Z"
  }
  ```

---

## **4. returnForecastingResults API**

### **Base URL**

```
https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod
```

### **Endpoint: GET** **`/results`**

**Description**: Retrieves forecasting results for a specific customer and device.

**Request**:

- **Query Parameters**:

  - `region` (string, required): Target region for routing (e.g., `africa`, `northamerica`).
  - `client_id` (string, required): The unique ID of the client.
  - `customer_id` (string, required): The unique ID of the customer.
  - `serial_number` (string, required): Serial number of the device.

- **Headers**:

  - `x-api-key`: API key for authentication.

**Example Request**:

#### Python
```python
import requests

url = "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/returnForecastingResults"
params = {
    "client_id": "12345",
    "customer_id": "67890",
    "serial_number": "SN123456"
}
headers = {
    "x-api-key": "your-api-key"
}

response = requests.get(url, params=params, headers=headers)
print(response.status_code, response.json())
```

**Response Example**:

- **200 OK**:

  ```json
  {
    "status": "success",
    "results": {
      "forecast_data": [
        {
          "timestamp": "2023-10-01T00:00:00Z",
          "value": 123.45
        },
        {
          "timestamp": "2023-10-01T01:00:00Z",
          "value": 130.67
        }
      ],
      "metadata": {
        "customer_id": "67890",
        "serial_number": "SN123456"
      }
    }
  }
  ```

- **400 Bad Request**:

  ```json
  {
    "error": "Invalid query parameters.",
    "details": {
      "missing_parameters": ["client_id"],
      "invalid_parameters": ["region"]
    }
  }
  ```

- **500 Internal Server Error**:

  ```json
  {
    "error": "Internal server error.",
    "trace_id": "jkl012uvw",
    "timestamp": "2023-10-01T12:15:00Z"
  }
  ```

---

## **5. interpolateData API**

### **Base URL**

```
https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod
```

### **Endpoint: POST** **`/interpolate`**

**Description**: Interpolates missing data points in time-series datasets.

**Request**:

- **Query Parameters**:

  - `region` (string, required): Target region for routing (e.g., `africa`, `northamerica`).
  - `customer_id` (string, required): The unique ID of the customer.
  - `filename` (string, required): The name of the file being processed.
  - `mode` (string, required): Mode of interpolation (e.g., `fill_missing_blocks`).

- **Headers**:

  - `x-api-key`: API key for authentication.
  - `Content-Type`: `application/json`.

- **Request Body**:

  ```json
  {
    "additional_data": "optional data if required"
  }
  ```

**Example Request**:

#### Python
```python
import requests

url = "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/interpolateData"
params = {
    "customer_id": "12345",
    "filename": "data.csv",
    "mode": "fill_missing_blocks"
}
headers = {
    "x-api-key": "your-api-key",
    "Content-Type": "application/json"
}
data = {
    "additional_data": "optional data if required"
}

response = requests.post(url, params=params, json=data, headers=headers)
print(response.status_code, response.json())
```

**Response Example**:

- **200 OK**:

  ```json
  {
    "status": "success",
    "message": "Data interpolated successfully.",
    "interpolation_details": {
      "filename": "data.csv",
      "mode": "fill_missing_blocks",
      "customer_id": "12345"
    }
  }
  ```

- **400 Bad Request**:

  ```json
  {
    "error": "Invalid query or body parameters.",
    "details": {
      "missing_parameters": ["mode"],
      "invalid_parameters": ["filename"]
    }
  }
  ```

- **500 Internal Server Error**:

  ```json
  {
    "error": "Internal server error.",
    "trace_id": "mno345xyz",
    "timestamp": "2023-10-01T12:20:00Z"
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

1. **What happens if the `region` parameter is omitted?**

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

   - Use the `/upload_nowcast` endpoint with interval data from the last 7 days to run inference on the trained model and generate forecasts.  Forecasts generation takes approximately 60 to 90 seconds, but often less than that.
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