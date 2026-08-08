---
title: "Service Guides"
layout: default
nav_order: 4
parent: "SDK"
has_children: true
---

# Service Guides

Each guide covers a specific service client with code examples in both Python and JavaScript, parameter references, and expected output.

| # | Service | Auth | Description |
|---|---------|------|-------------|
| 1 | [Inverter Telemetry](/sdk/services/inverter-telemetry) | `ASOBA_API_KEY` | Query historical and stream live inverter data (5-min and daily resolution) |
| 2 | [OODA Terminal Alerts](/sdk/services/ooda-terminal-alerts) | `ASOBA_API_KEY` | Query and stream fault/diagnostic alerts from terminal devices |
| 3 | [Forecasting](/sdk/services/forecasting) | AWS | Device, site, and customer-level energy forecasts |
| 4 | [Freemium Forecasting](/sdk/services/freemium-forecasting) | ❌ | No-key CSV-based solar forecasting with email verification |
| 5 | [Terminal OODA Workflow](/sdk/services/terminal-ooda-workflow) | JWT / AWS | Full OODA loop: detect, diagnose, schedule, build BOM, create orders |
| 6 | [Partner API](/sdk/services/partner-api) | `ASOBA_API_KEY` | Pre-computed JSON snapshots with ETag caching (sub-100ms) |
| 7 | [Edge Devices](/sdk/services/edge-devices) | URL | Device discovery, registration, capability detection |
| 8 | [Data Ingestion & Training](/sdk/services/data-ingestion-training) | AWS | Upload data, train models, standardize, detect gaps, interpolate |
| 9 | [PV Insight Service](/sdk/services/pv-insight) | JWT / AWS | JEPA anomaly → O&M recommendation via hybrid RAG |
| 10 | [Nehanda ML Proxy](/sdk/services/nehanda-ml-proxy) | ❌ | OpenAI-compatible API Gateway proxy to SageMaker vLLM |

---

## Quick Start

```python
# Python
from asoba import OnaClient
client = OnaClient()  # uses ASOBA_API_KEY
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
const { OnaSDK } = require('@asobacloud/sdk');
const sdk = new OnaSDK();  // uses ASOBA_API_KEY

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
