---
title: "Getting Started"
layout: default
nav_order: 3
---

## Getting Started

Our APIs are designed for easy integration within existing technology stacks. Here’s a quick guide to implement our various endpoints in Python, Node.js, and Curl.


## ingestHistoricalLoadData API

### Example: Upload Historical Data

#### Python
```python
import requests

url = "https://ona.asoba.co/ingestHistoricalLoadData/upload_historical"
params = {
    "customer_id": "12345",
    "filename": "data.csv",
    "manufacturer": "exampleCorp"
}
headers = {
    "Content-Type": "application/json"
}
data = {
    "additional_data": "optional data if required"
}

response = requests.post(url, params=params, json=data, headers=headers)
print(response.status_code, response.json())
```

#### Node.js
```javascript
const axios = require('axios');

const url = 'https://ona.asoba.co/ingestHistoricalLoadData/upload_historical';
const params = {
    customer_id: '12345',
    filename: 'data.csv',
    manufacturer: 'exampleCorp'
};
const headers = {
    'Content-Type': 'application/json'
};
const data = {
    additional_data: 'optional data if required'
};

axios.post(url, data, { params, headers })
    .then(response => console.log(response.status, response.data))
    .catch(error => console.error(error.response.status, error.response.data));
```

#### cURL
```bash
curl -X POST "https://ona.asoba.co/ingestHistoricalLoadData/upload_historical" \
  -H "Content-Type: application/json" \
  -d '{"additional_data": "optional data if required"}' \
  --data-urlencode "customer_id=12345" \
  --data-urlencode "filename=data.csv" \
  --data-urlencode "manufacturer=exampleCorp"
```

---

## ingestNowcastLoadData API

### Example: Upload Nowcast Data

#### Python
```python
import requests

url = "https://ona.asoba.co/ingestNowcastLoadData/upload_nowcast"
params = {
    "customer_id": "67890",
    "filename": "nowcast.csv",
    "manufacturer": "exampleCorp"
}
headers = {
    "Content-Type": "application/json"
}
data = {
    "additional_data": "optional nowcast data"
}

response = requests.post(url, params=params, json=data, headers=headers)
print(response.status_code, response.json())
```

#### Node.js
```javascript
const axios = require('axios');

const url = 'https://ona.asoba.co/ingestNowcastLoadData/upload_nowcast';
const params = {
    customer_id: '67890',
    filename: 'nowcast.csv',
    manufacturer: 'exampleCorp'
};
const headers = {
    'Content-Type': 'application/json'
};
const data = {
    additional_data: 'optional nowcast data'
};

axios.post(url, data, { params, headers })
    .then(response => console.log(response.status, response.data))
    .catch(error => console.error(error.response.status, error.response.data));
```

#### cURL
```bash
curl -X POST "https://ona.asoba.co/ingestNowcastLoadData/upload_nowcast" \
  -H "Content-Type: application/json" \
  -d '{"additional_data": "optional nowcast data"}' \
  --data-urlencode "customer_id=67890" \
  --data-urlencode "filename=nowcast.csv" \
  --data-urlencode "manufacturer=exampleCorp"
```

---

## auth0ManagementBackend API

### Example: Assign Role to User

#### Python
```python
import requests

url = "https://ona.asoba.co/auth0ManagementBackend/assign-role"
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}
data = {
    "user_id": "auth0|123456789",
    "role_id": "role123"
}

response = requests.post(url, json=data, headers=headers)
print(response.status_code, response.json())
```

#### Node.js
```javascript
const axios = require('axios');

const url = 'https://ona.asoba.co/auth0ManagementBackend/assign-role';
const headers = {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json'
};
const data = {
    user_id: 'auth0|123456789',
    role_id: 'role123'
};

axios.post(url, data, { headers })
    .then(response => console.log(response.status, response.data))
    .catch(error => console.error(error.response.status, error.response.data));
```

#### cURL
```bash
curl -X POST "https://ona.asoba.co/auth0ManagementBackend/assign-role" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "auth0|123456789", "role_id": "role123"}'
```

---

### Example: Create Role

#### Python
```python
import requests

url = "https://ona.asoba.co/auth0ManagementBackend/create-role"
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}
data = {
    "role_name": "admin",
    "permissions": ["read:data", "write:data"]
}

response = requests.post(url, json=data, headers=headers)
print(response.status_code, response.json())
```

#### Node.js
```javascript
const axios = require('axios');

const url = 'https://ona.asoba.co/auth0ManagementBackend/create-role';
const headers = {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json'
};
const data = {
    role_name: 'admin',
    permissions: ['read:data', 'write:data']
};

axios.post(url, data, { headers })
    .then(response => console.log(response.status, response.data))
    .catch(error => console.error(error.response.status, error.response.data));
```

#### cURL
```bash
curl -X POST "https://ona.asoba.co/auth0ManagementBackend/create-role" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"role_name": "admin", "permissions": ["read:data", "write:data"]}'
```


