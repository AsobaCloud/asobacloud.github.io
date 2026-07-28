---
title: "SDK"
layout: default
nav_order: 3
has_children: true
---

# Ona SDK

The Ona SDK provides a unified interface to all Ona Intelligence Layer services — solar PV, wind, battery storage (BESS), and grid meter data with ODS-E (Open Data Schema for Energy) standardization. It ships in two languages: **Python** and **JavaScript** (with TypeScript definitions), designed for feature parity across the stack.

---

## What the SDK Does

- **Query and stream live telemetry** from solar inverters, wind turbines, and battery systems
- **Detect faults and run diagnostics** through the OODA (Observe, Orient, Decide, Act) workflow
- **Generate energy forecasts** at device, site, and customer levels
- **Fetch pre-computed snapshots** (KPIs, maintenance signals, schedules) via the Partner API
- **Manage edge devices** with automatic capability detection
- **Validate data** against the 65-field ODS-E energy-timeseries schema
- **Train ML models**, detect data gaps, and run interpolation

---

## Python vs JavaScript

| Aspect | Python | JavaScript |
|--------|--------|------------|
| Package | `ona-platform` (`pip3 install -e .`) | `@asoba/ona-sdk` (`npm install`) |
| Entry point | `ona_platform.OnaClient` | `OnaSDK` from `src/index` |
| Auth client | ✅ `AuthClient` (login, MFA, token management) | ❌ Not available |
| Type system | Type hints + dataclasses | TypeScript `.d.ts` definitions |
| Streaming | Generators (`yield`) | Async iterators (`for await...of`) |
| ODS-E validation | ✅ Full 65-field + 6 conformance profiles | ❌ Not available |
| Env-var config | `OnaConfig.from_env()` | `Config` class constructor |
| Rate limiting | Built-in (60 req/min) | Built-in (60 req/min) |

Both SDKs share the same API surface for all services except authentication (Python-only) and ODS-E local validation (Python-only).

---

## Full Service Map

| Service | Python client | JavaScript client | API Key Required |
|---------|--------------|-------------------|-----------------|
| [Inverter Telemetry](/sdk/services/inverter-telemetry) | `client.inverter_telemetry` | `sdk.inverterTelemetry` | ✅ |
| [OODA Terminal Alerts](/sdk/services/ooda-terminal-alerts) | `client.ooda_terminal` | `sdk.oodaTerminal` | ✅ |
| [Forecasting](/sdk/services/forecasting) | `client.forecasting` | `sdk.forecasting` | AWS credentials |
| [Freemium Forecasting](/sdk/services/freemium-forecasting) | `client.freemium_forecast` | `sdk.freemiumForecast` | ❌ No key needed |
| [Terminal OODA Workflow](/sdk/services/terminal-ooda-workflow) | `client.terminal` | `sdk.terminal` | AWS credentials |
| [Partner API](/sdk/services/partner-api) | `client.partner_api` | `sdk.partnerApi` | ✅ |
| [Energy Analyst](/sdk/services/energy-analyst) | `client.energy_analyst` | `sdk.energyAnalyst` | Service URL |
| [Edge Devices](/sdk/services/edge-devices) | `client.edge_devices` | `sdk.edgeRegistry` | Service URL |
| [Data Ingestion](/sdk/services/data-ingestion-training) | `client.data_ingestion` | `sdk.dataIngestion` | AWS credentials |
| [Training](/sdk/services/data-ingestion-training) | `client.training` | — | AWS credentials |
| [Standardization](/sdk/services/data-ingestion-training) | `client.standardization` | — | AWS credentials |
| [Gap Detection](/sdk/services/data-ingestion-training) | `client.gap_detection` | — | AWS credentials |
| [Interpolation](/sdk/services/data-ingestion-training) | `client.interpolation` | — | AWS credentials |
| [PV Insight](/sdk/services/pv-insight) | — *(proposed)* | — *(proposed)* | Service URL |

---

## Design Philosophy

### Environment-Variable Configuration

Both SDKs auto-discover endpoints and credentials from environment variables. Zero-configuration initialization works if the right env vars are set:

```python
# Python — no constructor args needed
from ona_platform import OnaClient
client = OnaClient()
```

```javascript
// JavaScript — endpoint passed via constructor
const { OnaSDK } = require('./src/index');
const sdk = new OnaSDK({
  endpoints: {
    inverterTelemetry: process.env.INVERTER_TELEMETRY_ENDPOINT,
  },
  inverterTelemetryApiKey: process.env.INVERTER_TELEMETRY_API_KEY,
});
```

See [Installation](/sdk/installation) for the complete env-var reference.

### Dual SDK Parity

Python and JavaScript SDKs expose identical method names (snake_case vs camelCase) for all shared services. Example:

| Python | JavaScript |
|--------|------------|
| `get_inverter_telemetry()` | `getInverterTelemetry()` |
| `stream_inverter()` | `streamInverter()` |
| `get_data_period()` | `getDataPeriod()` |

### Rate Limiting

All APIs enforce **60 requests per minute** per API key. The SDKs handle 429 responses by raising `RateLimitError` (Python) or `APIError` with status 429 (JavaScript). Design your polling loops with a minimum 5-second interval.

### Cursor-Based Pagination

Telemetry and alert queries use opaque cursor tokens for resumable pagination. Each record returned by a stream includes a `cursor` field — save it to resume from that exact position later:

```python
for record in client.inverter_telemetry.stream_inverter(asset_id='INV-001', site_id='Sibaya'):
    save_cursor(record.cursor)  # persist for crash recovery
    process(record)
```

### Cost Protection

- **Max 1000 records** per query (validated client-side)
- **Max 31-day time range** per query (validated client-side)
- **Min 5-second polling interval** for streaming (validated client-side)

These limits are enforced in both SDKs before any network call, preventing accidental cost overruns.

---

## Next Steps

- [Installation](/sdk/installation) — set up the SDK in your project
- [Authentication](/sdk/authentication) — configure API keys and auth
- [Error Handling](/sdk/error-handling) — understand error classes and retry logic
- [Service Guides](/sdk/service-guides) — browse individual service documentation

## Repository

Full source code, examples, and tests: [github.com/AsobaCloud/sdk](https://github.com/AsobaCloud/sdk)
