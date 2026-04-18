---
title: "Authentication"
layout: default
nav_order: 1
parent: "Reference"
---

# Authentication

All Ona SDK requests authenticate via an API key passed in the `x-api-key` header. Contact **support@asoba.co** to get a key.

Your API key is scoped to specific site IDs. Requests to sites outside your key's scope return `403 Forbidden`.

---

## Using the SDK (recommended)

Pass your API key through environment variables — the SDK picks them up automatically.

```bash
export INVERTER_TELEMETRY_API_KEY=<your_api_key>
export OODA_TERMINAL_API_KEY=<your_api_key>
```

The same key value works for both variables.

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

## Error responses

| Status | Meaning |
|--------|---------|
| `401 Unauthorized` | API key missing or not found |
| `403 Forbidden` | Key exists but not scoped to the requested `site_id` |
| `429 Too Many Requests` | Rate limit exceeded (60 req/min) |

---

## Key scope

Each API key is associated with a list of permitted `site_id` values. If you need access to additional sites, contact **support@asoba.co**.
