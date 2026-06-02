---
title: "Authentication"
layout: default
nav_order: 1
parent: "Reference"
---

# Authentication

The Ona Platform supports multiple authentication methods:

1. **API Key Authentication** (Service-to-Service) - For backend integrations and data pulls
2. **JWT Authentication** (User-based) - For user-facing applications with login/MFA

Contact **support@asoba.org** to get credentials for your use case.

---

## JWT Authentication (Recommended for User-Facing Apps)

For applications that require user login, the SDK provides the `AuthClient` with support for username/password authentication, MFA verification, and token management.

### Python SDK

```python
from ona_platform import OnaClient

# Initialize with auth endpoint
client = OnaClient(auth_endpoint='https://auth-api.asoba.co/prod')

# Login
result = client.auth.login('user@example.com', 'password')

# Handle MFA if required
if result.get('mfa_required'):
    if result.get('mfa_enrollment'):
        # Display QR code from provisioning_uri for first-time setup
        print(f"Scan QR: {result['provisioning_uri']}")
    
    # Verify TOTP code
    result = client.auth.verify_mfa(result['mfa_token'], '123456')

# Token is automatically stored, use for subsequent requests
user = client.auth.get_current_user()
print(f"Logged in as: {user['username']} (Role: {user['role_id']})")
```

### Token Management

```python
# Check authentication status
if client.auth.is_authenticated():
    # Refresh token before expiry
    new_token = client.auth.refresh_token()

# Set token directly (for SSO integrations)
client.auth.set_token('eyJhbGciOiJIUzI1NiIs...')

# Logout
client.auth.logout()
```

### SSO Token Exchange

For external system integration:

```python
# Exchange external JWT for Ona token
result = client.auth.exchange_token(
    external_token='external_jwt',
    provider='external-sso'
)
```

---

## API Key Authentication (Service-to-Service)

---

## Using API Keys with the SDK

Pass your API key through environment variables — the SDK picks them up automatically.

```bash
export INVERTER_TELEMETRY_API_KEY=<your_api_key>
export OODA_TERMINAL_API_KEY=<your_api_key>
```

The same key value works for both variables.

### API Key Introspection (Python SDK)

```python
from ona_platform import OnaClient

client = OnaClient(auth_endpoint='https://auth-api.asoba.co/prod')

# Get API key information
info = client.auth.get_api_key_info('opa_prod_xxxxx')
print(f"Expires: {info['expires_at']}")
print(f"Permitted sites: {info['permitted_site_ids']}")

# Validate for specific site
validation = client.auth.validate_api_key('opa_prod_xxxxx', 'Sibaya')
if validation['valid']:
    print("Key is valid for site")
```

**Python:**
```python
from ona_platform import OnaClient

# Reads INVERTER_TELEMETRY_ENDPOINT and INVERTER_TELEMETRY_API_KEY from env
client = OnaClient()
records = client.inverter_telemetry.get_inverter_telemetry(...)
```

**JavaScript:**
```javascript
const { OnaSDK } = require('./src/index');

// Reads from env automatically
const sdk = new OnaSDK({
  endpoints: { inverterTelemetry: process.env.INVERTER_TELEMETRY_ENDPOINT },
  inverterTelemetryApiKey: process.env.INVERTER_TELEMETRY_API_KEY,
});
```

---

## Direct HTTP requests

If you're calling the API without the SDK, include the key in the `x-api-key` header:

```bash
curl -H "x-api-key: YOUR_API_KEY" \
  "https://af5jy5ob3e.execute-api.af-south-1.amazonaws.com/prod/telemetry/inverter?asset_id=INV-1000000054495190&site_id=Sibaya&start=2025-11-01T00:00:00&end=2025-11-01T12:00:00"
```

---

## Error Responses

| Status | Meaning | Context |
|--------|---------|---------|
| `401 Unauthorized` | API key missing, invalid, or JWT token expired | Check key/token validity |
| `403 Forbidden` | Key not scoped to requested `site_id` or insufficient permissions | Verify site access |
| `429 Too Many Requests` | Rate limit exceeded (60 req/min) | Implement backoff |

### JWT-Specific Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Token expired` | JWT token past expiry | Call `client.auth.refresh_token()` or re-login |
| `Invalid TOTP code` | Wrong MFA code | Retry with correct authenticator code |
| `MFA token expired` | MFA challenge timed out | Re-login to get new MFA challenge |

---

## Key Scope & Permissions

Each API key is associated with a list of permitted `site_id` values. If you need access to additional sites, contact **support@asoba.org**.

### User Token Claims

JWT tokens issued by the Auth service include these claims:

| Claim | Description |
|-------|-------------|
| `user_id` | Unique user identifier |
| `username` | User's email or username |
| `role_id` | User's role (e.g., `role_admin`, `role_analyst`) |
| `customer_ids` | List of accessible customer IDs |
| `group_id` | Organization group |
| `skin_id` | UI skin/theme identifier |
| `exp` | Token expiration timestamp |

### Environment Configuration

```bash
# For JWT authentication
export ONA_AUTH_ENDPOINT=https://auth-api.asoba.co/prod

# For API key authentication
export INVERTER_TELEMETRY_API_KEY=opa_prod_xxxxx
export OODA_TERMINAL_API_KEY=opa_prod_xxxxx
```
