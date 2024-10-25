
## Introduction

Our Energy-as-a-Service platform provides robust forecasting and dispatching APIs tailored for energy traders, Independent Power Producers (IPPs), and bulk electricity buyers and resellers. The platform empowers users by integrating advanced AI models for energy demand and generation forecasting, allowing optimal dispatch strategies for improved profitability and efficiency.

<code> This product is currently in beta, so endpoint parameters and syntax are subject to change.  An API Key is also required to make successful requests via these API endpoints.  We provide access to the API and to our most up-to-date docs for clients in our API beta program.  You can [register here](https://asoba.co/on-demand/) </code>

![Architecture diagram of API's](https://staging-internal.asoba.co/api-architecture.png)


### Key Use Cases
- **Energy Traders**: Leverage accurate demand forecasts to optimize trades in electricity markets, maximize returns, and minimize risks.
- **IPPs**: Enhance generation scheduling by using our forecasting models to predict production output and optimize grid contributions.
- **Bulk Buyers/Resellers**: Predict market trends and align purchasing strategies with anticipated demand surges, avoiding high market prices and reducing costs.

---

## API Endpoints 

### 1. **/ingest/data**

**Purpose**: This endpoint allows you to ingest historical energy data into our system for model training and validation. Data should follow the required format for each device or energy station.

- **Method**: `POST`
- **URL**: `/ingest/data`
- **Parameters**:
  - `device_id`: (Optional) The unique identifier for the energy device; this may already be included in the ingest dataset.
  - `timestamp`: (Required) The timestamp for the data in ISO 8601 format.
  - `total_load`: (Required) The total load of the system at that time.
  - `total_solar`: (Optional) Solar generation data (if applicable).
  - `customer_id`: (Required) The customer’s unique ID.
  
- **Request Example** (Python):
    ```python
    import requests
    
    url = 'https://api.asoba.co/ingest/data'
    payload = {
        'device_id': '12345',
        'timestamp': '2024-09-12T08:00:00Z',
        'total_load': 500,
        'total_solar': 120,
        'customer_id': '28005'
    }
    response = requests.post(url, json=payload)
    print(response.json())
    ```

- **Request Example** (Node.js):
    ```javascript
    const axios = require('axios');
    
    const url = 'https://api.asoba.co/ingest/data';
    const payload = {
        device_id: '12345',
        timestamp: '2024-09-12T08:00:00Z',
        total_load: 500,
        total_solar: 120,
        customer_id: '28005'
    };
    
    axios.post(url, payload)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    ```

- **Response Structure**:
  - `statusCode`: 200 if successful.
  - `message`: `Data ingested successfully`.

---

### 2. **/ingest/nowcastLoadData**

**Purpose**: This endpoint is used for ingesting historical load data for immediate nowcasting and real-time prediction purposes. The data ingested is processed and used to provide near-term forecasts (nowcasting) of energy demand or generation.

- **Method**: `POST`
- **URL**: `/ingest/nowcastLoadData`
- **Parameters**:
  - `device_id`: (Required) The unique identifier for the energy device.
  - `customer_id`: (Required) The unique identifier for the customer.
  - `timestamp`: (Required) The timestamp of the data point in ISO 8601 format.
  - `total_load`: (Required) The total load recorded at the timestamp.
  - `total_solar`: (Optional) The total solar generation recorded at the timestamp, if applicable.
  
- **Request Example** (Python):
    ```python
    import requests
    
    url = 'https://api.asoba.co/ingest/nowcastLoadData'
    payload = {
        'device_id': '98765',
        'customer_id': '28005',
        'timestamp': '2024-09-14T12:30:00Z',
        'total_load': 520,
        'total_solar': 110
    }
    response = requests.post(url, json=payload)
    print(response.json())
    ```

- **Request Example** (Node.js):
    ```javascript
    const axios = require('axios');
    
    const url = 'https://api.asoba.co/ingest/nowcastLoadData';
    const payload = {
        device_id: '98765',
        customer_id: '28005',
        timestamp: '2024-09-14T12:30:00Z',
        total_load: 520,
        total_solar: 110
    };
    
    axios.post(url, payload)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    ```

- **Response Structure**:
  - `statusCode`: 200 if successful.
  - `message`: Confirmation that the data has been successfully ingested.

---

### 3. **/ondemand/forecast**

**Purpose**: Allows users to generate forecasts based on historical data. This API takes in data points and returns a future prediction for energy consumption and generation.

- **Method**: `POST`
- **URL**: `/ondemand/forecast`
- **Parameters**:
  - `device_id`: (Required) The unique identifier for the energy device.
  - `customer_id`: (Required) The customer’s unique ID.
  - `start_time`: (Required) The starting point of the forecast window in ISO 8601 format.
  - `end_time`: (Required) The ending point of the forecast window in ISO 8601 format.
  
- **Request Example** (Python):
    ```python
    import requests
    
    url = 'https://api.asoba.co/ondemand/forecast'
    payload = {
        'device_id': '12345',
        'customer_id': '28005',
        'start_time': '2024-09-12T08:00:00Z',
        'end_time': '2024-09-12T12:00:00Z'
    }
    response = requests.post(url, json=payload)
    print(response.json())
    ```

- **Request Example** (Node.js):
    ```javascript
    const axios = require('axios');
    
    const url = 'https://api.asoba.co/ondemand/forecast';
    const payload = {
        device_id: '12345',
        customer_id: '28005',
        start_time: '2024-09-12T08:00:00Z',
        end_time: '2024-09-12T12:00:00Z'
    };
    
    axios.post(url, payload)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    ```

- **Response Structure**:
  - `statusCode`: 200 if successful.
  - `forecast`: Array of predicted values for the specified time range.

---

### 4. **/ondemand/dispatch**

**Purpose**: Dispatch energy resources based on forecasts and current grid status. This endpoint helps users decide optimal dispatch strategies.

- **Method**: `POST`
- **URL**: `/ondemand/dispatch`
- **Parameters**:
  - `customer_id`: (Required) The customer’s unique ID.
  - `strategy`: (Required) Dispatch strategy to be used (e.g., `max_solar`, `min_cost`).
  - `forecast_window`: (Required) The time window for which the dispatch should be planned.

- **Request Example** (Python):
    ```python
    import requests
    
    url = 'https://api.asoba.co/ondemand/dispatch'
    payload = {
        'customer_id': '28005',
        'strategy': 'max_solar',
        'forecast_window': '2024-09-12T08:00:00Z/2024-09-12T12:00:00Z'
    }
    response = requests.post(url, json=payload)
    print(response.json())
    ```

- **Request Example** (Node.js):
    ```javascript
    const axios = require('axios');
    
    const url = 'https://api.asoba.co/ondemand/dispatch';
    const payload = {
        customer_id: '28005',
        strategy: 'max_solar',
        forecast_window: '2024-09-12T08:00:00Z/2024-09-12T12:00:00Z'
    };
    
    axios.post(url, payload)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    ```

- **Response Structure**:
  - `statusCode`: 200 if successful.
  - `dispatch_plan`: Array of recommended dispatch actions.

---


### Error Handling

Common error responses for this endpoint:
- **400 Bad Request**: If any required parameters (e.g., `device_id`, `timestamp`, `total_load`, `customer_id`) are missing.
- **500 Internal Server Error**: If there is a problem with data processing or a server-side issue.
- **404 Not Found**: If the device or customer referenced by the ID does not exist in the system.

---

## Conclusion 
The APIs provided by the Energy-as-a-Service platform allow developers and energy professionals to integrate powerful forecasting and dispatching functionalities into their applications. Whether you are managing energy portfolios, optimizing dispatch strategies, or trading in real-time markets, these APIs offer flexible and powerful tools to maximize efficiency and profitability.
