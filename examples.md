# API Examples

Our APIs are designed for easy integration within existing technology stacks. Here’s a quick guide to implement the historical data ingest API in Python, Node.js, and Curl.

## Python Example

```python
import requests

api_key = 'YOUR_API_KEY'
base_url = 'https://api.asoba.co/v1/upload'
endpoint = 'historical'
headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'text/csv'
}
payload = {
    'location': 'Cape Town',
    'filename': '/path/to/csv',
    'customer_id': '280001'
}
response = requests.post(f'{base_url}{endpoint}', headers=headers, json=payload)
if response.status_code == 200:
    print('Success:', response.json())
else:
    print('Error:', response.status_code, response.text)
```

## Node.JS Example

```
const axios = require('axios');

const api_key = 'YOUR_API_KEY';
const base_url = 'https://api.asoba.co/v1/upload';
const endpoint = 'historical';
const headers = {
    'Authorization': `Bearer ${api_key}`,
    'Content-Type': 'text/csv'
};
const payload = {
    location: 'Cape Town',
    filename: '/path/to/csv',
    customer_id: '280001'
};

axios.post(`${base_url}${endpoint}`, payload, { headers })
    .then(response => console.log('Success:', response.data))
    .catch(error => console.error('Error:', error.response.status, error.response.data));
```

## Curl Example

```
curl -X POST "https://api.asoba.co/v1/uploadhistorical" \
-H "Authorization: Bearer YOUR_API_KEY" \
-H "Content-Type: text/csv" \
-d '{
    "location": "Cape Town",
    "filename": "/path/to/csv",
    "customer_id": "280001"
}'
```
