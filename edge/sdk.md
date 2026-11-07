---
title: "SDK Edge Mode"
layout: default
nav_order: 5
parent: "Edge Deployment"
---

# SDK Edge Mode

The Ona SDK supports local edge deployments via `ONA_MODE=edge`. In edge mode, all service calls route to localhost HTTP endpoints instead of AWS Lambda. boto3 is not required.

---

## Installation

```bash
pip install asoba          # edge mode — no boto3 required
pip install asoba[cloud]   # cloud mode — includes boto3
```

```bash
npm install @asobacloud/sdk   # JavaScript — works in both modes
```

---

## Configuration

Set `ONA_MODE=edge` and a URL for each service you want to use. Add these to `~/.bashrc` alongside your API keys:

```bash
export ONA_MODE=edge
export FORECAST_API_URL=http://localhost:8002
export TERMINAL_API_URL=http://localhost:8001
export WEATHER_API_URL=http://localhost:8004
export HUAWEI_REALTIME_URL=http://localhost:8011
export HUAWEI_HISTORICAL_URL=http://localhost:8012
export TRAINING_API_URL=http://localhost:8001
export GAP_DETECTION_URL=http://localhost:8008
export STANDARDIZATION_URL=http://localhost:8009
export AUTH_API_URL=http://localhost:8013
export ANOMALY_API_URL=http://localhost:8005
export ASSET_INTELLIGENCE_URL=http://localhost:8010
export SOLAR_RESOURCE_URL=http://localhost:8006
export LIST_HUAWEI_CUSTOMERS_URL=http://localhost:8007
```

You can also pass `mode="edge"` and endpoint URLs directly in code:

```python
from asoba import OnaClient
from asoba.config import OnaConfig

client = OnaClient(config=OnaConfig(
    mode="edge",
    forecasting_endpoint="http://localhost:8002",
    auth_endpoint="http://localhost:8013",
    terminal_endpoint="http://localhost:8001",
))
```

---

## Quick Start

```python
from asoba import OnaClient

# Reads ONA_MODE=edge and endpoint vars from environment
client = OnaClient()

# Login (auth routes to localhost:8013)
client.auth.login("admin", "admin")

# Get a 24-hour forecast (routes to localhost:8002)
forecast = client.forecasting.get_site_forecast("Sibaya", forecast_hours=24)
print(f"Next hour: {forecast['forecasts'][0]['kWh_forecast']} kWh")

# Run fault detection (routes to localhost:8001)
detection = client.terminal.run_detection(
    customer_id="Sibaya",
    asset_id="INV-1000000054495190",
    lookback_hours=6,
)
print(f"Severity: {detection['analysis']['severity_label']}")
```

**JavaScript:**

```javascript
const { OnaSDK } = require('@asobacloud/sdk');

const sdk = new OnaSDK({
  mode: 'edge',
  endpoints: {
    forecasting: 'http://localhost:8002',
    terminal: 'http://localhost:8001',
  },
});

const forecast = await sdk.forecasting.getSiteForecast({
  site_id: 'Sibaya',
  forecast_hours: 24,
});
```

---

## Available Service Clients

### Services that work on edge

| Python client | JavaScript client | Edge endpoint | Description |
|---|---|---|---|
| `client.forecasting` | `sdk.forecasting` | `FORECAST_API_URL` | LSTM/TCN forecast inference |
| `client.terminal` | `sdk.terminal` | `TERMINAL_API_URL` | OODA workflow, assets, detections |
| `client.weather` | `sdk.weather` | `WEATHER_API_URL` | Weather cache trigger |
| `client.huawei` | `sdk.huawei` | `HUAWEI_REALTIME_URL` / `HUAWEI_HISTORICAL_URL` | Huawei inverter data |
| `client.gap_detection` | — | `GAP_DETECTION_URL` | Python edge only; the JavaScript SDK does not expose `gapDetection` |
| `client.standardization` | `sdk.interpolation` | `STANDARDIZATION_URL` (`INTERPOLATION_URL` on JS side) | CSV / ODS-E normalization |
| `client.training` | — | `TRAINING_API_URL` | Python edge only; the JavaScript SDK does not expose `globalTraining` |
| `client.auth` | — | `AUTH_API_URL` | JWT authentication |
| `client.energy_analyst` | `sdk.energyAnalyst` | `ENERGY_ANALYST_URL` (Python env mapping; JS endpoint override required) | RAG synthesis (pvInsightService) |
| `client.edge_devices` | `sdk.edgeRegistry` | `EDGE_API_URL` (Python env mapping; JS endpoint override required) | Edge device registry |

### New clients available only on edge

| Python client | Edge endpoint | Description |
|---|---|---|
| `client.anomaly` | `ANOMALY_API_URL` | JEPA world model anomaly detection (port 8005) |
| `client.asset_intelligence` | `ASSET_INTELLIGENCE_URL` | KPI rollups, soiling, prognostics (port 8010) |
| `client.solar_resource` | `SOLAR_RESOURCE_URL` | P50/P90 PSH yield estimation (port 8006) |
| `client.list_huawei_customers` | `LIST_HUAWEI_CUSTOMERS_URL` | Huawei plant/device discovery (port 8007) |

#### Anomaly detection

```python
records = [
    {"timestamp": "2026-01-01T08:00:00Z", "power": 45.0, "temperature": 28.0},
    {"timestamp": "2026-01-01T08:05:00Z", "power": 44.8, "temperature": 28.1},
]
result = client.anomaly.detect(
    customer_id="Sibaya",
    asset_id="INV-1000000054495190",
    records=records,
)
print(result["severity"])  # "normal" | "minor" | "moderate" | "critical"
```

#### Solar resource (P50/P90)

```python
resource = client.solar_resource.get_p50_p90(lat=-29.85, lon=31.02)
print(f"P50: {resource['p50']} kWh/m²/year")
print(f"P90: {resource['p90']} kWh/m²/year")
```

#### Asset intelligence

```python
# Process a single site
result = client.asset_intelligence.run_site("Sibaya", window_days=30)

# Process all sites
result = client.asset_intelligence.run_all_sites()
```

#### Huawei customer discovery

```python
customers = client.list_huawei_customers.list_customers()
```

### Services not available on edge

| Client | Reason |
|---|---|
| `client.enphase` | No Enphase ingest service in the edge stack |
| `client.data_ingestion` | S3-triggered Lambda — no edge equivalent |
| `client.interpolation` | Routes through `client.terminal` `/terminal/interpolation` |

Calling these in edge mode raises `ConfigurationError` with a descriptive message.

---

## Accessing the SDK from a Remote Machine

If you are running the SDK on a laptop and the edge device is on the same LAN:

1. Find the device IP: `hostname -I` on the edge device
2. Replace `localhost` with the device IP in all endpoint URLs:

```bash
export FORECAST_API_URL=http://192.168.5.238:8002
export TERMINAL_API_URL=http://192.168.5.238:8001
# ... etc
```

Or use SSH tunneling to keep traffic local:

```bash
ssh -L 8001:localhost:8001 \
    -L 8002:localhost:8002 \
    -L 8004:localhost:8004 \
    -L 8013:localhost:8013 \
    <username>@<device-ip>
```

Then use `http://localhost:PORT` in your SDK configuration as normal.

---

## Related

- [Installation](/sdk/installation) — cloud vs edge install options
- [SDK Overview](/sdk/overview) — full service map
- [Deploy](./deploy) — deploy the edge stack
