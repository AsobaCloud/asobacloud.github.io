---
title: "Ona Intelligence Layer"
layout: default
nav_order: 1
parent: "Products"
---

# Ona Intelligence Layer

Backend infrastructure that absorbs unreliable energy data and exposes stable intelligence your systems can depend on.

<img src="/assets/images/ona.png" alt="Ona Intelligence Layer" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

---

## Overview

Ona is an intelligence layer for energy systems. It connects to your inverters and energy assets via standard APIs, serving as complete middleware for the data pipelines necessary to run ML/AI models. These models can be called via API or SDK, embedded directly within your existing business logic.

This is a platform that supports your technical roadmap, rather than forcing you to adjust your business logic to fit the platform's idiosyncrasies. Integrate once, consume intelligence through the interfaces you already use.

Ona is not a single product — it is three layers that work together:

- **ODSE** — Open Data Schema for Energy. The open specification and reference runtime that defines how raw device telemetry is ingested, normalised, and validated across OEM formats and industrial protocols. [github.com/AsobaCloud/odse](https://github.com/AsobaCloud/odse) (CC-BY-SA 4.0 / Apache 2.0). Install with `pip install odse`.
- **SDK + Core Platform** — The public integration surface and deployed Ona platform on AWS af-south-1. Three live APIs expose stable intelligence endpoints your systems integrate against once. Fault detection, forecasting, prognostics, OODA diagnostics, model training, and the full analytics stack. [github.com/AsobaCloud/sdk](https://github.com/AsobaCloud/sdk) (MIT)
- **Nehanda & Zorora** — The domain AI layer. A 27B parameter language model (Nehanda v3, fine-tuned from Qwen3.6-27B) for RAG synthesis and epistemic robustness in energy regulation and intelligence analysis. Powers Zorora's deep research workflows with inline citations and credibility scoring. Strict separation of authority: deterministic physical solvers govern control loops and battery dispatch; the LLM orchestrates research and synthesis.

---

## Capability Matrix

Where each capability lives in the stack. ● Full · ◐ Partial · ○ Absent

| Capability | ODSE | SDK | Core Platform |
|---|:---:|:---:|:---:|
| **Ingestion & Data** | | | |
| Inverter telemetry (HTTP poll, 8 vendors) | ● | ● | ● |
| On-prem agent / push API for closed networks | ● | ◐ | ● |
| SCADA / IEC 61850 substation connector | ● | ○ | ◐ |
| MQTT / OPC-UA industrial connector | ● | ○ | ◐ |
| Smart-meter / AMR ingest (Eskom-compatible) | ● | ◐ | ◐ |
| Bulk historical CSV import + reject reports | ● | ○ | ● |
| Standardised data schemas (ODSE-equivalent) | ● | ● | ● |
| **Detection & Analytics** | | | |
| Fault register + state-machine + revenue-impact (ZAR) | ○ | ● | ● |
| Predictive-maintenance signals (snapshot) | ○ | ● | ● |
| Performance-opportunity engine (11 deterministic detectors) | ○ | ◐ | ● |
| Plant soiling & cleaning recovery-gain audit | ○ | ● | ● |
| Asset prognostics (remaining-useful-life / degradation) | ○ | ● | ● |
| BESS state-of-health + warranty triggers | ○ | ● | ● |
| Generation + revenue forecasting (P50/P90) | ○ | ● | ● |
| Drone / thermal imagery diagnostics | ○ | ○ | ○ |
| **Operations / CMMS** | | | |
| Work-order / CMMS workflow (open → close + chain audit) | ○ | ○ | ○ |
| Parts inventory & stock movements | ○ | ○ | ○ |
| Technician roster, skills & dispatch | ○ | ○ | ○ |
| Preventive-maintenance scheduler | ○ | ● | ● |
| Field-mobile / offline PWA for technicians | ○ | ○ | ○ |
| Site commissioning chain (acceptance → handover) | ○ | ○ | ○ |
| **Access & UX** | | | |
| Dashboards, KPI roll-ups, exports | ○ | ● | ● |
| Multi-tenant auth + roles + RBAC | ○ | ◐ | ◐ |
| Contractor / asset-owner self-service portal (tokenised) | ○ | ○ | ○ |
| Public SDK for third-party integrators | ● | ● | ● |

**Notes:**
- Performance-opportunity engine: the SDK exposes maintenance signals and fault snapshots; all 11 deterministic detectors run at the Core Platform layer.
- Multi-tenant RBAC: admin/super-admin JWT role structure is live; full tenant isolation is in progress.
- CMMS, technician dispatch, field-mobile, and self-service portal are not on the current roadmap. These are addressed via integration with esums where required.

---

## How the Layers Work Together

Raw telemetry arrives in inconsistent formats across OEMs and protocols. ODSE absorbs that at the ingestion boundary — enforcing schema contracts, normalising across Huawei, Enphase, SCADA, MQTT, OPC-UA, and Eskom AMR formats, flagging data quality issues before they propagate. Nothing reaches the analytics layer without passing through that schema validation.

The Core Platform runs the intelligence stack on top of clean, schema-validated data: fault detection and OODA diagnostics, soiling and recovery-gain analysis, asset prognostics, BESS state-of-health, P50/P90 forecasting, and a model training pipeline with challenger/production promotion and auditable rollback.

The SDK exposes that intelligence through stable API contracts. Your systems integrate once against the SDK surface. The underlying models improve, retrain, and iterate without breaking your integration.

---

## What It Replaces

Without this stack, teams build:

- Per-OEM data cleaning pipelines (120–160 hours of integration engineering per OEM)
- Feature engineering logic that breaks when OEM firmware updates
- Model deployment and retraining processes
- Glue code between data sources and analytics
- Bespoke anomaly detection built against generic specifications rather than actual data contracts

Ona centralises all of this behind a single integration boundary, with schema enforcement at ingestion and stable API contracts at consumption.

---

## Why ODSE Is the Foundation

The open standard is not a teaser — it is the foundation. Every developer who installs the SDK to resolve their daily **parser hell** (OEM data format errors, missing fields, timezone mismatches) normalises their data layer with `pip install odse`. This removes all integration barriers — so when you're ready for continuous monitoring, carbon reporting, or trading intelligence, the upgrade to the paid Ona platform is seamless. Zero reintegration.

```bash
pip install odse
```

```python
import odse

# Transform any OEM format to a single open standard
records = odse.transform("inverter_export.csv", source="huawei")

# Validate against the ODSE schema
result = odse.validate(records)
assert result.is_valid  # schema-level + physics checks
```

The standard is CC-BY-SA / Apache 2.0 — community-driven, transparent, and free forever.

---

## What It Is Not

- **Not a dashboard-first product** — It is backend infrastructure. Dashboards and KPI roll-ups are available via the Partner API and Core Platform UI, but the primary interface is the SDK.
- **Not a single forecasting model** — It is a platform for managing many models across many sites, with versioning, A/B testing, and rollback.
- **Not a CMMS** — Work-order management, parts inventory, technician dispatch, and field-mobile tooling are out of scope. Where those are required, Ona integrates as the intelligence upstream feed.
- **Not a consulting workflow** — It is software you integrate with.

---

## Integration

Install the SDK from [GitHub](https://github.com/AsobaCloud/sdk) and set your API key (contact [support@asoba.org](mailto:support@asoba.org) to get one).

```bash
# JavaScript
git clone https://github.com/AsobaCloud/sdk.git && cd sdk/javascript && npm install

# Python
git clone https://github.com/AsobaCloud/sdk.git && cd sdk/python && pip3 install -e .
```

### Inverter Telemetry API

Query and stream live power output, energy, and state data from solar inverters.

**Python:**
```python
from ona_platform import OnaClient
from ona_platform.models.telemetry import TimeRange
import os

client = OnaClient(
    inverter_telemetry_endpoint=os.environ["INVERTER_TELEMETRY_ENDPOINT"],
    inverter_telemetry_api_key=os.environ["INVERTER_TELEMETRY_API_KEY"],
)

# Query historical data
records = client.inverter_telemetry.get_inverter_telemetry(
    asset_id="INV-1000000054495190",
    site_id="Sibaya",
    time_range=TimeRange(start="2025-11-01T00:00:00", end="2025-11-01T12:00:00"),
    resolution="5min",
    limit=100,
)

# Stream live data
for record in client.inverter_telemetry.stream_inverter(
    asset_id="INV-1000000054495190",
    site_id="Sibaya",
    polling_interval=30,
):
    print(f"{record.timestamp}: {record.power} kW")
```

**JavaScript:**
```javascript
const { OnaSDK } = require('./src/index');

const sdk = new OnaSDK({
  endpoints: { inverterTelemetry: process.env.INVERTER_TELEMETRY_ENDPOINT },
  inverterTelemetryApiKey: process.env.INVERTER_TELEMETRY_API_KEY,
});

const records = await sdk.inverterTelemetry.getInverterTelemetry({
  asset_id: "INV-1000000054495190",
  site_id: "Sibaya",
  time_range: { start: "2025-11-01T00:00:00", end: "2025-11-01T12:00:00" },
  limit: 100,
});

for await (const record of sdk.inverterTelemetry.streamInverter({
  asset_id: "INV-1000000054495190",
  site_id: "Sibaya",
  polling_interval: 30,
})) {
  console.log(`${record.timestamp}: ${record.power} kW`);
}
```

### OODA Terminal Alerts API

Query and stream fault detection and diagnostic alerts from terminal devices.

**Python:**
```python
from ona_platform.models.ooda import TimeRange

client = OnaClient(
    ooda_terminal_endpoint=os.environ["OODA_TERMINAL_ENDPOINT"],
    ooda_terminal_api_key=os.environ["OODA_TERMINAL_API_KEY"],
)

alerts = client.ooda_terminal.get_terminal_alerts(
    terminal_device_id="TERM-1000000054495190",
    site_id="Sibaya",
    time_range=TimeRange(start="2025-11-01T00:00:00", end="2025-11-01T12:00:00"),
)

for alert in client.ooda_terminal.stream_terminal(
    terminal_device_id="TERM-1000000054495190",
    site_id="Sibaya",
    polling_interval=30,
):
    print(f"{alert.timestamp}: [{alert.alert_severity}] {alert.message}")
```

**JavaScript:**
```javascript
const sdk = new OnaSDK({
  endpoints: { oodaTerminal: process.env.OODA_TERMINAL_ENDPOINT },
  oodaTerminalApiKey: process.env.OODA_TERMINAL_API_KEY,
});

for await (const alert of sdk.oodaTerminal.streamTerminal({
  terminal_device_id: "TERM-1000000054495190",
  site_id: "Sibaya",
  polling_interval: 30,
})) {
  console.log(`${alert.timestamp}: [${alert.alert_severity}] ${alert.message}`);
}
```

### Live Endpoints

| API | Endpoint |
|-----|----------|
| Inverter Telemetry | `https://af5jy5ob3e.execute-api.af-south-1.amazonaws.com/prod` |
| OODA Terminal Alerts | `https://3lpq00xevg.execute-api.af-south-1.amazonaws.com/prod` |
| Partner API | `https://8el3o25tc1.execute-api.af-south-1.amazonaws.com/prod` |

---

## Deployment Options

### SaaS (Managed Infrastructure)

Cloud-hosted with managed infrastructure.

- API-based data uploads
- Automatic updates and maintenance
- 99.9% uptime SLA

### On-Premises (Self-Hosted)

Local installation for data sovereignty requirements.

- Complete data control
- Offline operation capability
- Optional hardware bundle (mini compute cluster + data logger)

---

## Getting Started

### Week 1–2: Integration

Connect SCADA/inverters via ODSE connectors, ingest historical data, establish performance baselines.

### Week 3–12: Optimisation

Real-time monitoring goes live. Weekly performance reports as models continuously improve.

### Week 13: Decision

Executive ROI analysis. Automatic conversion upon meeting metrics, followed by scale-up.

---

## Support & Resources

### Documentation
- [SDK Repository](https://github.com/AsobaCloud/sdk)
- [ODSE Specification](https://github.com/AsobaCloud/odse)
- [API Reference](/api-reference/overview)
- [Data Ingestion Guide](/api-reference/data-ingestion/overview)

### Support
- **Email**: [support@asoba.org](mailto:support@asoba.org)
- **Discord**: [Join our community](https://discord.gg/v4vD5EXSUD)
- **Documentation**: [docs.asoba.org](https://docs.asoba.org)

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.org" class="support-button">Email Support</a>
      <a href="https://discord.gg/v4vD5EXSUD" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
        <svg width="16" height="16" style="margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Discord
      </a>
    </div>
  </div>

  <div class="end-column">
    <div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
      <style type="text/css">
        #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 100%;}
      </style>
      <div id="mc_embed_signup">
        <form action="https://asoba.us10.list-manage.com/subscribe/post?u=459ea321d7831d7b9f5fac70f&amp;id=e03a70f492&amp;f_id=000a9ae3f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
          <div id="mc_embed_signup_scroll">
            <h3>Subscribe to Updates</h3>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group"><label for="mce-FNAME">First Name </label><input type="text" name="FNAME" class=" text" id="mce-FNAME" value=""></div>
            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" value="" required=""></div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display: none;"></div>
              <div class="response" id="mce-success-response" style="display: none;"></div>
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_459ea321d7831d7b9f5fac70f_e03a70f492" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"></div>
          </div>
        </form>
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[1]='FNAME';ftypes[1]='text';fnames[0]='EMAIL';ftypes[0]='email';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='COMPANY';ftypes[6]='text';fnames[7]='MMERGE7';ftypes[7]='url';fnames[8]='MMERGE8';ftypes[8]='text';fnames[9]='MMERGE9';ftypes[9]='text';fnames[10]='MMERGE10';ftypes[10]='text';fnames[11]='MMERGE11';ftypes[11]='url';fnames[12]='MMERGE12';ftypes[12]='text';fnames[13]='MMERGE13';ftypes[13]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    </div>
  </div>
</div>
