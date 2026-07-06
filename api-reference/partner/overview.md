---
title: "Partner API"
layout: default
nav_order: 2
parent: "Reference"
has_children: true
---

# Partner API Overview

The Partner API provides high-performance access to pre-computed JSON snapshots of site data. It is specifically designed for embedding into partner dashboards and third-party applications where low latency and high reliability are critical.

## Key Features

- **Blazing Fast**: Responses are served directly from a high-performance cache.
- **Efficient Caching**: Full support for ETag-based conditional GETs (HTTP 304).
- **Reduced Bandwidth**: Only download data when it has actually changed.
- **Simplified Auth**: Uses a simple API key scoped to specific sites.

## Base URL

```
https://api.asoba.org
```

## Authentication

The Partner API uses an `x-api-key` header for authentication. This key is specifically scoped to the sites you are permitted to access.

```bash
x-api-key: YOUR_PARTNER_API_KEY
```

---

## Snapshot Types

The following pre-computed snapshots are currently available:

| Endpoint | Description |
|----------|-------------|
| `/kpi-rollup` | Aggregated performance metrics (system PR, availability, energy-at-risk, financial). |
| `/maintenance-signals` | Detected anomalies and prioritised maintenance signals. |
| `/forecast-snapshot` | Latest 24-hour solar production forecast (per-interval p10/p50/p90 + revenue). |
| `/maintenance-schedule` | Preventive-maintenance task list for the next 90 days (per inverter). |
| `/snapshot` | Generic access to other site-specific snapshot collections (by `kind`). |

---

## ETag Caching

To minimize latency and data transfer, the Partner API includes an `ETag` header in every successful response. When making subsequent requests, you should include this value in the `If-None-Match` header.

- If the data has **not changed**, the server will return an empty **HTTP 304 Not Modified** response.
- If the data **has changed**, the server will return **HTTP 200 OK** with the fresh data and a new ETag.

The Ona SDK handles this caching logic automatically.

---

## Endpoints

### KPI Rollup Snapshot
`GET /kpi-rollup`

Returns a summary of key performance indicators for the site.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `site_id` | string | Yes | The identifier for the site (e.g., `Sibaya`). |

<div class="code-examples-section">
  <div class="code-examples-tabs">
    <button class="code-tab active" data-tab="python">Python</button>
    <button class="code-tab" data-tab="javascript">JavaScript</button>
    <button class="code-tab" data-tab="curl">cURL</button>
  </div>
  
  <div class="code-example-card" data-language="python">
    <pre><code>from ona_platform import OnaClient

client = OnaClient(partner_api_key="your_key")
snapshot = client.partner_api.get_kpi_rollup(site_id="Sibaya")
print(snapshot['performance']['system_pr'])</code></pre>
  </div>
  
  <div class="code-example-card" data-language="javascript" style="display: none;">
    <pre><code>const { OnaSDK } = require('@asoba/ona-sdk');

const sdk = new OnaSDK({ partnerApiKey: 'your_key' });
const snapshot = await sdk.partnerApi.getKpiRollup({ site_id: 'Sibaya' });
console.log(snapshot.performance.system_pr);</code></pre>
  </div>
  
  <div class="code-example-card" data-language="curl" style="display: none;">
    <pre><code>curl -i -X GET "https://api.asoba.org/kpi-rollup?site_id=Sibaya" \
  -H "x-api-key: YOUR_PARTNER_API_KEY"</code></pre>
  </div>
</div>

---

### Maintenance Signals
`GET /maintenance-signals`

Returns active alerts and prioritized maintenance tasks.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `site_id` | string | Yes | The identifier for the site. |
| `since` | string | No | Filter signals occurring after this timestamp (ISO 8601). |
| `severity` | string | No | Filter by severity: `Critical`, `High`, `Medium`, `Low`. |

<div class="code-examples-section">
  <div class="code-examples-tabs">
    <button class="code-tab active" data-tab="python">Python</button>
    <button class="code-tab" data-tab="javascript">JavaScript</button>
    <button class="code-tab" data-tab="curl">cURL</button>
  </div>
  
  <div class="code-example-card" data-language="python">
    <pre><code>signals = client.partner_api.get_maintenance_signals(
    site_id="Sibaya", 
    severity="High"
)</code></pre>
  </div>
  
  <div class="code-example-card" data-language="javascript" style="display: none;">
    <pre><code>const signals = await sdk.partnerApi.getMaintenanceSignals({ 
  site_id: 'Sibaya', 
  severity: 'High' 
});</code></pre>
  </div>
  
  <div class="code-example-card" data-language="curl" style="display: none;">
    <pre><code>curl -X GET "https://api.asoba.org/maintenance-signals?site_id=Sibaya&severity=critical" \
  -H "x-api-key: YOUR_PARTNER_API_KEY"</code></pre>
  </div>
</div>

---

### Forecast Snapshot
`GET /forecast-snapshot`

Returns the most recent solar energy forecast rollup for the entire site.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `site_id` | string | Yes | The identifier for the site. |
| `horizon` | string | No | Forecast window (e.g., `24h`, `48h`). Defaults to `24h`. |

<div class="code-examples-section">
  <div class="code-examples-tabs">
    <button class="code-tab active" data-tab="python">Python</button>
    <button class="code-tab" data-tab="javascript">JavaScript</button>
    <button class="code-tab" data-tab="curl">cURL</button>
  </div>
  
  <div class="code-example-card" data-language="python">
    <pre><code>forecast = client.partner_api.get_forecast_snapshot(site_id="Sibaya")</code></pre>
  </div>
  
  <div class="code-example-card" data-language="javascript" style="display: none;">
    <pre><code>const forecast = await sdk.partnerApi.getForecastSnapshot({ site_id: 'Sibaya' });</code></pre>
  </div>
  
  <div class="code-example-card" data-language="curl" style="display: none;">
    <pre><code>curl -X GET "https://api.asoba.org/forecast-snapshot?site_id=Sibaya" \
  -H "x-api-key: YOUR_PARTNER_API_KEY"</code></pre>
  </div>
</div>

---

### Maintenance Schedule
`GET /maintenance-schedule`

Returns the preventive-maintenance task list for the next 90 days, derived per inverter from
detected anomaly frequency and manufacturer service intervals.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `site_id` | string | Yes | The identifier for the site. |

#### Response shape
```json
{
  "site_id": "Sibaya",
  "generated_at": "2026-05-30T03:39:39Z",
  "horizon": { "start": "2026-05-30", "end": "2026-08-28" },
  "tasks": [
    {
      "asset_id": "INV-1000000054495190",
      "task_type": "inspection",
      "reason": "35 anomalies detected in the last 2 days",
      "recommended_date": "2026-06-06",
      "estimated_duration_hours": 2.0,
      "priority": "High"
    }
  ],
  "summary": { "total_tasks": 5, "by_priority": { "High": 5 }, "by_task_type": { "inspection": 5 } }
}
```

<div class="code-examples-section">
  <div class="code-examples-tabs">
    <button class="code-tab active" data-tab="python">Python</button>
    <button class="code-tab" data-tab="javascript">JavaScript</button>
    <button class="code-tab" data-tab="curl">cURL</button>
  </div>

  <div class="code-example-card" data-language="python">
    <pre><code>schedule = client.partner_api.get_maintenance_schedule(site_id="Sibaya")
print(schedule['summary']['total_tasks'])
for task in schedule['tasks']:
    print(task['recommended_date'], task['asset_id'], task['task_type'], task['priority'])</code></pre>
  </div>

  <div class="code-example-card" data-language="javascript" style="display: none;">
    <pre><code>const schedule = await sdk.partnerApi.getMaintenanceSchedule({ site_id: 'Sibaya' });
console.log(schedule.summary.total_tasks);</code></pre>
  </div>

  <div class="code-example-card" data-language="curl" style="display: none;">
    <pre><code>curl -X GET "https://api.asoba.org/maintenance-schedule?site_id=Sibaya" \
  -H "x-api-key: YOUR_PARTNER_API_KEY"</code></pre>
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
        
        // Update active tab in this section
        tabs.forEach(t => t.classList.toggle('active', t === this));
        
        // Show/hide cards in this section
        cards.forEach(card => {
          if (card.getAttribute('data-language') === targetLang) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
});
</script>
