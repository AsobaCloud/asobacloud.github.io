---
title: "API Endpoints"
layout: default
nav_order: 2
---

## API Endpoints Documentation

This guide details the APIs available in the Ona ecosystem, including their base URLs, endpoints, request parameters, and response structures. The API system dynamically routes requests to the appropriate regional endpoint based on a `region` query parameter, processed via CloudFront and Lambda\@Edge.

---

## **1. ingestHistoricalLoadData API** {#ingestHistoricalLoadData}

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
    "statusCode": 200,
    "body": "Data uploaded successfully for client_id-customer_id.",
    "response": {
      "ResponseMetadata": {
        "RequestId": "XXXXXXXX",
        "HTTPStatusCode": 200
      }
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
    "statusCode": 500,
    "body": "Internal server error: error message details"
  }
  ```

---

## **2. ingestNowcastLoadData API** {#ingestNowcastLoadData}

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
    "statusCode": 200,
    "body": "Nowcast data uploaded successfully."
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

## **3. trainForecaster API** {#trainForecaster}

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
    "statusCode": 200,
    "body": {
      "message": "Training job job_name created successfully.",
      "TrainingJobArn": "arn:aws:sagemaker:region:account-id:training-job/job-name"
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

## **4. returnForecastingResults API** {#returnForecastingResults}

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
    "statusCode": 200,
    "body": "Email with forecasting results sent successfully"
  }
  ```

- **401 Unauthorized**:

  ```json
  {
    "statusCode": 401,
    "body": {"message": "No email address for client client_id"}
  }
  ```

---

## **5. interpolateData API** {#interpolateData}

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
    "statusCode": 200,
    "body": "Generated data processed successfully"
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
- Users exceeding these limits will receive a `429 Too Many Requests`