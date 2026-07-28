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

### Install from source

```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/python
pip3 install -e .
```

The `-e` flag installs in editable mode — changes to the source are picked up immediately.

### Install from PyPI

```bash
pip install ona-platform
```

### Verify

```bash
python3 -c "from ona_platform import OnaClient; print('OK')"
```

---

## JavaScript SDK

### Install from source

```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/javascript
npm install
```

### Install from npm

```bash
npm install @asoba/ona-sdk
```

### Verify

```javascript
const { OnaSDK } = require('@asoba/ona-sdk');
console.log(typeof OnaSDK); // 'function'
```

---

## Environment Variables

The SDK reads endpoint URLs and API keys from environment variables. Set the ones relevant to the services you use.

### Inverter Telemetry

```bash
export INVERTER_TELEMETRY_ENDPOINT=https://af5jy5ob3e.execute-api.af-south-1.amazonaws.com/prod
export INVERTER_TELEMETRY_API_KEY=<your_api_key>
```

### OODA Terminal Alerts

```bash
export OODA_TERMINAL_ENDPOINT=https://3lpq00xevg.execute-api.af-south-1.amazonaws.com/prod
export OODA_TERMINAL_API_KEY=<your_api_key>
```

### Partner API

```bash
export PARTNER_API_ENDPOINT=https://8el3o25tc1.execute-api.af-south-1.amazonaws.com/prod
export PARTNER_API_KEY=<your_api_key>
```

### AWS Services (Forecasting, Terminal, Data Ingestion, Training)

```bash
export AWS_REGION=af-south-1
export AWS_ACCESS_KEY_ID=<your_access_key>
export AWS_SECRET_ACCESS_KEY=<your_secret_key>
```

### Energy Analyst

```bash
export ENERGY_ANALYST_URL=http://localhost:8000
```

### Edge Device Registry

```bash
export EDGE_API_URL=http://localhost:8082
```

### Auth Service (Python only)

```bash
export ONA_AUTH_ENDPOINT=https://auth-api.asoba.co/prod
```

### Tuning (Python only)

```bash
export ONA_TIMEOUT=120          # Request timeout in seconds
export ONA_MAX_RETRIES=3        # Max retry attempts
export ONA_RETRY_BACKOFF=2.0    # Backoff multiplier
```

> **Same API key for all endpoints.** A single API key works for Inverter Telemetry, OODA Terminal, and Partner API. Set it under all three `*_API_KEY` variables.

---

## Constructor Configuration

If you prefer not to use environment variables, pass configuration directly.

### Python

```python
from ona_platform import OnaClient

client = OnaClient(
    aws_region='af-south-1',
    energy_analyst_url='http://localhost:8000',
    edge_api_url='http://localhost:8082',
    auth_endpoint='https://auth-api.asoba.co/prod',
    partner_api_endpoint='https://8el3o25tc1.execute-api.af-south-1.amazonaws.com/prod',
    partner_api_key='<your_api_key>',
    timeout=120,
    max_retries=3,
    retry_backoff=2.0,
)
```

The Python SDK uses the `OnaConfig` dataclass internally. All fields have defaults; only override what you need. The `from_env()` classmethod loads from environment variables automatically when you call `OnaClient()` with no arguments.

### JavaScript

```javascript
const { OnaSDK } = require('./src/index');

const sdk = new OnaSDK({
  region: 'af-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  endpoints: {
    inverterTelemetry: process.env.INVERTER_TELEMETRY_ENDPOINT,
    oodaTerminal: process.env.OODA_TERMINAL_ENDPOINT,
    partnerApi: process.env.PARTNER_API_ENDPOINT,
    forecasting: 'https://forecasting.api.asoba.co',
    terminal: 'https://terminal.api.asoba.co',
    edgeRegistry: 'http://localhost:8082',
    energyAnalyst: 'http://localhost:8000',
  },
  inverterTelemetryApiKey: process.env.INVERTER_TELEMETRY_API_KEY,
  oodaTerminalApiKey: process.env.OODA_TERMINAL_API_KEY,
  partnerApiKey: process.env.PARTNER_API_KEY,
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
});
```

### HTTPS Enforcement

The Partner API endpoint **must** use `https://`. Both SDKs raise a `ConfigurationError` at initialization if the scheme is not HTTPS:

```python
# Python — raises ConfigurationError
client = OnaClient(partner_api_endpoint='http://example.com')
```

```javascript
// JavaScript — ConfigurationError thrown in Config.validate()
const sdk = new OnaSDK({
  endpoints: { partnerApi: 'http://example.com' },
});
```

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

Contact **support@asoba.org** to obtain an API key. The same key works for all API-key-protected endpoints (Inverter Telemetry, OODA Terminal, Partner API).

For AWS-backed services (Forecasting, Terminal, Data Ingestion, Training), configure standard AWS credentials instead.

---

## Next Steps

- [Authentication](/sdk/authentication) — API key setup and auth service
- [Error Handling](/sdk/error-handling) — error classes and retry logic
- [Service Guides](/sdk/service-guides) — individual service documentation
