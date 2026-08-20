---
title: "SDK"
layout: default
nav_order: 3
has_children: true
---

# Ona SDK

The Ona SDK provides a unified interface to the Asoba energy intelligence platform for solar PV, wind, battery storage (BESS), and grid meter data. It ships in two languages: **Python** (`asoba` v1.1.0) and **JavaScript** (`@asobacloud/sdk`), designed for feature parity across the public API surface.

---

## What the SDK Does

- **Query and stream live telemetry** from solar inverters, wind turbines, and battery systems
- **Detect faults and run diagnostics** through OODA (Observe, Orient, Decide, Act) alert streams
- **Fetch pre-computed snapshots** (KPIs, maintenance signals, schedules, forecasts) via the Partner API
- **Generate solar forecasts** per device or per site
- **Generate freemium forecasts** with email-based verification (no API key required)
- **Expose all tools via MCP** for AI agent integration (Claude Desktop, Cursor, Windsurf, nehanda-cli)

---

## Python vs JavaScript

| Aspect | Python | JavaScript |
|--------|--------|------------|
| Package | `asoba` (`pip install asoba`) | `@asobacloud/sdk` (`npm install @asobacloud/sdk`) |
| Entry point | `asoba.OnaClient` | `OnaSDK` from `@asobacloud/sdk` |
| Type system | Type hints + dataclasses | TypeScript `.d.ts` definitions |
| Streaming | Generators (`yield`) | Async iterators (`for await...of`) |
| Env-var config | `OnaConfig.from_env()` / `ASOBA_API_KEY` | `ASOBA_API_KEY` via `Config` |
| Rate limiting | Built-in (60 req/min) | Built-in (60 req/min) |
| MCP server | ✅ `asoba-mcp-server` | — |

Both SDKs expose identical method names (snake_case vs camelCase) for all public services.

---

## Public Service Map

| Service | Python client | JavaScript client | Auth |
|---------|--------------|-------------------|------|
| [Inverter Telemetry](/sdk/services/inverter-telemetry) | `client.inverter_telemetry` | `sdk.inverterTelemetry` | `ASOBA_API_KEY` |
| [OODA Terminal Alerts](/sdk/services/ooda-terminal-alerts) | `client.ooda_terminal` | `sdk.oodaTerminal` | `ASOBA_API_KEY` |
| [Partner API](/sdk/services/partner-api) | `client.partner` | `sdk.partner` | `ASOBA_API_KEY` |
| [Forecasting](/sdk/services/forecasting) | `client.forecasting` | — | `ASOBA_API_KEY` |
| [Freemium Forecasting](/sdk/services/freemium-forecasting) | `client.freemium_forecast` | `sdk.freemiumForecast` | ❌ No key needed |
| [MCP Server](/sdk/services/mcp-server) | `asoba-mcp-server` | — | `ASOBA_API_KEY` |

---

## Design Philosophy

### Single API Key, Hardcoded Endpoints

One credential — `ASOBA_API_KEY` — covers all public services. Production endpoint URLs are built into the SDK; you do not need to set them for normal use.

```python
# Python — api_key from ASOBA_API_KEY env var
from asoba import OnaClient
client = OnaClient()
```

```javascript
// JavaScript — apiKey from ASOBA_API_KEY env var
const { OnaSDK } = require('@asobacloud/sdk');
const sdk = new OnaSDK();
```

See [Installation](/sdk/installation) for optional endpoint overrides and the full env-var reference.

### Dual SDK Parity

Python and JavaScript SDKs expose identical method names (snake_case vs camelCase) for all shared public services. Example:

| Python | JavaScript |
|--------|------------|
| `get_inverter_telemetry()` | `getInverterTelemetry()` |
| `stream_inverter()` | `streamInverter()` |
| `get_data_period()` | `getDataPeriod()` |
| `client.partner.get_kpi_rollup()` | `sdk.partner.getKpiRollup()` |

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