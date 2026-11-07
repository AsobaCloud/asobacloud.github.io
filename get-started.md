---
title: "Getting Started"
layout: default
nav_order: 2
---

# Get Started with the Ona SDK

The Ona SDK is dual-mode: the same client talks to **Asoba cloud** or to a **local edge** deployment (`ONA_MODE=edge`). This guide covers both paths.

## Prerequisites

- Python 3.8+ or Node.js 16+
- **Cloud path:** an API key (`ASOBA_API_KEY`) — contact **support@asoba.co**
- **Edge path only:** an Ubuntu 22.04 host where you can install the platform stack first (see [Deploy](/edge/deploy)). Pure edge/local-network clients do not need an Asoba cloud API key; authentication is handled by the local `userManagement` service after deployment. Set `ASOBA_API_KEY` only if you also call cloud-only endpoints from the edge site.

---

## Choose your path

| Path | When to use | What you point the SDK at |
|---|---|---|
| [Cloud](#cloud-path) | Hosted Asoba APIs | Production cloud endpoints (defaults built into the SDK) |
| [Edge](#edge-path) | On-prem Ubuntu 22.04 stack | Localhost service URLs after [Deploy](/edge/deploy) |

---

## Cloud path

### Step 1: Install the SDK

**Python:**
```bash
pip install asoba
```

Or from source:
```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/python
pip3 install -e .
```

**JavaScript:**
```bash
npm install @asobacloud/sdk
```

Or from source:
```bash
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/javascript
npm install
```

### Step 2: Set your API key

```bash
export ASOBA_API_KEY=<your_api_key>
```

### Step 3: Make your first call

#### Discover available data

**Python:**
```python
from asoba import OnaClient

client = OnaClient()

period = client.inverter_telemetry.get_data_period(site_id="Sibaya")
print(f"Data available from {period['first_record']} to {period['last_record']}")
```

**JavaScript:**
```javascript
const { OnaSDK } = require('@asobacloud/sdk');

const sdk = new OnaSDK();

const period = await sdk.inverterTelemetry.getDataPeriod({ site_id: 'Sibaya' });
console.log(`Data from ${period.first_record} to ${period.last_record}`);
```

#### Query historical telemetry

**Python:**
```python
from asoba import OnaClient
from asoba.models.telemetry import TimeRange

client = OnaClient()

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

### Step 4: Stream live data

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

### Step 5: Query OODA alerts

**Python:**
```python
from asoba import OnaClient
from asoba.models.ooda import TimeRange as OodaTimeRange

client_ooda = OnaClient()

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

## Edge path

The on-prem edge stack is delivered as a licensed offline bundle, not a source repository build. Install and verify it before using the SDK; the SDK then switches transport mode to your local services.

### Step 1: Obtain your license and download the bundle

1. Complete the Ona Edge purchase / entitlement flow and use the set-password link emailed by `license@asoba.co`.
2. Sign in at https://license.asoba.co and download the entitled `ona-edge-<tag>.tar.gz` for your licensed release.
3. Verify and load the bundle, then install the stack by following **[Edge Deployment → Deploy](/edge/deploy)**.

### Step 2: Install and deploy the edge stack

Follow **[Edge Deployment → Deploy](/edge/deploy)** for hardware preflight, Docker prerequisites, bundle download/checksum verification, `load_edge_bundle.sh`, `install_edge.sh`, post-install verification, and UI access. Change the seeded `admin` / `admin` credentials before exposing the device to any network.

When that guide’s post-install checks pass, return here.

### Step 3: Install the SDK

```bash
pip install asoba          # edge mode — no boto3 required
# pip install asoba[cloud]  # only if you also need cloud/AWS transport
```

### Step 4: Set edge mode and local endpoint variables

```bash
export ONA_MODE=edge

# Optional: only if you also use cloud-only endpoints from this host
# export ASOBA_API_KEY=<your_api_key>

# Point the SDK at the local services (full list on [SDK Edge Mode](/edge/sdk))
export FORECAST_API_URL=http://localhost:8002
export TERMINAL_API_URL=http://localhost:8001
export AUTH_API_URL=http://localhost:8013
# …plus any other services you use — see /edge/sdk

### Step 5: Make your first call

```python
from asoba import OnaClient

client = OnaClient()  # reads ONA_MODE=edge and endpoint vars

forecast = client.forecasting.get_site_forecast("Sibaya", forecast_hours=24)
print(f"Next hour: {forecast['forecasts'][0]['kWh_forecast']} kWh")
```

More edge clients and env vars: [SDK Edge Mode](/edge/sdk). Architecture and training: [Edge Deployment](/edge/).

---

## Next Steps

- [SDK Overview](/sdk/overview) — architecture and service map
- [Authentication](/sdk/authentication) — API key setup and configuration
- [Inverter Telemetry Guide](/sdk/services/inverter-telemetry) — query and stream data
- [OODA Terminal Alerts Guide](/sdk/services/ooda-terminal-alerts) — fault detection alerts
- [Edge Deploy](/edge/deploy) — full on-prem install
- [SDK Edge Mode](/edge/sdk) — edge clients and endpoints
- [Code Examples](/examples/overview) — complete workflows and language comparison
- [SDK Repository](https://github.com/AsobaCloud/sdk) — full source, examples, and tests
