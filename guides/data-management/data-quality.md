# Data Quality and Standardization

When you upload a CSV file, our platform automatically performs a series of data standardization steps. This process is designed to handle the wide variety of data formats used in the industry.

1.  **Manufacturer Detection**: The platform inspects the column names in your CSV to automatically detect the manufacturer of the equipment that generated the data (e.g., Huawei, Enphase, Solarman).
2.  **Column Mapping**: Based on the detected manufacturer, the platform maps your column names to our internal standard schema (`timestamp`, `kWh`, `error_code`, etc.).
3.  **Timezone Normalization**: All timestamps are converted to UTC to ensure consistency.
4.  **Data Cleaning**: The platform handles missing values and outliers in your data to improve model stability.

For a more detailed explanation of this process, please see the [Data Standardization](../../technical-concepts/data-standardization.md) page in our Technical Concepts section.

## See Also

- [Preparing Data](./preparing-data.md) - Data format requirements
- [Uploading Data](./uploading-data.md) - How to upload data
- [Data Standardization](../../technical-concepts/data-standardization.md) - Technical details on standardization process
