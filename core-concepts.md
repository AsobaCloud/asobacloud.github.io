---
title: "Core Concepts"
layout: default
nav_order: 3
---

# Core Concepts

Understanding these fundamental concepts will help you make the most of Ona's energy forecasting platform. This section explains how our system works, key terminology, and the principles behind accurate energy predictions.

---

## How Ona Works

### The Forecasting Pipeline

```mermaid
graph LR
    A[Historical Data] --> B[Data Preprocessing]
    B --> C[Feature Engineering]
    C --> D[Model Training]
    D --> E[Model Validation]
    E --> F[Deployment]
    F --> G[Real-time Forecasting]
    G --> H[Results Delivery]
```

**1. Data Ingestion & Preprocessing**
- Automatic data validation and cleaning
- Gap filling and interpolation
- Outlier detection and correction
- Timezone normalization

**2. Feature Engineering**
- Weather data integration (solar irradiance, temperature, wind)
- Calendar features (day of week, season, holidays)
- Lag features and rolling statistics
- Site-specific characteristics

**3. Model Training**
- Custom model per site/device
- Ensemble methods (XGBoost, LSTM, Prophet)
- Cross-validation and hyperparameter tuning
- Continuous learning from new data

**4. Forecasting & Delivery**
- Real-time predictions with confidence intervals
- Multiple horizon forecasts (1-hour to 7-day ahead)
- Automatic model updates and retraining
- Results via API, email, or webhook

---

## Data Architecture

### Regional Deployment

Ona operates in multiple regions for data sovereignty and performance:

| Region | Endpoint | Coverage | Data Center |
|--------|----------|----------|-------------|
| Africa | `af-south-1` | Sub-Saharan Africa | Cape Town |
| North America | `us-east-1` | USA, Canada | Virginia |
| Europe | `eu-west-1` | European Union | Ireland |
| Asia Pacific | `ap-southeast-1` | APAC region | Singapore |

**Benefits:**
- **Low Latency**: Regional processing reduces response times
- **Data Sovereignty**: Data stays within regulatory boundaries  
- **High Availability**: Multi-region redundancy
- **Compliance**: GDPR, CCPA, and local data protection laws

### Data Flow

```
CSV Upload → Lambda@Edge → Regional API Gateway → 
Preprocessing Service → S3 Data Lake → SageMaker Training → 
Model Registry → Inference Service → Results Storage
```

---

## Forecasting Types

### Historical Data Training

**Purpose**: Train custom models using your site's historical data

**Requirements**:
- Minimum 12 months of data (36 months recommended)
- Regular intervals (15/30/60 minutes)
- <5% missing data points

**Process**:
1. Upload via `/upload_historical` endpoint
2. Trigger training via `/train` endpoint  
3. Model validation and backtesting
4. Model deployment for live forecasting

### Nowcast Forecasting

**Purpose**: Real-time forecasting using recent data

**Use Cases**:
- Day-ahead energy trading
- Grid balancing and dispatch
- Demand response optimization

**Features**:
- 1-48 hour forecast horizons
- 15-minute to 1-hour intervals
- Confidence intervals and uncertainty quantification
- Weather-based adjustments

### Long-term Forecasting

**Purpose**: Strategic planning and capacity optimization

**Horizons**:
- Weekly (1-4 weeks ahead)
- Monthly (1-12 months ahead)  
- Seasonal (quarterly forecasts)

**Applications**:
- Resource planning
- Maintenance scheduling
- Financial modeling
- Contract negotiations

---

## Model Types & Algorithms

### Ensemble Methods

Ona uses multiple algorithms to maximize accuracy:

**XGBoost (Gradient Boosting)**:
- Excellent for complex, non-linear patterns
- Handles weather correlations well
- Fast training and inference
- Good for short-term forecasts (1-24 hours)

**LSTM Neural Networks**:
- Captures long-term temporal dependencies
- Learns seasonal patterns automatically
- Handles missing data gracefully
- Best for multi-day forecasts

**Prophet (Time Series)**:
- Robust to outliers and missing data
- Excellent for seasonal decomposition
- Handles holidays and special events
- Good baseline model

**Weather-Aware Models**:
- Integrate real-time weather data
- Solar irradiance and cloud forecasting
- Temperature and wind speed correlations
- Geographic and topographic factors

### Model Selection Logic

```python
def select_model(forecast_horizon, data_quality, use_case):
    if forecast_horizon <= 24:  # Hours
        if data_quality > 0.95:
            return "XGBoost + Weather"
        else:
            return "LSTM + Interpolation"
    
    elif forecast_horizon <= 168:  # 1 week
        return "LSTM + Prophet Ensemble"
    
    else:  # Long-term
        return "Prophet + Seasonal Decomposition"
```

---

## Data Quality & Preprocessing

### Data Validation Pipeline

**1. Format Validation**
- Timestamp parsing and timezone handling
- Numeric value validation
- Column mapping and standardization
- File integrity checks

**2. Quality Assessment**
```python
quality_metrics = {
    "completeness": missing_data_percentage,
    "consistency": interval_regularity_score, 
    "accuracy": outlier_detection_score,
    "freshness": data_recency_hours
}
```

**3. Automatic Corrections**
- **Gap Filling**: Linear interpolation for <2 hour gaps
- **Outlier Removal**: Statistical outliers beyond 3 standard deviations
- **Smoothing**: Kalman filtering for noisy sensor data
- **Normalization**: Power/energy unit conversions

### Data Enrichment

**Weather Integration**:
- Satellite-based solar irradiance data
- Numerical weather prediction models
- Historical weather pattern analysis
- Microclimate adjustments

**Calendar Features**:
- National and regional holidays
- Daylight saving time transitions
- School holidays and business cycles
- Cultural and religious events

---

## Accuracy & Performance Metrics

### Standard Metrics

**Mean Absolute Error (MAE)**:
```
MAE = (1/n) * Σ|actual - predicted|
```
- Easy to interpret in original units
- Robust to outliers
- Typical values: 8-15% for solar, 5-12% for load

**Root Mean Square Error (RMSE)**:  
```
RMSE = √[(1/n) * Σ(actual - predicted)²]
```
- Penalizes large errors more heavily
- Good for optimization objectives
- Always ≥ MAE

**Mean Absolute Percentage Error (MAPE)**:
```
MAPE = (100/n) * Σ|((actual - predicted)/actual)|
```
- Scale-independent comparison
- Easy stakeholder communication
- Can be unstable near zero values

### Advanced Metrics

**Forecast Skill Score**:
```
Skill = 1 - (MAE_model / MAE_baseline)
```
- Compares against simple baseline (persistence, climatology)
- Values > 0 indicate model adds value
- Industry standard for forecast evaluation

**Pinball Loss (Quantile Accuracy)**:
- Evaluates prediction intervals
- Measures both coverage and sharpness
- Critical for risk management and trading

### Benchmark Performance

| Use Case | Typical MAE | Target RMSE | Skill Score |
|----------|-------------|-------------|-------------|
| Residential Solar PV | 10-15% | 15-25% | 0.2-0.4 |
| Commercial Load | 6-12% | 10-18% | 0.3-0.5 |
| Utility-Scale Solar | 8-12% | 12-20% | 0.4-0.6 |
| Wind Power | 15-25% | 20-35% | 0.2-0.3 |

---

## Integration Patterns

### Batch Processing

**Use Case**: Daily forecast generation for large portfolios

```python
# Example batch workflow
def daily_batch_process():
    sites = get_active_sites()
    
    for site in sites:
        # Upload latest data
        upload_nowcast_data(site)
        
        # Generate forecasts
        forecast = generate_forecast(site, horizon='24h')
        
        # Store results
        store_forecast(site, forecast)
        
        # Send alerts if needed  
        check_forecast_alerts(site, forecast)
```

### Real-time Streaming

**Use Case**: Live grid operations and trading

```python
# Real-time processing
def process_real_time_data(site_data):
    # Validate incoming data
    validated_data = validate_stream(site_data)
    
    # Update running models
    update_online_model(validated_data)
    
    # Generate immediate forecast
    forecast = predict_next_interval(validated_data)
    
    # Publish to downstream systems
    publish_forecast(forecast)
```

### Event-Driven Architecture

**Use Case**: Webhook-based forecast delivery

```json
{
  "event": "forecast_ready",
  "site_id": "SE123456789", 
  "forecast_time": "2024-01-15T08:00:00Z",
  "horizon_hours": 24,
  "accuracy_metrics": {
    "mae": 0.12,
    "rmse": 0.18,
    "skill_score": 0.35
  },
  "download_url": "https://s3.amazonaws.com/ona-forecasts/..."
}
```

---

## Error Handling & Reliability

### Common Error Scenarios

**1. Data Quality Issues**
- **Symptom**: High forecast errors or model training failures
- **Causes**: Missing data, sensor malfunctions, format changes
- **Solution**: Automatic data validation and client notifications

**2. Model Performance Degradation**  
- **Symptom**: Gradually increasing forecast errors
- **Causes**: Concept drift, equipment changes, seasonal shifts
- **Solution**: Automated retraining triggers and performance monitoring

**3. API Availability**
- **Symptom**: Request timeouts or 5xx errors
- **Causes**: High load, infrastructure issues, maintenance
- **Solution**: Regional failover, request queuing, status notifications

### Reliability Features

**Multi-Region Failover**:
- Automatic routing to healthy regions
- Data replication across regions
- <1 minute failover time

**Graceful Degradation**:
- Fallback to simpler models if complex models fail
- Historical average as last resort
- Clear uncertainty indicators

**Monitoring & Alerting**:
- Real-time accuracy tracking
- Data quality dashboards  
- Automated issue notifications
- SLA monitoring and reporting

---

## Security & Compliance

### Data Protection

**Encryption**:
- TLS 1.3 for data in transit
- AES-256 encryption for data at rest
- Key rotation every 90 days

**Access Control**:
- API key-based authentication
- Role-based access control (RBAC)
- IP whitelisting available
- Audit logging for all access

**Data Retention**:
- Customer data: Retained per contract terms
- Model artifacts: 2 years for reproducibility
- Logs: 90 days for debugging
- Secure deletion on request

### Compliance Standards

**Certifications**:
- SOC 2 Type II compliance
- ISO 27001 information security
- GDPR data protection (EU)
- CCPA privacy compliance (California)

**Industry Standards**:
- IEEE 1547 grid interconnection
- IEC 61850 power system communication
- NERC CIP critical infrastructure protection

---

## Next Steps

Now that you understand how Ona works:

1. **Start building**: [API Reference](api-reference.html) for detailed endpoints
2. **See examples**: [Use Cases](use-cases.html) for real implementations  
3. **Try the SDK**: [SDK Documentation](sdk.html) for easier integration
4. **Get support**: [Contact us](mailto:support@asoba.co) for technical questions

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