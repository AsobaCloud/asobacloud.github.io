# Use Case: Cummins Portfolio

**Maintaining Operations Through Severe Data Loss**

This use case highlights the resilience of the Ona Intelligence Layer and its ability to ensure operational continuity even in the face of significant infrastructure and data failures.

*   **Industry**: Industrial
*   **Portfolio Size**: Multi-MW
*   **Data Loss**: 65%

### The Challenge

The Cummins portfolio, a multi-megawatt collection of assets, experienced severe sensor and telemetry failures, resulting in a **65% loss of data points**. For most monitoring and analytics systems, this would be catastrophic. Missing data is typically treated as downtime, rendering analytics and performance reporting useless.

### The Solution: AI-Powered Data Reconstruction

The Ona Intelligence Layer treats missing data not as an absence, but as a signal to be interpreted. Our platform immediately identified the data loss and initiated an AI-powered data reconstruction process.

1.  **ARIMA-Based Interpolation**: We used Autoregressive Integrated Moving Average (ARIMA) models to intelligently interpolate the missing data points based on historical patterns.
2.  **Machine Learning Ensemble**: The interpolated data was then fed into a machine learning ensemble to reconstruct the full operational history of the assets with high fidelity.
3.  **Uninterrupted Logic**: All downstream logic, from maintenance schedules to grid compliance checks, continued to function without interruption.

### The Results

The Ona Intelligence Layer turned a potential operational crisis into a non-event, demonstrating the value of a true intelligence layer over a simple monitoring dashboard.

*   **100% Data Reconstruction**: The platform successfully reconstructed the missing 65% of the data, providing a complete and accurate picture of the portfolio's performance.
*   **Zero Grid Violations**: Despite the massive data loss, all assets remained compliant with grid codes, avoiding costly penalties.
*   **96% Faster Fault Detection**: The system's anomaly detection continued to function, identifying faults 96% faster than traditional methods would have, even with a fraction of the data.
*   **Operational Continuity**: The business continued to operate smoothly, with no interruption to maintenance or reporting workflows.
