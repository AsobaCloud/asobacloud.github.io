---
title: "Inverter Telemetry"
layout: default
nav_order: 3
parent: "Reference"
has_children: true
---

# Inverter Telemetry API

The Inverter Telemetry API provides high-resolution historical data and live streaming capabilities for solar inverters. Access is gated by API keys scoped to specific sites.

## Base URL

```
https://telemetry.api.asoba.org
```

## Authentication

Authentication is handled via the `x-api-key` header.

```bash
x-api-key: YOUR_API_KEY
```

---

## Data Discovery

### Get Data Period
`GET /telemetry/data-period`

Always call this endpoint first to discover the time range for which data is actually available. Querying an empty time window returns an empty list, so knowing the available range upfront avoids wasted calls.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `site_id` | string | Yes | Site identifier. |
| `asset_id` | string | No | Optional filter for a specific inverter. |

#### Code Example
{% tabs tel_period %}
{% tab tel_period Python %}
```python
from ona_platform import OnaClient

client = OnaClient(inverter_telemetry_api_key="your_key")
period = client.inverter_telemetry.get_data_period(site_id="Sibaya")
print(f"Data from {period['first_record']} to {period['last_record']}")
```
{% endtab %}
{% tab tel_period JavaScript %}
```javascript
const { OnaSDK } = require('@asoba/ona-sdk');

const sdk = new OnaSDK({ inverterTelemetryApiKey: 'your_key' });
const period = await sdk.inverterTelemetry.getDataPeriod({ site_id: 'Sibaya' });
console.log(`Data from ${period.first_record} to ${period.last_record}`);
```
{% endtab %}
{% endtabs %}

---

## Historical Telemetry

### Get Inverter Telemetry
`GET /telemetry/inverter`

Retrieve historical records for a specific inverter.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset_id` | string | Yes | Inverter identifier. |
| `site_id` | string | Yes | Site identifier. |
| `start` | string | Yes | ISO 8601 start timestamp. |
| `end` | string | Yes | ISO 8601 end timestamp. |
| `resolution` | string | No | Data resolution: `5min` or `daily`. Defaults to `5min`. |
| `limit` | integer | No | Max records to return (max 1000). |
| `cursor` | string | No | Token for pagination. |

#### Code Example
{% tabs tel_inv %}
{% tab tel_inv Python %}
```python
from ona_platform.models.telemetry import TimeRange

records = client.inverter_telemetry.get_inverter_telemetry(
    asset_id="INV-123",
    site_id="Sibaya",
    time_range=TimeRange(start="2025-01-01T00:00:00", end="2025-01-01T12:00:00")
)
```
{% endtab %}
{% tab tel_inv JavaScript %}
```javascript
const records = await sdk.inverterTelemetry.getInverterTelemetry({
  asset_id: 'INV-123',
  site_id: 'Sibaya',
  start: '2025-01-01T00:00:00',
  end: '2025-01-01T12:00:00'
});
```
{% endtab %}
{% endtabs %}

---

## Live Streaming

The Ona SDK supports live streaming via polling. It handles cursor management and reconnections automatically.

### Stream Inverter
The SDK will poll the API every few seconds and yield new records as they arrive.

#### Code Example
{% tabs tel_stream %}
{% tab tel_stream Python %}
```python
for record in client.inverter_telemetry.stream_inverter(
    asset_id="INV-123",
    site_id="Sibaya",
    polling_interval=30
):
    print(f"{record.timestamp}: {record.power} kW")
```
{% endtab %}
{% tab tel_stream JavaScript %}
```javascript
for await (const record of sdk.inverterTelemetry.streamInverter({
  asset_id: 'INV-123',
  site_id: 'Sibaya',
  polling_interval: 30
})) {
  console.log(`${record.timestamp}: ${record.power} kW`);
}
```
{% endtab %}
{% endtabs %}
