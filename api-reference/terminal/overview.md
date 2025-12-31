---
layout: default
---
# Terminal API Overview

The Terminal API is the central API handler for the entire Operations & Maintenance (O&M) OODA workflow. It provides endpoints for asset management, fault detection, diagnostics, maintenance scheduling, and accessing ML model results.

## What is the OODA Loop?

The OODA (Observe-Orient-Decide-Act) loop is a decision-making framework that enables rapid response to operational issues:

- **Observe**: Anomaly detection in < 5 minutes
- **Orient**: AI diagnostics in < 10 minutes  
- **Decide**: Energy-at-Risk calculation in < 15 minutes
- **Act**: Automated dispatch and continuous monitoring

## Endpoints

### OODA Workflow Endpoints

*   **[Asset Management](./assets.md)**: Create, list, and retrieve solar asset details
*   **[Fault Detection](./detect.md)**: Run fault detection on assets
*   **[AI Diagnostics](./diagnose.md)**: Execute AI diagnostics on detected faults
*   **[Maintenance Scheduling](./schedule.md)**: Create and manage maintenance schedules
*   **[Bill of Materials](./bom.md)**: Generate bills of materials for maintenance
*   **[Work Orders](./order.md)**: Create and manage work orders
*   **[Job Tracking](./track.md)**: Subscribe to and manage job tracking

### ML Integration Endpoints

*   **[Forecast Results](./forecast.md)**: Retrieve stored ML forecast results
*   **[Interpolation Results](./interpolation.md)**: Retrieve gap-filling interpolation results
*   **[ML Model Registry](./ml-models.md)**: Access the catalog of available ML models
*   **[OODA Summaries](./ooda.md)**: Retrieve ML-enhanced OODA summaries with severity and energy-at-risk

## API Design Principles

The Terminal API follows standard RESTful conventions:

*   All requests use `POST` method with JSON body
*   Responses are returned in JSON format
*   Standard HTTP status codes indicate success or errors
*   Complete request/response schemas provided for each endpoint

## Authentication

All Terminal API endpoints require authentication. See [Authentication](../authentication.md) for details.

## Base URL

```
https://api.asoba.co
```

## Quick Start

To get started with the Terminal API:

1. [Authenticate your requests](../authentication.md)
2. [Add an asset](./assets.md) to your inventory
3. [Run fault detection](./detect.md) on your assets
4. [Retrieve forecast results](./forecast.md) for your sites

## See Also

- [Get Started](../../get-started.md) - Quick start tutorial
- [OODA Workflow Guides](../../guides/portfolio-management/overview.md) - How-to guides for O&M workflows
- [Technical Concepts](../../technical-concepts/machine-learning/overview.md) - ML model details
