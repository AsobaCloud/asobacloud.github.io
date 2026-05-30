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
https://af5jy5ob3e.execute-api.af-south-1.amazonaws.com/prod
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

Always call this endpoint first to discover the time range for which data is actually available. 

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `site_id` | string | Yes | Site identifier. |
| `asset_id` | string | No | Optional filter for a specific inverter. |

<div class="code-examples-section">
  <div class="code-examples-tabs">
    <button class="code-tab active" data-tab="python">Python</button>
    <button class="code-tab" data-tab="javascript">JavaScript</button>
  </div>
  
  <div class="code-example-card" data-language="python">
    <pre><code>from ona_platform import OnaClient

client = OnaClient(inverter_telemetry_api_key="your_key")
period = client.inverter_telemetry.get_data_period(site_id="Sibaya")
print(f"Data from {period['first_record']} to {period['last_record']}")</code></pre>
  </div>
  
  <div class="code-example-card" data-language="javascript" style="display: none;">
    <pre><code>const { OnaSDK } = require('@asoba/ona-sdk');

const sdk = new OnaSDK({ inverterTelemetryApiKey: 'your_key' });
const period = await sdk.inverterTelemetry.getDataPeriod({ site_id: 'Sibaya' });
console.log(`Data from ${period.first_record} to ${period.last_record}`);</code></pre>
  </div>
</div>

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
| `resolution` | string | No | Data resolution: `5min` or `daily`. |

<div class="code-examples-section">
  <div class="code-examples-tabs">
    <button class="code-tab active" data-tab="python">Python</button>
    <button class="code-tab" data-tab="javascript">JavaScript</button>
  </div>
  
  <div class="code-example-card" data-language="python">
    <pre><code>from ona_platform.models.telemetry import TimeRange

records = client.inverter_telemetry.get_inverter_telemetry(
    asset_id="INV-123",
    site_id="Sibaya",
    time_range=TimeRange(start="2025-01-01T00:00:00", end="2025-01-01T12:00:00")
)</code></pre>
  </div>
  
  <div class="code-example-card" data-language="javascript" style="display: none;">
    <pre><code>const records = await sdk.inverterTelemetry.getInverterTelemetry({
  asset_id: 'INV-123',
  site_id: 'Sibaya',
  start: '2025-01-01T00:00:00',
  end: '2025-01-01T12:00:00'
});</code></pre>
  </div>
</div>

---

## Live Streaming

### Stream Inverter
The SDK will poll the API every few seconds and yield new records as they arrive.

<div class="code-examples-section">
  <div class="code-examples-tabs">
    <button class="code-tab active" data-tab="python">Python</button>
    <button class="code-tab" data-tab="javascript">JavaScript</button>
  </div>
  
  <div class="code-example-card" data-language="python">
    <pre><code>for record in client.inverter_telemetry.stream_inverter(
    asset_id="INV-123",
    site_id="Sibaya",
    polling_interval=30
):
    print(f"{record.timestamp}: {record.power} kW")</code></pre>
  </div>
  
  <div class="code-example-card" data-language="javascript" style="display: none;">
    <pre><code>for await (const record of sdk.inverterTelemetry.streamInverter({
  asset_id: 'INV-123',
  site_id: 'Sibaya',
  polling_interval: 30
})) {
  console.log(`${record.timestamp}: ${record.power} kW`);
}</code></pre>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.code-examples-section').forEach(section => {
    const tabs = section.querySelectorAll('.code-tab');
    const cards = section.querySelectorAll('.code-example-card');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const targetLang = this.getAttribute('data-tab');
        tabs.forEach(t => t.classList.toggle('active', t === this));
        cards.forEach(card => {
          card.style.display = card.getAttribute('data-language') === targetLang ? 'block' : 'none';
        });
      });
    });
  });
});
</script>
