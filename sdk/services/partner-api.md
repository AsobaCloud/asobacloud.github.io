---
title: "Partner API"
layout: default
nav_order: 6
parent: "Service Guides"
grand_parent: "SDK"
---

# Partner API

The Partner API provides pre-computed JSON snapshots optimized for embedding and partner integrations. It uses **ETag-based conditional GETs** and in-memory caching to deliver sub-100ms response times on repeated requests.

## Available Snapshots

| Endpoint | Method | Description |
|----------|--------|-------------|
| KPI Rollup | `get_kpi_rollup()` | Key performance indicators for a site |
| Maintenance Signals | `get_maintenance_signals()` | Fault and anomaly signals by severity |
| Maintenance Schedule | `get_maintenance_schedule()` | Preventive maintenance schedule (SEP-062) |
| Forecast Snapshot | `get_forecast_snapshot()` | Pre-computed forecast results |
| Battery Health | `get_battery_health()` | Battery SOH and warranty tracking |

---

## Configuration

Set the Partner API endpoint and key:

```bash
export PARTNER_API_ENDPOINT=https://api.asoba.org
export PARTNER_API_KEY=<your_api_key>
```

> The same API key works for all Ona endpoints.

---

## Python

```python
import json
import time
from ona_platform import OnaClient

client = OnaClient(
    partner_api_endpoint=os.getenv("PARTNER_API_ENDPOINT"),
    partner_api_key=os.getenv("PARTNER_API_KEY")
)

site_id = "Sibaya"

# ── KPI Rollup (with ETag caching demo) ──
start = time.time()
kpis = client.partner_api.get_kpi_rollup(site_id=site_id)
duration = (time.time() - start) * 1000
print(f"Fetch 1: {duration:.2f}ms")
print(json.dumps(kpis, indent=2))

# Second fetch — served from cache via 304 Not Modified
start2 = time.time()
cached_kpis = client.partner_api.get_kpi_rollup(site_id=site_id)
duration2 = (time.time() - start2) * 1000
print(f"Fetch 2: {duration2:.2f}ms (cache hit)")
```

**Expected output:**
```
Fetch 1: 145.32ms
Fetch 2: 3.12ms (cache hit)
✅ Second fetch was faster (served from cache via 304 Not Modified)
```

### Maintenance Signals

```python
signals = client.partner_api.get_maintenance_signals(
    site_id=site_id,
    severity="high"
)
for signal in signals.get('signals', []):
    print(f"  [{signal['severity']}] {signal['message']}")
```

### Maintenance Schedule (SEP-062)

```python
schedule = client.partner_api.get_maintenance_schedule(site_id=site_id)
summary = schedule.get("summary", {})
print(f"Horizon: {schedule.get('horizon')}")
print(f"Total tasks: {summary.get('total_tasks')}")
print(f"By priority: {summary.get('by_priority')}")

for task in schedule.get("tasks", [])[:3]:
    print(f"  - {task['title']} (priority: {task['priority']})")
```

---

## JavaScript

```javascript
const { OnaSDK } = require('../src/index');

const sdk = new OnaSDK({
  endpoints: {
    partnerApi: process.env.PARTNER_API_ENDPOINT,
  },
  partnerApiKey: process.env.PARTNER_API_KEY,
});

const siteId = 'Sibaya';

// ── KPI Rollup (with ETag caching demo) ──
const start = Date.now();
const kpis = await sdk.partnerApi.getKpiRollup({ site_id: siteId });
console.log(`Fetch 1: ${Date.now() - start}ms`);
console.log(JSON.stringify(kpis, null, 2));

// Second fetch — served from cache
const start2 = Date.now();
const cachedKpis = await sdk.partnerApi.getKpiRollup({ site_id: siteId });
console.log(`Fetch 2: ${Date.now() - start2}ms (cache hit)`);

// ── Maintenance Signals ──
const signals = await sdk.partnerApi.getMaintenanceSignals({
  site_id: siteId,
  severity: 'high',
});

// ── Maintenance Schedule (SEP-062) ──
const schedule = await sdk.partnerApi.getMaintenanceSchedule({ site_id: siteId });
console.log('Horizon:', schedule.horizon);
console.log('Total tasks:', schedule.summary.total_tasks);
console.log('By priority:', JSON.stringify(schedule.summary.by_priority));
```

---

## How ETag Caching Works

1. **First request**: The server returns the JSON payload with an `ETag` header (a content hash).
2. **Subsequent requests**: The SDK automatically sends `If-None-Match: <etag>`. If the data hasn't changed, the server responds with `304 Not Modified` and no body — the SDK returns the cached response.
3. **Data changes**: When the underlying data updates, the server returns a new `ETag` and the full payload.

This means repeated polling for snapshots (e.g., in a dashboard) costs almost nothing after the first fetch.

---

## Full Example

- [Python: partner_api_example.py](https://github.com/AsobaCloud/sdk/blob/main/python/examples/partner_api_example.py)
- [JavaScript: partner-api-example.js](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/partner-api-example.js)

## See Also

- [Authentication](/sdk/authentication) — API key configuration
- [Error Handling](/sdk/error-handling) — Retry logic and rate limiting
