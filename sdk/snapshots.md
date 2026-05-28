---
title: "Snapshot Technical Reference"
layout: default
nav_order: 2
parent: "Ona SDK"
---

# Snapshot Technical Reference

The Ona Partner API and SDK use a **Pre-computed Snapshot Architecture** to deliver high-performance, analytical data to embedded dashboards and partner systems. This page details the format, delivery mechanism, and technical reasoning behind this approach.

---

## Architectural Philosophy
{: #architecture }

### Decoupling Compute from Delivery
Unlike the Telemetry and OODA Terminal APIs—which query live, raw time-series data—the Partner API serves data that has already been processed by the **Asset Intelligence Service**. 

This follows the **Backend-for-Frontend (BFF)** pattern:
1.  **Compute Phase**: Complex ML models and aggregation logic run hourly to generate site-level insights.
2.  **Persistence Phase**: These insights are stored as optimized JSON snapshots in S3.
3.  **Delivery Phase**: The Partner API acts as a thin delivery facade, reading these static files and serving them with high-performance headers.

### Why Snapshots?
*   **Performance**: Querying raw telemetry for a year-to-date KPI rollup in real-time is computationally expensive. Snapshots provide the result in sub-100ms.
*   **Reliability**: Dashboards can be rendered even if the underlying telemetry databases are under heavy load or maintenance.
*   **Consistency**: Partners receive the exact same "source of truth" used by Asoba"s internal operations.

---

## Performance Optimization (ETag Caching)
{: #performance }

The primary performance enabler for the Partner API is the combination of **ETag-based conditional GETs** and **SDK-side in-memory caching**.

### The Flow
1.  **First Fetch**: The SDK requests a snapshot. The server returns "200 OK" with the JSON body and an "ETag" header (a hash of the file content).
2.  **SDK Cache**: The SDK stores the body and the ETag in a local "Map".
3.  **Subsequent Fetches**: The SDK automatically adds the "If-None-Match: <etag>" header to the request.
4.  **Server Response**: 
    *   If the snapshot hasn"t changed, the server returns "304 Not Modified" (empty body).
    *   The SDK then returns the data from its local cache immediately.

This reduces typical response times from **~150ms** (network + S3 read) to **<10ms** for cached data.

---

## Data Dictionary: What is Served?
{: #data-dictionary }

The Partner API currently exposes three specific snapshot types.

### 1. KPI Rollup (`kpi-rollup`)
**Purpose**: Summarize site productivity and health for management-level dashboards.

| Field | Type | Description |
|-------|------|-------------|
| `daily_yield_kwh` | float | Total energy produced today (local time). |
| `ytd_yield_mwh` | float | Total energy produced since Jan 1st of the current year. |
| `performance_ratio` | float | 0.0-1.0 score comparing actual yield vs theoretical maximum based on irradiance. |
| `availability_score` | float | Percentage of time the site was reporting and producing during daylight hours. |
| `peak_power_kw` | float | The highest power output recorded today. |

**Example Usage**: Use these fields to populate "Big Number" tiles on a site overview page.

### 2. Maintenance Signals (`maintenance-signals`)
**Purpose**: Direct field technicians to specific issues without requiring them to analyze raw charts.

| Field | Type | Description |
|-------|------|-------------|
| `severity` | string | `low`, `medium`, `high`, or `critical`. |
| `diagnostic_code` | string | Machine-readable identifier (e.g., `SOILING_LOSS_DETECTED`). |
| `recommended_action` | string | Actionable instruction for the O&M team. |
| `energy_at_risk_kwh` | float | Estimated daily energy loss if the issue is not resolved. |

**Example Usage**: Display as a "High Priority Alerts" feed on a mobile technician app.

### 3. Forecast Snapshot (`forecast-snapshot`)
**Purpose**: Enable grid-aware scheduling or battery optimization for the next several days.

| Field | Type | Description |
|-------|------|-------------|
| `horizon` | string | Scope of the forecast (`24h`, `48h`, or `7d`). |
| `forecasts` | array | List of objects containing `timestamp` and `expected_power_kw`. |

---

## Integration Example: Building a React Dashboard
{: #usage-example }

The following example shows how to use the SDK within a React component. The ETag caching is handled automatically by the SDK, so you can safely call these methods on every component mount without performance penalties.

```javascript
import React, { useEffect, useState } from "react";
import { OnaSDK } from "@asoba/ona-sdk";

const SiteSummary = ({ siteId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sdk = new OnaSDK({ /* config */ });
    
    // Fetch pre-computed snapshot
    sdk.partnerApi.getKpiRollup({ site_id: siteId })
      .then(rollup => {
        setData(rollup.kpis);
        setLoading(false);
      });
  }, [siteId]);

  if (loading) return <div>Loading Performance Data...</div>;

  return (
    <div className="dashboard-grid">
      <div className="tile">
        <h3>Today"s Yield</h3>
        <p className="value">{data.daily_yield_kwh} kWh</p>
      </div>
      <div className="tile">
        <h3>Performance Ratio</h3>
        <p className="value">{(data.performance_ratio * 100).toFixed(1)}%</p>
      </div>
    </div>
  );
};
```

---

## Generic Snapshot Access
{: #generic-snapshots }

The `getSnapshot({ site_id, kind })` method allows access to experimental or custom snapshots produced by Asoba research teams before they are promoted to formal SDK methods. Use the `kind` parameter to specify the sub-folder in the snapshot store (e.g., `kind: "custom-site-health"`).
