---
layout: default
title: "Products"
nav_order: 1
has_children: true
---

# Products

Backend infrastructure and tools for energy intelligence.

---

## Our Platform

<div class="product-cards">
  <!-- Ona Intelligence Layer Card -->
  <div class="product-card platform">
    <h3>Ona Intelligence Layer</h3>
    <p>Backend infrastructure that absorbs unreliable energy data and exposes stable intelligence via API and SDK</p>
    <div class="card-tags">
      <span class="tag">API</span>
      <span class="tag">Forecasting</span>
      <span class="tag">MLOps</span>
    </div>
    <a href="/products/ona-platform" class="card-cta">Learn More</a>
  </div>

  <!-- Ona Edge Card -->
  <div class="product-card edge">
    <h3>Ona Edge</h3>
    <p>Edge computing intelligence for zero-latency forecasting on ARM64 devices</p>
    <div class="card-tags">
      <span class="tag">Edge Computing</span>
      <span class="tag">Real-time</span>
      <span class="tag">Offline</span>
    </div>
    <a href="/products/ona-edge" class="card-cta">Learn More</a>
  </div>

  <!-- Nehanda Card -->
  <div class="product-card analyst">
    <h3>Nehanda</h3>
    <p>7B parameter model for intelligence assessment, signal detection, and global systems analysis</p>
    <div class="card-tags">
      <span class="tag">LLM</span>
      <span class="tag">Intelligence</span>
      <span class="tag">Hugging Face</span>
    </div>
    <a href="/products/nehanda" class="card-cta">Learn More</a>
  </div>

  <!-- Zorora Card -->
  <div class="product-card zorora">
    <h3>Zorora</h3>
    <p>Local-deployment deep research engine with credibility scoring and citation graphs</p>
    <div class="card-tags">
      <span class="tag">Open Source</span>
      <span class="tag">Research</span>
      <span class="tag">Local-First</span>
    </div>
    <a href="/products/zorora" class="card-cta">Learn More</a>
  </div>

  <!-- ASB-P Protocol Card -->
  <div class="product-card protocol">
    <h3>ASB-P Protocol</h3>
    <p>Blockchain-based performance enforcement system with mechanical collateral mechanisms</p>
    <div class="card-tags">
      <span class="tag">Blockchain</span>
      <span class="tag">Compliance</span>
      <span class="tag">Risk Management</span>
    </div>
    <a href="/technical-concepts/protocol/overview" class="card-cta">Learn More</a>
  </div>
</div>

---

## What It Does

### Absorbs Unreliable Data
- **Multi-OEM Support**: Connect Huawei, SolarEdge, SMA, Enphase, and SCADA systems
- **Automatic Cleaning**: Handles missing values, outliers, timezone issues
- **Schema Normalization**: Consistent data structure regardless of source
- **Quality Scoring**: Flags data issues before they affect models

### Exposes Stable Intelligence
- **Forecasting API**: Device-level and site-level production forecasts
- **Anomaly Detection**: Automatic identification of performance issues
- **Model Versioning**: Safe iteration without breaking integrations
- **Reproducible Outputs**: Same inputs produce same outputs over time

### Manages Models Over Time
- **Automatic Retraining**: Models update as new data arrives
- **Performance Monitoring**: Track model accuracy over time
- **A/B Testing**: Compare model versions before deployment
- **Rollback Support**: Revert to previous versions if needed

---

## Deployment Options

### SaaS (Managed Infrastructure)
- Software-only deployment
- API-based data uploads
- Internet access required
- Fully managed by Asoba

### On-Premises (Self-Hosted)
- Local installation
- Optional hardware bundle (mini compute cluster + data logger + SSD storage)
- Offline operation capability
- All IoT data processed on-site

---

## Pricing & Plans

| Deployment | Annual Price (ZAR, ex VAT) | Onboarding Fee (ZAR, ex VAT) | Annual Price (USD) | Onboarding Fee (USD) | Description |
|---|---:|---|---:|---:|---|
| SaaS (Managed Infrastructure) | R 218 945 | R 13 130 | $11,523 | $691 | Software-only; API-based data uploads; requires internet access. |
| On-Prem (Self-Hosted, Offline) | R 126 072 | R 43 770 (with hardware)<br/>R 13 130 (software only) | $6,635 | $2,305 (with hardware)<br/>$691 (software only) | Local install with optional mini compute cluster + data logger + SSD storage; all IoT data processed on-site. |

<small>USD conversions are approximate, using 1 USD = R19.00.</small>

---

## Getting Started

### Quick Start Options

<div class="quickstart-paths">
  <div class="path-card">
    <h3>Request a Demo</h3>
    <p>See the platform in action with a personalized demo</p>
    <a href="mailto:sales@asoba.org" class="path-button">Contact Sales</a>
  </div>

  <div class="path-card">
    <h3>Read Documentation</h3>
    <p>Learn about APIs, SDKs, and integration options</p>
    <a href="/api-reference/overview" class="path-button">View Docs</a>
  </div>

  <div class="path-card">
    <h3>Explore Use Cases</h3>
    <p>See how others are using the platform</p>
    <a href="/use-cases/overview" class="path-button">View Use Cases</a>
  </div>
</div>

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
