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
https://partner.api.asoba.org
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
| `/kpi-rollup` | Aggregated performance metrics (PR, Availability, Yield). |
| `/maintenance-signals` | Active alerts and maintenance recommendations. |
| `/forecast-snapshot` | Latest 24-hour solar production forecast. |
| `/snapshot` | Generic access to other site-specific data collections. |

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

Returns a summary of key performance indicators for the site, typically used for high-level "pulse" dashboards.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `site_id` | string | Yes | The identifier for the site (e.g., `Sibaya`). |

#### Code Example
{% tabs partner_kpi %}
{% tab partner_kpi Python %}
```python
from ona_platform import OnaClient

client = OnaClient(partner_api_key="your_key")
snapshot = client.partner_api.get_kpi_rollup(site_id="Sibaya")
print(snapshot['metrics']['performance_ratio'])
```
{% endtab %}
{% tab partner_kpi JavaScript %}
```javascript
const { OnaSDK } = require('@asoba/ona-sdk');

const sdk = new OnaSDK({ partnerApiKey: 'your_key' });
const snapshot = await sdk.partnerApi.getKpiRollup({ site_id: 'Sibaya' });
console.log(snapshot.metrics.performance_ratio);
```
{% endtab %}
{% tab partner_kpi cURL %}
```bash
curl -i -X GET "https://partner.api.asoba.org/kpi-rollup?site_id=Sibaya" \
  -H "x-api-key: YOUR_PARTNER_API_KEY"
```
{% endtab %}
{% endtabs %}

---

### Maintenance Signals
`GET /maintenance-signals`

Returns active alerts, fault detections, and prioritized maintenance tasks for the site.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `site_id` | string | Yes | The identifier for the site. |
| `since` | string | No | Filter signals occurring after this timestamp (ISO 8601). |
| `severity` | string | No | Filter by severity: `critical`, `major`, `minor`. |

#### Code Example
{% tabs partner_maint %}
{% tab partner_maint Python %}
```python
signals = client.partner_api.get_maintenance_signals(
    site_id="Sibaya", 
    severity="critical"
)
```
{% endtab %}
{% tab partner_maint JavaScript %}
```javascript
const signals = await sdk.partnerApi.getMaintenanceSignals({ 
  site_id: 'Sibaya', 
  severity: 'critical' 
});
```
{% endtab %}
{% tab partner_maint cURL %}
```bash
curl -X GET "https://partner.api.asoba.org/maintenance-signals?site_id=Sibaya&severity=critical" \
  -H "x-api-key: YOUR_PARTNER_API_KEY"
```
{% endtab %}
{% endtabs %}

---

### Forecast Snapshot
`GET /forecast-snapshot`

Returns the most recent solar energy forecast rollup for the entire site.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `site_id` | string | Yes | The identifier for the site. |
| `horizon` | string | No | Forecast window (e.g., `24h`, `48h`). Defaults to `24h`. |

#### Code Example
{% tabs partner_forecast %}
{% tab partner_forecast Python %}
```python
forecast = client.partner_api.get_forecast_snapshot(site_id="Sibaya")
```
{% endtab %}
{% tab partner_forecast JavaScript %}
```javascript
const forecast = await sdk.partnerApi.getForecastSnapshot({ site_id: 'Sibaya' });
```
{% endtab %}
{% tab partner_forecast cURL %}
```bash
curl -X GET "https://partner.api.asoba.org/forecast-snapshot?site_id=Sibaya" \
  -H "x-api-key: YOUR_PARTNER_API_KEY"
```
{% endtab %}
{% endtabs %}
