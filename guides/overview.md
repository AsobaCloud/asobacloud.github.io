---
layout: default
---
# Overview of Guides

This section provides practical, task-oriented guides to help you solve specific problems and achieve your business goals using the Ona Intelligence Layer. These guides are designed for both **Beginners** and **Developers**, offering step-by-step instructions, code examples, and best practices for common tasks.

Whether you're generating your first forecast, preparing data for upload, or managing a portfolio of renewable energy assets, our guides provide the knowledge and tools you need to succeed with the platform.

## Quick Start

The fastest way to get started is our [Get Started](../get-started.md) guide, which walks you through making your first API call in just 5 minutes. You'll learn how to upload historical data and generate a 24-hour forecast using our freemium API.

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My First Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

## What You Can Find Here

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>Forecasting</h3>
    <p>Learn how to generate and interpret forecasts, understand accuracy metrics, and improve the performance of your predictions. This comprehensive guide covers everything from basic forecast generation to advanced accuracy optimization techniques.</p>
    <a href="./forecasting/overview.md" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Data Management</h3>
    <p>A complete guide to preparing your data for our platform, including required formats, standardization, and best practices for uploading. Learn how to ensure your data quality meets our requirements for optimal forecast accuracy.</p>
    <a href="./data-management/overview.md" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Portfolio Management</h3>
    <p>For users managing multiple assets, this guide covers how to analyze portfolio-wide performance, identify outliers, and streamline reporting. Discover techniques for scaling your operations across hundreds of sites.</p>
    <a href="./portfolio-management/overview.md" class="card-link">Learn More →</a>
  </div>
  
  <div class="overview-card">
    <h3>Developer Guide</h3>
    <p>Information for developers contributing to or building on top of the platform, including coding guidelines, development processes, and integration patterns. Learn how to extend the platform's capabilities.</p>
    <a href="./developer-guide.md" class="card-link">Learn More →</a>
  </div>
</div>

## Popular Guides

These guides are the most frequently accessed and provide essential knowledge for getting started:

- **[Get Started](../get-started.md)**: Make your first API call in 5 minutes
- **[Generating Forecasts](./forecasting/generating-forecasts.md)**: Step-by-step guide to creating forecasts
- **[Preparing Data](./data-management/preparing-data.md)**: Data format requirements and best practices
- **[Improving Accuracy](./forecasting/improving-accuracy.md)**: Tips for achieving better forecast performance

## Core Concepts

Understanding these core concepts will help you get the most out of our guides:

- **Forecast Accuracy**: Learn how data quality, weather predictions, and model selection impact forecast accuracy
- **Data Standardization**: Understand how our platform automatically processes and standardizes your data
- **API Authentication**: Master API key management and request authentication
- **Error Handling**: Learn how to handle API errors and troubleshoot common issues

## Next Steps

Now that you understand what's available in our guides section:

1. **New Users**: Start with the [Get Started](../get-started.md) guide to make your first API call
2. **Forecasting**: Explore the [Forecasting Guide](./forecasting/overview.md) to learn about generating and interpreting forecasts
3. **Data Preparation**: Review the [Data Management Guide](./data-management/overview.md) to ensure your data meets our requirements
4. **API Reference**: Dive into the [API Reference](../api-reference/overview.md) for complete endpoint documentation
5. **Use Cases**: Check out [Real-World Examples](../use-cases/overview.md) to see how others are using the platform

## See Also

- [API Reference](../api-reference/overview.md) - Complete API documentation
- [Technical Concepts](../technical-concepts/overview.md) - Deep dives into platform architecture
- [Use Cases](../use-cases/overview.md) - Real-world examples and case studies
