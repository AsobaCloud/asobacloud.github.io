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

The Partner API currently exposes four snapshot types.

### 1. KPI Rollup (`kpi-rollup`)
**Purpose**: Summarize site productivity and health for management-level dashboards.

Top-level keys: `site_id`, `period` (`{start, end}`), `generated_at`, `system`, `energy_balance`, `performance`, `ear`, `financial`.

| Field | Type | Description |
|-------|------|-------------|
| `system.rated_capacity_kw` | float | Total rated DC/AC capacity across reporting devices. |
| `system.device_count` | int | Number of inverters/devices included in the rollup. |
| `energy_balance.solar_production_kwh` | float | Energy produced over the rollup period. |
| `performance.system_pr` | float | 0.0-1.0 performance ratio (actual vs expected for irradiance). |
| `performance.availability_pct` | float | Percentage availability over the period. |
| `ear.energy_lost_kwh` | float | Energy-at-risk: estimated energy lost over the period. |
| `financial.shortfall_cost_zar` | float | Monetised value of the shortfall (currency per `financial.tariff_currency`). |

**Example Usage**: Use `performance.system_pr` and `ear.energy_lost_kwh` to populate "Big Number" tiles on a site overview page.

### 2. Maintenance Signals (`maintenance-signals`)
**Purpose**: Direct field technicians to specific issues without requiring them to analyze raw charts.

Returned as `{site_id, generated_at, cursor, signals: [...]}`. Each item in `signals`:

| Field | Type | Description |
|-------|------|-------------|
| `severity` | string | One of `Critical`, `High`, `Medium`, `Low`. |
| `type` | string | Signal category (e.g., `Capacity Underperformance`). |
| `asset_id` | string | The affected inverter/device. |
| `description` | string | Human-readable explanation of the signal. |
| `expected_kw` / `actual_kw` | float | Expected vs measured output at detection time. |
| `capacity_pct` | float | Actual output as a percentage of expected. |

**Example Usage**: Display as a "High Priority Alerts" feed on a mobile technician app.

### 3. Forecast Snapshot (`forecast-snapshot`)
**Purpose**: Enable grid-aware scheduling or battery optimization for the next several days.

Returned as `{site_id, model_id, generated_at, horizon_hours, resolution, intervals: [...], totals}`.

| Field | Type | Description |
|-------|------|-------------|
| `horizon_hours` | int | Length of the forecast window (e.g., `24`). |
| `intervals` | array | Per-step objects: `ts`, `p50_kw`, `p10_kw`, `p90_kw`, `revenue_zar`. |
| `totals` | object | `total_kwh` and `total_revenue_zar` across the window. |

### 4. Maintenance Schedule (`maintenance-schedule`)
**Purpose**: Drive preventive-maintenance planning for the next 90 days.

Returned as `{site_id, generated_at, horizon: {start, end}, tasks: [...], summary}`. Each task:

| Field | Type | Description |
|-------|------|-------------|
| `asset_id` | string | Inverter/device the task applies to. |
| `task_type` | string | e.g., `inspection`. |
| `recommended_date` | string | ISO date the task should be performed by. |
| `priority` | string | `High`, `Medium`, or `Low`. |

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
        setData(rollup);
        setLoading(false);
      });
  }, [siteId]);

  if (loading) return <div>Loading Performance Data...</div>;

  return (
    <div className="dashboard-grid">
      <div className="tile">
        <h3>Solar Production</h3>
        <p className="value">{data.energy_balance.solar_production_kwh.toFixed(1)} kWh</p>
      </div>
      <div className="tile">
        <h3>Performance Ratio</h3>
        <p className="value">{(data.performance.system_pr * 100).toFixed(1)}%</p>
      </div>
    </div>
  );
};
```

---

## Generic Snapshot Access
{: #generic-snapshots }

The `getSnapshot({ site_id, kind })` method allows access to experimental or custom snapshots produced by Asoba research teams before they are promoted to formal SDK methods. Use the `kind` parameter to specify the sub-folder in the snapshot store (e.g., `kind: "custom-site-health"`).
