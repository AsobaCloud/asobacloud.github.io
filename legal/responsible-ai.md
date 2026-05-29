---
layout: default
title: "Responsible AI Policy"
parent: "Legal"
---

# Responsible AI Policy

**Effective Date:** February 12, 2026
**Last Updated:** February 12, 2026

Asoba Corporation ("Asoba," "we," "us," or "our") is committed to the responsible development, deployment, and operation of artificial intelligence and machine learning systems in the energy sector. This policy outlines our principles, practices, and commitments for ensuring that our AI/ML technologies — including the Ona Intelligence Layer, Nehanda, Zorora, and related products — are developed and used ethically, safely, and transparently.

---

## 1. Our Commitment

We believe that AI has the potential to significantly improve energy system reliability, efficiency, and sustainability. With that potential comes responsibility. We are committed to building AI systems that:

- Serve the interests of our customers, their communities, and the broader energy ecosystem
- Operate reliably within well-defined boundaries
- Are transparent in their capabilities and limitations
- Maintain human oversight at every critical decision point

---

## 2. Core Principles

### 2.1 Fairness and Non-Discrimination

Our AI/ML models are designed to provide accurate, unbiased outputs regardless of geography, asset manufacturer, or customer size. We actively work to:

- Ensure forecasting models perform consistently across different equipment types and manufacturers (Huawei, SolarEdge, SMA, Enphase, and others)
- Monitor for and mitigate biases that may arise from imbalanced training data
- Validate model performance across diverse operating conditions and climatic zones
- Provide equitable service quality to all customers

### 2.2 Transparency and Explainability

We believe users of AI systems have the right to understand how those systems work and how decisions are made. We commit to:

- Documenting our model architectures, training methodologies, and data sources
- Providing clear confidence intervals and uncertainty estimates with all forecasts
- Making model versioning information available through our API and ML Model Registry
- Publishing performance metrics and accuracy benchmarks for our forecasting models
- Clearly communicating when outputs are AI-generated versus human-curated

### 2.3 Accountability

We take responsibility for the AI systems we build and deploy. This means:

- Maintaining clear ownership and governance structures for all AI/ML models
- Conducting regular internal reviews of model performance and impact
- Providing clear escalation paths when AI outputs require human review
- Standing behind our model outputs with documented accuracy guarantees
- Maintaining audit trails for model training, deployment, and prediction history

### 2.4 Safety and Reliability

Energy systems demand high reliability. Our AI/ML systems are designed with safety as a primary consideration:

- Models undergo rigorous testing before deployment, including edge-case and stress testing
- Automatic anomaly detection flags unusual outputs before they reach downstream systems
- Rollback mechanisms allow immediate reversion to previous model versions if issues are detected
- Ona Edge deployments maintain offline operation capability to ensure continuity
- All models include defined operating envelopes beyond which outputs are flagged or withheld

---

## 3. Data Practices for Model Training

### 3.1 Data Collection

We train our models using energy production, weather, and asset performance data. We commit to:

- Collecting only the data necessary for model training and service delivery
- Obtaining appropriate consent and authorization before using customer data for model improvement
- Anonymizing and aggregating data where possible to protect customer privacy
- Complying with all applicable data protection regulations

### 3.2 Data Quality

The quality of our AI outputs depends on the quality of input data. We invest in:

- Automated data cleaning and validation pipelines
- Quality scoring systems that flag data issues before they affect models
- Schema normalization to ensure consistent data structures regardless of source
- Transparent communication about data quality requirements and their impact on model accuracy

### 3.3 Data Security

All data used in model training and inference is protected by:

- Encryption in transit and at rest
- Role-based access controls
- Regular security audits and penetration testing
- Compliance with industry-standard security frameworks

---

## 4. Human Oversight

AI should augment human decision-making, not replace it. We maintain human oversight through:

- **Model Review**: All models are reviewed by qualified engineers before deployment
- **Performance Monitoring**: Continuous monitoring by our data science team with automated alerts for performance degradation
- **Customer Controls**: Customers retain the ability to override, adjust, or disable AI-driven recommendations
- **Escalation Procedures**: Clear processes for escalating AI outputs that fall outside expected parameters
- **A/B Testing**: New model versions are validated against existing versions before full deployment

---

## 5. Bias Monitoring and Mitigation

We proactively monitor for and address bias in our AI systems:

- **Pre-deployment**: Models are tested across diverse datasets representing different geographies, asset types, and operating conditions
- **Post-deployment**: Ongoing monitoring tracks model performance across customer segments to detect drift or emerging biases
- **Remediation**: When bias is detected, we take prompt action to investigate root causes and deploy corrective measures
- **Reporting**: We maintain internal records of bias investigations and remediation actions

---

## 6. Continuous Improvement

Responsible AI is not a one-time effort. We are committed to:

- Regular review and updates to this policy as our technology and understanding evolves
- Staying current with industry best practices, standards, and regulatory developments
- Engaging with the energy industry, academic researchers, and policymakers on AI governance
- Incorporating feedback from customers and stakeholders into our AI development processes
- Investing in research to improve model explainability, fairness, and safety

---

## 7. Scope of Application

This policy applies to all AI/ML systems developed, deployed, or operated by Asoba Corporation, including but not limited to:

- **Ona Intelligence Layer**: Cloud-based forecasting, anomaly detection, and MLOps
- **Ona Edge**: Edge-deployed inference models for real-time and offline operation
- **Nehanda**: Intelligence assessment and signal detection models
- **Zorora**: Deep research engine with credibility scoring
- **ASB-P Protocol**: Blockchain-based performance enforcement mechanisms
- Any custom models developed for specific customer deployments

---

## 8. Contact Us

If you have questions, concerns, or feedback about our Responsible AI practices, please contact us:

**Email:** [support@asoba.org](mailto:support@asoba.org)
**Website:** [asoba.org](https://asoba.org)

We welcome dialogue with our customers, partners, and the broader community on responsible AI in the energy sector.

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
