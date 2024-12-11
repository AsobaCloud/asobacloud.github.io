---
title: "API Endpoints"
layout: default
nav_order: 2
---

# API Documentation

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
  - `customer_id` (string, required): The unique ID of the customer.
  - `filename` (string, required): The name of the file being uploaded.
  - `manufacturer` (string, required): The manufacturer of the data source.

- **Headers**:
  - `Content-Type`: `application/json`

**Example Request**:
```
POST /upload_historical?customer_id=12345&filename=data.csv&manufacturer=exampleCorp HTTP/1.1
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
  - `customer_id` (string, required): The unique ID of the customer.
  - `filename` (string, required): The name of the file being uploaded.
  - `manufacturer` (string, required): The manufacturer of the data source.

- **Headers**:
  - `Content-Type`: `application/json`

**Example Request**:
```
POST /upload_nowcast?customer_id=12345&filename=nowcast_data.csv&manufacturer=exampleCorp HTTP/1.1
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

## auth0ManagementBackend API

### Context
This HTTP API is used for metadata management tasks.

### Base URL
```
https://ona.asoba.co/auth0ManagementBackend
```

### Endpoints

#### POST `/assign-role`

**Description**: Assigns a role to a user.

**Request**:

- **Headers**:
  - `Authorization` (string, required): A valid Auth0 token.
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "user_id": "auth0|123456789",
    "role_id": "role123"
  }
  ```

**Example Request**:
```
POST /assign-role HTTP/1.1
Host: ona.asoba.co
Authorization: Bearer <token>
Content-Type: application/json

{
  "user_id": "auth0|123456789",
  "role_id": "role123"
}
```

**Response**:

- **200 OK**: Role successfully assigned.
  ```json
  {
    "status": "success",
    "message": "Role assigned successfully."
  }
  ```

- **400 Bad Request**: Invalid or missing body parameters.
  ```json
  {
    "error": "Invalid user_id or role_id."
  }
  ```

- **403 Forbidden**: Unauthorized request.
  ```json
  {
    "error": "Unauthorized."
  }
  ```

#### POST `/create-role`

**Description**: Creates a new role.

**Request**:

- **Headers**:
  - `Authorization` (string, required): A valid Auth0 token.
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "role_name": "admin",
    "permissions": ["read:data", "write:data"]
  }
  ```

**Example Request**:
```
POST /create-role HTTP/1.1
Host: ona.asoba.co
Authorization: Bearer <token>
Content-Type: application/json

{
  "role_name": "admin",
  "permissions": ["read:data", "write:data"]
}
```

**Response**:

- **201 Created**: Role successfully created.
  ```json
  {
    "status": "success",
    "role_id": "role123",
    "message": "Role created successfully."
  }
  ```

- **400 Bad Request**: Missing or invalid body parameters.
  ```json
  {
    "error": "Invalid role_name or permissions."
  }
  ```

- **403 Forbidden**: Unauthorized request.
  ```json
  {
    "error": "Unauthorized."
  }
  ```

#### POST `/create-user`

**Description**: Creates a new user in the system.

**Request**:

- **Headers**:
  - `Authorization` (string, required): A valid Auth0 token.
  - `Content-Type`: `application/json`

- **Body**:
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "roles": ["role123"]
  }
  ```

**Example Request**:
```
POST /create-user HTTP/1.1
Host: ona.asoba.co
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "roles": ["role123"]
}
```

**Response**:

- **201 Created**: User successfully created.
  ```json
  {
    "status": "success",
    "user_id": "auth0|987654321",
    "message": "User created successfully."
  }
  ```

- **400 Bad Request**: Missing or invalid body parameters.
  ```json
  {
    "error": "Invalid email or roles."
  }
  ```

- **403 Forbidden**: Unauthorized request.
  ```json
  {
    "error": "Unauthorized."
  }
  ```

---

Please ensure you have the correct base URL and necessary authorization tokens for all requests. Replace placeholders (e.g., `<token>`) with actual values.
