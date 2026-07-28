---
title: "OODA Terminal Alerts"
layout: default
nav_order: 2
parent: "Service Guides"
grand_parent: "SDK"
---

# OODA Terminal Alerts

Query and stream OODA (Observe, Orient, Decide, Act) fault detection and diagnostic alerts from terminal devices.

**Requires:** `OODA_TERMINAL_ENDPOINT` and `OODA_TERMINAL_API_KEY` environment variables.

---

## Python

```python
from datetime import datetime, timedelta
from ona_platform import OnaClient
from ona_platform.models.ooda import TimeRange

client = OnaClient()
ot = client.ooda_terminal

site_id = "Sibaya"
terminal_device_id = "TERM-1000000054495190"

# 1. Discover available data period
period = ot.get_data_period(site_id=site_id)
print(f"Site: {period.site_id}")
print(f"First record: {period.first_record}")
print(f"Last record: {period.last_record}")

# 2. Query terminal alerts for the last 24 hours
end_time = datetime.now()
start_time = end_time - timedelta(hours=24)
time_range = TimeRange(start=start_time.isoformat(), end=end_time.isoformat())

alerts = ot.get_terminal_alerts(
    terminal_device_id=terminal_device_id,
    site_id=site_id,
    time_range=time_range,
    resolution="5min",
    limit=10,
)
print(f"Found {len(alerts)} alerts")
for alert in alerts[:3]:
    print(f"  {alert.timestamp}: {alert.alert_severity.upper()} - {alert.message}")

# 3. Query site alerts (all terminal devices)
site_alerts = ot.get_site_alerts(
    site_id=site_id,
    time_range=time_range,
    resolution="5min",
    limit=5,
)
total = sum(len(a) for a in site_alerts.values())
print(f"Found {total} alerts across {len(site_alerts)} terminal devices")

# 4. Stream live terminal alerts
for alert in ot.stream_terminal(
    terminal_device_id=terminal_device_id,
    site_id=site_id,
    polling_interval=5,
):
    print(f"  {alert.timestamp}: {alert.alert_severity.upper()} - {alert.message}")

# 5. Cursor-based pagination
cursor = None
page_num = 1
while page_num <= 2:
    alerts = ot.get_terminal_alerts(
        terminal_device_id=terminal_device_id,
        site_id=site_id,
        time_range=time_range,
        limit=3,
        cursor=cursor,
    )
    if not alerts:
        break
    print(f"Page {page_num}: {len(alerts)} alerts")
    cursor = alerts[-1].cursor
    page_num += 1
```

---

## JavaScript

```javascript
const { OnaSDK } = require('./src/index');

const sdk = new OnaSDK({
  endpoints: {
    oodaTerminal: process.env.OODA_TERMINAL_ENDPOINT,
  },
  oodaTerminalApiKey: process.env.OODA_TERMINAL_API_KEY,
});

const ot = sdk.oodaTerminal;
const siteId = 'Sibaya';
const terminalDeviceId = 'TERM-1000000054495190';

// 1. Discover available data period
const dataPeriod = await ot.getDataPeriod({ site_id: siteId });
console.log(`Site: ${dataPeriod.site_id}`);
console.log(`First record: ${dataPeriod.first_record}`);
console.log(`Last record: ${dataPeriod.last_record}`);

// 2. Query terminal alerts for the last 24 hours
const endTime = new Date();
const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);
const timeRange = { start: startTime.toISOString(), end: endTime.toISOString() };

const alerts = await ot.getTerminalAlerts({
  terminal_device_id: terminalDeviceId,
  site_id: siteId,
  time_range: timeRange,
  resolution: '5min',
  limit: 10,
});
console.log(`Found ${alerts.length} alerts`);
alerts.slice(0, 3).forEach(alert => {
  console.log(`  ${alert.timestamp}: ${alert.alert_severity.toUpperCase()} - ${alert.message}`);
});

// 3. Query site alerts (all terminal devices)
const siteAlerts = await ot.getSiteAlerts({
  site_id: siteId,
  time_range: timeRange,
  resolution: '5min',
  limit: 5,
});
const totalAlerts = Object.values(siteAlerts).reduce((sum, a) => sum + a.length, 0);
console.log(`Found ${totalAlerts} alerts across ${Object.keys(siteAlerts).length} devices`);

// 4. Stream live terminal alerts
for await (const alert of ot.streamTerminal({
  terminal_device_id: terminalDeviceId,
  site_id: siteId,
  polling_interval: 5,
})) {
  console.log(`  ${alert.timestamp}: ${alert.alert_severity.toUpperCase()} - ${alert.message}`);
}

// 5. Cursor-based pagination
let cursor = null;
let pageNum = 1;
while (pageNum <= 2) {
  const pageAlerts = await ot.getTerminalAlerts({
    terminal_device_id: terminalDeviceId,
    site_id: siteId,
    time_range: timeRange,
    limit: 3,
    cursor: cursor,
  });
  if (pageAlerts.length === 0) break;
  console.log(`Page ${pageNum}: ${pageAlerts.length} alerts`);
  cursor = pageAlerts[pageAlerts.length - 1].cursor;
  pageNum++;
}
```

---

## Alert Severity Levels

Alerts include an `alert_severity` field with the following levels:

| Severity | Description |
|----------|-------------|
| `critical` | Immediate action required — asset at risk |
| `major` | Significant fault — schedule maintenance |
| `moderate` | Warning — monitor closely |
| `minor` | Informational — log for trend analysis |
| `normal` | No fault detected |

---

## Method Reference

| Python | JavaScript | Description |
|--------|------------|-------------|
| `get_terminal_alerts()` | `getTerminalAlerts()` | Historical alerts for a single terminal device |
| `get_site_alerts()` | `getSiteAlerts()` | Historical alerts for all terminal devices at a site |
| `get_data_period()` | `getDataPeriod()` | Discover available alert time range |
| `stream_terminal()` | `streamTerminal()` | Stream live alerts from a single terminal device |
| `stream_site()` | `streamSite()` | Stream live alerts from all terminal devices at a site |

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `terminal_device_id` | string | required | Terminal device identifier |
| `site_id` | string | required | Site identifier |
| `time_range` | `TimeRange` / `{start, end}` | required | Query time window (max 31 days) |
| `resolution` | string | `"5min"` | `"5min"` or `"daily"` |
| `limit` | int | 100 | Max records per query (max 1000) |
| `cursor` | string | None | Resume pagination from saved position |
| `polling_interval` | float | 5 | Seconds between polls for streaming (min 5) |

---

## Full Example

- [Python](https://github.com/AsobaCloud/sdk/blob/main/python/examples/ooda_terminal_example.py)
- [JavaScript](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/ooda-terminal-example.js)
