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
    <p class="quick-start-subtext">New here? Contact <a href="mailto:support@asoba.org">support@asoba.org</a> for an API key first.</p>
  </div>
</div>

<div class="callout callout-info">
  <div class="callout-icon">🔑</div>
  <div class="callout-content"><strong>You'll need an API key.</strong> Email <a href="mailto:support@asoba.org">support@asoba.org</a> to get one before making your first call.</div>
</div>

## Quick Start

<div class="sdk-links-section">
  <div class="sdk-links-grid">
    <div class="sdk-link-card">
      <div class="sdk-icon">🐍</div>
      <h3>Python</h3>
      <code class="sdk-install">git clone https://github.com/AsobaCloud/sdk.git</code>
      <code class="sdk-install">cd sdk/python && pip3 install -e .</code>
      <p>Typed client for scripts, notebooks, and backend services.</p>
    </div>
    <div class="sdk-link-card">
      <div class="sdk-icon">🟨</div>
      <h3>JavaScript</h3>
      <code class="sdk-install">git clone https://github.com/AsobaCloud/sdk.git</code>
      <code class="sdk-install">cd sdk/javascript && npm install</code>
      <p>Typed client for Node.js and browser applications.</p>
    </div>
  </div>
</div>

```python
from ona_platform import OnaClient

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
    <a href="/sdk/services/energy-analyst" class="product-category-card">
      <h4>Energy Analyst</h4>
      <p>RAG-powered energy policy queries</p>
    </a>
    <a href="/sdk/services/edge-devices" class="product-category-card">
      <h4>Edge Devices</h4>
      <p>Device discovery and management</p>
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
      <div class="quick-link-icon">📐</div>
      <h4>What is ODS-E?</h4>
      <p>The Open Data Schema for Energy specification</p>
    </a>
    <a href="/odse/architecture" class="quick-link-card">
      <div class="quick-link-icon">🏗️</div>
      <h4>Ona Intelligence Layer Architecture</h4>
      <p>How ODS-E fits with the platform</p>
    </a>
    <a href="/odse/sdk-integration" class="quick-link-card">
      <div class="quick-link-icon">🔗</div>
      <h4>ODS-E & the SDK</h4>
      <p>How ODS-E connects to SDK data flows</p>
    </a>
    <a href="/odse/schemas" class="quick-link-card">
      <div class="quick-link-icon">📋</div>
      <h4>Schema Reference</h4>
      <p>Field-level ODS-E schema definitions</p>
    </a>
    <a href="/odse/transforms" class="quick-link-card">
      <div class="quick-link-icon">🔄</div>
      <h4>Transform Specs</h4>
      <p>How raw data maps to ODS-E</p>
    </a>
    <a href="/odse/validation" class="quick-link-card">
      <div class="quick-link-icon">✅</div>
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
      <div class="quick-link-icon">🧭</div>
      <h4>SDK Overview</h4>
      <p>Architecture, service map, and design philosophy</p>
    </a>
    <a href="/sdk/installation" class="quick-link-card">
      <div class="quick-link-icon">⚙️</div>
      <h4>Installation</h4>
      <p>Setup and configuration</p>
    </a>
    <a href="/sdk/authentication" class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h4>Authentication</h4>
      <p>API keys and multi-endpoint config</p>
    </a>
    <a href="/sdk/error-handling" class="quick-link-card">
      <div class="quick-link-icon">🧯</div>
      <h4>Error Handling</h4>
      <p>Error classes, retry logic, rate limiting</p>
    </a>
  </div>
</div>

## Repositories & Community

<div class="community-section">
  <div class="community-links-grid">
    <a href="https://github.com/AsobaCloud/sdk" class="community-link-card">
      <div class="community-icon">📦</div>
      <h4>Ona SDK</h4>
      <p>Python & JavaScript SDKs</p>
    </a>
    <a href="https://github.com/AsobaCloud/odse" class="community-link-card">
      <div class="community-icon">📄</div>
      <h4>ODS-E Protocol</h4>
      <p>Open data schema specification</p>
    </a>
    <a href="https://github.com/AsobaCloud/sdk/issues" class="community-link-card">
      <div class="community-icon">🐛</div>
      <h4>GitHub Issues</h4>
      <p>AsobaCloud/sdk</p>
    </a>
    <a href="mailto:support@asoba.org" class="community-link-card">
      <div class="community-icon">✉️</div>
      <h4>Email</h4>
      <p>support@asoba.org</p>
    </a>
    <a href="https://discord.gg/v4vD5EXSUD" class="community-link-card">
      <div class="community-icon">💬</div>
      <h4>Discord</h4>
      <p>Join our community</p>
    </a>
  </div>
</div>
