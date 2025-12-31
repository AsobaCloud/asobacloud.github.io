---
title: "Documentation Home"
layout: default
---

<div class="hero-section">
  <h1>Ona Intelligence Layer Documentation</h1>
  <p class="hero-subtitle">
    Unlock the full potential of your renewable energy assets with AI-powered forecasting, 
    predictive maintenance, and portfolio optimization.
  </p>
  
  <div class="hero-search">
    <input 
      type="text" 
      id="hero-search-input" 
      placeholder="Search documentation..."
      class="hero-search-input"
    >
  </div>
</div>

<div class="wayfinding-section">
  <h2>Choose Your Path</h2>
  <p class="section-intro">
    Get started based on your role and goals
  </p>
  
  <div class="role-cards">
    <!-- Developer Path -->
    <div class="role-card developer">
      <div class="role-icon">👨‍💻</div>
      <h3>I'm a Developer</h3>
      <p>Build integrations and automate workflows</p>
      <ul class="role-features">
        <li>API Reference</li>
        <li>Code Examples</li>
        <li>SDKs & Libraries</li>
        <li>Webhooks & Events</li>
      </ul>
      <div class="role-actions">
        <a href="/get-started" class="role-button primary">Get Started</a>
        <a href="/api-reference/overview" class="role-button secondary">API Docs</a>
      </div>
    </div>
    
    <!-- Business User Path -->
    <div class="role-card business">
      <div class="role-icon">📊</div>
      <h3>I'm a Business User</h3>
      <p>Manage assets and optimize operations</p>
      <ul class="role-features">
        <li>Guides & Tutorials</li>
        <li>Use Cases</li>
        <li>Best Practices</li>
        <li>ROI Examples</li>
      </ul>
      <div class="role-actions">
        <a href="/guides/overview" class="role-button primary">View Guides</a>
        <a href="/use-cases/overview" class="role-button secondary">See Use Cases</a>
      </div>
    </div>
    
    <!-- Decision Maker Path -->
    <div class="role-card decision">
      <div class="role-icon">💼</div>
      <h3>I'm a Decision Maker</h3>
      <p>Understand value and ROI</p>
      <ul class="role-features">
        <li>Case Studies</li>
        <li>ROI Analysis</li>
        <li>Platform Capabilities</li>
        <li>Implementation Plans</li>
      </ul>
      <div class="role-actions">
        <a href="/use-cases/overview" class="role-button primary">View Case Studies</a>
        <a href="/products" class="role-button secondary">See Products</a>
      </div>
    </div>
  </div>
</div>

<div class="quick-links-section">
  <h2>Popular Guides</h2>
  <div class="quick-links-grid">
    <a href="/get-started" class="quick-link-card">
      <div class="quick-link-icon">🚀</div>
      <h4>Get Started</h4>
      <p>Make your first API call in 5 minutes</p>
    </a>
    
    <a href="/guides/forecasting/overview" class="quick-link-card">
      <div class="quick-link-icon">📈</div>
      <h4>Forecasting</h4>
      <p>Generate accurate energy forecasts</p>
    </a>
    
    <a href="/guides/data-management/overview" class="quick-link-card">
      <div class="quick-link-icon">📊</div>
      <h4>Data Management</h4>
      <p>Prepare and upload your data</p>
    </a>
    
    <a href="/api-reference/authentication" class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h4>Authentication</h4>
      <p>Set up API authentication</p>
    </a>
    
    <a href="/use-cases/overview" class="quick-link-card">
      <div class="quick-link-icon">💡</div>
      <h4>Use Cases</h4>
      <p>See real-world examples</p>
    </a>
    
    <a href="/api-reference/forecasting/freemium-forecast" class="quick-link-card">
      <div class="quick-link-icon">⚡</div>
      <h4>Freemium API</h4>
      <p>Generate free forecasts</p>
    </a>
  </div>
</div>

<div class="sections-overview">
  <h2>Documentation Sections</h2>
  <div class="section-cards">
    <div class="section-card">
      <h3>Getting Started</h3>
      <p>Quick tutorials to get you up and running</p>
      <a href="/get-started" class="section-link">View Getting Started →</a>
    </div>
    
    <div class="section-card">
      <h3>Guides</h3>
      <p>Step-by-step guides for common tasks</p>
      <a href="/guides/overview" class="section-link">Browse Guides →</a>
    </div>
    
    <div class="section-card">
      <h3>API Reference</h3>
      <p>Complete API documentation</p>
      <a href="/api-reference/overview" class="section-link">View API Docs →</a>
    </div>
    
    <div class="section-card">
      <h3>Technical Concepts</h3>
      <p>Deep dives into how things work</p>
      <a href="/technical-concepts/overview" class="section-link">Learn More →</a>
    </div>
    
    <div class="section-card">
      <h3>Use Cases</h3>
      <p>Real-world examples and case studies</p>
      <a href="/use-cases/overview" class="section-link">See Use Cases →</a>
    </div>
    
    <div class="section-card">
      <h3>Products</h3>
      <p>Platform products and capabilities</p>
      <a href="/products" class="section-link">View Products →</a>
    </div>
  </div>
</div>

<script>
  // Connect hero search to main search functionality
  document.addEventListener('DOMContentLoaded', function() {
    const heroSearchInput = document.getElementById('hero-search-input');
    const mainSearchInput = document.getElementById('search-input');
    
    if (heroSearchInput && mainSearchInput) {
      heroSearchInput.addEventListener('focus', function() {
        // Redirect focus to main search
        mainSearchInput.focus();
      });
      
      heroSearchInput.addEventListener('input', function(e) {
        // Sync with main search
        mainSearchInput.value = e.target.value;
        mainSearchInput.dispatchEvent(new Event('input'));
      });
    }
  });
</script>
