---
title: "Terminal API"
layout: default
nav_order: 4
parent: "Reference"
has_children: true
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

*   **[Asset Management](./assets)**: Create, list, and retrieve solar asset details
*   **[Fault Detection](./detect)**: Run fault detection on assets
*   **[AI Diagnostics](./diagnose)**: Execute AI diagnostics on detected faults
*   **[Maintenance Scheduling](./schedule)**: Create and manage maintenance schedules
*   **[Bill of Materials](./bom)**: Generate bills of materials for maintenance
*   **[Work Orders](./order)**: Create and manage work orders
*   **[Job Tracking](./track)**: Subscribe to and manage job tracking

### ML Integration Endpoints

*   **[Forecast Results](./forecast)**: Retrieve stored ML forecast results
*   **[Interpolation Results](./interpolation)**: Retrieve gap-filling interpolation results
*   **[ML Model Registry](./ml-models)**: Access the catalog of available ML models
*   **[OODA Summaries](./ooda)**: Retrieve ML-enhanced OODA summaries with severity and energy-at-risk

## API Design Principles

The Terminal API follows standard RESTful conventions:

*   All requests use `POST` method with JSON body
*   Responses are returned in JSON format
*   Standard HTTP status codes indicate success or errors
*   Complete request/response schemas provided for each endpoint

## Authentication

All Terminal API endpoints require authentication. See [Authentication](../authentication) for details.

## Base URL

```
https://api.asoba.org
```

## Quick Start

To get started with the Terminal API:

1. [Authenticate your requests](../authentication)
2. [Add an asset](./assets) to your inventory
3. [Run fault detection](./detect) on your assets
4. [Retrieve forecast results](./forecast) for your sites

## See Also

- [Get Started](../../get-started) - Quick start tutorial
- [OODA Workflow Guides](../../guides/portfolio-management/overview) - How-to guides for O&M workflows
- [Technical Concepts](../../technical-concepts/machine-learning/overview) - ML model details
