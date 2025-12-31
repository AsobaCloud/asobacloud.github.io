---
layout: default
---
# Preparing Your Data

The quality of your input data is the single most important factor in generating accurate forecasts. This guide outlines the best practices for preparing your data for the Ona Intelligence Layer.

## Data Format Requirements

The `freemiumforecastingApi` accepts a CSV (Comma-Separated Values) file.

### Required Columns

Your CSV file MUST contain at least two columns:

1.  **A Timestamp Column**: This column should contain the date and time of the reading in a format that can be automatically parsed, preferably ISO 8601.
    *   **Accepted formats**: `YYYY-MM-DDTHH:MM:SSZ`, `YYYY-MM-DD HH:MM:SS`, `MM/DD/YYYY HH:MM`, etc.
2.  **A Power or Energy Column**: This column should contain the numerical reading from your solar asset.
    *   **Accepted column names (case-insensitive)**: `Power`, `kW`, `kWh`, `Energy`, `Production`, `Yield`.

### Example of a Valid CSV

```csv
Timestamp,Power (kW)
2025-12-01T00:00:00Z,0
2025-12-01T01:00:00Z,0
2025-12-01T02:00:00Z,0
...
```

### Data Granularity

For best results, we recommend providing data with at least an hourly granularity. Our models can handle more frequent readings (e.g., every 15 minutes), but less frequent data (e.g., daily) will result in less accurate forecasts.

## See Also

- [Uploading Data](./uploading-data) - How to upload your prepared data
- [Data Quality](./data-quality) - Understanding data standardization
- [Get Started](../../get-started) - Quick start tutorial
