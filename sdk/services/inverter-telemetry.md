---
title: "Inverter Telemetry"
layout: default
nav_order: 1
parent: "Service Guides"
grand_parent: "SDK"
---

# Inverter Telemetry

Query historical and stream live power output, energy, temperature, and state data from solar inverters, wind turbines, and battery systems.

**Requires:** `ASOBA_API_KEY` environment variable. Endpoint defaults to `https://telemetry.api.asoba.co`.

---

## Correct Workflow

Always call `get_data_period()` **first** to discover what time range has data. Querying a time range with no data returns an empty list silently — knowing the available range upfront avoids wasted calls.

1. `get_data_period()` → discover available timestamps
2. `get_inverter_telemetry()` → query historical data using discovered range
3. `stream_inverter()` / `stream_site()` → stream live data

---

## Python

```python
from asoba import OnaClient
from asoba.models.telemetry import TimeRange

client = OnaClient()  # api_key from ASOBA_API_KEY
it = client.inverter_telemetry

site_id = "Sibaya"
asset_id = "INV-1000000054495190"

# Step 1: Discover available data period
period = it.get_data_period(site_id=site_id)
print(f"Data from {period['first_record']} to {period['last_record']}")

# Step 2: Query historical 5-minute data
records = it.get_inverter_telemetry(
    asset_id=asset_id,
    site_id=site_id,
    time_range=TimeRange(
        start=period['first_record'],
        end="2025-11-01T06:00:00",
    ),
    resolution="5min",
    limit=10,
)
for r in records:
    print(f"  {r.timestamp}  power={r.power} kW  temp={r.temperature}°C  state={r.inverter_state}")

# Step 3: Query daily resolution
daily = it.get_inverter_telemetry(
    asset_id=asset_id,
    site_id=site_id,
    time_range=TimeRange(start="2025-11-01T00:00:00", end="2025-11-30T23:59:59"),
    resolution="daily",
    limit=30,
)
for r in daily[:5]:
    print(f"  {r.timestamp}  kWh={r.kWh}  PF={r.PF}")

# Step 4: Query all inverters at a site
site_data = it.get_site_telemetry(
    site_id=site_id,
    time_range=TimeRange(start=period['first_record'], end="2025-11-01T06:00:00"),
    resolution="5min",
    limit=20,
)
for inv_id, recs in site_data.items():
    print(f"  {inv_id}: {len(recs)} records")

# Step 5: Stream live data
for record in it.stream_inverter(
    asset_id=asset_id,
    site_id=site_id,
    polling_interval=30,
):
    print(f"  {record.timestamp}  power={record.power} kW  cursor={record.cursor[:24]}...")
    break  # remove break for continuous streaming

# Step 6: Resume from a saved cursor
for record in it.stream_inverter(
    asset_id=asset_id,
    site_id=site_id,
    cursor=saved_cursor,
    polling_interval=30,
):
    print(f"  {record.timestamp}  power={record.power} kW")

# Step 7: Stream all inverters at a site
for record in it.stream_site(site_id=site_id, polling_interval=30):
    print(f"  {record.asset_id} @ {record.timestamp}  power={record.power} kW")
```

### Expected Output

```
Data from 2025-11-01T02:40:00 to 2025-11-01T12:00:00
  2025-11-01T02:40:00  power=0.0 kW  temp=22.5°C  state=512
  2025-11-01T02:45:00  power=0.0 kW  temp=22.4°C  state=512
  ...
  2025-11-01T02:40:00  kWh=12.5  PF=0.98
  ...
  INV-1000000054495190: 48 records
  INV-1000000054495191: 48 records
```

---

## JavaScript

```javascript
const { OnaSDK } = require('@asobacloud/sdk');

const sdk = new OnaSDK();  // apiKey from ASOBA_API_KEY
const it = sdk.inverterTelemetry;
const siteId = 'Sibaya';
const assetId = 'INV-1000000054495190';

// Step 1: Discover available data period
const period = await it.getDataPeriod({ site_id: siteId });
console.log(`Data from ${period.first_record} to ${period.last_record}`);

// Step 2: Query historical 5-minute data
const records = await it.getInverterTelemetry({
  asset_id: assetId,
  site_id: siteId,
  time_range: { start: period.first_record, end: '2025-11-01T06:00:00' },
  resolution: '5min',
  limit: 10,
});
records.forEach(r =>
  console.log(`  ${r.timestamp}  power=${r.power} kW  temp=${r.temperature}°C  state=${r.inverter_state}`)
);

// Step 3: Query daily resolution
const daily = await it.getInverterTelemetry({
  asset_id: assetId,
  site_id: siteId,
  time_range: { start: '2025-11-01T00:00:00', end: '2025-11-30T23:59:59' },
  resolution: 'daily',
  limit: 30,
});
daily.slice(0, 5).forEach(r => console.log(`  ${r.timestamp}  kWh=${r.kWh}  PF=${r.PF}`));

// Step 4: Query all inverters at a site
const siteData = await it.getSiteTelemetry({
  site_id: siteId,
  time_range: { start: period.first_record, end: '2025-11-01T06:00:00' },
  resolution: '5min',
  limit: 20,
});
Object.entries(siteData).forEach(([id, recs]) =>
  console.log(`  ${id}: ${recs.length} records`)
);

// Step 5: Stream live data
for await (const record of it.streamInverter({
  asset_id: assetId,
  site_id: siteId,
  polling_interval: 30,
})) {
  console.log(`  ${record.timestamp}  power=${record.power} kW  cursor=${record.cursor.slice(0, 24)}...`);
  break; // remove break for continuous streaming
}

// Step 6: Resume from a saved cursor
for await (const record of it.streamInverter({
  asset_id: assetId,
  site_id: siteId,
  cursor: savedCursor,
  polling_interval: 30,
})) {
  console.log(`  ${record.timestamp}  power=${record.power} kW`);
}

// Step 7: Stream all inverters at a site
for await (const record of it.streamSite({
  site_id: siteId,
  polling_interval: 30,
})) {
  console.log(`  ${record.asset_id} @ ${record.timestamp}  power=${record.power} kW`);
}
```

---

## Resolution Options

| Resolution | Description | Use case |
|------------|-------------|----------|
| `5min` | 5-minute interval data (default) | Real-time monitoring, detailed analysis |
| `daily` | Daily aggregated data | Long-term reporting, trend analysis |

---

## Cursor-Based Pagination

Each record returned by a stream includes a `cursor` field — an opaque token encoding the asset ID and last-seen timestamp. Save it to resume the stream from that exact position:

```python
# Save cursor for crash recovery
saved_cursor = record.cursor

# Resume later — only records after the saved position are returned
for record in it.stream_inverter(
    asset_id=asset_id,
    site_id=site_id,
    cursor=saved_cursor,
    polling_interval=30,
):
    process(record)
```

---

## Method Reference

| Python | JavaScript | Description |
|--------|------------|-------------|
| `get_inverter_telemetry()` | `getInverterTelemetry()` | Historical data for a single inverter |
| `get_site_telemetry()` | `getSiteTelemetry()` | Historical data for all inverters at a site |
| `get_data_period()` | `getDataPeriod()` | Discover available data time range |
| `stream_inverter()` | `streamInverter()` | Stream live data from a single inverter |
| `stream_site()` | `streamSite()` | Stream live data from all inverters at a site |

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `asset_id` | string | required | Inverter identifier |
| `site_id` | string | required | Site identifier |
| `time_range` | `TimeRange` / `{start, end}` | required | Query time window (max 31 days) |
| `resolution` | string | `"5min"` | `"5min"` or `"daily"` |
| `limit` | int | 100 | Max records per query (max 1000) |
| `cursor` | string | None | Resume pagination from saved position |
| `polling_interval` | float | 5 | Seconds between polls for streaming (min 5) |

---

## Full Example

- [Python](https://github.com/AsobaCloud/sdk/blob/main/python/examples/inverter_telemetry_example.py)
- [JavaScript](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/inverter-telemetry-example.js)
