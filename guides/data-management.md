# Guide: Data Management

The quality of your input data is the single most important factor in generating accurate forecasts. This guide outlines the best practices for preparing and uploading your data to the Ona Intelligence Layer.

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

## The Data Standardization Process

When you upload a CSV file, our platform automatically performs a series of data standardization steps. This process is designed to handle the wide variety of data formats used in the industry.

1.  **Manufacturer Detection**: The platform inspects the column names in your CSV to automatically detect the manufacturer of the equipment that generated the data (e.g., Huawei, Enphase, Solarman).
2.  **Column Mapping**: Based on the detected manufacturer, the platform maps your column names to our internal standard schema (`timestamp`, `kWh`, `error_code`, etc.).
3.  **Timezone Normalization**: All timestamps are converted to UTC to ensure consistency.
4.  **Data Cleaning**: The platform handles missing values and outliers in your data to improve model stability.

For a more detailed explanation of this process, please see the [Data Standardization](./../technical-concepts/data-standardization.md) page in our Technical Concepts section.

## Uploading Your Data

You can upload your data via the API as shown in the [Get Started](./../get-started.md) guide.

```bash
curl -X POST \
  -F "file=@/path/to/your/sample.csv" \
  -F "email=user@example.com" \
  -F "site_name=My Solar Site" \
  -F "location=Durban" \
  https://api.asoba.co/v1/freemium-forecast
```

The API expects the file as part of a `multipart/form-data` request.

