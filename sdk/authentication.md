---
title: "Authentication"
layout: default
nav_order: 2
parent: "SDK"
---

# Authentication

## API Key Setup

Contact **support@asoba.org** to obtain an API key. A single key works for all API-key-protected endpoints:

- Inverter Telemetry
- OODA Terminal Alerts
- Partner API

Set the key in each endpoint's environment variable:

```bash
export INVERTER_TELEMETRY_API_KEY=<your_api_key>
export OODA_TERMINAL_API_KEY=<your_api_key>
export PARTNER_API_KEY=<your_api_key>
```

> **Same key, three variables.** Export the same value under all three names. The SDK sends it as the `x-api-key` header on every request.

For AWS-backed services (Forecasting, Terminal, Data Ingestion, Training), use standard AWS credentials instead of an API key:

```bash
export AWS_ACCESS_KEY_ID=<your_access_key>
export AWS_SECRET_ACCESS_KEY=<your_secret_key>
export AWS_REGION=af-south-1
```

---

## Environment Variables per Endpoint

| Endpoint | Env Var | Header |
|----------|---------|--------|
| Inverter Telemetry | `INVERTER_TELEMETRY_API_KEY` | `x-api-key` |
| OODA Terminal | `OODA_TERMINAL_API_KEY` | `x-api-key` |
| Partner API | `PARTNER_API_KEY` | `x-api-key` |
| Auth Service | `ONA_AUTH_ENDPOINT` (URL only) | `Authorization: Bearer <token>` |
| Energy Analyst | `ENERGY_ANALYST_URL` (URL only) | No auth header |
| Edge Registry | `EDGE_API_URL` (URL only) | No auth header |

---

## Multi-Endpoint Configuration Pattern

Each service client validates its own configuration at initialization. If an endpoint or key is missing, the SDK raises a `ConfigurationError` (Python) or `ConfigurationError` (JavaScript) immediately — not on the first request.

```python
from ona_platform import OnaClient

# All env vars picked up automatically
client = OnaClient()

# Only configure what you need explicitly
client = OnaClient(
    partner_api_endpoint='https://8el3o25tc1.execute-api.af-south-1.amazonaws.com/prod',
    partner_api_key='<your_api_key>',
)
```

```javascript
const { OnaSDK } = require('./src/index');

const sdk = new OnaSDK({
  endpoints: {
    inverterTelemetry: process.env.INVERTER_TELEMETRY_ENDPOINT,
    oodaTerminal: process.env.OODA_TERMINAL_ENDPOINT,
    partnerApi: process.env.PARTNER_API_ENDPOINT,
  },
  inverterTelemetryApiKey: process.env.INVERTER_TELEMETRY_API_KEY,
  oodaTerminalApiKey: process.env.OODA_TERMINAL_API_KEY,
  partnerApiKey: process.env.PARTNER_API_KEY,
});
```

---

## Auth Service (Python Only)

The Python SDK includes an `AuthClient` for user authentication, MFA, token management, and API key introspection. The JavaScript SDK does not include an auth client.

### Login with Username/Password

```python
from ona_platform import OnaClient

client = OnaClient(auth_endpoint='https://auth-api.asoba.co/prod')

# Login
result = client.auth.login('user@example.com', 'password')

# Handle MFA if required
if result.get('mfa_required'):
    if result.get('mfa_enrollment'):
        # First-time MFA setup — display provisioning_uri as a QR code
        print(f"Setup MFA: {result['provisioning_uri']}")

    # Verify MFA code from authenticator app
    result = client.auth.verify_mfa(result['mfa_token'], '123456')

# Token is automatically stored in the client
print(f"Logged in as: {result['user']['username']}")
```

### Token Management

```python
# Set token directly (for external integrations / SSO)
client.auth.set_token('eyJhbGciOiJIUzI1NiIs...')

# Get current user from token
user = client.auth.get_current_user()
print(f"User: {user['username']} (Role: {user['role_id']})")

# Refresh token before expiry
new_token = client.auth.refresh_token()

# Check authentication status
if client.auth.is_authenticated():
    print("Authenticated")

# Logout (clears local token)
client.auth.logout()
```

### API Key Introspection

```python
# Get API key information
info = client.auth.get_api_key_info('opa_prod_xxxxx')
print(f"Expires: {info['expires_at']}")
print(f"Sites: {info['permitted_site_ids']}")
print(f"Expired: {info['is_expired']}")

# Validate API key for a specific site
validation = client.auth.validate_api_key('opa_prod_xxxxx', 'Sibaya')
if validation['valid']:
    print("API key is valid for site")
```

### Token Exchange (SSO Integration)

```python
# Exchange external token for Ona token
result = client.auth.exchange_token(
    external_token='external_jwt_token',
    provider='external-sso'
)
print(f"Ona token: {result['token']}")
```

### Auth Service Configuration

```bash
export ONA_AUTH_ENDPOINT=https://auth-api.asoba.co/prod
```

The auth endpoint must use HTTPS — the SDK raises `ConfigurationError` otherwise. The Lambda function name is derived from the endpoint URL:

| Endpoint contains | Lambda function |
|--------------------|----------------|
| `staging` | `ona-user-auth-staging` |
| `dev` or `localhost` | `ona-user-auth-dev` |
| *(default)* | `ona-user-auth-prod` |

---

## Authorization Header

The `AuthClient.get_auth_header()` method returns a dict with the `Authorization` header for use in custom HTTP requests:

```python
headers = client.auth.get_auth_header()
# {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'}
```

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid or missing API key | Verify env vars; contact support@asoba.org |
| `403 Forbidden` | API key not scoped to site | Request access to the `site_id` you're querying |
| `AuthenticationError` | Token expired or invalid | Call `login()` or `refresh_token()` |
| `ConfigurationError` | Missing endpoint or key | Set the required environment variable |

---

## Next Steps

- [Error Handling](/sdk/error-handling) — error classes and retry logic
- [Installation](/sdk/installation) — full env-var reference
- [Service Guides](/sdk/service-guides) — browse service documentation
