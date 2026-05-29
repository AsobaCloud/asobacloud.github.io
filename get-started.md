---
title: "Get Started"
layout: default
nav_exclude: true
---

# Get Started with the Ona SDK

This guide gets you querying live inverter telemetry and OODA alerts in under 5 minutes using the Ona SDK.

## Prerequisites

- Python 3.8+ or Node.js 16+
- An API key — contact **support@asoba.org** to get one

---

## Step 1: Install the SDK

**Python:**
```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/python
pip3 install -e .
```

**JavaScript:**
```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/javascript
npm install
```

---

## Step 2: Set Your Environment Variables

```bash
export INVERTER_TELEMETRY_ENDPOINT=https://af5jy5ob3e.execute-api.af-south-1.amazonaws.com/prod
export INVERTER_TELEMETRY_API_KEY=<your_api_key>

export OODA_TERMINAL_ENDPOINT=https://3lpq00xevg.execute-api.af-south-1.amazonaws.com/prod
export OODA_TERMINAL_API_KEY=<your_api_key>
```

> The same API key works for both endpoints.

---

## Step 3: Make Your First Call

### Discover available data

**Python:**
```python
from ona_platform import OnaClient

client = OnaClient()

period = client.inverter_telemetry.get_data_period(site_id="Sibaya")
print(f"Data available from {period['first_record']} to {period['last_record']}")
```

**JavaScript:**
```javascript
const { OnaSDK } = require('./src/index');

const sdk = new OnaSDK({
  endpoints: { inverterTelemetry: process.env.INVERTER_TELEMETRY_ENDPOINT },
  inverterTelemetryApiKey: process.env.INVERTER_TELEMETRY_API_KEY,
});

const period = await sdk.inverterTelemetry.getDataPeriod({ site_id: 'Sibaya' });
console.log(`Data from ${period.first_record} to ${period.last_record}`);
```

### Query historical telemetry

**Python:**
```python
from ona_platform.models.telemetry import TimeRange

records = client.inverter_telemetry.get_inverter_telemetry(
    asset_id="INV-1000000054495190",
    site_id="Sibaya",
    time_range=TimeRange(start="2025-11-01T00:00:00", end="2025-11-01T12:00:00"),
    resolution="5min",
    limit=10,
)

for r in records:
    print(f"{r.timestamp}  power={r.power} kW  temp={r.temperature}°C")
```

**Expected output:**
```
2025-11-01T02:40:00  power=0.0 kW  temp=25.3°C
2025-11-01T02:45:00  power=0.0 kW  temp=25.1°C
...
```

---

## Step 4: Stream Live Data

**Python:**
```python
for record in client.inverter_telemetry.stream_inverter(
    asset_id="INV-1000000054495190",
    site_id="Sibaya",
    polling_interval=30,
):
    print(f"{record.timestamp}: {record.power} kW")
```

**JavaScript:**
```javascript
for await (const record of sdk.inverterTelemetry.streamInverter({
  asset_id: 'INV-1000000054495190',
  site_id: 'Sibaya',
  polling_interval: 30,
})) {
  console.log(`${record.timestamp}: ${record.power} kW`);
}
```

---

## Step 5: Query OODA Alerts

**Python:**
```python
from ona_platform.models.ooda import TimeRange as OodaTimeRange

client_ooda = OnaClient()  # uses OODA_TERMINAL_ENDPOINT + OODA_TERMINAL_API_KEY from env

alerts = client_ooda.ooda_terminal.get_terminal_alerts(
    terminal_device_id="TERM-1000000054495190",
    site_id="Sibaya",
    time_range=OodaTimeRange(start="2025-11-01T00:00:00", end="2025-11-01T12:00:00"),
    limit=10,
)

for a in alerts:
    print(f"{a.timestamp}: [{a.alert_severity}] {a.message}")
```

---

## Next Steps

- [SDK Repository](https://github.com/AsobaCloud/sdk) — full source, examples, and tests
- [Inverter Telemetry examples](https://github.com/AsobaCloud/sdk/blob/main/python/examples/inverter_telemetry_example.py)
- [OODA Terminal examples](https://github.com/AsobaCloud/sdk/blob/main/python/examples/ooda_terminal_example.py)
- [API Reference](/api-reference/overview) — endpoint details
- [Authentication](/api-reference/authentication) — API key setup
