# Improving Forecast Accuracy

Forecast accuracy is influenced by several factors, and understanding these factors helps you optimize your forecasts for production use. This guide covers the key elements that impact accuracy and provides actionable tips for achieving better results.

## Key Factors Affecting Accuracy

### Data Quality

The more clean, high-resolution historical data you provide, the better the forecast. High-quality data includes:

- **Complete Coverage**: Minimal gaps in historical data
- **High Resolution**: Hourly or better resolution recommended
- **Accurate Timestamps**: Properly formatted ISO 8601 timestamps
- **Consistent Units**: Standardized power/energy units throughout

Poor data quality is the most common cause of low forecast accuracy. See our [Data Management](../data-management/overview.md) guide for data preparation best practices.

### Weather Data

Our models incorporate weather predictions, but unforeseen weather events can impact accuracy. Factors include:

- **Weather Forecast Quality**: Accuracy of weather predictions
- **Local Weather Patterns**: Site-specific weather characteristics
- **Seasonal Variations**: Changes in weather patterns over time
- **Extreme Events**: Unusual weather conditions not captured in forecasts

### Model Type

Customer-specific models will always outperform generic models after sufficient training data is provided. Consider:

- **Generic Models**: Good accuracy for most sites, available immediately
- **Customer-Specific Models**: Superior accuracy after training on your data
- **Training Data**: At least 6 months of historical data recommended
- **Model Selection**: Choose based on your accuracy requirements

For a deeper dive into the machine learning models we use, see the [Machine Learning Models](../../technical-concepts/machine-learning/forecasting-models.md) page in our Technical Concepts section.

## Best Practices

### Data Preparation

- **Clean Data**: Remove outliers and correct obvious errors before upload
- **Complete History**: Provide as much historical data as possible
- **Consistent Format**: Use standardized formats and units throughout
- **Regular Updates**: Keep data current with regular uploads

### Model Selection

- **Start Generic**: Use generic models for initial testing
- **Train Custom**: Train customer-specific models for production
- **Evaluate Performance**: Compare model accuracy before deployment
- **Monitor Results**: Track accuracy over time and retrain as needed

### Forecast Horizon

- **Short-Term**: 1-24 hour forecasts typically most accurate
- **Medium-Term**: 1-7 day forecasts good for planning
- **Long-Term**: 30+ day forecasts useful for capacity planning
- **Choose Appropriately**: Select horizon based on use case

## Troubleshooting Low Accuracy

If you're experiencing low forecast accuracy:

1. **Check Data Quality**: Review data for gaps, errors, or inconsistencies
2. **Verify Format**: Ensure data matches required format specifications
3. **Review Model Type**: Consider training customer-specific models
4. **Analyze Errors**: Review forecast errors to identify patterns
5. **Contact Support**: Reach out to our team for assistance

## Next Steps

Now that you understand how to improve accuracy:

1. **Prepare Data**: Review [Data Management](../data-management/overview.md) for best practices
2. **Train Models**: Use [Data Ingestion API](../../api-reference/data-ingestion/upload-train.md) for custom models
3. **Generate Forecasts**: Follow [Generating Forecasts](./generating-forecasts.md) guide
4. **Monitor Performance**: Track accuracy metrics over time
5. **Optimize Continuously**: Iterate on data quality and model selection

## See Also

- [Generating Forecasts](./generating-forecasts.md) - How to generate forecasts
- [Interpreting Results](./interpreting-results.md) - Understanding forecast output
- [Data Management](../data-management/overview.md) - Data quality best practices
- [Machine Learning Models](../../technical-concepts/machine-learning/forecasting-models.md) - Technical details on models
