---
title: "ML Overview"
layout: default
nav_order: 2
parent: "Learn"
---
# Machine Learning Overview

This section provides technical details about the machine learning models and algorithms used in the Ona Intelligence Layer. Understanding these concepts helps you make informed decisions about model selection, data preparation, and forecast optimization.

Our platform employs advanced machine learning techniques to deliver accurate energy forecasts. We combine generic pre-trained models with customer-specific fine-tuned models, using ensemble methods and transfer learning to achieve superior accuracy while maintaining training efficiency.

## Quick Start

To understand our machine learning approach, start by learning about [Forecasting Models](./forecasting-models), which explains the different model types and their characteristics. Then explore how models are trained using the [Data Ingestion API](../../api-reference/data-ingestion/upload-train).

## What You Can Find Here

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>Forecasting Models</h3>
    <p>Detailed explanation of the ML models used for energy forecasting, including architecture, training processes, and performance characteristics. Learn about generic models, customer-specific models, and how model selection impacts forecast accuracy.</p>
    <a href="./forecasting-models" class="card-link">Learn More →</a>
  </div>
</div>

## Model Types

The platform uses two primary types of models:

### Generic Models

Pre-trained on global datasets, generic models are available immediately for all users without requiring training data. These models provide good accuracy for most sites and serve as a starting point for new installations. Generic models are ideal for:

- Quick evaluation and testing
- Sites with limited historical data
- Initial deployment before custom model training
- Sites with standard configurations

### Customer-Specific Models

Fine-tuned on your site's historical data, customer-specific models deliver superior accuracy after training. These models use transfer learning techniques, starting from generic models and adapting to site-specific patterns. Customer-specific models are ideal for:

- Production deployments requiring maximum accuracy
- Sites with unique characteristics or configurations
- Long-term forecasting needs
- Sites with sufficient historical data (typically 6+ months)

## Model Training Process

Customer-specific models are trained using transfer learning:

1. **Base Model**: Start with a generic pre-trained model
2. **Fine-Tuning**: Adapt the model to customer-specific data
3. **Validation**: Evaluate performance on held-out test data
4. **Deployment**: Deploy the trained model for production use

This approach balances accuracy with training efficiency, allowing us to deliver custom models quickly while maintaining high performance.

## Model Performance

Model performance is measured using multiple metrics:

- **MAPE (Mean Absolute Percentage Error)**: Percentage-based accuracy metric
- **RMSE (Root Mean Square Error)**: Absolute error metric
- **Confidence Intervals**: Uncertainty estimates for predictions
- **Forecast Horizon**: Accuracy across different time horizons

## Popular Topics

These machine learning topics are frequently referenced:

- **[Forecasting Models](./forecasting-models)**: Detailed model architecture and training
- **[Model Training](../../api-reference/data-ingestion/upload-train)**: Upload training data for custom models
- **[Forecast Accuracy](../../guides/forecasting/improving-accuracy)**: Factors affecting performance
- **[Data Requirements](../../guides/data-management/overview)**: Data needed for model training

## Next Steps

Now that you understand our machine learning approach:

1. **Learn About Models**: Explore [Forecasting Models](./forecasting-models) for detailed information
2. **Train Custom Models**: Use [Data Ingestion API](../../api-reference/data-ingestion/upload-train) to upload training data
3. **Optimize Accuracy**: Review [Forecast Accuracy Guide](../../guides/forecasting/improving-accuracy) for best practices
4. **Prepare Data**: Check [Data Management Guide](../../guides/data-management/overview) for data requirements
5. **Generate Forecasts**: Use [Forecasting Guides](../../guides/forecasting/overview) to create forecasts

## See Also

- [Forecasting Guides](../../guides/forecasting/overview) - How to use forecasting features
- [API Reference](../../api-reference/forecasting/overview) - API documentation
- [Data Standardization](../../technical-concepts/data-standardization) - Data processing details
- [Data Management](../../guides/data-management/overview) - Data preparation guide
