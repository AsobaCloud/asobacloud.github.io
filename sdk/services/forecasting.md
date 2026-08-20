---
title: "Forecasting"
layout: default
nav_order: 4
parent: "Service Guides"
grand_parent: "SDK"
---

# Forecasting

Generate solar energy forecasts per device or aggregated per site. The forecasting service uses authenticated API endpoints and returns hour-ahead predictions.

**Requires:** `ASOBA_API_KEY` environment variable.

---

## Python

```python
from asoba import OnaClient

client = OnaClient()
site_id = "Sibaya"

# Per-device forecast (24 hours)
device_fc = client.forecasting.get_device_forecast(
    site_id=site_id,
    device_id="INV-1000000054495190",
    forecast_hours=24,
)
print(f"Device: {device_fc['device_id']}")
print(f"Horizon: {len(device_fc.get('forecasts', []))} hours")

# Site-level forecast (aggregated across all devices)
site_fc = client.forecasting.get_site_forecast(
    site_id=site_id,
    forecast_hours=48,
    include_device_breakdown=True,
)
print(f"Site: {site_fc['site_id']}")
print(f"Total devices: {len(site_fc.get('devices', {}))}")
for hour in site_fc.get('forecasts', [])[:6]:
    print(f"  {hour['timestamp']}  {hour.get('kwh_forecast', hour.get('kw', 'N/A'))}")
```

---

## Method Reference

| Python | Description |
|--------|-------------|
| `get_device_forecast()` | Forecast for a single inverter/device |
| `get_site_forecast()` | Aggregated forecast for all devices at a site |
| `get_customer_forecast()` | Forecast for a customer (legacy) |

### `get_device_forecast` Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `site_id` | string | required | Site identifier |
| `device_id` | string | required | Device/inverter identifier |
| `forecast_hours` | int | 24 | Number of hours to forecast |

### `get_site_forecast` Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `site_id` | string | required | Site identifier |
| `forecast_hours` | int | 24 | Number of hours to forecast |
| `include_device_breakdown` | bool | False | Include per-device forecasts |

---

## Full Example

- [Python: forecasting_example.py](https://github.com/AsobaCloud/sdk/blob/main/python/examples/forecasting_example.py)

---

## See Also

- [Partner API](/sdk/services/partner-api) — Pre-computed forecast snapshots via `get_forecast_snapshot()`
- [Freemium Forecasting](/sdk/services/freemium-forecasting) — No-key CSV-based forecasting
- [MCP Server](/sdk/services/mcp-server) — Expose forecasting as `mcp__asoba__get_site_forecast` tool