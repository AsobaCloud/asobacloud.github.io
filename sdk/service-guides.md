---
title: "Service Guides"
layout: default
nav_order: 4
parent: "SDK"
has_children: true
---

# Service Guides

Each guide covers a specific service client with code examples in both Python and JavaScript, parameter references, and expected output.

| # | Service | API Key | Description |
|---|---------|---------|-------------|
| 1 | [Inverter Telemetry](/sdk/services/inverter-telemetry) | ✅ | Query historical and stream live inverter data (5-min and daily resolution) |
| 2 | [OODA Terminal Alerts](/sdk/services/ooda-terminal-alerts) | ✅ | Query and stream fault/diagnostic alerts from terminal devices |
| 3 | [Forecasting](/sdk/services/forecasting) | AWS | Device, site, and customer-level energy forecasts |
| 4 | [Freemium Forecasting](/sdk/services/freemium-forecasting) | ❌ | No-key CSV-based solar forecasting with email verification |
| 5 | [Terminal OODA Workflow](/sdk/services/terminal-ooda-workflow) | AWS | Full OODA loop: detect, diagnose, schedule, build BOM, create orders |
| 6 | [Partner API](/sdk/services/partner-api) | ✅ | Pre-computed JSON snapshots with ETag caching (sub-100ms) |
| 7 | [Energy Analyst](/sdk/services/energy-analyst) | URL | RAG-powered energy policy and regulatory queries |
| 8 | [Edge Devices](/sdk/services/edge-devices) | URL | Device discovery, registration, capability detection |
| 9 | [Data Ingestion & Training](/sdk/services/data-ingestion-training) | AWS | Upload data, train models, standardize, detect gaps, interpolate |
| 10 | [PV Insight Service](/sdk/services/pv-insight) | URL | JEPA anomaly → O&M recommendation via hybrid RAG (preview) |
| 11 | [Nehanda ML Proxy](/sdk/services/nehanda-ml-proxy) | ❌ | OpenAI-compatible API Gateway proxy to SageMaker vLLM |

---

## Quick Start

```python
# Python
from ona_platform import OnaClient
client = OnaClient()
records = client.inverter_telemetry.get_inverter_telemetry(
    asset_id='INV-1000000054495190',
    site_id='Sibaya',
    time_range={'start': '2025-11-01T00:00:00', 'end': '2025-11-01T12:00:00'},
    resolution='5min',
    limit=100,
)
```

```javascript
// JavaScript
const { OnaSDK } = require('./src/index');
const sdk = new OnaSDK({
  endpoints: { inverterTelemetry: process.env.INVERTER_TELEMETRY_ENDPOINT },
  inverterTelemetryApiKey: process.env.INVERTER_TELEMETRY_API_KEY,
});

const records = await sdk.inverterTelemetry.getInverterTelemetry({
  asset_id: 'INV-1000000054495190',
  site_id: 'Sibaya',
  time_range: { start: '2025-11-01T00:00:00', end: '2025-11-01T12:00:00' },
  resolution: '5min',
  limit: 100,
});
```

---

## Full Examples

Complete working examples for every service are in the SDK repository:

- **Python**: [sdk/python/examples/](https://github.com/AsobaCloud/sdk/tree/main/python/examples)
- **JavaScript**: [sdk/javascript/examples/](https://github.com/AsobaCloud/sdk/tree/main/javascript/examples)
