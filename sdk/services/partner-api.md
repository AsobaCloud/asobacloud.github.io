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
| KPI Rollup | `get_kpi_rollup()` / `getKpiRollup()` | Key performance indicators for a site (`EarKpis` + `FinancialKpis`; optional `battery` block) |
| Maintenance Signals | `get_maintenance_signals()` / `getMaintenanceSignals()` | Fault and anomaly signals by severity |
| Maintenance Schedule | `get_maintenance_schedule()` / `getMaintenanceSchedule()` | Preventive maintenance schedule (SEP-062) |
| Forecast Snapshot | `get_forecast_snapshot()` / `getForecastSnapshot()` | Pre-computed 24h solar forecast |
| Generic Snapshot | `get_snapshot()` / `getSnapshot()` | Fetch any snapshot kind by name |

Access via `client.partner` (Python) or `sdk.partner` (JavaScript).

---

## Configuration

```bash
export ASOBA_API_KEY=<your_api_key>
```

Endpoint defaults to `https://partner.api.asoba.co`. Optional override: `ASOBA_PARTNER_ENDPOINT`.

---

## Python

```python
import json
import time
from asoba import OnaClient

client = OnaClient()  # api_key from ASOBA_API_KEY
site_id = "Sibaya"

# ── KPI Rollup (with ETag caching demo) ──
start = time.time()
kpis = client.partner.get_kpi_rollup(site_id=site_id)
duration = (time.time() - start) * 1000
print(f"Fetch 1: {duration:.2f}ms")
print(json.dumps(kpis, indent=2, default=str))

# Second fetch — served from cache via 304 Not Modified
start2 = time.time()
cached_kpis = client.partner.get_kpi_rollup(site_id=site_id)
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
signals = client.partner.get_maintenance_signals(
    site_id=site_id,
    since='2025-11-01T00:00:00',
    severity="high",
)
for signal in signals.get('signals', []):
    print(f"  [{signal['severity']}] {signal['message']}")
```

### Forecast Snapshot

```python
forecast = client.partner.get_forecast_snapshot(site_id=site_id)
print(f"{forecast['horizon_hours']}h, {len(forecast['intervals'])} intervals")
```

### Maintenance Schedule (SEP-062)

```python
schedule = client.partner.get_maintenance_schedule(site_id=site_id)
summary = schedule.get("summary", {})
print(f"Horizon: {schedule.get('horizon')}")
print(f"Total tasks: {summary.get('total_tasks')}")
print(f"By priority: {summary.get('by_priority')}")

for task in schedule.get("tasks", [])[:3]:
    print(f"  - {task.get('task_type') or task.get('title')} (priority: {task['priority']})")
```

---

## JavaScript

```javascript
const { OnaSDK } = require('@asobacloud/sdk');

const sdk = new OnaSDK();  // apiKey from ASOBA_API_KEY
const siteId = 'Sibaya';

// ── KPI Rollup (with ETag caching demo) ──
const start = Date.now();
const kpis = await sdk.partner.getKpiRollup({ site_id: siteId });
console.log(`Fetch 1: ${Date.now() - start}ms`);
console.log(JSON.stringify(kpis, null, 2));

// Second fetch — served from cache
const start2 = Date.now();
const cachedKpis = await sdk.partner.getKpiRollup({ site_id: siteId });
console.log(`Fetch 2: ${Date.now() - start2}ms (cache hit)`);

// ── Maintenance Signals ──
const signals = await sdk.partner.getMaintenanceSignals({
  site_id: siteId,
  since: '2025-11-01T00:00:00',
  severity: 'high',
});

// ── Forecast Snapshot ──
const forecast = await sdk.partner.getForecastSnapshot({ site_id: siteId });
console.log(`${forecast.horizon_hours}h, ${forecast.intervals.length} intervals`);

// ── Maintenance Schedule (SEP-062) ──
const schedule = await sdk.partner.getMaintenanceSchedule({ site_id: siteId });
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
