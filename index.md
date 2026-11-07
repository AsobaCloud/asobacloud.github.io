---
title: "Ona SDK Documentation"
layout: default
nav_order: 1
---

<div class="hero-section">
  <h1>Ona SDK Documentation</h1>
  <p class="hero-subtitle">Typed client libraries for Python and JavaScript, built for the Ona Intelligence Layer — energy forecasting, fault detection, inverter telemetry, and O&amp;M intelligence for solar, wind, and battery storage assets.</p>
  <div class="quick-start-section">
    <a href="/get-started" class="quick-start-button">Get Started →</a>
    <p class="quick-start-subtext">New here? Contact <a href="mailto:support@asoba.co">support@asoba.co</a> for an API key first.</p>
  </div>
</div>

<div class="callout callout-info">
  <div class="callout-icon"></div>
  <div class="callout-content"><strong>Available for Cloud Hosted and for On-Prem deployment.</strong></div>
</div>

<div class="quick-start-section">
  <button type="button" class="quick-start-button ona-pricing-trigger" onclick="openOnaPricingModal()">Pick the right one for you</button>
</div>

<div id="ona-pricing-modal" class="subscribe-modal-overlay" style="display: none;" onclick="if (event.target === this) closeOnaPricingModal();" role="dialog" aria-modal="true" aria-labelledby="ona-pricing-title">
  <div class="subscribe-modal ona-pricing-modal">
    <button type="button" class="subscribe-modal-close" onclick="closeOnaPricingModal()" aria-label="Close">&times;</button>
    <div class="subscribe-modal-icon">
      <h2 id="ona-pricing-title">Choose Your Deployment</h2>
    </div>
  <div class="pricing-cards">
    <section class="pricing-card">
      <div class="pricing-header">
        <div class="pricing-icon">
          <svg viewBox="0 0 24 24" width="42" height="42" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"/>
          </svg>
        </div>
        <div class="pricing-tier">Cloud</div>
        <div class="pricing-price">$100</div>
        <div class="pricing-unit">per month</div>
      </div>
      <div class="pricing-body">
        <ul class="pricing-features">
          <li>Zero server provisioning or maintenance</li>
          <li>Automatic platform updates and security patches</li>
          <li>Managed backups and high-availability hosting</li>
          <li>Global endpoint access for distributed SDK clients</li>
          <li>Fastest time-to-value for new solar, wind, and battery fleets</li>
        </ul>
        <button type="button" class="pricing-cta">$100/month</button>
      </div>
    </section>
    <section class="pricing-card">
      <div class="pricing-header">
        <div class="pricing-icon">
          <svg viewBox="0 0 24 24" width="42" height="42" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 0 0-3-3m-13.5 0a3 3 0 0 0-3 3M8.25 9.75V9A3 3 0 0 1 11.25 6h1.5a3 3 0 0 1 3 3v.75M8.25 9.75h7.5" />
          </svg>
        </div>
        <div class="pricing-tier">On-Prem</div>
        <div class="pricing-price">$800</div>
        <div class="pricing-unit">per year</div>
      </div>
      <div class="pricing-body">
        <ul class="pricing-features">
          <li>Air-gapped operation from licensed edge bundles</li>
          <li>Full data sovereignty with no external network dependency</li>
          <li>Offline forecasting, auditing, and monitoring for qualified partner environments</li>
          <li>License-controlled deployments for regulated or classified sites</li>
          <li>Optional local support and maintenance contract</li>
        </ul>
        <button type="button" class="pricing-cta">$800/year</button>
      </div>
    </section>
  </div>
</div>
</div>


<script>
function openOnaPricingModal() { document.getElementById('ona-pricing-modal').style.display = 'flex'; }
function closeOnaPricingModal() { document.getElementById('ona-pricing-modal').style.display = 'none'; }
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeOnaPricingModal(); });
</script>

## Introduction

Ona is an asset intelligence ecosystem built to autonomously operate distributed renewable energy systems — solar, wind, and battery storage — across large, geographically dispersed fleets.

At its core, Ona implements a hybrid decision architecture modeled on the cognitive split between fast, automatic processing and slow, deliberate reasoning: a continuously running world model monitors every asset at five-minute intervals, flagging physical deviations the moment they emerge, while a retrieval-grounded language model activates only when a deviation crosses an explicit severity threshold and synthesizes cited diagnostic guidance from technical documentation. This separation ensures that cheap, narrow intelligence handles the vast majority of monitoring tasks, reserving expensive reasoning for conditions that have earned the compute cost.

Alongside real-time fault detection and O&M decision support, Ona produces device-, site-, and customer-level production forecasts that incorporate asset-specific history, weather data, and irradiance physics — enabling operators and their systems to anticipate output rather than only react to it.

The result is a platform that closes the OODA loop end-to-end: from raw inverter telemetry through anomaly detection, diagnostic synthesis, and forward-looking production intelligence, all exposed through typed SDK clients for Python and JavaScript.

## Quick Start

<div class="sdk-links-section">
  <div class="sdk-links-grid">
    <div class="sdk-link-card">
      <div class="sdk-icon"></div>
      <h3>Python</h3>
      <code class="sdk-install">pip install asoba</code>
      <p class="sdk-alt-install">Or from source: <code>git clone https://github.com/AsobaCloud/sdk.git && cd sdk/python && pip3 install -e .</code></p>
      <p>Typed client for scripts, notebooks, and backend services.</p>
    </div>
    <div class="sdk-link-card">
      <div class="sdk-icon"></div>
      <h3>JavaScript</h3>
      <code class="sdk-install">npm install @asobacloud/sdk</code>
      <p class="sdk-alt-install">Or from source: <code>git clone https://github.com/AsobaCloud/sdk.git && cd sdk/javascript && npm install</code></p>
      <p>Typed client for Node.js and browser applications.</p>
    </div>
  </div>
</div>

```python
from asoba import OnaClient

client = OnaClient()
period = client.inverter_telemetry.get_data_period(site_id="Sibaya")
print(f"Data available from {period['first_record']} to {period['last_record']}")
```

→ See the full [Quickstart Guide](/get-started) for streaming, alerts, and more.

## SDK Service Guides

<div class="product-categories-section">
  <div class="product-categories-grid">
    <a href="/sdk/services/inverter-telemetry" class="product-category-card">
      <h4>Inverter Telemetry</h4>
      <p>Query and stream live inverter data</p>
    </a>
    <a href="/sdk/services/ooda-terminal-alerts" class="product-category-card">
      <h4>OODA Terminal Alerts</h4>
      <p>Query and stream fault/diagnostic alerts</p>
    </a>
    <a href="/sdk/services/forecasting" class="product-category-card">
      <h4>Forecasting</h4>
      <p>Device, site, and customer-level energy forecasts</p>
    </a>
    <a href="/sdk/services/freemium-forecasting" class="product-category-card">
      <h4>Freemium Forecasting</h4>
      <p>No-API-key forecasting with email verification</p>
    </a>
    <a href="/sdk/services/terminal-ooda-workflow" class="product-category-card">
      <h4>Terminal OODA Workflow</h4>
      <p>Full OODA loop: detect → diagnose → decide → act</p>
    </a>
    <a href="/sdk/services/partner-api" class="product-category-card">
      <h4>Partner API</h4>
      <p>Pre-computed JSON snapshots with ETag caching</p>
    </a>
    <a href="/sdk/services/data-ingestion-training" class="product-category-card">
      <h4>Data Ingestion &amp; Training</h4>
      <p>Upload data and manage ML models</p>
    </a>
    <a href="/sdk/services/pv-insight" class="product-category-card">
      <h4>PV Insight Service</h4>
      <p>RAG-powered O&amp;M recommendations from anomaly detections</p>
    </a>
  </div>
</div>

## ODS-E & Data Architecture

<div class="quick-links-section">
  <div class="quick-links-grid">
    <a href="/odse/overview" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>What is ODS-E?</h4>
      <p>The Open Data Schema for Energy specification</p>
    </a>
    <a href="/odse/architecture" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>Ona Intelligence Layer Architecture</h4>
      <p>How ODS-E fits with the platform</p>
    </a>
    <a href="/odse/sdk-integration" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>ODS-E & the SDK</h4>
      <p>How ODS-E connects to SDK data flows</p>
    </a>
    <a href="/odse/schemas" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>Schema Reference</h4>
      <p>Field-level ODS-E schema definitions</p>
    </a>
    <a href="/odse/transforms" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>Transform Specs</h4>
      <p>How raw data maps to ODS-E</p>
    </a>
    <a href="/odse/validation" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>Validation Guide</h4>
      <p>Validating data against the schema</p>
    </a>
  </div>
</div>

## Code Examples

<div class="code-examples-section">
  <div class="code-examples-grid">
    <div class="code-example-card">
      <h4>Examples Overview</h4>
      <p>Start here — how the examples are organized</p>
      <a href="/examples/overview" class="code-example-link">View overview →</a>
    </div>
    <div class="code-example-card">
      <h4>Complete Workflow</h4>
      <p>Multi-service integration walkthrough</p>
      <a href="/examples/complete-workflow" class="code-example-link">View example →</a>
    </div>
    <div class="code-example-card">
      <h4>Python vs JavaScript</h4>
      <p>Side-by-side language comparison</p>
      <a href="/examples/language-comparison" class="code-example-link">View example →</a>
    </div>
  </div>
  <div class="code-examples-footer">
    <a href="https://github.com/AsobaCloud/sdk/tree/main" class="view-all-examples">All Examples on GitHub — full source with tests →</a>
  </div>
</div>

## Resources

<div class="quick-links-section">
  <div class="quick-links-grid">
    <a href="/sdk/overview" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>SDK Overview</h4>
      <p>Architecture, service map, and design philosophy</p>
    </a>
    <a href="/sdk/installation" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>Installation</h4>
      <p>Setup and configuration</p>
    </a>
    <a href="/sdk/authentication" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>Authentication</h4>
      <p>API keys and multi-endpoint config</p>
    </a>
    <a href="/sdk/error-handling" class="quick-link-card">
      <div class="quick-link-icon"></div>
      <h4>Error Handling</h4>
      <p>Error classes, retry logic, rate limiting</p>
    </a>
  </div>
</div>

## Repositories & Community

<div class="community-section">
  <div class="community-links-grid">
    <a href="https://github.com/AsobaCloud/sdk" class="community-link-card">
      <div class="community-icon"></div>
      <h4>Ona SDK</h4>
      <p>Python & JavaScript SDKs</p>
    </a>
    <a href="https://github.com/AsobaCloud/odse" class="community-link-card">
      <div class="community-icon"></div>
      <h4>ODS-E Protocol</h4>
      <p>Open data schema specification</p>
    </a>
    <a href="https://github.com/AsobaCloud/sdk/issues" class="community-link-card">
      <div class="community-icon"></div>
      <h4>GitHub Issues</h4>
      <p>AsobaCloud/sdk</p>
    </a>
    <a href="mailto:support@asoba.co" class="community-link-card">
      <div class="community-icon"></div>
      <h4>Email</h4>
      <p>support@asoba.co</p>
    </a>
    <a href="https://discord.gg/v4vD5EXSUD" class="community-link-card">
      <div class="community-icon"></div>
      <h4>Discord</h4>
      <p>Join our community</p>
    </a>
  </div>
</div>
