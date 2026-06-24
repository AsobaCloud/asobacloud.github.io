---
title: "O&M Optimization"
layout: default
nav_order: 1
parent: "Patterns"
---

# O&M Optimization

AI-powered operations and maintenance optimization for solar assets using the OODA loop methodology.

---

## Overview

O&M optimization transforms reactive maintenance into proactive, data-driven operations. Using the OODA (Observe-Orient-Decide-Act) loop methodology, Ona Terminal provides comprehensive solar asset management that maximizes uptime, minimizes costs, and protects revenue.

---

## The OODA Loop Methodology

### 🔍 **Observe Phase - Fault Detection**
Real-time monitoring and fault detection with energy production forecasting integration:

```bash
# Run fault detection on new telemetry data
ona ooda detect run --asset "inverter-001" --data "latest_telemetry.csv"
```

**Enhanced Capabilities:**
- **Physical Sensor Analysis**: Monitor temperature, voltage, power, and other critical parameters
- **Forecast Integration**: Compare actual power output with forecasted values
- **Anomaly Detection**: Identify deviations that may indicate performance issues
- **Real-Time Alerts**: Instant notification of potential problems

### 🎯 **Orient Phase - Diagnostics**
Advanced diagnostics with Energy-at-Risk (EAR) calculations:

```bash
# Run comprehensive diagnostics
ona ooda diagnose run --asset "inverter-001" --horizon "7d"
```

**Diagnostic Features:**
- **Fault Categorization**: Group issues by type and severity
- **Energy Production Analysis**: Detect anomalies in power output
- **Forecast Deviation Analysis**: Compare actual vs. forecasted performance
- **Degradation Detection**: Identify long-term performance trends
- **Risk Assessment**: Calculate Energy-at-Risk over multiple time horizons

### 🧠 **Decide Phase - Risk Assessment & Scheduling**
Optimized maintenance scheduling with financial impact analysis:

```bash
# Calculate Energy-at-Risk with forecast integration
ona ooda ear calc --asset "inverter-001" --confidence "95%"
```

**Decision Support:**
- **Risk Quantification**: Precise financial impact calculations
- **Forecast Accuracy Integration**: Factor in forecast confidence levels
- **Maintenance Optimization**: Schedule maintenance to minimize revenue impact
- **Resource Planning**: Optimize staffing and parts availability
- **Cost-Benefit Analysis**: Compare maintenance costs vs. potential losses

### ⚡ **Act Phase - Work Execution**
Actionable work orders and execution tracking:

```bash
# Build Bill of Materials with economic comparison
ona ooda bom build --asset "inverter-001" --variants-per-type 3
```

**Execution Features:**
- **Automated BOM Generation**: Create parts lists with multiple vendor options
- **Economic Comparison**: Compare price vs. lead-time vs. downtime costs
- **Work Order Creation**: Generate detailed maintenance instructions
- **Execution Tracking**: Monitor work progress and completion
- **Documentation**: Centralize evidence for audits and compliance

---

## Key Use Case Scenarios

### Scenario A: Rapid Fault Triage and Revenue Protection

**Challenge**: Intermittent inverter underperformance detected during routine monitoring.

**Ona Solution**:
```bash
# Detect and analyze the issue
ona ooda detect run --asset "inverter-001"
ona ooda diagnose run --asset "inverter-001" --horizon "48h"
ona ooda ear calc --asset "inverter-001" --confidence "95%"
```

**Business Impact**:
- **Risk Quantification**: "We detected a persistent deviation vs forecast over the last 48 hours. The EAR estimate shows a $X–$Y band of potential loss if unaddressed."
- **Optimized Scheduling**: "Here's a schedule that minimizes downtime within your staffing constraints."
- **Revenue Protection**: Prevent significant revenue losses through proactive intervention

### Scenario B: Parts/OEM Advisory and Lead-Time Risk

**Challenge**: Diagnostic analysis indicates likely DC fan failure requiring immediate parts procurement.

**Ona Solution**:
```bash
# Generate BOM with multiple vendor options
ona ooda bom build --asset "inverter-001" --variants-per-type 5
ona ooda bom compare --bom "bom-001" --include-downtime-cost
```

**Business Impact**:
- **Immediate Action**: "Based on the error signature, the inverter's DC fan is high-probability. We prepped the BoM so procurement can act immediately."
- **Lead-Time Optimization**: "Lead-time risk is included in scheduling to minimize revenue impact."
- **Economic Trade-offs**: Compare multiple vendor options with different price/lead-time combinations

### Scenario C: Regulatory and Compliance Readiness

**Challenge**: Need to prepare for regulatory audits and warranty compliance requirements.

**Ona Solution**:
```bash
# Generate compliance documentation
ona ooda compliance report --asset "inverter-001" --period "30d"
ona ooda warranty evidence --asset "inverter-001" --issue "fault-001"
```

**Business Impact**:
- **Audit Preparation**: "We centralize evidence for warranty and regulatory audits (diagnostics, risk assessments, maintenance schedules, orders)."
- **Compliance Risk Reduction**: "This shortens audit prep and reduces risk of non-compliance penalties."
- **Documentation Management**: Automated generation of compliance-ready documentation

---

## Asset Management

### Asset Registration
Manage assets through the CLI instead of editing JSON directly:

```bash
# Add an asset with OEM components
ona ooda assets add \
  --id "inverter-001" \
  --type "inverter" \
  --model "SolarEdge SE5000" \
  --location "Site A" \
  --oem "SolarEdge" \
  --serial "SE123456"
```

### Parts Catalogue
Import comprehensive parts catalogues for price/lead-time optimization:

```bash
# Import parts catalogue
ona ooda catalog import --file "parts_catalogue.csv"

# View catalogue contents
ona ooda catalog list --type "cooling_fan"
```

---

## AI-Assisted Analysis

### Interactive AI Mode
Leverage AI for deeper insights and analysis:

```bash
# Start interactive AI mode
ona ooda interactive
```

**Example AI Prompts**:
- "Analyze the cost-benefit of replacing vs. repairing the DC fan"
- "What are the warranty implications of this fault pattern?"
- "Generate a customer-ready explanation of the energy-at-risk calculation"
- "Compare the economic impact of different maintenance schedules"

### AI Capabilities
- **Diagnostic Interpretation**: Explain fault patterns and implications
- **Economic Analysis**: Quantify costs and benefits of different approaches
- **Regulatory Guidance**: Provide compliance and warranty insights
- **Communication Support**: Generate customer-ready explanations

---

## Economic Optimization

### Price vs. Lead-Time vs. Downtime Analysis
When building BOMs with multiple vendor options:

```bash
# Build BOM with economic comparison
ona ooda bom build --asset "inverter-001" --variants-per-type 5
ona ooda bom compare --bom "bom-001" --include-downtime-cost
```

**Economic Factors**:
- **Component Cost**: Direct parts cost from different vendors
- **Lead Time**: Delivery time impact on downtime
- **Downtime Cost**: Revenue loss during maintenance
- **Total Cost of Ownership**: Comprehensive economic analysis

### Vendor Optimization
- **Preferred Vendors**: Filter catalogue by preferred suppliers
- **Quality Tiers**: Compare OEM vs. aftermarket options
- **Bulk Pricing**: Leverage volume discounts
- **Emergency Options**: Identify fast-delivery alternatives

---

## Integration Capabilities

### Data Sources
- **SCADA Systems**: Real-time operational data
- **Weather Data**: Environmental conditions and forecasts
- **Energy Markets**: Price forecasts and market conditions
- **Maintenance Records**: Historical work orders and outcomes

### API Integration
```python
from ona_sdk import OODAClient

# Initialize OODA client
client = OODAClient(api_key="your-api-key")

# Run complete OODA loop
detection = client.observe(asset_id="inverter-001")
diagnosis = client.orient(asset_id="inverter-001")
decision = client.decide(asset_id="inverter-001")
action = client.act(asset_id="inverter-001")
```

---

## Performance Metrics

### Operational KPIs
- **Mean Time to Detection (MTTD)**: Average time to identify issues
- **Mean Time to Resolution (MTTR)**: Average time to resolve issues
- **Uptime Improvement**: Percentage increase in asset availability
- **Cost Reduction**: Reduction in maintenance and downtime costs

### Financial Impact
- **Energy-at-Risk Reduction**: Prevented revenue losses
- **Maintenance Cost Optimization**: Reduced operational expenses
- **ROI Improvement**: Enhanced return on asset investment
- **Compliance Cost Avoidance**: Reduced regulatory penalties

---

## Getting Started

### Prerequisites
- Ona Terminal installed and configured
- Sample data files in appropriate directories
- AWS credentials configured (for forecast integration)

### Quick Start
```bash
# 1. Set up sample data
ona ooda sample_data setup

# 2. Add your first asset
ona ooda assets add --id "inverter-001" --type "inverter"

# 3. Run your first OODA loop
ona ooda detect run --asset "inverter-001"
ona ooda diagnose run --asset "inverter-001"
ona ooda ear calc --asset "inverter-001"
ona ooda bom build --asset "inverter-001"
```

---

## Support & Resources

### Documentation
- [OODA Reference Guide](https://code.asoba.org/ooda-reference)
- [Asset Schema Documentation](https://code.asoba.org/assets-schema)
- [API Reference](https://code.asoba.org/api)

### Community
- [GitHub Repository](https://github.com/asoba/ona-terminal)
- [Discord Community](https://discord.gg/v4vD5EXSUD)
- [O&M Best Practices](https://code.asoba.org/om-best-practices)

### Support
- 📧 **Technical Support**: [support@asoba.org](mailto:support@asoba.org)
- 📖 **Documentation**: [code.asoba.org](https://code.asoba.org)
- 💬 **Community**: [Discord](https://discord.gg/v4vD5EXSUD)

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

© 2025 Asoba Corporation. All rights reserved.
