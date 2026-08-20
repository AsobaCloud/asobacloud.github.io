---
title: "Error Handling"
layout: default
nav_order: 3
parent: "SDK"
---

# Error Handling

Both SDKs provide custom exception hierarchies so you can catch specific error types instead of parsing HTTP status codes.

---

## Python Error Hierarchy

All exceptions inherit from `OnaError`:

```
OnaError
├── ConfigurationError      — invalid SDK config (missing endpoint, wrong scheme)
├── ServiceUnavailableError — 5xx server errors or network failures
├── ValidationError         — invalid request parameters (client-side check)
├── AuthenticationError     — 401/403 access denied
├── ResourceNotFoundError   — 404 resource not found
├── RateLimitError          — 429 too many requests
└── TimeoutError            — request timed out
```

### Usage

```python
from asoba import OnaClient
from asoba.exceptions import (
    OnaError,
    ConfigurationError,
    ServiceUnavailableError,
    ValidationError,
    AuthenticationError,
    ResourceNotFoundError,
    RateLimitError,
    TimeoutError,
)

client = OnaClient()

try:
    records = client.inverter_telemetry.get_inverter_telemetry(
        asset_id='INV-001',
        site_id='Sibaya',
        time_range={'start': '2025-11-01T00:00:00', 'end': '2025-11-01T12:00:00'},
        limit=100,
    )
except ResourceNotFoundError as e:
    print(f"Site not found: {e}")
except AuthenticationError as e:
    print(f"Access denied: {e}")
except RateLimitError as e:
    print(f"Rate limit exceeded: {e}")
except ValidationError as e:
    print(f"Invalid request: {e}")
except ServiceUnavailableError as e:
    print(f"Service error: {e}")
except OnaError as e:
    print(f"SDK error: {e}")
```

---

## JavaScript Error Hierarchy

All errors inherit from `OnaSDKError`:

```
OnaSDKError
├── APIError              — API request failed (includes statusCode + response)
├── ConfigurationError    — invalid config (includes missingFields)
├── ValidationError       — input validation failed (includes field + value)
├── AuthenticationError   — authentication failed
└── TimeoutError          — request timed out (includes timeout ms)
```

### Usage

```javascript
const {
  OnaSDK,
  OnaSDKError,
  APIError,
  ConfigurationError,
  ValidationError,
  AuthenticationError,
  TimeoutError,
} = require('@asobacloud/sdk');

const sdk = new OnaSDK();

try {
  const records = await sdk.inverterTelemetry.getInverterTelemetry({
    asset_id: 'INV-001',
    site_id: 'Sibaya',
    time_range: { start: '2025-11-01T00:00:00', end: '2025-11-01T12:00:00' },
    limit: 100,
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.field, error.message);
  } else if (error instanceof AuthenticationError) {
    console.error('Authentication failed:', error.message);
  } else if (error instanceof APIError) {
    if (error.statusCode === 429) {
      console.error('Rate limit exceeded');
    } else if (error.statusCode >= 500) {
      console.error('Service unavailable:', error.statusCode);
    } else {
      console.error('API error:', error.statusCode, error.message);
    }
  } else if (error instanceof TimeoutError) {
    console.error('Request timed out after', error.timeout, 'ms');
  } else {
    console.error('Unknown error:', error);
  }
}
```

---

## Retry Logic

### Python

The SDK uses exponential backoff via the `retry_with_backoff` decorator. Retries apply to `ServiceUnavailableError` and `TimeoutError` only — not to auth, validation, or rate-limit errors.

```python
from asoba.utils.retry import retry_with_backoff

# Default: 3 retries, 2.0 backoff factor (2s, 4s, 8s)
@retry_with_backoff(max_retries=3, backoff_factor=2.0)
def my_api_call():
    ...
```

Configure retry behavior at the client level:

```python
client = OnaClient(max_retries=5)
```

The telemetry and OODA clients implement their own retry loop for 5xx responses with the same exponential backoff.

### JavaScript

The SDK retries failed requests with configurable delay:

```javascript
const sdk = new OnaSDK({
  retries: 3,        // default: 3
  retryDelay: 1000,  // default: 1000ms
});
```

---

## Cost Protection

Both SDKs enforce client-side limits to prevent accidental cost overruns. These checks run **before** any network call:

| Limit | Value | Exception on violation |
|-------|-------|----------------------|
| Max records per query | 1000 | `ValidationError` |
| Max time range per query | 31 days | `ValidationError` |
| Min polling interval (streaming) | 5 seconds | `ValidationError` |

```python
# Python — raises ValidationError before hitting the API
client.inverter_telemetry.get_inverter_telemetry(
    asset_id='INV-001',
    site_id='Sibaya',
    time_range={'start': '2025-01-01', 'end': '2025-03-15'},  # > 31 days
    limit=5000,  # > 1000
)
# ValidationError: limit must not exceed 1000
```

---

## Best Practices

1. **Catch specific exceptions first.** Always order your `except` blocks from most specific to most general (`ResourceNotFoundError` before `OnaError`).

2. **Don't retry on 4xx.** The SDK only retries 5xx and timeout errors. Auth, validation, and rate-limit errors are not retried — handle them explicitly.

3. **Handle rate limits gracefully.** When you catch `RateLimitError` (Python) or `APIError` with status 429 (JavaScript), back off and retry after a delay. The limit is 60 requests per minute.

4. **Use configuration errors for fail-fast setup.** Wrap client initialization in a try/except for `ConfigurationError` / `AuthenticationError` to give users clear setup guidance:

   ```python
   try:
       client = OnaClient()
       # first call will fail fast if ASOBA_API_KEY is missing
       client.inverter_telemetry.get_data_period(site_id='Sibaya')
   except (ConfigurationError, AuthenticationError) as e:
       print(f"Setup incomplete: {e}")
       print("See https://docs.asoba.co/sdk/installation")
       sys.exit(1)
   ```

---

## Error Reference

| HTTP Status | Python Exception | JavaScript Error | Meaning |
|-------------|-----------------|-----------------|---------|
| 400 | `ValidationError` | `ValidationError` | Invalid parameters |
| 401 | `AuthenticationError` | `AuthenticationError` | Invalid or missing API key |
| 403 | `AuthenticationError` | `AuthenticationError` | Key not scoped to site |
| 404 | `ResourceNotFoundError` | `APIError` (404) | Resource not found |
| 429 | `RateLimitError` | `APIError` (429) | Rate limit exceeded (60 req/min) |
| 5xx | `ServiceUnavailableError` | `APIError` (5xx) | Server error (auto-retried) |
| — | `TimeoutError` | `TimeoutError` | Request timed out |
| — | `ConfigurationError` | `ConfigurationError` | Invalid endpoint or config |

---

## Next Steps

- [Service Guides](/sdk/service-guides) — browse individual service documentation
- [Authentication](/sdk/authentication) — API key setup
- [Installation](/sdk/installation) — full configuration reference
