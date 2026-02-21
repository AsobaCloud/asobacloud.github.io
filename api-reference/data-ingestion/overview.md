---
title: "Data Ingestion"
layout: default
nav_order: 2
parent: "Reference"
has_children: true
---
# Data Ingestion API Overview

The Data Ingestion API provides endpoints for uploading historical and real-time solar production data to the platform. These endpoints trigger automated data processing pipelines that standardize, enrich, and prepare your data for forecasting and analysis.

## Endpoints

*   **[Upload Training Data](./upload-train)**: Upload historical data for model training
*   **[Upload Nowcast Data](./upload-nowcast)**: Upload real-time data for forecasting

## API Design Principles

The Data Ingestion API follows standard RESTful conventions:

*   All requests use `POST` method
*   Supports both CSV file uploads and JSON metadata
*   Responses indicate successful upload trigger
*   Processing happens asynchronously via S3 events

## Base URL

```
https://api.asoba.co
```

## Data Flow

When you upload data:

1. **Upload**: Your data is uploaded directly to S3
2. **Event Trigger**: S3 event triggers downstream processing services
3. **Standardization**: Data is standardized to common schema
4. **Enrichment**: Weather data and features are added
5. **Training**: Historical data triggers model training (if applicable)
6. **Forecasting**: Real-time data enables forecast generation

## Quick Start

To upload your first dataset:

1. [Prepare your data](../../guides/data-management/preparing-data) in the correct format
2. [Upload training data](./upload-train) for historical datasets
3. [Upload nowcast data](./upload-nowcast) for real-time updates

## See Also

- [Get Started](../../get-started) - Quick start tutorial
- [Data Management Guides](../../guides/data-management/overview) - How-to guides for data preparation
- [Technical Concepts](../../technical-concepts/data-standardization) - Data standardization details
