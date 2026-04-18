---
title: "Quickstart"
layout: default
nav_order: 1
parent: "Build"
---

# Quickstart

Query live inverter telemetry in three steps using the Ona SDK.

## Step 1: Install

**Python:**
```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/python && pip3 install -e .
```

**JavaScript:**
```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/javascript && npm install
```

## Step 2: Configure

```bash
export INVERTER_TELEMETRY_ENDPOINT=https://af5jy5ob3e.execute-api.af-south-1.amazonaws.com/prod
export INVERTER_TELEMETRY_API_KEY=<your_api_key>
```

Contact **support@asoba.co** to get an API key.

## Step 3: Query

**Python:**
```python
from ona_platform import OnaClient
from ona_platform.models.telemetry import TimeRange

client = OnaClient()

records = client.inverter_telemetry.get_inverter_telemetry(
    asset_id="INV-1000000054495190",
    site_id="Sibaya",
    time_range=TimeRange(start="2025-11-01T00:00:00", end="2025-11-01T12:00:00"),
    limit=10,
)

for r in records:
    print(f"{r.timestamp}: {r.power} kW")
```

**JavaScript:**
```javascript
const { OnaSDK } = require('./src/index');

const sdk = new OnaSDK({
  endpoints: { inverterTelemetry: process.env.INVERTER_TELEMETRY_ENDPOINT },
  inverterTelemetryApiKey: process.env.INVERTER_TELEMETRY_API_KEY,
});

const records = await sdk.inverterTelemetry.getInverterTelemetry({
  asset_id: 'INV-1000000054495190',
  site_id: 'Sibaya',
  time_range: { start: '2025-11-01T00:00:00', end: '2025-11-01T12:00:00' },
  limit: 10,
});

records.forEach(r => console.log(`${r.timestamp}: ${r.power} kW`));
```

## Next steps

- [Get Started](/get-started) — full walkthrough including OODA alerts and streaming
- [SDK Repository](https://github.com/AsobaCloud/sdk) — source, examples, tests
- [Authentication](/api-reference/authentication) — API key details
- [API Reference](/api-reference/overview) — all available endpoints
