---
title: "Zorora"
layout: default
nav_order: 4
parent: "Products"
---

# Zorora

Open-source framework for reproducible energy research with transparent methodology.

---

## Overview

Zorora is an open-source framework designed to make energy research reproducible, auditable, and transparent. Track every transformation applied to your datasets and models, ensuring that research results can be verified and replicated by others.

---

## Key Features

### Reproducible Research

Ensure your research can be replicated exactly.

- **Version Control**: Track all changes to data, code, and models
- **Environment Capture**: Record exact software versions and dependencies
- **Deterministic Pipelines**: Produce identical results on re-execution
- **Seed Management**: Control randomness for reproducible ML experiments

### Transparent Methodology

Make your research process auditable and understandable.

- **Pipeline Documentation**: Automatic documentation of all transformations
- **Data Lineage**: Track the origin and transformation history of every data point
- **Assumption Logging**: Record and justify all analytical assumptions
- **Decision Trail**: Document why specific approaches were chosen

### Traceable Transformations

Follow data from raw input to final analysis.

- **Transformation Graph**: Visualize the complete data processing pipeline
- **Intermediate Snapshots**: Capture data state at each processing step
- **Rollback Capability**: Revert to any previous state in the pipeline
- **Diff Comparisons**: Compare outputs between pipeline versions

---

## Use Cases

### Academic Research

Publish reproducible energy research papers.

- Meet journal reproducibility requirements
- Share complete research pipelines with supplementary materials
- Enable peer verification of results
- Facilitate collaboration across institutions

### Model Development

Build ML models with full traceability.

- Track training data and preprocessing steps
- Version model architectures and hyperparameters
- Document feature engineering decisions
- Compare model iterations systematically

### Regulatory Compliance

Demonstrate analytical rigor to regulators.

- Provide audit trails for analytical claims
- Document data sources and quality
- Show methodology transparency
- Support regulatory review processes

### Industry Benchmarking

Create verifiable industry benchmarks.

- Establish transparent benchmark methodologies
- Enable third-party verification
- Track benchmark evolution over time
- Compare across different implementations

---

## Getting Started

### Installation

```bash
# Install Zorora
pip install zorora

# Or using conda
conda install -c asoba zorora
```

### Quick Start

```python
import zorora as zr

# Initialize a new research project
project = zr.Project("solar-forecasting-study")

# Load and track raw data
raw_data = project.load_data(
    "solar_production.csv",
    source="huawei_fusionsolar",
    description="Hourly solar production from Site A"
)

# Apply tracked transformations
@project.track_transform
def clean_missing_values(df):
    """Fill missing values using linear interpolation"""
    return df.interpolate(method='linear')

@project.track_transform
def add_weather_features(df, weather_df):
    """Merge weather data for feature engineering"""
    return df.merge(weather_df, on='timestamp')

# Execute pipeline with full tracking
cleaned = clean_missing_values(raw_data)
enriched = add_weather_features(cleaned, weather_data)

# Train model with reproducibility
model = project.train_model(
    model_class=RandomForestRegressor,
    data=enriched,
    params={"n_estimators": 100, "random_state": 42}
)

# Generate reproducibility report
project.generate_report("research_report.html")
```

### Pipeline Visualization

```python
# View the transformation graph
project.visualize_pipeline()

# Export for publication
project.export_pipeline("pipeline_diagram.svg")
```

---

## Core Concepts

### Projects

A project encapsulates all artifacts for a research study.

```python
project = zr.Project(
    name="forecasting-study",
    description="Solar production forecasting with weather features",
    authors=["researcher@university.edu"],
    tags=["forecasting", "solar", "machine-learning"]
)
```

### Data Tracking

All data operations are automatically tracked.

```python
# Load data with metadata
data = project.load_data(
    path="data/production.csv",
    source="site_monitoring_system",
    collection_period="2023-01-01 to 2023-12-31",
    quality_notes="Some missing values in July due to sensor issues"
)

# Transformations are logged automatically
filtered = data[data['power'] > 0]  # Tracked
normalized = (data - data.mean()) / data.std()  # Tracked
```

### Model Versioning

Track model experiments systematically.

```python
# Register model experiment
experiment = project.new_experiment("baseline_rf")

# Train with automatic tracking
model = experiment.train(
    model=RandomForestRegressor(),
    X_train=X_train,
    y_train=y_train,
    params={"n_estimators": 100}
)

# Log metrics
experiment.log_metrics({
    "mae": 12.5,
    "rmse": 18.3,
    "r2": 0.92
})

# Compare experiments
project.compare_experiments(["baseline_rf", "tuned_rf", "gradient_boost"])
```

---

## Reproducibility Report

Zorora generates comprehensive reports documenting your research pipeline.

### Report Contents

- **Data Sources**: All input data with metadata and quality notes
- **Transformation Pipeline**: Complete processing steps with code
- **Model Details**: Architecture, hyperparameters, and training data
- **Results**: Metrics, visualizations, and statistical analysis
- **Environment**: Software versions and system configuration
- **Execution Log**: Timestamps and runtime information

### Export Formats

```python
# HTML report for web sharing
project.generate_report("report.html")

# PDF for publication
project.generate_report("report.pdf")

# Markdown for repositories
project.generate_report("report.md")

# LaTeX for academic papers
project.generate_report("report.tex")
```

---

## Integration

### Jupyter Notebooks

```python
# Enable Zorora tracking in notebooks
%load_ext zorora

# Automatic cell tracking
%%zorora_track
df = pd.read_csv("data.csv")
df = df.dropna()
```

### MLflow Integration

```python
# Export to MLflow
project.export_to_mlflow(tracking_uri="http://mlflow.example.com")
```

### Git Integration

```python
# Sync with Git repository
project.git_sync(
    repo="https://github.com/org/research-project",
    branch="main"
)
```

---

## Open Source

Zorora is fully open source under the Apache 2.0 license.

### Contributing

We welcome contributions from the community:

- **GitHub**: [github.com/asoba/zorora](https://github.com/asoba/zorora)
- **Issues**: Report bugs and request features
- **Pull Requests**: Contribute code improvements
- **Documentation**: Help improve our docs

### Community

- **Discord**: [Join our community](https://discord.gg/nNV5evcr)
- **Discussions**: GitHub Discussions for Q&A
- **Blog**: Research updates and best practices

---

## Support & Resources

### Documentation
- [User Guide](https://zorora.readthedocs.io)
- [API Reference](https://zorora.readthedocs.io/api)
- [Examples](https://github.com/asoba/zorora/tree/main/examples)

### Support
- **Email**: [support@asoba.co](mailto:support@asoba.co)
- **Discord**: [Join our community](https://discord.gg/nNV5evcr)
- **GitHub Issues**: [Report bugs](https://github.com/asoba/zorora/issues)

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
