---
layout: default
---
# Data Management Overview

The quality of your input data is the single most important factor in generating accurate forecasts. This guide outlines the best practices for preparing and uploading your data to the Ona Intelligence Layer, ensuring optimal forecast accuracy and reliable results.

Proper data management involves understanding format requirements, ensuring data quality, and following best practices for data preparation. Whether you're uploading historical training data or real-time nowcast data, this guide provides the knowledge you need to succeed.

## Quick Start

For a quick tutorial on uploading data, see the [Get Started](../../get-started) guide. This walkthrough demonstrates uploading a CSV file and generating your first forecast.

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

## What You Can Find Here

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>Preparing Data</h3>
    <p>Learn about data format requirements, column naming conventions, timestamp formats, and unit specifications. This guide covers everything you need to know to format your data correctly before upload, ensuring smooth processing and accurate forecasts.</p>
    <a href="./preparing-data" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Uploading Data</h3>
    <p>Step-by-step guide to uploading your data via the API, including authentication, request formatting, and handling responses. Learn about both training data uploads (for model training) and nowcast data uploads (for real-time forecasting).</p>
    <a href="./uploading-data" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Data Quality</h3>
    <p>Understand how our platform standardizes and processes your data, including automatic detection and correction of common issues. Learn about data validation, error handling, and how to ensure your data meets quality requirements for optimal forecast accuracy.</p>
    <a href="./data-quality" class="card-link">Learn More →</a>
  </div>
</div>

## Popular Guides

These data management guides are most frequently accessed:

- **[Preparing Data](./preparing-data)**: Data format requirements and best practices
- **[Uploading Data](./uploading-data)**: Step-by-step upload instructions
- **[Data Quality](./data-quality)**: Understanding data standardization
- **[Get Started](../../get-started)**: Quick start tutorial

## Core Concepts

Understanding these concepts will help you manage your data effectively:

### Data Formats

We support CSV files with specific column requirements. Your data must include timestamps and power/energy readings, with optional metadata columns. Understanding format requirements ensures smooth uploads and accurate processing.

### Data Standardization

Our platform automatically standardizes your data, handling timezone conversions, unit conversions, and format normalization. This process ensures consistent inputs for our machine learning models, regardless of your data source format.

### Data Quality Requirements

High-quality data leads to accurate forecasts. Key requirements include complete coverage (minimal gaps), high resolution (hourly or better), and accurate timestamps. Poor data quality can significantly impact forecast accuracy.

### Training vs. Nowcast Data

Training data is used to train customer-specific models, while nowcast data is used for real-time forecasting. Understanding the difference helps you choose the right upload endpoint and format your data appropriately.

## Next Steps

Now that you understand data management:

1. **Prepare Your Data**: Review [Preparing Data](./preparing-data) for format requirements
2. **Upload Your Data**: Follow [Uploading Data](./uploading-data) for step-by-step instructions
3. **Understand Processing**: Read [Data Quality](./data-quality) to learn about standardization
4. **Generate Forecasts**: Use the [Forecasting Guide](../forecasting/overview) to create forecasts
5. **Review Technical Details**: Explore [Data Standardization](../../technical-concepts/data-standardization) for technical information

## See Also

- [Get Started](../../get-started) - Quick start tutorial
- [Forecasting](../forecasting/overview) - Generating forecasts guide
- [Data Standardization](../../technical-concepts/data-standardization) - Technical details on standardization process
- [API Reference](../../api-reference/data-ingestion/overview) - Data ingestion API documentation
