---
title: "Code Examples"
layout: default
nav_order: 5
has_children: true
---

# Code Examples

The Ona Intelligence Layer SDK ships with runnable example files for both Python and JavaScript. Each example demonstrates a real-world workflow — from querying historical telemetry to streaming live data to running fault detection and diagnostics.

This section indexes every available example, organized by service. Browse the table below to find the example you need, then click through to the source on GitHub.

## How to Run Examples

**Prerequisites** — Set the relevant environment variables for the services you want to use:

```bash
# Inverter Telemetry
export INVERTER_TELEMETRY_ENDPOINT=https://your-endpoint/prod
export INVERTER_TELEMETRY_API_KEY=your_api_key

# OODA Terminal
export OODA_TERMINAL_ENDPOINT=https://your-endpoint/prod
export OODA_TERMINAL_API_KEY=your_api_key

# Partner API
export PARTNER_API_ENDPOINT=https://your-endpoint/prod
export PARTNER_API_KEY=your_api_key
```

> The same API key works for all endpoints — set it in each respective variable.

**Run Python examples:**

```bash
cd python
python3 examples/inverter_telemetry_example.py
```

**Run JavaScript examples:**

```bash
cd javascript
node examples/inverter-telemetry-example.js
```

## Complete Workflow

The capstone example chains multiple services together — forecasting, fault detection, diagnostics, and maintenance scheduling. See the [Complete Workflow walkthrough](/examples/complete-workflow).

| Language | Filename | Description |
|----------|----------|-------------|
| Python | [`complete_workflow_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/complete_workflow_example.py) | Multi-service integration: forecast → detect → diagnose → schedule |

## Inverter Telemetry

Query historical and stream live power output, energy, temperature, and state data from solar inverters. See the [Inverter Telemetry service guide](/sdk/services/inverter-telemetry).

| Language | Filename | Description |
|----------|----------|-------------|
| Python | [`inverter_telemetry_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/inverter_telemetry_example.py) | Discover data period, query historical telemetry (5-min & daily), stream live data with cursor-based resume |
| JavaScript | [`inverter-telemetry-example.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/inverter-telemetry-example.js) | Same workflow in JavaScript: data discovery, historical queries, live streaming with `for await` |

## OODA Terminal

Query and stream OODA (Observe, Orient, Decide, Act) alerts from terminal devices. See the [OODA Terminal service guide](/sdk/services/ooda-terminal).

| Language | Filename | Description |
|----------|----------|-------------|
| Python | [`ooda_terminal_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/ooda_terminal_example.py) | Discover data period, query terminal & site alerts, stream live alerts, cursor-based pagination |
| JavaScript | [`ooda-terminal-example.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/ooda-terminal-example.js) | Same workflow in JavaScript: alert queries, site-wide alerts, live streaming, pagination |

## Terminal OODA (Detection & Diagnostics)

Run fault detection, diagnostics, create maintenance schedules, and query the ML model registry. See the [Terminal OODA service guide](/sdk/services/terminal-ooda).

| Language | Filename | Description |
|----------|----------|-------------|
| Python | [`terminal_ooda_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/terminal_ooda_example.py) | Run detection, diagnostics, create schedules, list activities, check ML models, get nowcast data |
| JavaScript | [`terminal-api-example.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/terminal-api-example.js) | Terminal API operations: detection, diagnostics, scheduling, model registry |

## Forecasting

Generate solar production forecasts for sites and individual devices. See the [Forecasting service guide](/sdk/services/forecasting).

| Language | Filename | Description |
|----------|----------|-------------|
| Python | [`forecasting_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/forecasting_example.py) | Get site and device-level solar forecasts with configurable forecast horizons |
| JavaScript | [`forecasting-example.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/forecasting-example.js) | Same forecasting workflow in JavaScript |

## Freemium Forecasting

Access the free-tier forecasting API without an API key. See the [Freemium Forecasting guide](/sdk/services/freemium-forecasting).

| Language | Filename | Description |
|----------|----------|-------------|
| Python | [`freemium_forecast_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/freemium_forecast_example.py) | Free-tier solar forecasts — no API key required |
| JavaScript | [`freemium-forecast-example.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/freemium-forecast-example.js) | Free-tier forecasts in JavaScript |


## Partner API

Multi-tenant partner API for managing customers, sites, and assets. See the [Partner API guide](/sdk/services/partner-api).

| Language | Filename | Description |
|----------|----------|-------------|
| Python | [`partner_api_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/partner_api_example.py) | Manage customers, sites, and assets via the partner API |
| JavaScript | [`partner-api-example.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/partner-api-example.js) | Same partner API workflow in JavaScript |

## Edge Device

On-device SDK usage for local data processing at the edge. See the [Edge Device guide](/sdk/services/edge-device).

| Language | Filename | Description |
|----------|----------|-------------|
| Python | [`edge_device_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/edge_device_example.py) | Local data processing and edge device integration |
| JavaScript | [`edge-device-example.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/edge-device-example.js) | Edge device usage in JavaScript |

## Basic Usage

| Language | Filename | Description |
|----------|----------|-------------|
| JavaScript | [`basic-usage.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/basic-usage.js) | Minimal getting-started example for the JavaScript SDK |

## Python vs JavaScript Comparison

For a side-by-side comparison of how the two SDKs differ in syntax, initialization, and streaming patterns, see [Python vs JavaScript](/examples/language-comparison).
