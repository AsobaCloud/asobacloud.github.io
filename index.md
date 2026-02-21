---
title: "Documentation Home"
layout: default
---

<!-- A. Compact Title + Version Indicator -->
<div class="page-header">
  <h1>Ona Intelligence Layer Documentation</h1>
  <div class="version-badge">
    <span class="version-label">Platform</span>
    <span class="version-value">v1.2.0</span>
    <span class="version-separator">|</span>
    <span class="version-label">Python SDK</span>
    <span class="version-value">v1.0.0</span>
    <span class="version-separator">|</span>
    <span class="version-label">JavaScript SDK</span>
    <span class="version-value">v1.0.0</span>
  </div>
</div>

<!-- B. Quick Start CTA (Prominent) -->
<div class="quick-start-section">
  <a href="/get-started" class="quick-start-button">
    Get Started in 5 Minutes
  </a>
  <p class="quick-start-subtext">
    Try our <a href="/api-reference/forecasting/freemium-forecast">freemium API</a> or use our SDKs
  </p>
</div>

<!-- C. SDK Quick Links (Horizontal Row) -->
<div class="sdk-links-section">
  <h2>Get Started with Our SDKs</h2>
  <div class="sdk-links-grid">
    <a href="/api-reference/overview" class="sdk-link-card">
      <div class="sdk-icon">🐍</div>
      <h3>Python SDK</h3>
      <code class="sdk-install">pip install ona-platform</code>
      <p>v1.0.0 • Full API coverage</p>
    </a>
    
    <a href="/api-reference/overview" class="sdk-link-card">
      <div class="sdk-icon">📦</div>
      <h3>JavaScript SDK</h3>
      <code class="sdk-install">npm install @asoba/ona-sdk</code>
      <p>v1.0.0 • TypeScript support</p>
    </a>
    
    <a href="/api-reference/overview" class="sdk-link-card">
      <div class="sdk-icon">🔧</div>
      <h3>cURL / Direct API</h3>
      <code class="sdk-install">REST API access</code>
      <p>Complete API reference</p>
    </a>
  </div>
</div>

<!-- D. Popular Quick Links Grid (Above Fold) -->
<div class="quick-links-section">
  <h2>Popular Guides</h2>
  <div class="quick-links-grid">
    <a href="/get-started" class="quick-link-card">
      <div class="quick-link-icon">🚀</div>
      <h4>Get Started</h4>
      <p>Make your first API call</p>
    </a>
    
    <a href="/api-reference/forecasting/forecast" class="quick-link-card">
      <div class="quick-link-icon">📈</div>
      <h4>Generate Forecast</h4>
      <p>30+ day predictions</p>
    </a>
    
    <a href="/api-reference/terminal/detect" class="quick-link-card">
      <div class="quick-link-icon">🔍</div>
      <h4>Fault Detection</h4>
      <p>OODA workflow</p>
    </a>
    
    <a href="/api-reference/data-ingestion/upload-train" class="quick-link-card">
      <div class="quick-link-icon">📤</div>
      <h4>Upload Data</h4>
      <p>Training & nowcast</p>
    </a>
    
    <a href="/api-reference/authentication" class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h4>Authentication</h4>
      <p>API keys & tokens</p>
    </a>
    
    <a href="/api-reference/terminal/forecast" class="quick-link-card">
      <div class="quick-link-icon">🤖</div>
      <h4>ML Results</h4>
      <p>Forecast & interpolation</p>
    </a>
    
    <a href="/api-reference/terminal/ooda" class="quick-link-card">
      <div class="quick-link-icon">⚡</div>
      <h4>OODA Summaries</h4>
      <p>Energy-at-risk</p>
    </a>
    
    <a href="/use-cases/overview" class="quick-link-card">
      <div class="quick-link-icon">💡</div>
      <h4>Use Cases</h4>
      <p>Real-world examples</p>
    </a>
  </div>
</div>

<!-- E. Code Examples Section -->
<div class="code-examples-section">
  <h2>Code Examples</h2>
  <p class="section-intro">Get started quickly with copy-paste examples</p>
  
  <div class="code-examples-tabs">
    <button class="code-tab active" data-tab="python">Python</button>
    <button class="code-tab" data-tab="javascript">JavaScript</button>
  </div>
  
  <div class="code-examples-grid">
    <!-- Python Examples -->
    <div class="code-example-card" data-language="python">
      <h4>Generate Forecast</h4>
      <pre><code>from ona_platform import OnaClient

client = OnaClient()
forecast = client.forecasting.get_site_forecast(
    'Sibaya', hours=24
)
print(f"Next hour: {forecast['forecasts'][0]['kWh_forecast']} kWh")</code></pre>
      <a href="/guides/developer-guide" class="code-example-link">View Full Example →</a>
    </div>
    
    <div class="code-example-card" data-language="python">
      <h4>Run Fault Detection</h4>
      <pre><code>detection = client.terminal.run_detection(
    customer_id='customer123',
    asset_id='asset456',
    lookback_hours=6
)
print(f"Severity: {detection['analysis']['severity_label']}")</code></pre>
      <a href="/guides/developer-guide" class="code-example-link">View Full Example →</a>
    </div>
    
    <!-- JavaScript Examples -->
    <div class="code-example-card" data-language="javascript" style="display: none;">
      <h4>Generate Forecast</h4>
      <pre><code>const { OnaSDK } = require('@asoba/ona-sdk');

const sdk = new OnaSDK({ region: 'af-south-1' });
const forecast = await sdk.forecasting.getSiteForecast({
  site_id: 'Sibaya',
  forecast_hours: 24
});
console.log('Forecast:', forecast);</code></pre>
      <a href="/guides/developer-guide" class="code-example-link">View Full Example →</a>
    </div>
    
    <div class="code-example-card" data-language="javascript" style="display: none;">
      <h4>Run Fault Detection</h4>
      <pre><code>const detection = await sdk.terminal.runDetection({
  customer_id: 'customer123',
  asset_id: 'asset456',
  lookback_hours: 6
});
console.log('Severity:', detection.analysis.severity_label);</code></pre>
      <a href="/guides/developer-guide" class="code-example-link">View Full Example →</a>
    </div>
  </div>
  
  <div class="code-examples-footer">
    <a href="/guides/developer-guide" class="view-all-examples">View All 9 Examples →</a>
  </div>
</div>

<!-- F. Product/Service Categories -->
<div class="product-categories-section">
  <h2>Platform Services</h2>
  <div class="product-categories-grid">
    <a href="/api-reference/forecasting/overview" class="product-category-card">
      <h4>Forecasting API</h4>
      <p>30+ day energy predictions</p>
    </a>
    
    <a href="/api-reference/terminal/overview" class="product-category-card">
      <h4>Terminal API</h4>
      <p>OODA workflow automation</p>
    </a>
    
    <a href="/api-reference/data-ingestion/overview" class="product-category-card">
      <h4>Data Ingestion</h4>
      <p>Upload training & real-time data</p>
    </a>
    
    <a href="/technical-concepts/machine-learning/overview" class="product-category-card">
      <h4>ML Training</h4>
      <p>Model training & management</p>
    </a>
    
    <a href="/products/analyst" class="product-category-card">
      <h4>Energy Analyst</h4>
      <p>RAG-powered policy queries</p>
    </a>
    
    <a href="/products/terminal" class="product-category-card">
      <h4>Edge Devices</h4>
      <p>Device discovery & management</p>
    </a>
  </div>
</div>

<!-- H. Version & Updates Section -->
<div class="version-updates-section">
  <div class="version-info">
    <h3>Current Version</h3>
    <p class="version-number">Platform v1.2.0</p>
    <p class="version-date">Released December 13, 2025</p>
    <a href="https://github.com/AsobaCloud/platform/blob/main/CHANGELOG.md" class="changelog-link">View Changelog →</a>
  </div>
  
  <div class="whats-new">
    <h3>What's New</h3>
    <ul class="whats-new-list">
      <li>Asoba Internal Ops (Data Admin) System</li>
      <li>LLM Benchmarking System</li>
      <li>Enhanced EnergyAnalyst RAG responses</li>
    </ul>
    <a href="https://github.com/AsobaCloud/platform/blob/main/CHANGELOG.md#120---2025-12-13" class="whats-new-link">Read Release Notes →</a>
  </div>
</div>

<!-- I. Community & Support Section -->
<div class="community-section">
  <h2>Community & Support</h2>
  <div class="community-links-grid">
    <a href="https://discord.gg/2MmDG2uTxX" target="_blank" class="community-link-card">
      <div class="community-icon">💬</div>
      <h4>Discord</h4>
      <p>Join our community</p>
    </a>
    
    <a href="https://github.com/AsobaCloud/platform" target="_blank" class="community-link-card">
      <div class="community-icon">🐙</div>
      <h4>GitHub</h4>
      <p>View source code</p>
    </a>
    
    <a href="mailto:support@asoba.co" class="community-link-card">
      <div class="community-icon">📧</div>
      <h4>Email Support</h4>
      <p>Get help from our team</p>
    </a>
  </div>
</div>

<!-- J. Documentation Sections Overview -->
<div class="sections-overview">
  <h2>Documentation Sections</h2>
  <div class="section-cards">
    <div class="section-card">
      <h3>Products</h3>
      <p>Platform products and capabilities</p>
      <a href="/products" class="section-link">View Products →</a>
    </div>

    <div class="section-card">
      <h3>Learn</h3>
      <p>Data standardization, ML pipelines, and how the platform works</p>
      <a href="/learn" class="section-link">Start Learning →</a>
    </div>

    <div class="section-card">
      <h3>Build</h3>
      <p>Integrate with SDKs, manage data, and generate forecasts</p>
      <a href="/build" class="section-link">Start Building →</a>
    </div>

    <div class="section-card">
      <h3>Patterns</h3>
      <p>Real-world implementations and case studies</p>
      <a href="/patterns" class="section-link">View Patterns →</a>
    </div>

    <div class="section-card">
      <h3>Reference</h3>
      <p>Complete API documentation</p>
      <a href="/reference" class="section-link">View Reference →</a>
    </div>

    <div class="section-card">
      <h3>Ona Protocol</h3>
      <p>Open Data Schema for Energy (ODS-E)</p>
      <a href="/ona-protocol" class="section-link">View Protocol →</a>
    </div>
  </div>
</div>

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>We're constantly improving and want you to be a part of shaping the future of energy policy access and decision-making. If you encounter issues or have suggestions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
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

<script>
// Code examples tab switching
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.code-tab');
  const cards = document.querySelectorAll('.code-example-card');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetLang = this.getAttribute('data-tab');
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show/hide cards
      cards.forEach(card => {
        if (card.getAttribute('data-language') === targetLang) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
</script>

© 2025 Asoba Corporation. All rights reserved.
