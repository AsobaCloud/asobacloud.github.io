---
title: "Complete Workflow"
layout: default
nav_order: 1
parent: "Code Examples"
---

# Complete Workflow

The `complete_workflow_example.py` is the capstone example for the Ona Intelligence Layer SDK. It demonstrates how to chain multiple services together into a single end-to-end workflow: from solar forecasting through fault detection, diagnostics, energy analyst queries, and maintenance scheduling.

**Source:** [`complete_workflow_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/complete_workflow_example.py)

## Workflow Overview

The example follows an 8-step pipeline that mirrors a real operational scenario:

1. **Get Solar Forecast** — Retrieve the next 24-hour production forecast
2. **Run Fault Detection** — Analyze an inverter for anomalies
3. **Run Diagnostics** — If a fault is detected, diagnose the root cause
4. **Query Energy Analyst** — Ask the RAG system about compliance requirements
5. **Create Maintenance Schedule** — Schedule a work order based on the diagnosis
6. **Review Activities** — List recent terminal activities
7. **Check ML Model Registry** — Inspect registered detection models
8. **Get Nowcast Data** — Pull real-time site metrics

## Initialization

The workflow begins by initializing a single `OnaClient` instance. This client provides access to all services — no separate initialization is needed per service.

```python
from ona_platform import OnaClient

def main():
    """Demonstrate a complete workflow across multiple services."""

    # Initialize client
    client = OnaClient()
    customer_id = "customer123"
    site_id = "Sibaya"
    asset_id = "INV001"

    print("=== COMPLETE WORKFLOW EXAMPLE ===\n")
```

The `OnaClient` constructor reads endpoint URLs and API keys from environment variables. The same client object exposes `.forecasting`, `.terminal`, `.energy_analyst`, and other service attributes.

## Step 1: Get Solar Forecast

Retrieve the site-level production forecast for the next 24 hours. The forecasting service returns predicted kWh output per time interval.

```python
    # Step 1: Get current forecast
    print("Step 1: Get Solar Forecast")
    forecast = client.forecasting.get_site_forecast(
        site_id=site_id,
        forecast_hours=24
    )
    print(f"  - Site: {forecast['site_id']}")
    print(f"  - Devices: {forecast['device_count']}")
    print(f"  - Next hour forecast: {forecast['forecasts'][0]['kWh_forecast']} kWh")
```

**Expected output:**

```
Step 1: Get Solar Forecast
  - Site: Sibaya
  - Devices: 12
  - Next hour forecast: 45.2 kWh
```

The forecast response includes `site_id`, `device_count`, and a `forecasts` array where each entry contains a timestamp and `kWh_forecast` value.

## Step 2: Run Fault Detection

Pass the inverter asset ID to the terminal service's detection endpoint. This triggers an analysis over the last 6 hours of telemetry data.

```python
    # Step 2: Check asset health via detection
    print("\nStep 2: Run Fault Detection")
    detection = client.terminal.run_detection(
        customer_id=customer_id,
        asset_id=asset_id,
        lookback_hours=6
    )
    detection_id = detection['detection_id']
    severity = detection['analysis']['severity_label']
    print(f"  - Detection ID: {detection_id}")
    print(f"  - Severity: {severity}")
    print(f"  - Status: {detection['analysis']['status']}")
```

**Expected output:**

```
Step 2: Run Fault Detection
  - Detection ID: det_8f3a2b1c
  - Severity: High
  - Status: anomaly_detected
```

The detection response includes a `detection_id` (needed for diagnostics) and an `analysis` object with `severity_label` (`Low`, `Medium`, or `High`) and `status`.

## Step 3: Run Diagnostics (Conditional)

If the detection severity is `High` or `Medium`, the workflow escalates to diagnostics. This step takes the `detection_id` from Step 2 and performs a deeper root-cause analysis.

```python
    # Step 3: If fault detected, run diagnostics
    if severity in ['High', 'Medium']:
        print("\nStep 3: Run Diagnostics (fault detected)")
        diagnostic = client.terminal.run_diagnostics(
            customer_id=customer_id,
            asset_id=asset_id,
            detection_id=detection_id
        )
        print(f"  - Root cause: {diagnostic['analysis']['root_cause']}")
        print(f"  - Category: {diagnostic['analysis']['category']}")
        print(f"  - Confidence: {diagnostic['analysis']['confidence']}")
```

**Expected output:**

```
Step 3: Run Diagnostics (fault detected)
  - Root cause: DC string underperformance — possible soiling or partial shading
  - Category: string_fault
  - Confidence: 0.87
```

The diagnostic response provides a human-readable `root_cause`, a machine-readable `category`, and a `confidence` score (0–1).

## Step 4: Query Energy Analyst

With the diagnostic category identified, the workflow queries the energy analyst RAG system for compliance and maintenance information specific to the fault type.

```python
        # Step 4: Query energy analyst for compliance info
        print("\nStep 4: Query Energy Analyst for Compliance")
        try:
            compliance_info = client.energy_analyst.query(
                question=f"What are the maintenance requirements for {diagnostic['analysis']['category']}?",
                n_results=2
            )
            print(f"  - Answer: {compliance_info['answer'][:200]}...")
        except Exception as e:
            print(f"  - Energy Analyst unavailable: {e}")
```

**Expected output:**

```
Step 4: Query Energy Analyst for Compliance
  - Answer: For string_fault categories, inspect DC connectors and wiring within 48 hours. Verify panel cleanliness and check for vegetation growth...
```

The `query` method accepts a natural-language `question` and an `n_results` parameter controlling how many source documents to retrieve. The response includes an `answer` string and supporting context. This call is wrapped in a `try/except` because the energy analyst may be unavailable depending on your service tier.

## Step 5: Create Maintenance Schedule

Based on the diagnostic root cause and severity, the workflow creates a maintenance schedule with an estimated duration.

```python
        # Step 5: Create maintenance schedule
        print("\nStep 5: Create Maintenance Schedule")
        schedule = client.terminal.create_schedule(
            customer_id=customer_id,
            asset_id=asset_id,
            description=f"Maintenance: {diagnostic['analysis']['root_cause']}",
            priority="High" if severity == "High" else "Medium",
            estimated_duration_hours=8
        )
        print(f"  - Schedule created: {schedule['schedule_id']}")
```

**Expected output:**

```
Step 5: Create Maintenance Schedule
  - Schedule created: sched_a1b2c3d4
```

The `create_schedule` method accepts a `description`, `priority` (`High` or `Medium`), and `estimated_duration_hours`. It returns a `schedule_id` that can be tracked in the activity stream.

## Step 6: Review Recent Activities

List the terminal activities from the last 24 hours. This includes detections, diagnostics, and schedules created in the current workflow.

```python
    # Step 6: Review activity stream
    print("\nStep 6: Review Recent Activities")
    activities = client.terminal.list_activities(customer_id=customer_id)
    print(f"  - Total activities (24h): {len(activities)}")
    print("  - Recent activities:")
    for activity in activities[:3]:
        print(f"    [{activity['phase']}] {activity['title']}")
```

**Expected output:**

```
Step 6: Review Recent Activities
  - Total activities (24h): 7
  - Recent activities:
    [act] Maintenance schedule created
    [decide] Diagnostics completed — string_fault
    [observe] Anomaly detected on INV001
```

Each activity includes a `phase` (corresponding to the OODA loop: `observe`, `orient`, `decide`, `act`) and a `title`.

## Step 7: Check ML Model Registry

Inspect the registered ML models used for detection and diagnostics. This is useful for auditing which model versions are active.

```python
    # Step 7: Check ML model registry
    print("\nStep 7: Check ML Model Registry")
    models = client.terminal.get_ml_models()
    print(f"  - Registered models: {len(models)}")
    if models:
        latest_model = models[0]
        print(f"  - Latest: {latest_model.get('model_name', 'N/A')} "
              f"(version {latest_model.get('version', 'N/A')})")
```

**Expected output:**

```
Step 7: Check ML Model Registry
  - Registered models: 4
  - Latest: ona-anomaly-detector (version 2.1.3)
```

## Step 8: Get Nowcast Data

Finally, pull real-time nowcast metrics for monitoring. This provides a snapshot of current site performance.

```python
    # Step 8: Get nowcast data for monitoring
    print("\nStep 8: Get Nowcast Data")
    nowcast = client.terminal.get_nowcast_data(
        customer_id=customer_id,
        time_range="1h"
    )
    metrics = nowcast.get('latest_metrics', {})
    print(f"  - Total power: {metrics.get('total_power_kw', 0)} kW")
    print(f"  - Active inverters: {metrics.get('active_inverters', 0)}")
    print(f"  - Avg temperature: {metrics.get('avg_temperature_c', 0)}°C")

    print("\n=== WORKFLOW COMPLETE ===")


if __name__ == '__main__':
    main()
```

**Expected output:**

```
Step 8: Get Nowcast Data
  - Total power: 312.5 kW
  - Active inverters: 11
  - Avg temperature: 42.3°C

=== WORKFLOW COMPLETE ===
```

## Key Takeaways

- **Single client, multiple services** — One `OnaClient` instance provides access to forecasting, terminal, energy analyst, and all other services.
- **Detection → Diagnostics chain** — The `detection_id` from `run_detection()` is the input to `run_diagnostics()`, creating a natural pipeline.
- **Conditional escalation** — Diagnostics and scheduling only run when severity warrants it (`High` or `Medium`).
- **Activity audit trail** — Every action (detection, diagnostic, schedule) appears in the activity stream, tagged with its OODA phase.
- **Graceful degradation** — The energy analyst query is wrapped in a `try/except` so the workflow continues even if that service is unavailable.

For a comparison of how this same workflow looks in JavaScript, see [Python vs JavaScript](/examples/language-comparison). For the full list of available examples, see [Code Examples](/examples/overview).
