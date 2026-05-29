---
title: "Ona Edge"
layout: default
nav_order: 2
parent: "Products"
---

# Ona Edge

Edge computing intelligence for zero-latency forecasting on ARM64 devices.

<img src="/assets/images/edge.png" alt="Ona Edge" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

---

## Overview

Ona Edge brings the power of the Ona platform directly to your site with edge computing capabilities. Deploy forecasting models on low-power ARM64 devices that operate independently during connectivity loss, ensuring continuous operation and data sovereignty.

---

## Key Features

### Ultra-Fast Forecasting

Generate forecasts locally without waiting for cloud round-trips.

- **2-5 Second Generation**: Forecast generation in seconds, not minutes
- **ARM64 Optimized**: Purpose-built for efficient edge deployment
- **Low Latency**: Real-time decision support without network delays
- **Batch Processing**: Process historical data quickly for model updates

### Offline Operation

Continue operating even when connectivity is lost.

- **Autonomous Operation**: Full functionality during connectivity loss
- **Local Data Storage**: Buffer data locally until connectivity is restored
- **Graceful Sync**: Automatic synchronization when connection is re-established
- **No Single Point of Failure**: Decentralized architecture for resilience

### Data Sovereignty

Keep your data on-site with local processing.

- **Local Processing**: All data processing happens on-premises
- **No Cloud Dependency**: Core functionality works without cloud connectivity
- **Compliance Ready**: Meet data residency and sovereignty requirements
- **Secure by Design**: Minimize attack surface with local-only data

---

## Technical Specifications

### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Processor | ARM64 (Cortex-A53) | ARM64 (Cortex-A72 or better) |
| Memory | 2GB RAM | 4GB RAM |
| Storage | 16GB | 64GB SSD |
| Network | 100Mbps Ethernet | 1Gbps Ethernet |

### Supported Platforms

- Raspberry Pi 4/5
- NVIDIA Jetson Nano/Xavier
- AWS Graviton (edge instances)
- Custom ARM64 hardware

### Performance Metrics

| Metric | Value |
|--------|-------|
| Forecast Generation | 2-5 seconds |
| Model Inference | <100ms |
| Data Buffer Capacity | 30 days offline |
| Power Consumption | <15W typical |

---

## Deployment Architecture

### Standalone Mode

Deploy Ona Edge as a standalone device at each site.

```
[Solar Assets] → [Ona Edge Device] → [Local Dashboard]
                         ↓
                  [Cloud Sync (when available)]
```

**Benefits**:
- Simple deployment
- Complete site autonomy
- Minimal infrastructure requirements

### Hybrid Mode

Deploy Ona Edge alongside the cloud platform for redundancy.

```
[Solar Assets] → [Ona Edge Device] → [Cloud Platform]
                         ↓                    ↓
                  [Local Fallback]    [Central Dashboard]
```

**Benefits**:
- Centralized management
- Local fallback during outages
- Best of both worlds

---

## Use Cases

### Remote Sites

Ideal for sites with unreliable internet connectivity.

- Mining operations
- Rural installations
- Island microgrids
- Off-grid systems

### Data-Sensitive Operations

For organizations with strict data governance requirements.

- Government installations
- Critical infrastructure
- Financial institutions
- Healthcare facilities

### Real-Time Control

When milliseconds matter for grid services.

- Frequency regulation
- Demand response
- Peak shaving
- Grid stabilization

---

## Getting Started

### 1. Hardware Setup

Prepare your edge device with the Ona Edge software.

```bash
# Download and install Ona Edge
curl -fsSL https://install.asoba.org/edge | bash

# Initialize the device
ona-edge init --site-id YOUR_SITE_ID

# Verify installation
ona-edge status
```

### 2. Site Configuration

Configure the device for your specific site.

```yaml
# ona-edge-config.yaml
site:
  id: "site-001"
  name: "Solar Farm Alpha"
  location:
    lat: -26.2041
    lon: 28.0473

data_sources:
  - type: modbus
    host: 192.168.1.100
    port: 502
    device: "inverter-01"

sync:
  cloud_endpoint: "https://api.asoba.org"
  sync_interval: 300  # seconds
  offline_buffer: 30  # days
```

### 3. Start Monitoring

Begin collecting data and generating forecasts.

```bash
# Start the edge service
ona-edge start

# View real-time status
ona-edge monitor

# Generate a forecast
ona-edge forecast --horizon 24h
```

---

## API Reference

### Local API Endpoints

Ona Edge exposes a local REST API for integration.

```bash
# Get current status
GET http://localhost:8080/api/v1/status

# Get latest forecast
GET http://localhost:8080/api/v1/forecast

# Get historical data
GET http://localhost:8080/api/v1/data?start=2024-01-01&end=2024-01-31

# Trigger manual sync
POST http://localhost:8080/api/v1/sync
```

### Response Example

```json
{
  "status": "healthy",
  "last_sync": "2024-01-15T10:30:00Z",
  "offline_buffer": {
    "records": 12450,
    "oldest": "2024-01-14T10:30:00Z"
  },
  "forecast": {
    "generated_at": "2024-01-15T10:29:55Z",
    "horizon_hours": 24,
    "generation_time_ms": 2340
  }
}
```

---

## Support & Resources

### Documentation
- [Edge Installation Guide](/guides/edge-installation)
- [API Reference](/api-reference/edge/overview)
- [Troubleshooting Guide](/guides/edge-troubleshooting)

### Support
- **Email**: [support@asoba.org](mailto:support@asoba.org)
- **Discord**: [Join our community](https://discord.gg/2MmDG2uTxX)
- **Documentation**: [docs.asoba.org](https://docs.asoba.org)

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.org" class="support-button">Email Support</a>
      <a href="https://discord.gg/2MmDG2uTxX" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
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
