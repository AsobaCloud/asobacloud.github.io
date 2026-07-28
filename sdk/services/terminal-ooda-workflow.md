---
title: "Terminal OODA Workflow"
layout: default
nav_order: 5
parent: "Service Guides"
grand_parent: "SDK"
---

# Terminal OODA Workflow

The Terminal API implements the full **OODA loop** (Observe → Orient → Decide → Act) for asset management, fault detection, AI diagnostics, and maintenance scheduling. It also provides access to ML forecast results and interpolation data.

## OODA Loop Overview

| Phase | SDK Method | Purpose |
|-------|-----------|---------|
| **Observe** | `run_detection()` | Detect faults and anomalies in asset data |
| **Orient** | `run_diagnostics()` | AI-powered root cause analysis |
| **Decide** | `create_schedule()`, `buildBOM()` | Plan maintenance and build bill of materials |
| **Act** | `createOrder()`, `list_activities()` | Create work orders and track activities |

---

## Python

```python
from ona_platform import OnaClient

client = OnaClient()
customer_id = "customer123"
asset_id = "asset456"

# ── OBSERVE: Run fault detection ──
detection = client.terminal.run_detection(
    customer_id=customer_id,
    asset_id=asset_id,
    lookback_hours=6
)
detection_id = detection['detection_id']
print(f"Severity: {detection['analysis']['severity_label']}")
print(f"Fault type: {detection['analysis']['fault_type']}")
print(f"Summary: {detection['analysis']['summary']}")

# ── ORIENT: Run AI diagnostics ──
diagnostic = client.terminal.run_diagnostics(
    customer_id=customer_id,
    asset_id=asset_id,
    detection_id=detection_id,
    lookback_hours=6
)
print(f"Root cause: {diagnostic['analysis']['root_cause']}")
print(f"Confidence: {diagnostic['analysis']['confidence']}")
for action in diagnostic['analysis'].get('recommended_actions', []):
    print(f"  → {action}")

# ── DECIDE: Create maintenance schedule ──
schedule = client.terminal.create_schedule(
    customer_id=customer_id,
    asset_id=asset_id,
    description=f"Maintenance for {diagnostic['analysis']['root_cause']}",
    priority="High",
    estimated_duration_hours=8
)
print(f"Schedule created: {schedule['schedule_id']}")

# ── ACT: List activities ──
activities = client.terminal.list_activities(customer_id=customer_id)
print(f"Total activities: {len(activities)}")
for activity in activities[:5]:
    print(f"  [{activity['phase']}] {activity['title']}")
```

### Asset Management

```python
# List all assets for a customer
assets = client.terminal.list_assets(customer_id=customer_id)
for asset in assets[:3]:
    print(f"  - {asset['name']} ({asset['type']}): {asset['capacity_kw']} kW")
```

### ML Integration

```python
# Get ML forecast results
forecast_results = client.terminal.get_forecast_results(customer_id=customer_id)

# Get ML-enhanced OODA summaries
ml_ooda = client.terminal.get_ml_ooda_summaries(customer_id=customer_id)

# Get available ML models
models = client.terminal.get_ml_models()
```

---

## JavaScript

```javascript
const { OnaSDK } = require('../src/index');

const sdk = new OnaSDK({
  region: 'af-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  endpoints: {
    terminal: process.env.ONA_TERMINAL_ENDPOINT || 'https://terminal.api.asoba.co'
  }
});

const customerId = 'customer123';
const assetId = 'INV-DEMO-001';

// ── OBSERVE: Run fault detection ──
const detection = await sdk.terminal.runDetection({
  customer_id: customerId,
  asset_id: assetId,
  lookback_hours: 6
});
console.log(`Detection ID: ${detection.detection_id}`);
console.log(`Severity: ${detection.analysis.severity_label}`);
console.log(`Energy at risk: ${detection.analysis.energy_at_risk_kw} kW`);

// ── ORIENT: Run diagnostics ──
const diagnostic = await sdk.terminal.runDiagnostics({
  customer_id: customerId,
  asset_id: assetId,
  detection_id: detection.detection_id,
  lookback_hours: 6
});
console.log(`Root cause: ${diagnostic.analysis.root_cause}`);
console.log(`Confidence: ${(diagnostic.analysis.confidence * 100).toFixed(1)}%`);

// ── DECIDE: Schedule + BOM ──
const schedule = await sdk.terminal.createSchedule({
  customer_id: customerId,
  asset_id: assetId,
  title: 'Repair faulty inverter',
  priority: 'High',
  description: `Based on diagnostic ${diagnostic.diagnostic_id}`,
  estimated_duration_hours: 4
});

const bom = await sdk.terminal.buildBOM({
  customer_id: customerId,
  asset_id: assetId,
  schedule_id: schedule.schedule_id
});
console.log(`BOM created: ${bom.bom_id}, estimated cost: $${bom.total_cost_usd}`);

// ── ACT: Create work order ──
const order = await sdk.terminal.createOrder({
  customer_id: customerId,
  asset_id: assetId,
  bom_id: bom.bom_id
});
console.log(`Work order created: ${order.order_id}`);

// ── Real-time monitoring ──
const nowcast = await sdk.terminal.getNowcastData({
  customer_id: customerId,
  time_range: '1h'
});
if (nowcast.success && nowcast.data.latest_metrics) {
  const m = nowcast.data.latest_metrics;
  console.log(`Total power: ${m.total_power_kw} kW`);
  console.log(`Active inverters: ${m.active_inverters}/${m.total_inverters}`);
}

// ── Activity stream ──
const activities = await sdk.terminal.listActivities({ customer_id: customerId });
activities.activities.slice(0, 5).forEach(a => {
  console.log(`  [${a.phase.toUpperCase()}] ${a.title}`);
});
```

---

## Additional Methods

| Method (Python) | Method (JS) | Description |
|-----------------|-------------|-------------|
| `list_assets()` | `listAssets()` | List all assets for a customer |
| `add_asset()` | `addAsset()` | Register a new asset |
| `get_forecast_results()` | `getForecastResults()` | ML forecast results |
| `get_interpolation_results()` | `getInterpolationResults()` | ML interpolation results |
| `get_ml_models()` | `getMLModels()` | Available ML model registry |
| `get_ml_ooda_summaries()` | `getMLOODA()` | ML-enhanced OODA summaries |
| `get_nowcast_data()` | `getNowcastData()` | Real-time monitoring data |
| `list_issues()` | `listIssues()` | List all open issues |
| `track()` | `track()` | Track asset status |

---

## Full Example

- [Python: terminal_ooda_example.py](https://github.com/AsobaCloud/sdk/blob/main/python/examples/terminal_ooda_example.py)
- [JavaScript: terminal-api-example.js](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/terminal-api-example.js)

## See Also

- [OODA Terminal Alerts](/sdk/services/ooda-terminal-alerts) — Streaming alert queries
- [Error Handling](/sdk/error-handling) — Retry logic and error classes
