---
title: "Ona Terminal"
layout: default
nav_order: 1
parent: "Products"
---

# Ona Terminal

AI-powered command-line interface for energy asset management with OODA workflow capabilities.

---

## Overview

Ona Terminal is a powerful CLI tool designed for developers and technical teams who prefer command-line interfaces and automated workflows. It provides comprehensive energy asset management capabilities through an intuitive terminal interface.

---

## Key Features

### 🚀 **OODA Workflow Integration**
- **Observe**: Real-time data collection from energy assets
- **Orient**: AI-powered analysis and pattern recognition
- **Decide**: Automated decision-making based on insights
- **Act**: Execute actions and optimizations

### ⚡ **Energy Asset Management**
- **Solar Inverter Control**: Monitor and control solar inverters
- **Battery Management**: Optimize battery storage operations
- **Grid Integration**: Manage grid connections and power flow
- **Load Forecasting**: Predict energy demand and production

### 🔧 **Developer-Friendly**
- **Command-Line Interface**: Familiar terminal-based workflow
- **API Integration**: Seamless integration with existing systems
- **Automation Scripts**: Create custom automation workflows
- **Plugin System**: Extend functionality with custom plugins

### 📊 **Advanced Analytics**
- **Real-Time Monitoring**: Live data from energy assets
- **Performance Analytics**: Comprehensive performance analysis
- **Predictive Maintenance**: AI-powered maintenance predictions
- **Reporting Tools**: Generate detailed reports and insights

### 🖥️ **User-Friendly Dashboard Interface**
For non-technical users, Ona Terminal provides an intuitive web dashboard that makes energy asset management accessible to everyone:

#### **Main Dashboard Overview**
![Ona Terminal Dashboard Overview](/assets/images/terminal-dashboard-overview.svg)

The main dashboard provides a comprehensive view of all your energy assets with:
- **Asset Status Cards**: Real-time status of solar farms and components
- **Performance Metrics**: Key performance indicators and revenue tracking
- **Maintenance Planning**: Prioritized maintenance tasks and schedules
- **24/7 Monitoring**: Continuous performance tracking and trend analysis

#### **Asset Detail View**
![Ona Terminal Asset Detail](/assets/images/terminal-asset-detail.svg)

Drill down into individual assets to see:
- **Component Monitoring**: Detailed status of inverters, panels, and cabling
- **Performance Analytics**: Real-time charts and efficiency metrics
- **Maintenance Planning**: Priority-based maintenance recommendations
- **Quick Actions**: One-click access to common tasks and workflows

#### **Work Order Management**
![Ona Terminal Work Order Management](/assets/images/terminal-work-order.svg)

Streamlined work order creation with:
- **Smart Component Selection**: AI-recommended parts based on fault analysis
- **SKU Catalog**: Complete parts inventory with pricing and lead times
- **Work Order Options**: Add to existing orders or create new ones
- **Cost Tracking**: Real-time cost estimates and timeline projections

#### **AI Assistant Chat**
![Ona Terminal AI Assistant](/assets/images/terminal-assistant.svg)

Natural language support through:
- **O&M Expert AI**: Get instant answers to technical questions
- **Fault Diagnosis**: AI-powered analysis of equipment issues
- **Cost Estimates**: Detailed breakdowns of repair costs and timelines
- **Quick Actions**: Direct integration with work order creation



---

## Getting Started

### Installation

```bash
# Install Ona Terminal
curl -fsSL https://install.ona.co/terminal | bash

# Or using package managers
# macOS
brew install ona/ona/terminal

# Ubuntu/Debian
sudo apt-get install ona-terminal

# Windows
winget install Ona.Terminal
```

### Quick Start

```bash
# Initialize Ona Terminal
ona init

# Connect to your energy assets
ona connect --type solar --location "Solar Farm 1"

# Start monitoring
ona monitor start

# View real-time data
ona data stream

# Generate performance report
ona report generate --type performance --period daily
```

---

## Core Commands

### Asset Management
```bash
# List all connected assets
ona assets list

# Add new asset
ona assets add --type inverter --model "SolarEdge SE5000" --location "Site A"

# Monitor specific asset
ona assets monitor --id "inverter-001"

# Update asset configuration
ona assets update --id "inverter-001" --config "optimization.json"
```

### Data Analysis
```bash
# Collect historical data
ona data collect --start "2024-01-01" --end "2024-01-31"

# Analyze performance
ona analyze performance --asset "inverter-001" --period "30d"

# Generate forecasts
ona forecast generate --horizon "7d" --confidence "95%"

# Export data
ona data export --format csv --output "performance_data.csv"
```

### OODA Workflow
```bash
# Start OODA workflow
ona ooda start --workflow "solar_optimization"

# Observe current state
ona ooda observe --assets all

# Orient analysis
ona ooda orient --analysis "performance_trends"

# Make decisions
ona ooda decide --strategy "optimize_production"

# Execute actions
ona ooda act --action "adjust_inverter_settings"
```

---

## Configuration

### Configuration File
Create a `ona-config.yaml` file in your project:

```yaml
# Ona Terminal Configuration
version: "1.0"

# API Configuration
api:
  url: "https://api.ona.co"
  key: "${ONA_API_KEY}"
  region: "us-east-1"

# Asset Configuration
assets:
  solar:
    - id: "inverter-001"
      type: "inverter"
      model: "SolarEdge SE5000"
      location: "Site A"
      coordinates: [40.7128, -74.0060]
  
  battery:
    - id: "battery-001"
      type: "storage"
      model: "Tesla Powerwall"
      capacity: "13.5kWh"

# Monitoring Configuration
monitoring:
  interval: "5m"
  alerts:
    enabled: true
    email: "alerts@company.com"
    webhook: "https://hooks.slack.com/..."

# OODA Workflow Configuration
ooda:
  workflows:
    solar_optimization:
      observe:
        - "collect_inverter_data"
        - "collect_weather_data"
      orient:
        - "analyze_performance"
        - "identify_optimization_opportunities"
      decide:
        - "calculate_optimal_settings"
      act:
        - "adjust_inverter_parameters"
```

---

## Use Cases

### Solar Farm Management
```bash
# Monitor entire solar farm
ona farm monitor --site "Solar Farm Alpha"

# Optimize production
ona farm optimize --strategy "maximize_production"

# Generate daily reports
ona farm report --type daily --format pdf
```

### Battery Storage Optimization
```bash
# Monitor battery health
ona battery health --id "battery-001"

# Optimize charging schedule
ona battery optimize --strategy "cost_minimization"

# Forecast storage needs
ona battery forecast --horizon "24h"
```

### Grid Integration
```bash
# Monitor grid connection
ona grid status --connection "main_grid"

# Optimize power flow
ona grid optimize --strategy "load_balancing"

# Handle grid events
ona grid events --monitor true
```

---

## Advanced Features

### Custom Plugins
Create custom plugins to extend functionality:

```python
# custom_plugin.py
from ona.plugin import Plugin

class CustomOptimizationPlugin(Plugin):
    def optimize_production(self, asset_data):
        # Custom optimization logic
        return optimized_settings

# Register plugin
ona plugin register custom_optimization.py
```

### Automation Scripts
Create automated workflows:

```bash
#!/bin/bash
# daily_optimization.sh

# Collect data
ona data collect --period "24h"

# Analyze performance
ona analyze performance --assets all

# Generate optimization recommendations
ona optimize generate --type "production"

# Apply optimizations
ona optimize apply --recommendations "latest"
```

### Integration with External Systems
```bash
# Export to external monitoring system
ona export --target "grafana" --format "json"

# Import from SCADA system
ona import --source "scada" --format "csv"

# Sync with cloud platform
ona sync --platform "aws" --bucket "energy-data"
```

---

## Support & Resources

### Documentation
- [Command Reference](https://code.asoba.co/terminal/commands)
- [API Documentation](https://code.asoba.co/terminal/api)
- [Plugin Development](https://code.asoba.co/terminal/plugins)

### Community
- [GitHub Repository](https://github.com/asoba/ona-terminal)
- [Discord Community](https://discord.gg/nNV5evcr)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/ona-terminal)

### Support
- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 📖 **Documentation**: [docs.asoba.co](https://docs.asoba.co)
- 💬 **Community**: [Discord](https://discord.gg/nNV5evcr)

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

© 2025 Asoba Corporation. All rights reserved.
