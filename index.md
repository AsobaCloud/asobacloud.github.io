---
title: "Ona SDK Documentation"
layout: default
nav_order: 1
---

# Ona SDK Documentation

The Ona SDK provides typed client libraries (Python & JavaScript) for integrating with the Ona Intelligence Layer — energy forecasting, fault detection, inverter telemetry, and O&M intelligence for solar, wind, and battery storage assets.

## Quick Start

**Install the SDK:**

```bash
# Python
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/python && pip3 install -e .

# JavaScript
git clone https://github.com/AsobaCloud/sdk.git
cd sdk/javascript && npm install
```

**Set your API key** (contact [support@asoba.org](mailto:support@asoba.org) to get one):

```bash
export INVERTER_TELEMETRY_ENDPOINT=https://api.asoba.org
export INVERTER_TELEMETRY_API_KEY=<your_api_key>
```

**Make your first call:**

```python
from ona_platform import OnaClient

client = OnaClient()
period = client.inverter_telemetry.get_data_period(site_id="Sibaya")
print(f"Data available from {period['first_record']} to {period['last_record']}")
```

→ See the full [Quickstart Guide](/get-started) for streaming, alerts, and more.

## SDK Service Guides

| Service | Description |
|---------|-------------|
| [Inverter Telemetry](/sdk/services/inverter-telemetry) | Query and stream live inverter data |
| [OODA Terminal Alerts](/sdk/services/ooda-terminal-alerts) | Query and stream fault/diagnostic alerts |
| [Forecasting](/sdk/services/forecasting) | Device, site, and customer-level energy forecasts |
| [Freemium Forecasting](/sdk/services/freemium-forecasting) | No-API-key forecasting with email verification |
| [Terminal OODA Workflow](/sdk/services/terminal-ooda-workflow) | Full OODA loop: detect → diagnose → decide → act |
| [Partner API](/sdk/services/partner-api) | Pre-computed JSON snapshots with ETag caching |
| [Energy Analyst](/sdk/services/energy-analyst) | RAG-powered energy policy queries |
| [Edge Devices](/sdk/services/edge-devices) | Device discovery and management |
| [Data Ingestion & Training](/sdk/services/data-ingestion-training) | Upload data and manage ML models |
| [PV Insight Service](/sdk/services/pv-insight) | RAG-powered O&M recommendations from anomaly detections |

## ODS-E & Data Architecture

- **[What is ODS-E?](/odse/overview)** — The Open Data Schema for Energy specification
- **[Ona Intelligence Layer Architecture](/odse/architecture)** — How ODS-E fits with the platform
- **[ODS-E & the SDK](/odse/sdk-integration)** — How ODS-E connects to SDK data flows

## Code Examples

- **[Complete Workflow](/examples/complete-workflow)** — Multi-service integration walkthrough
- **[Python vs JavaScript](/examples/language-comparison)** — Side-by-side language comparison
- **[All Examples on GitHub](https://github.com/AsobaCloud/sdk/tree/main)** — Full source with tests

## Resources

- [SDK Overview](/sdk/overview) — Architecture, service map, and design philosophy
- [Installation](/sdk/installation) — Setup and configuration
- [Authentication](/sdk/authentication) — API keys and multi-endpoint config
- [Error Handling](/sdk/error-handling) — Error classes, retry logic, rate limiting

## Repositories

- **[Ona SDK](https://github.com/AsobaCloud/sdk)** — Python & JavaScript SDKs
- **[ODS-E Protocol](https://github.com/AsobaCloud/odse)** — Open data schema specification

## Support

- **GitHub Issues**: [AsobaCloud/sdk](https://github.com/AsobaCloud/sdk/issues)
- **Email**: [support@asoba.org](mailto:support@asoba.org)
- **Discord**: [Join our community](https://discord.gg/v4vD5EXSUD)
