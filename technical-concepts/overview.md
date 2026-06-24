---
layout: default
nav_exclude: true
---
# Technical Concepts Overview

This section provides a deeper look into the core technologies and methodologies that power the Ona Intelligence Layer. It is designed for **Developers** and other technical users who want to understand *how* our platform works under the hood, including our machine learning models, data processing pipelines, and architectural decisions.

The platform is built on three layers: **ODSE** (the open data standard), **Ona** (the commercial intelligence platform), and **Nehanda & Zorora** (domain AI). This section covers the technical concepts behind the first two layers; see [Products](../products) for the AI layer.

Understanding these technical concepts will help you make better decisions about data preparation, model selection, and integration patterns. Whether you're optimizing forecast accuracy or building custom integrations, this knowledge will prove invaluable.

## Quick Start

To get started with our technical concepts, we recommend beginning with [Data Standardization](./data-standardization) to understand how we process your data, then exploring [Machine Learning Models](./machine-learning/forecasting-models) to learn about our forecasting algorithms.

## What You Can Find Here

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>Machine Learning Models</h3>
    <p>An overview of the different machine learning models we use for forecasting and anomaly detection. Learn about generic models, customer-specific models, and how model selection impacts forecast accuracy. Understand the algorithms, training processes, and performance characteristics of each model type.</p>
    <a href="./machine-learning/forecasting-models" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Data Standardization</h3>
    <p>A comprehensive look at our automated process for ingesting, cleaning, and standardizing data from a wide variety of sources. Understand how we handle different data formats, time zones, units, and quality issues to ensure consistent inputs for our machine learning models.</p>
    <a href="./data-standardization" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Asoba Protocol</h3>
    <p>A performance-collateralized intelligence and settlement layer that binds operational commitments to consequences at the same timescale at which those commitments are made. Learn how the protocol enables coordination under uncertainty, performance-indexed financing, and verifiable guarantees for distributed energy systems.</p>
    <a href="./protocol/overview" class="card-link">Learn More →</a>
  </div>
</div>

## Core Concepts

Our platform is built on several key technical principles:

### Machine Learning Architecture

We employ a hybrid approach combining generic pre-trained models with customer-specific fine-tuned models. Generic models provide immediate value for new users, while customer-specific models deliver superior accuracy after training on site-specific historical data.

### Data Processing Pipeline

Our data standardization pipeline handles diverse input formats, automatically detecting and correcting common issues like missing timestamps, unit conversions, and timezone discrepancies. This ensures consistent, high-quality data feeds into our forecasting models.

### Model Training Process

Customer-specific models are trained using transfer learning techniques, starting from generic models and fine-tuning on customer data. This approach balances accuracy with training efficiency, allowing us to deliver custom models quickly.

### Forecast Generation

Forecasts are generated using ensemble methods that combine multiple model predictions, incorporating weather data, historical patterns, and site-specific characteristics to produce accurate predictions.

### Asoba Protocol

The Asoba Protocol addresses the coordination constraint in distributed energy systems by introducing a mechanism that binds operational commitments to consequences. It enables performance-collateralized activities, automatic enforcement of commitments, and performance-indexed financing, ensuring that failures are contained and paid for locally rather than propagated through the system.

## Popular Topics

These technical concepts are frequently referenced:

- **[Forecasting Models](./machine-learning/forecasting-models)**: Deep dive into ML model architecture
- **[Data Standardization](./data-standardization)**: How we process and clean your data
- **[Asoba Protocol](./protocol/overview)**: Performance-collateralized intelligence and settlement layer
- **[Model Training](../api-reference/data-ingestion/upload-train)**: Upload training data for custom models
- **[Forecast Accuracy](../guides/forecasting/improving-accuracy)**: Factors affecting forecast performance

## Next Steps

Now that you understand our technical concepts:

1. **Learn About Models**: Explore [Machine Learning Models](./machine-learning/forecasting-models) to understand our forecasting algorithms
2. **Understand Data Processing**: Read [Data Standardization](./data-standardization) to see how we handle your data
3. **Explore the Protocol**: Review the [Asoba Protocol](./protocol/overview) to understand how we enable coordination and performance guarantees
4. **Generate Forecasts**: Use the [Forecasting Guide](../guides/forecasting/overview) to apply this knowledge
5. **API Integration**: Review the [API Reference](../api-reference/overview) for technical implementation details

## See Also

- [Forecasting Guides](../guides/forecasting/overview) - How to use forecasting features
- [API Reference](../api-reference/overview) - Technical API documentation
- [Developer Guide](../guides/developer-guide) - Integration patterns and best practices
