---
title: "Implementation Guide"
layout: default
nav_order: 4
parent: "Intelligence Layer"
---

# Implementation Guide: 13-Week Onboarding for Distributed Solar Assets

## Use Case: Asset Manager with 2MW Solar Portfolio

**Client Profile:**
- **Portfolio Size**: 2MW total capacity
- **Site Distribution**: 3 sites
  - Site A: 800kW (commercial rooftop)
  - Site B: 700kW (ground-mounted)
  - Site C: 500kW (industrial rooftop)
- **Current State**: Manual monitoring via SCADA systems, reactive maintenance, spreadsheet-based reporting
- **Goal**: Automated intelligence platform with predictive maintenance, real-time monitoring, and optimized operations

---

## Implementation Overview

This guide details the 13-week validation process for onboarding distributed solar assets onto the Ona Distributed Energy Management Platform. The implementation follows the platform architecture from data ingestion through AI-powered insights, ensuring a systematic approach to integration and optimization.

---

## Week-by-Week Implementation Plan

### **Weeks 1-2: Integration Phase**

#### **Week 1: Foundation & Data Discovery**

**Objective**: Establish technical foundation and understand current data infrastructure

**Activities**:

**Day 1-2: Project Kickoff & Technical Assessment**
- Initial technical call with Ona implementation team
- Site inventory documentation:
  - Site A: 800kW, 320 panels, 8 inverters (SolarEdge SE5000)
  - Site B: 700kW, 280 panels, 7 inverters (Fronius Symo 10.0)
  - Site C: 500kW, 200 panels, 5 inverters (SolarEdge SE5000)
- SCADA system audit:
  - Identify data sources (PI Historian, Modbus, API endpoints)
  - Document existing data collection infrastructure
  - Map network topology and security requirements
- Historical data availability assessment:
  - Verify 2+ years of historical telemetry data
  - Identify data gaps and quality issues
  - Document data retention policies

**Day 3-4: Platform Architecture Setup**
- **Data Sources Layer**: Document all solar array telemetry points
  - Panel-level metrics: voltage, current, power output
  - Inverter metrics: efficiency, temperature, AC/DC conversion
  - Environmental data: irradiance sensors, weather stations
  - Site-level aggregation: total generation, grid connection status
- **Ingestion & ETL Layer**: Configure extraction pipelines
  - Set up SQL queries for PI Historian extraction
  - Configure API connections for SCADA systems
  - Establish Modbus connections where applicable
  - Create data validation schemas for each site
- **Storage Layer**: Initialize model output store
  - Configure partitioned Parquet storage structure
  - Set up versioning for cleaned datasets
  - Establish backup and retention policies

**Day 5: Baseline Establishment**
- Extract 30-day sample dataset from each site
- Run initial data quality assessment:
  - Completeness metrics (target: >95%)
  - Timestamp alignment across sites
  - Missing data pattern analysis
- Establish performance baselines:
  - Historical capacity factor calculation
  - Average daily generation profiles
  - Peak performance benchmarks
- Document current operational metrics:
  - Mean Time to Detection (MTTD): baseline measurement
  - Mean Time to Resolution (MTTR): baseline measurement
  - False positive rate: baseline measurement
  - Data completeness: baseline measurement

#### **Week 2: Data Integration & Pipeline Activation**

**Objective**: Connect all data sources and activate real-time data pipelines

**Activities**:

**Day 1-3: SCADA/Inverter Connections**
- **Site A (800kW)**: 
  - Connect 8 SolarEdge inverters via SolarEdge API
  - Configure 15-minute interval data extraction
  - Set up panel-level monitoring for 320 panels
  - Establish weather station data feed
- **Site B (700kW)**:
  - Connect 7 Fronius inverters via Modbus TCP
  - Configure 5-minute interval data extraction
  - Set up string-level monitoring for 280 panels
  - Integrate third-party weather API
- **Site C (500kW)**:
  - Connect 5 SolarEdge inverters via SolarEdge API
  - Configure 15-minute interval data extraction
  - Set up panel-level monitoring for 200 panels
  - Establish on-site weather station connection

**Day 4-5: Historical Data Ingestion**
- **Ingestion & ETL Layer**: Execute historical backfill
  - Extract 2 years of historical data from PI Historian
  - Process Site A: ~1.4M data points (800kW × 2 years × 96 intervals/day)
  - Process Site B: ~1.2M data points (700kW × 2 years × 96 intervals/day)
  - Process Site C: ~876K data points (500kW × 2 years × 96 intervals/day)
- **ETL Pipeline**: Run data transformation
  - Clean and validate all historical records
  - Apply interpolation for missing data points
  - Generate statistical features (rolling averages, deviations)
  - Create time-series features for ML models
- **Feature Engineering**: Generate ML-ready features
  - Time-based features: hour of day, day of week, seasonality
  - Weather-derived features: irradiance, temperature, cloud cover
  - Performance metrics: capacity factor, efficiency ratios
  - Degradation indicators: year-over-year comparisons

**Day 6-7: Baseline Validation & Dashboard Design**
- Validate data completeness across all sites (target: >95%)
- Generate baseline performance reports:
  - Site A: Average daily generation profile
  - Site B: Average daily generation profile
  - Site C: Average daily generation profile
  - Portfolio-level aggregation
- **Access Layer**: Design custom dashboard
  - Portfolio overview: total generation, capacity factor
  - Site-level dashboards: individual site performance
  - Asset-level views: inverter and panel performance
  - Alert configuration: threshold-based notifications
- Establish key performance indicators (KPIs):
  - Daily generation targets
  - Performance ratio benchmarks
  - Availability targets (>98%)

---

### **Weeks 3-12: Optimization Phase**

#### **Week 3: Real-Time Monitoring Activation**

**Objective**: Activate real-time monitoring and establish continuous data flow

**Activities**:

**Day 1-2: Real-Time Pipeline Activation**
- **Data Sources Layer**: Verify live data streams
  - Confirm 15-minute data updates from all sites
  - Validate data latency (<5 minutes from generation to platform)
  - Test alert mechanisms for data feed interruptions
- **Ingestion & ETL Layer**: Activate continuous ETL
  - Nightly delta extraction from inverters
  - Real-time data validation and cleaning
  - Automatic feature generation pipeline
- **AI & Modeling Layer**: Initialize baseline models
  - Deploy production forecasting models
  - Activate fault detection algorithms
  - Enable performance degradation monitoring

**Day 3-4: Dashboard Customization**
- **Access Layer**: Configure user-facing dashboards
  - Portfolio overview dashboard with 3-site aggregation
  - Site-specific dashboards for operations team
  - Asset detail views for maintenance team
  - Mobile-responsive views for field technicians
- Set up automated reporting:
  - Daily generation summaries
  - Weekly performance reports
  - Monthly portfolio analytics

**Day 5-7: Initial Model Training**
- **AI & Modeling Layer**: Train initial ML models
  - Generation forecasting models per site
  - Fault detection models for each inverter type
  - Performance prediction models
- Validate model accuracy:
  - Forecast accuracy: MAPE <10% for 24-hour horizon
  - Fault detection: <5% false positive rate
  - Performance prediction: R² >0.85

#### **Week 4: Performance Baseline & Model Calibration**

**Objective**: Establish performance baselines and calibrate initial models

**Activities**:

**Day 1-3: Baseline Metrics Collection**
- Collect Week 3 operational data
- Calculate baseline KPIs:
  - Mean Time to Detection (MTTD): measure current state
  - Mean Time to Resolution (MTTR): measure current state
  - False Positive Rate: measure current state
  - Data Completeness: measure current state (target: >95%)
- Generate Week 3 performance report:
  - Total generation: compare to forecast
  - Site-level performance analysis
  - Asset availability metrics
  - Data quality assessment

**Day 4-5: Model Calibration**
- **AI & Modeling Layer**: Refine ML models based on Week 3 data
  - Adjust forecasting models with site-specific parameters
  - Calibrate fault detection thresholds
  - Optimize performance prediction models
- Validate improvements:
  - Forecast accuracy improvement tracking
  - False positive rate reduction
  - Model confidence intervals

**Day 6-7: First Weekly Performance Report**
- Generate comprehensive Week 4 report:
  - Portfolio performance summary
  - Site-by-site analysis
  - Model performance metrics
  - Recommendations for optimization
- Review with asset manager team
- Document lessons learned and adjustments

#### **Week 5: Advanced Monitoring & Alert Configuration**

**Objective**: Enhance monitoring capabilities and configure intelligent alerts

**Activities**:

**Day 1-2: Advanced Monitoring Setup**
- **AI & Modeling Layer**: Deploy advanced monitoring agents
  - Energy-at-Risk (EAR) calculation agent
  - Predictive maintenance scheduling agent
  - Performance degradation detection agent
- Configure intelligent alerting:
  - Threshold-based alerts: generation drops >10%
  - Anomaly detection alerts: statistical deviations
  - Forecast deviation alerts: actual vs. forecast >15%
  - Maintenance window optimization alerts

**Day 3-4: OODA Loop Integration**
- Implement OODA (Observe-Orient-Decide-Act) workflow:
  - **Observe**: Real-time fault detection across all assets
  - **Orient**: Automated diagnostics and root cause analysis
  - **Decide**: Risk assessment and maintenance scheduling
  - **Act**: Automated work order generation
- Configure for 3-site portfolio:
  - Site A: 8 inverters, 320 panels
  - Site B: 7 inverters, 280 panels
  - Site C: 5 inverters, 200 panels

**Day 5-7: Weekly Performance Report & Optimization**
- Generate Week 5 performance report
- Analyze model improvements:
  - Forecast accuracy trends
  - Fault detection effectiveness
  - Alert accuracy metrics
- Implement optimizations based on findings

#### **Week 6: Predictive Maintenance Activation**

**Objective**: Activate predictive maintenance capabilities

**Activities**:

**Day 1-3: Maintenance Module Setup**
- **AI & Modeling Layer**: Deploy maintenance optimization agents
  - Maintenance-Market Window agent: optimize maintenance timing
  - AI Crew-Quality Oracle: enhance maintenance quality tracking
  - Parts procurement optimization
- Configure maintenance workflows:
  - Preventive maintenance schedules
  - Predictive maintenance triggers
  - Emergency maintenance protocols
- Set up parts catalog integration:
  - Inverter parts (SolarEdge SE5000, Fronius Symo 10.0)
  - Panel components
  - Balance of system components

**Day 4-5: First Predictive Insights**
- Generate maintenance recommendations:
  - Inverter health assessments across all 20 inverters
  - Panel degradation analysis across 800 panels
  - Balance of system component health
- Create maintenance schedules:
  - Optimized timing based on market conditions
  - Resource allocation across 3 sites
  - Cost-benefit analysis for each recommendation

**Day 6-7: Weekly Performance Report**
- Week 6 performance report
- Maintenance optimization metrics:
  - Predicted vs. actual maintenance needs
  - Cost savings from optimized scheduling
  - Downtime reduction metrics

#### **Week 7: Forecasting & Trading Integration**

**Objective**: Enhance forecasting capabilities and prepare for trading optimization

**Activities**:

**Day 1-3: Advanced Forecasting Models**
- **AI & Modeling Layer**: Deploy enhanced forecasting agents
  - 24-hour generation forecasting per site
  - Portfolio-level aggregation forecasting
  - Probabilistic forecasting with confidence intervals
- Validate forecast accuracy:
  - Site A: 24-hour forecast MAPE target <8%
  - Site B: 24-hour forecast MAPE target <8%
  - Site C: 24-hour forecast MAPE target <8%
  - Portfolio: 24-hour forecast MAPE target <7%

**Day 4-5: Trading Optimization Preparation**
- Configure energy trading parameters:
  - Market price integration (if applicable)
  - Bid optimization algorithms
  - Penalty risk assessment
- Set up Penalty-Insurance Meta-Forecast:
  - 5th-95th percentile error bands
  - Half-hourly penalty risk assessment
  - Pre-18:00 gate closure risk alerts

**Day 6-7: Weekly Performance Report**
- Week 7 performance report
- Forecasting accuracy analysis
- Trading optimization readiness assessment

#### **Week 8: Compliance & Reporting Automation**

**Objective**: Automate regulatory compliance and reporting

**Activities**:

**Day 1-3: Compliance Module Setup**
- **AI & Modeling Layer**: Deploy Regulatory Reporting Co-Pilot
  - Configure SAWEM XML template auto-fill
  - Set up data quality attestation
  - Enable compliance flagging system
- Document compliance requirements:
  - Regulatory reporting obligations
  - Data retention requirements
  - Audit trail configuration

**Day 4-5: Automated Reporting**
- Generate automated compliance reports:
  - Monthly regulatory submissions
  - Data quality attestations
  - Performance certifications
- Validate report accuracy and completeness

**Day 6-7: Weekly Performance Report**
- Week 8 performance report
- Compliance automation metrics:
  - Time savings: target 3 days → 30 minutes
  - Compliance risk reduction
  - Audit readiness assessment

#### **Week 9: Portfolio Optimization**

**Objective**: Optimize portfolio-level operations and cross-site coordination

**Activities**:

**Day 1-3: Portfolio-Level Analytics**
- **AI & Modeling Layer**: Deploy portfolio optimization agents
  - Cross-site performance comparison
  - Portfolio-level forecasting
  - Resource allocation optimization
- Generate portfolio insights:
  - Best-performing site analysis
  - Underperforming asset identification
  - Optimization opportunities

**Day 4-5: Cross-Site Coordination**
- Optimize maintenance scheduling across 3 sites:
  - Coordinate maintenance windows
  - Optimize crew allocation
  - Minimize portfolio downtime
- Implement load balancing strategies:
  - Grid integration optimization
  - Peak shaving coordination
  - Revenue optimization

**Day 6-7: Weekly Performance Report**
- Week 9 performance report
- Portfolio optimization metrics:
  - Overall portfolio performance
  - Cross-site coordination benefits
  - Revenue optimization impact

#### **Week 10: Advanced AI Features**

**Objective**: Deploy advanced AI capabilities for enhanced intelligence

**Activities**:

**Day 1-3: Advanced AI Agents Deployment**
- **AI & Modeling Layer**: Deploy specialized agents
  - Cloud-Shadow Nowcast for Solar (if sky cameras available)
  - Enhanced degradation detection
  - Advanced anomaly detection
- Configure site-specific AI features:
  - Site A: Rooftop-specific optimizations
  - Site B: Ground-mounted specific features
  - Site C: Industrial rooftop optimizations

**Day 4-5: AI Model Refinement**
- Retrain models with 10 weeks of operational data
- Improve model accuracy:
  - Forecast accuracy: target MAPE <7%
  - Fault detection: target false positive <3%
  - Performance prediction: target R² >0.90
- Validate model improvements

**Day 6-7: Weekly Performance Report**
- Week 10 performance report
- AI feature effectiveness analysis
- Model improvement metrics

#### **Week 11: Integration & API Access**

**Objective**: Enable API access and external integrations

**Activities**:

**Day 1-3: API Gateway Configuration**
- **Access Layer**: Configure API Gateway
  - Set up RESTful endpoints
  - Configure GraphQL API (if needed)
  - Implement rate limiting and security
- Enable API access for:
  - Real-time generation data
  - Forecast data
  - Maintenance recommendations
  - Performance metrics

**Day 4-5: External Integration Testing**
- Test API integrations:
  - Third-party monitoring systems
  - Energy management systems
  - Trading platforms (if applicable)
- Validate data flow and security

**Day 6-7: Weekly Performance Report**
- Week 11 performance report
- API usage metrics
- Integration success assessment

#### **Week 12: Final Optimization & Preparation**

**Objective**: Final model optimization and Week 13 preparation

**Activities**:

**Day 1-3: Comprehensive Model Retraining**
- **AI & Modeling Layer**: Final model optimization
  - Retrain all models with 12 weeks of data
  - Optimize hyperparameters
  - Validate model performance across all metrics
- Generate comprehensive performance analysis:
  - 12-week trend analysis
  - Model accuracy improvements
  - Operational efficiency gains

**Day 4-5: Performance Metrics Compilation**
- Compile all key metrics for Week 13 review:
  - **Latency**: Data pipeline latency metrics
  - **MTTR**: Mean Time to Resolution improvements
  - **False Positives**: Fault detection accuracy
  - **Data Completeness**: Data quality metrics
- Generate comparison reports:
  - Baseline vs. current performance
  - Week-by-week improvements
  - ROI calculations

**Day 6-7: Executive Report Preparation**
- Prepare comprehensive executive report:
  - 12-week implementation summary
  - Key performance improvements
  - Financial impact analysis
  - Recommendations for scale-up
- Schedule Week 13 executive review meeting

---

### **Week 13: Decision Point**

#### **Week 13: Executive ROI Analysis & Conversion**

**Objective**: Present comprehensive ROI analysis and make conversion decision

**Activities**:

**Day 1-2: Executive ROI Analysis**

**Performance Metrics Review**:
- **Latency**: 
  - Baseline: Manual processing, 24-48 hour delays
  - Current: <5 minutes from generation to insights
  - Improvement: 99%+ reduction in latency
- **Mean Time to Resolution (MTTR)**:
  - Baseline: 72-96 hours for fault resolution
  - Current: 24-48 hours with predictive maintenance
  - Improvement: 50-67% reduction in MTTR
- **False Positive Rate**:
  - Baseline: 15-20% false alarms
  - Current: <5% false positive rate
  - Improvement: 70-75% reduction in false positives
- **Data Completeness**:
  - Baseline: 85-90% data availability
  - Current: >95% data completeness
  - Improvement: 5-10% increase in data quality

**Financial Impact Analysis**:
- **Revenue Protection**:
  - Prevented downtime: Estimated 2-3% improvement in availability
  - 2MW portfolio: ~40-60kW additional capacity factor
  - Annual revenue impact: $X,XXX - $XX,XXX (depending on PPA rates)
- **Maintenance Cost Optimization**:
  - Predictive maintenance: 20-30% reduction in emergency maintenance
  - Optimized scheduling: 15-20% reduction in maintenance costs
  - Parts optimization: 10-15% reduction in parts costs
- **Operational Efficiency**:
  - Automated reporting: 3 days → 30 minutes (95% time savings)
  - Reduced manual data processing: 80% reduction in analyst time
  - Compliance automation: Eliminated risk of non-compliance penalties

**ROI Calculation**:
- **Platform Investment**: $XX,XXX - $XX,XXX per year (based on 2MW portfolio)
- **Annual Savings**: $XX,XXX - $XX,XXX
- **Payback Period**: X months
- **3-Year ROI**: XXX%

**Day 3: Automatic Conversion Decision**

**Metrics Validation**:
- Verify achievement of 2 of 4 key metrics:
  1. ✅ Latency: <5 minutes (target met)
  2. ✅ MTTR: 50%+ improvement (target met)
  3. ✅ False Positives: <5% (target met)
  4. ✅ Data Completeness: >95% (target met)
- **Result**: All 4 metrics exceeded → Automatic conversion approved

**Conversion Process**:
- Execute automatic conversion to full platform subscription
- Activate all premium features:
  - Advanced AI agents
  - Unlimited API access
  - Priority support
  - Custom development capabilities

**Day 4-5: Scale-Up Roadmap Planning**

**Portfolio Expansion Planning**:
- Document lessons learned from 3-site pilot
- Create scaling playbook for additional sites
- Identify optimization opportunities for existing sites

**Next Phase Recommendations**:
- **Immediate (Months 1-3)**:
  - Expand to additional sites in portfolio
  - Implement advanced trading optimization (if applicable)
  - Deploy additional AI agents based on needs
- **Short-term (Months 4-6)**:
  - Integrate battery storage systems (if planned)
  - Expand to wind assets (if in portfolio)
  - Implement advanced grid integration features
- **Long-term (Months 7-12)**:
  - Full portfolio integration
  - Custom AI agent development
  - Enterprise-level customizations

**Day 6-7: Knowledge Transfer & Handoff**

**Training & Documentation**:
- Complete user training for operations team
- Document all configurations and customizations
- Create runbooks for common scenarios
- Establish ongoing support processes

**Success Metrics Tracking**:
- Set up continuous monitoring dashboard
- Establish monthly review process
- Define escalation procedures
- Create feedback loop for platform improvements

---

## Platform Architecture Implementation Summary

### **Data Sources Layer** (Weeks 1-2)
- ✅ 3 sites connected (2MW total)
- ✅ 20 inverters monitored (8 + 7 + 5)
- ✅ 800 panels tracked (320 + 280 + 200)
- ✅ Real-time telemetry: 15-minute intervals
- ✅ Historical data: 2+ years ingested

### **Ingestion & ETL Layer** (Weeks 1-2)
- ✅ Raw Data Extraction: SQL/API queries configured
- ✅ ETL Pipeline: Automated nightly delta extraction
- ✅ Feature Engineering: ML-ready features generated
- ✅ Zero-duplication architecture: 8x storage reduction

### **AI & Modeling Layer** (Weeks 3-12)
- ✅ ML Models: Forecasting, fault detection, optimization
- ✅ AI Agents: OODA loop, maintenance optimization, compliance
- ✅ Continuous improvement: Weekly model retraining
- ✅ Model Registry: Versioned, auditable model artifacts

### **Storage Layer** (Weeks 1-2)
- ✅ Model Output Store: Predictions and insights only
- ✅ Versioned Parquet datasets: Clean, partitioned data
- ✅ Audit trail: Complete lineage tracking

### **Access Layer** (Weeks 3-11)
- ✅ API Gateway: RESTful and GraphQL endpoints
- ✅ Custom Dashboards: Portfolio, site, and asset views
- ✅ Automated Reporting: Daily, weekly, monthly reports
- ✅ Mobile Access: Field technician interfaces

---

## Key Success Metrics

### **Technical Metrics**
- **Data Latency**: <5 minutes (target met)
- **Data Completeness**: >95% (target met)
- **Forecast Accuracy**: MAPE <8% for 24-hour horizon
- **Fault Detection**: <5% false positive rate (target met)

### **Operational Metrics**
- **MTTR**: 50-67% reduction (target met)
- **Availability**: >98% uptime maintained
- **Maintenance Cost**: 20-30% reduction
- **Reporting Time**: 95% reduction (3 days → 30 minutes)

### **Business Metrics**
- **Revenue Protection**: 2-3% availability improvement
- **Cost Optimization**: 20-30% maintenance cost reduction
- **Compliance Risk**: Eliminated non-compliance penalties
- **ROI**: Positive ROI within X months

---

## Next Steps After Week 13

1. **Immediate Actions**:
   - Full platform activation
   - Team training completion
   - Ongoing support setup

2. **Portfolio Expansion**:
   - Scale to additional sites
   - Integrate new asset types
   - Expand AI agent capabilities

3. **Continuous Optimization**:
   - Monthly performance reviews
   - Quarterly model retraining
   - Annual platform upgrades

---

## Support & Resources

### **Documentation**
- [Platform Architecture Guide](/business-users)
- [OODA Reference Guide](https://code.asoba.co/ooda-reference)
- [API Documentation](https://code.asoba.co/api)

### **Support Channels**
- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 📖 **Documentation**: [docs.asoba.co](https://docs.asoba.co)
- 💬 **Community**: [Discord](https://discord.gg/nNV5evcr)

### **Implementation Team**
- Dedicated success manager
- Technical implementation specialists
- Data engineering support
- AI/ML model optimization team

---

© 2025 Asoba Corporation. All rights reserved.
