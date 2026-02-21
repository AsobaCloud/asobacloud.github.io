---
title: "Data Standardization"
layout: default
nav_order: 1
parent: "Learn"
---
# Technical Concepts: Data Standardization

A major challenge in the energy industry is the lack of data standardization. Different equipment manufacturers, monitoring platforms, and logging systems all produce data in slightly different formats. The Ona Intelligence Layer is designed to handle this complexity through a robust, automated data standardization pipeline.

This content is designed for **Developers** and technical users.

## The Standardization Pipeline

When you upload a CSV file to our platform (for example, via the [Freemium Forecasting API](./../api-reference/forecasting/freemium-forecast)), it passes through the following standardization steps:

### 1. CSV Parsing and Manufacturer Detection

The first step is to parse the CSV file. Our platform:
*   **Detects the Delimiter**: Automatically detects whether the file uses a comma (`,`), semicolon (`;`), or other delimiter.
*   **Handles Quoted Values**: Correctly parses values that are enclosed in quotes.
*   **Detects Manufacturer**: Inspects the column headers to automatically identify the manufacturer of the equipment that generated the data. We have built a library of patterns to recognize data from all major OEMs (e.g., Huawei, Enphase, Solarman, etc.).

### 2. Schema Normalization

Once the manufacturer is identified, the platform maps the columns from your source file to our internal, standardized schema. This ensures that all data, regardless of its source, is represented in a consistent way.

Our standard schema includes fields like:
*   `timestamp` (UTC)
*   `kWh` (Energy production)
*   `error_type`
*   `error_code`

### 3. Data Cleaning and Imputation

Real-world data is often messy. Our pipeline includes several data cleaning steps:
*   **Timestamp Normalization**: All timestamps are converted to UTC to prevent any ambiguity related to timezones.
*   **Handling of Missing Values**: The platform can intelligently fill in missing data points using statistical methods like ARIMA, as described in the [Cummins Portfolio use case](./../use-cases/cummins-portfolio).
*   **Outlier Detection**: The platform identifies and flags anomalous readings that may be the result of sensor error.

## The Benefit: A Unified View

This automated standardization process is a core component of our platform's value. It allows us to:

*   **Ingest Data from Any Source**: You can provide data from any asset, from any manufacturer, and our platform can handle it.
*   **Enable Cross-Portfolio Analysis**: By standardizing all data, we enable true "apples-to-apples" comparisons across your entire portfolio.
*   **Improve Model Performance**: Our machine learning models are trained on clean, standardized data, which leads to more accurate and reliable results.
