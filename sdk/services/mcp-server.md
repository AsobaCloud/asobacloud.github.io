---
title: "MCP Server"
layout: default
nav_order: 6
parent: "Service Guides"
grand_parent: "SDK"
---

# MCP Server

The Asoba MCP server exposes all public SDK services as [Model Context Protocol](https://modelcontextprotocol.io) tools, allowing any MCP-compatible AI client to query solar energy data directly.

---

## Install

```bash
pip install 'asoba[mcp]'
```

The `mcp` optional dependency is lightweight — it only pulls in the official `mcp` package.

---

## Quick Start

The standard way to run MCP servers is via **`uvx`**, which fetches the package from PyPI and runs it in an isolated environment — no global installs needed:

```json
{
  "mcpServers": {
    "asoba": {
      "command": "uvx",
      "args": ["--from", "asoba[mcp]", "asoba-mcp-server"],
      "env": {
        "ASOBA_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Works with **Claude Desktop**, **Cursor**, **Windsurf**, **nehanda-cli**, or any MCP-compatible client.

---

## Available Tools

### Inverter Telemetry

| Tool | Description |
|------|-------------|
| `get_telemetry_data_period` | Discover available data timestamps for a site or inverter |
| `get_inverter_telemetry` | Query inverter-level telemetry records |
| `get_site_telemetry` | Query all inverter telemetry for a site |

### OODA Terminal Alerts

| Tool | Description |
|------|-------------|
| `get_ooda_data_period` | Discover available OODA alert timestamps |
| `get_terminal_alerts` | Raw OODA/JEPA state detections per device |
| `get_site_alerts` | All OODA alerts at a site |

### Partner API

| Tool | Description |
|------|-------------|
| `get_kpi_rollup` | KPIs: energy balance, PR, uptime, EAR, financial impact |
| `get_maintenance_signals` | Enriched intelligence-layer diagnostic signals |
| `get_maintenance_schedule` | 90-day preventive maintenance plan |
| `get_forecast_snapshot` | Latest pre-computed forecast snapshot |

### Forecasting

| Tool | Description |
|------|-------------|
| `get_device_forecast` | Per-device solar energy forecast |
| `get_site_forecast` | Aggregated site-level forecast |

### Resources

The server also exposes JSON schemas as MCP resources so the LLM can inspect response shapes:

| URI | Description |
|-----|-------------|
| `schema://KPIRollup` | KPI rollup snapshot schema |
| `schema://MaintenanceSignals` | Maintenance signal schema |
| `schema://MaintenanceSchedule` | Maintenance schedule schema |
| `schema://ForecastSnapshot` | Forecast snapshot schema |
| `schema://StandardizedTelemetry` | Telemetry record schema |
| `schema://ODSERecord` | OODA alert record schema |

---

## Configuration

### API Key

Set `ASOBA_API_KEY` in the `env` block of your MCP configuration. The server sends it as an `x-api-key` header on every request.

### nehanda-cli

In the nehanda-cli REPL, use the built-in `/mcp env` command:

```
❯ /mcp env asoba ASOBA_API_KEY sk-...
✓ Set ASOBA_API_KEY = ******** on asoba
```

See `/mcp list` to verify tools are visible, `/mcp reload` to pick up changes.

### Direct execution (debugging)

```bash
ASOBA_API_KEY=sk-... asoba-mcp-server
```

Or via the Python module:

```bash
python -m asoba.mcp_server
```

---

## Best Practices for LLMs

The server's system instructions tell the LLM to:

1. **Call `get_telemetry_data_period` or `get_ooda_data_period` first** to discover available time ranges before querying
2. **Read `schema://<name>` resources** when it needs to understand response shapes
3. **Use the maintenance signals → schedule pipeline** — signals answer "what's wrong?", schedules answer "what to do about it?"

---

## See Also

- [Installation](/sdk/installation) — `pip install asoba[mcp]`
- [Authentication](/sdk/authentication) — API key setup
- [Inverter Telemetry](/sdk/services/inverter-telemetry) — Underlying telemetry service
- [Partner API](/sdk/services/partner-api) — Underlying snapshots service
