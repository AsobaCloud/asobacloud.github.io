---
title: "Installation"
layout: default
nav_order: 1
parent: "SDK"
---

# Installation

## Prerequisites

- **Python**: >= 3.8, `pip3`, `git`
- **JavaScript**: Node.js >= 14, `npm`, `git`

---

## Python SDK

### Install from PyPI

```bash
pip install asoba
```

### Install from source

```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/python
pip3 install -e .
```

The `-e` flag installs in editable mode — changes to the source are picked up immediately.

### Verify

```bash
python3 -c "from asoba import OnaClient; print('OK')"
```

---

## JavaScript SDK

### Install from npm

```bash
npm install @asobacloud/sdk
```

### Install from source

```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/javascript
npm install
```

### Verify

```javascript
const { OnaSDK } = require('@asobacloud/sdk');
console.log(typeof OnaSDK); // 'function'
```

---

## Environment Variables

### Required for telemetry, alerts, and Partner API

```bash
export ASOBA_API_KEY=<your_api_key>
```

One key works for Inverter Telemetry, OODA Terminal Alerts, and the Partner API. Endpoint URLs default to the canonical production values and do not need to be set.

### Optional endpoint overrides

```bash
export ASOBA_TELEMETRY_ENDPOINT=https://telemetry.api.asoba.co   # default
export ASOBA_OODA_ENDPOINT=https://ooda.api.asoba.co             # default
export ASOBA_PARTNER_ENDPOINT=https://partner.api.asoba.co       # default
export ASOBA_TERMINAL_ENDPOINT=https://api.asoba.co              # default
export ASOBA_AUTH_ENDPOINT=https://auth-api.asoba.co/prod        # Python auth
```

### Optional service URLs

```bash
export ASOBA_AUTH_ENDPOINT=https://auth-api.asoba.co/prod        # Python auth
```

### Tuning (Python only)

```bash
export ONA_TIMEOUT=120          # Request timeout in seconds
export ONA_MAX_RETRIES=3        # Max retry attempts
export ONA_RETRY_BACKOFF=2.0    # Backoff multiplier
```

---

## Constructor Configuration

If you prefer not to use environment variables, pass configuration directly.

### Python

```python
from asoba import OnaClient

client = OnaClient(
    api_key='<your_api_key>',
    auth_endpoint='https://auth-api.asoba.co/prod',
    terminal_endpoint='https://api.asoba.co',
    timeout=120,
    max_retries=3,
)
```

`OnaClient()` with no arguments loads `ASOBA_API_KEY` and optional overrides via `OnaConfig.from_env()`.

### JavaScript

```javascript
const { OnaSDK } = require('@asobacloud/sdk');

const sdk = new OnaSDK({
  apiKey: process.env.ASOBA_API_KEY,
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  // Advanced: override a specific endpoint
  // endpoints: { partnerApi: 'https://partner.api.asoba.co' },
});
```

### HTTPS Enforcement

The Partner API endpoint **must** use `https://`. The Python SDK raises `ConfigurationError` at init if `partner_endpoint` does not use HTTPS. Telemetry clients also require HTTPS endpoints.

```python
# Python — raises ConfigurationError
from asoba.config import OnaConfig
OnaConfig(partner_endpoint='http://example.com')
```

---

## Edge Deployment Mode

The SDK supports local edge deployments (`ONA_MODE=edge`) where the Ona Platform runs on Ubuntu 22.04 without cloud dependencies. In edge mode, all service calls route to localhost HTTP endpoints instead of AWS Lambda — no boto3 required.

```bash
export ONA_MODE=edge
export FORECAST_API_URL=http://localhost:8002
export TERMINAL_API_URL=http://localhost:8001
export WEATHER_API_URL=http://localhost:8004
export HUAWEI_REALTIME_URL=http://localhost:8011
export HUAWEI_HISTORICAL_URL=http://localhost:8012
export GAP_DETECTION_URL=http://localhost:8008
export STANDARDIZATION_URL=http://localhost:8009
export AUTH_API_URL=http://localhost:8013
export ANOMALY_API_URL=http://localhost:8005
export ASSET_INTELLIGENCE_URL=http://localhost:8010
export SOLAR_RESOURCE_URL=http://localhost:8006
export LIST_HUAWEI_CUSTOMERS_URL=http://localhost:8007
```

boto3 is not required in edge mode. Install without the cloud extra:

```bash
pip install asoba          # edge mode
pip install asoba[cloud]   # cloud mode (includes boto3)
```

See [Edge Deployment → SDK Edge Mode](/edge/sdk) for the full client reference, including four new clients (`anomaly`, `solar_resource`, `asset_intelligence`, `list_huawei_customers`) that are only available on edge.

---

## Default Endpoints

| API | Endpoint |
|-----|----------|
| Inverter Telemetry | `https://telemetry.api.asoba.co` |
| OODA Terminal Alerts | `https://ooda.api.asoba.co` |
| Partner API | `https://partner.api.asoba.co` |
| Terminal API | `https://api.asoba.co` |

---

## Test It Works

### Python

```bash
cd sdk/python
python3 examples/inverter_telemetry_example.py
python3 examples/ooda_terminal_example.py
python3 examples/partner_api_example.py
```

### JavaScript

```bash
cd sdk/javascript
node examples/inverter-telemetry-example.js
node examples/ooda-terminal-example.js
node examples/partner-api-example.js
```

---

## API Key

Contact **support@asoba.co** to obtain an API key. The same key works for all API-key-protected endpoints (Inverter Telemetry, OODA Terminal, Partner API).

---

## Next Steps

- [Authentication](/sdk/authentication) — API key setup and auth service
- [Error Handling](/sdk/error-handling) — error classes and retry logic
- [Service Guides](/sdk/service-guides) — individual service documentation
