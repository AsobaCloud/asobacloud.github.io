---
title: "Ona Intelligence Layer"
layout: default
nav_order: 1
parent: "Products"
---

# Ona Intelligence Layer

Backend infrastructure that absorbs unreliable energy data and exposes stable intelligence your systems can depend on.

![Ona Intelligence Layer](/assets/images/ona.png)

---

## Overview

Ona is an intelligence layer for energy systems. It connects to your inverters and energy assets via standard APIs, serving as complete middleware for the data pipelines necessary to run ML/AI models. These models can be called via API or SDK, embedded directly within your existing business logic.

This is a platform that supports your technical roadmap, rather than forcing you to adjust your business logic to fit the platform's idiosyncrasies. Integrate once, consume intelligence through the interfaces you already use.

---

## What It Does

### Absorbs Unreliable Data

Energy data is messy. Different OEMs, inconsistent formats, gaps, outliers. Ona normalizes all of it into a consistent, analysis-ready format.

- **Multi-OEM Support**: Huawei, SolarEdge, SMA, Enphase, SCADA systems
- **Automatic Cleaning**: Handles missing values, outliers, timezone issues
- **Schema Normalization**: Consistent data structure regardless of source
- **Quality Scoring**: Flags data issues before they affect models

### Exposes Stable Intelligence

Your systems integrate once and consume intelligence, not models. The API contract remains stable even as underlying models improve.

- **Forecasting API**: Device-level and site-level production forecasts
- **Anomaly Detection**: Automatic identification of performance issues
- **Model Versioning**: Safe iteration without breaking integrations
- **Reproducible Outputs**: Same inputs produce same outputs over time

### Manages Models Over Time

Models degrade. Data distributions shift. Ona handles the MLOps so you don't have to.

- **Automatic Retraining**: Models update as new data arrives
- **Performance Monitoring**: Track model accuracy over time
- **A/B Testing**: Compare model versions before deployment
- **Rollback Support**: Revert to previous versions if needed

---

## Integration

### REST API

```
POST /forecast
Content-Type: application/json

{
  "site_id": "site-001",
  "device_id": "INV001",
  "forecast_hours": 24
}
```

### Python SDK

```python
from ona_platform import OnaClient

client = OnaClient()

# Get device-level forecast
forecast = client.forecasting.get_device_forecast(
    site_id='site-001',
    device_id='INV001',
    forecast_hours=24
)

# Use in your business logic
for point in forecast['forecasts']:
    energy = point['kWh_forecast']
    schedule_dispatch(energy)
```

### JavaScript SDK

```javascript
const { OnaSDK } = require('@asoba/ona-sdk');

const sdk = new OnaSDK({ region: 'af-south-1' });

const forecast = await sdk.forecasting.getDeviceForecast({
  site_id: 'site-001',
  device_id: 'INV001',
  forecast_hours: 24
});

forecast.forecasts.forEach(point => {
  scheduleDispatch(point.kWh_forecast);
});
```

---

## What It Guarantees

- **Clear separation** between raw data and decisions
- **Reproducible outputs** over time
- **Safe iteration** on models without breaking integrations
- **Stable API contract** even as models improve

---

## What It Replaces

Without an intelligence layer, teams build:
- Per-OEM data cleaning pipelines
- Feature engineering logic
- Model deployment processes
- Glue code between systems

Ona centralizes all of this behind a single integration boundary.

---

## What It Is Not

- **Not a dashboard-first product** - It's backend infrastructure
- **Not a single forecasting model** - It's a platform for managing many models
- **Not a consulting workflow** - It's software you integrate with

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

### Week 1-2: Integration

Connect SCADA/inverters, ingest historical data, establish performance baselines.

### Week 3-12: Optimization

Real-time monitoring goes live. Weekly performance reports as models continuously improve.

### Week 13: Decision

Executive ROI analysis. Automatic conversion upon meeting metrics, followed by scale-up.

---

## Support & Resources

### Documentation
- [API Reference](/api-reference/overview)
- [Data Ingestion Guide](/api-reference/data-ingestion/overview)
- [Forecasting Guide](/api-reference/forecasting/overview)

### Support
- **Email**: [support@asoba.co](mailto:support@asoba.co)
- **Discord**: [Join our community](https://discord.gg/nNV5evcr)
- **Documentation**: [docs.asoba.co](https://docs.asoba.co)

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
      <a href="https://discord.gg/nNV5evcr" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
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
