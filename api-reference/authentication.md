# API Authentication

All requests to the Ona Intelligence Layer API must be authenticated. This guide explains how to authenticate your requests.

*Note: The freemium forecasting endpoint (`/api/v1/freemium-forecast`) does not require authentication at this time.*

## API Keys

The Ona Intelligence Layer uses API keys to authenticate requests. You can obtain an API key by contacting our support team at [support@asoba.co](mailto:support@asoba.co).

Your API key is a secret and should be treated like a password. Do not share it publicly or commit it to version control.

## Authenticating Your Requests

To authenticate your requests, you must include your API key in the `Authorization` header of each request, prefixed with the word `Bearer`.

### Header Format

```
Authorization: Bearer YOUR_API_KEY
```

Replace `YOUR_API_KEY` with the API key you received from our support team.

### cURL Example

Here is an example of an authenticated request using cURL:

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.asoba.co/v1/some-protected-endpoint
```

### Python Example

Here is an example of an authenticated request using the `requests` library in Python:

```python
import requests

api_key = "YOUR_API_KEY"
url = "https://api.asoba.co/v1/some-protected-endpoint"

headers = {
    "Authorization": f"Bearer {api_key}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")
```

## Error Response

If you make a request with a missing or invalid API key, the API will return a `401 Unauthorized` error.

```json
{
  "status": "error",
  "error": "Unauthorized"
}
```
