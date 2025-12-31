---
layout: default
---
# Forecasting Overview

This guide covers the essentials of generating and interpreting forecasts with the Ona Intelligence Layer. Whether you're generating your first forecast or optimizing accuracy for production use, this guide provides the knowledge and best practices you need to succeed.

Forecasting is at the core of our platform, enabling you to predict energy production hours or days in advance. This capability is essential for energy trading, maintenance planning, grid integration, and operational optimization. Our machine learning models combine historical data, weather predictions, and site-specific characteristics to deliver accurate forecasts.

## Quick Start

To generate your first forecast, see the [Get Started](../../get-started.md) guide. This 5-minute tutorial walks you through uploading historical data and receiving a 24-hour forecast using our freemium API.

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My First Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

For complete API documentation, see the [Forecasting API Reference](../../api-reference/forecasting/freemium-forecast.md).

## What You Can Find Here

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>Generating Forecasts</h3>
    <p>Learn how to generate forecasts using our API, including request formatting, parameter selection, and response handling. This guide covers both the freemium API for quick testing and the full forecasting API for production use.</p>
    <a href="./generating-forecasts.md" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Interpreting Results</h3>
    <p>Understand forecast response structure and key fields, including timestamp formats, confidence intervals, and summary statistics. Learn how to extract actionable insights from forecast data for your specific use case.</p>
    <a href="./interpreting-results.md" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Improving Accuracy</h3>
    <p>Discover tips and best practices for achieving better forecast accuracy, including data quality requirements, model selection strategies, and common pitfalls to avoid. Learn how to optimize your forecasts for production use.</p>
    <a href="./improving-accuracy.md" class="card-link">Learn More →</a>
  </div>
</div>

## Popular Guides

These forecasting guides are most frequently accessed:

- **[Generating Forecasts](./generating-forecasts.md)**: Step-by-step guide to creating forecasts
- **[Interpreting Results](./interpreting-results.md)**: Understanding forecast output
- **[Improving Accuracy](./improving-accuracy.md)**: Tips for better performance
- **[Get Started](../../get-started.md)**: Quick start tutorial

## Core Concepts

Understanding these concepts will help you get the most out of forecasting:

### Forecast Types

We support multiple forecast horizons, from 1-hour ahead predictions to 30+ day forecasts. Different horizons serve different use cases: short-term forecasts for trading, medium-term for maintenance planning, and long-term for capacity planning.

### Model Selection

Choose between generic models (available immediately) and customer-specific models (trained on your data). Generic models provide good accuracy for most sites, while customer-specific models deliver superior performance after training.

### Data Requirements

Forecast accuracy depends heavily on data quality. High-resolution historical data (hourly or better), complete coverage, and minimal gaps lead to the best results. See our [Data Management](../data-management/overview.md) guide for details.

### Accuracy Metrics

We provide multiple accuracy metrics including MAPE (Mean Absolute Percentage Error), RMSE (Root Mean Square Error), and confidence intervals. Understanding these metrics helps you assess forecast quality and identify improvement opportunities.

## Next Steps

Now that you understand forecasting:

1. **Generate Your First Forecast**: Follow the [Get Started](../../get-started.md) guide
2. **Learn About Data**: Review [Data Management](../data-management/overview.md) for data preparation
3. **Explore API Options**: Check the [Forecasting API Reference](../../api-reference/forecasting/overview.md)
4. **Optimize Accuracy**: Read [Improving Accuracy](./improving-accuracy.md) for best practices
5. **Understand Models**: Learn about [Machine Learning Models](../../technical-concepts/machine-learning/forecasting-models.md)

## See Also

- [Get Started](../../get-started.md) - Quick start tutorial
- [Data Management](../data-management/overview.md) - Data preparation guide
- [API Reference](../../api-reference/forecasting/freemium-forecast.md) - Complete API documentation
- [Machine Learning Models](../../technical-concepts/machine-learning/forecasting-models.md) - Technical details on models
