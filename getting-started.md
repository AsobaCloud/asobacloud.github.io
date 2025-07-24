---
title: "Getting Started"
layout: default
nav_order: 2
---

# Getting Started with Ona

This comprehensive guide will walk you through everything you need to know to successfully integrate with the Ona API Platform. Whether you're new to energy forecasting or looking to migrate from another solution, we'll get you up and running efficiently.

---

## Prerequisites

Before you begin, ensure you have:

- **API Credentials**: Contact [sales@asoba.co](mailto:sales@asoba.co) to get your API key
- **Historical Data**: Minimum 12 months of interval data (preferably 36 months for best accuracy)
- **Development Environment**: Python 3.7+ or Node.js 14+ for SDK usage
- **Data Format**: CSV files with timestamp and energy values

---

## Understanding Ona's Architecture

![Architecture diagram of API's](https://staging-internal.asoba.co/api-architecture.png){:width="75%"}

Ona's API platform consists of:

- **Regional Endpoints**: Data sovereignty and latency optimization
- **Data Processing Pipeline**: Automated preprocessing and validation
- **ML Training Infrastructure**: Custom model training per customer
- **Forecasting Engine**: Real-time prediction generation
- **Results Delivery**: Email, API, or webhook notifications

---

## Integration Paths

### Option 1: On-Demand Web App {#web-app-path}

**Best for**: Quick trials, non-technical users, one-off forecasts

- **Register**: [https://app.asoba.co](https://app.asoba.co)
- **Features**: Policy analyst chatbot, grid operations, model training UI
- **Pricing**: Subscription-based with usage tiers

### Option 2: API Integration {#api-integration-path}

**Best for**: Production systems, automated workflows, high-volume processing

![Onboarding Process]({{ site.baseurl }}/assets/images/onboarding.svg){:width="70%"}

**Our Onboarding Process:**

1. **Initial Consultation**: We identify your specific use cases (load forecasting, data interpolation, dispatch optimization)
2. **Technical Assessment**: We evaluate your data infrastructure, input formats, and availability  
3. **Data Requirements**: We provide a detailed checklist of required data types and formats
4. **Schema Alignment**: We confirm compatibility with your inverter/meter data schemas
5. **Integration Setup**: We configure endpoints and provide API credentials
6. **Testing & Validation**: We run pilot tests to validate accuracy and integration
7. **Training & Support**: We provide comprehensive documentation and dedicated support
8. **Go-Live**: We monitor the transition to production usage

---

## Data Requirements

### Supported Data Sources

| Provider       | Device Type  | Data Format | Minimum Interval |
|----------------|--------------|-------------|-----------------|
| SolarEdge      | Inverter     | CSV         | 15 minutes      |
| Lux Power      | Inverter     | CSV         | 30 minutes      |
| Solarman       | Inverter     | CSV         | 30 minutes      |
| Macrocomm      | Smart Meter  | CSV         | 60 minutes      |
| Switch Energy  | Data Logger  | CSV         | 30 minutes      |
| Utility API    | Smart Meter  | CSV         | 60 minutes      |

Don't see your provider? [Contact us](mailto:support@asoba.co) to add support.

### Data Format Requirements

Your CSV files should contain:

```csv
timestamp,energy_kwh,power_kw
2024-01-01T00:00:00Z,12.5,2.1
2024-01-01T00:30:00Z,15.2,2.8
2024-01-01T01:00:00Z,18.7,3.2
```

**Required Columns:**
- `timestamp`: ISO 8601 format with timezone
- `energy_kwh` or `power_kw`: Energy production/consumption values
- Additional metadata columns are supported

**Data Quality Guidelines:**
- **Completeness**: <5% missing data points
- **Consistency**: Regular intervals (15/30/60 minutes)
- **Accuracy**: Values within expected ranges for your system size
- **Freshness**: Data should be current within 24-48 hours

---

## Authentication

All API requests require authentication using your API key:

```bash
# Headers for all requests
x-api-key: your-api-key-here
```

**API Key Management:**
- Keys are rotated every 6 months for security
- Development and production keys are separate
- Usage is monitored and rate-limited

**Rate Limits:**
- **Standard**: 1 request/second, 10 burst, 100/day
- **Enterprise**: Custom limits available

---

## Your First Integration

### Step 1: Upload Historical Data

```python
import requests

def upload_historical_data():
    url = "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/upload_historical"
    
    params = {
        "customer_id": "your-customer-id",
        "filename": "solar_data_2024.csv", 
        "manufacturer": "SolarEdge",
        "location": "CapeTown", 
        "region": "af-south-1"
    }
    
    headers = {"x-api-key": "your-api-key"}
    
    with open('solar_data_2024.csv', 'rb') as file:
        response = requests.post(url, params=params, headers=headers, data=file)
        
    return response.json()
```

### Step 2: Train Your Model

```python  
def train_forecasting_model():
    url = "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/train"
    
    params = {
        "customer_id": "your-customer-id",
        "location": "CapeTown",
        "manufacturer": "SolarEdge", 
        "serial_number": "SE123456789",
        "region": "af-south-1",
        "testing": "True"  # Set to False for production
    }
    
    headers = {"x-api-key": "your-api-key"}
    
    response = requests.post(url, params=params, headers=headers)
    return response.json()
```

### Step 3: Get Forecast Results

Training typically takes 2-4 hours. Results are delivered via email, or you can retrieve them:

```python
def get_forecast_results():
    url = "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/results"
    
    params = {
        "client_id": "your-client-id",
        "customer_id": "your-customer-id",
        "serial_number": "SE123456789",
        "region": "af-south-1"
    }
    
    headers = {"x-api-key": "your-api-key"}
    
    response = requests.get(url, params=params, headers=headers)
    return response.json()
```

---

## Integration Options

### Push/Pull Methods

**Pull Method (Recommended)**:
- Your system requests forecasts on-demand
- Better control over timing and error handling
- Suitable for batch processing

**Push Method**:
- Ona sends forecasts to your webhook endpoint
- Real-time delivery as soon as results are ready
- Requires webhook endpoint setup

### Data Formats

**JSON Response** (Default):
```json
{
  "forecast": {
    "site_id": "SE123456789",
    "forecast_date": "2024-01-15T00:00:00Z",
    "horizon_hours": 24,
    "interval_minutes": 30,
    "predictions": [
      {"timestamp": "2024-01-15T00:00:00Z", "power_kw": 0.0},
      {"timestamp": "2024-01-15T00:30:00Z", "power_kw": 0.2},
      {"timestamp": "2024-01-15T01:00:00Z", "power_kw": 1.5}
    ]
  }
}
```

**CSV Download**:
- Results stored in S3 bucket
- Pre-signed URLs for secure access
- Suitable for large datasets

---

## Testing & Validation

### Pilot Testing Process

1. **Data Upload**: Submit 12+ months of historical data
2. **Model Training**: We train a custom model for your site
3. **Backtesting**: We validate accuracy against historical data
4. **Live Testing**: 1-2 weeks of live forecasting validation
5. **Performance Review**: We analyze accuracy metrics and optimize

### Key Metrics We Track

- **MAE** (Mean Absolute Error): Average prediction error
- **RMSE** (Root Mean Square Error): Penalizes large errors
- **MAPE** (Mean Absolute Percentage Error): Relative accuracy
- **Forecast Skill**: Performance vs. simple baseline models

### Typical Accuracy Ranges

| Use Case | MAE | RMSE | MAPE |
|----------|-----|------|------|
| Solar PV (day-ahead) | 8-15% | 12-25% | 10-20% |
| Load Forecasting | 5-12% | 8-18% | 6-15% |
| Wind Power | 12-25% | 18-35% | 15-30% |

---

## Production Deployment

### Go-Live Checklist

- [ ] API keys configured in production environment
- [ ] Rate limiting and error handling implemented
- [ ] Monitoring and alerting set up
- [ ] Data backup and recovery procedures tested
- [ ] Security review completed
- [ ] Team training completed

### Monitoring & Support

**Real-Time Monitoring**:
- API health and response times
- Forecast accuracy tracking
- Data quality alerts
- Usage analytics dashboard

**Support Channels**:
- **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- **Account Management**: Your dedicated contact
- **Documentation**: This site and API reference
- **Status Page**: [status.asoba.co](https://status.asoba.co)

---

## Next Steps

Now that you understand the basics:

1. **Explore the API**: [API Reference](api-reference.html) for detailed endpoint documentation
2. **Learn the concepts**: [Core Concepts](core-concepts.html) for deeper understanding  
3. **See examples**: [Use Cases](use-cases.html) for real-world implementations
4. **Try the SDK**: [SDK Documentation](sdk.html) for easier integration
5. **Contact sales**: [sales@asoba.co](mailto:sales@asoba.co) to get started

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
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