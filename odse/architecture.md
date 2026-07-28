---
title: "Ona Intelligence Layer Architecture"
layout: default
nav_order: 1
parent: "ODS-E & Architecture"
---

# Ona Intelligence Layer Architecture

The Ona Intelligence Layer is a three-tier architecture that separates open data standards from commercial platform services and domain-specific AI. ODS-E sits at the foundation — a vendor-neutral data format that any system can produce and consume — with the commercial Ona platform and domain AI layers built on top.

## Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 3: Domain AI                                             │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐  │
│  │ Nehanda 27B LLM     │  │ Zorora (vertical-specific models)│  │
│  │ RAG synthesis,      │  │ Solar forecasting, fault         │  │
│  │ natural language    │  │ detection, BESS dispatch         │  │
│  │ querying            │  │                                  │  │
│  └─────────────────────┘  └──────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  Layer 2: Ona Intelligence Layer (Commercial Platform)          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────────┐  │
│  │ Forecast │ │ Fault    │ │ OODA     │ │ ML Operations     │  │
│  │ Engine   │ │ Detection│ │ Terminal │ │ (training, gap    │  │
│  │          │ │          │ │ Workflow │ │  detection, edge) │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────────────┐    │
│  │ Partner  │ │ Data     │ │ Standardization Service      │    │
│  │ API      │ │ Ingestion│ │ (validates against ODS-E)    │    │
│  └──────────┘ └──────────┘ └──────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: ODS-E (Open Standard — Free Forever)                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌─────────────┐  │
│  │ JSON       │ │ Transform  │ │ Python     │ │ Conformance │  │
│  │ Schemas    │ │ Specs (20  │ │ Runtime +  │ │ Profiles    │  │
│  │ (8 schemas)│ │ vendors)   │ │ CLI        │ │ (6 profiles)│  │
│  └────────────┘ └────────────┘ └────────────┘ └─────────────┘  │
│  License: CC-BY-SA 4.0 (spec) / Apache 2.0 (code)              │
└─────────────────────────────────────────────────────────────────┘
```

### Layer 1: ODS-E — Open Standard

ODS-E is the foundation. It is an open specification with versioned JSON schemas, declarative vendor transforms, a Python reference runtime with CLI, and conformance profiles for trading workflows. The specification and schemas are licensed under CC-BY-SA 4.0; the reference implementation and tools are Apache 2.0. ODS-E is free to use, fork, and extend — no license fee, no vendor lock-in.

This layer defines:

- **Schemas** — 8 JSON Schema definitions covering energy timeseries, asset metadata, equipment registers, maintenance history, failure taxonomy, and more.
- **Transform specs** — 20 YAML files mapping OEM-specific data (Huawei, Enphase, Vestas, Eskom, etc.) to canonical ODS-E records.
- **Reference runtime** — Python package with `transform()`, `validate()`, `validate_batch()`, `to_json()`, and `to_parquet()` functions plus CLI commands.
- **Conformance profiles** — 6 profiles enforcing minimum field sets for specific trading contexts (bilateral, wheeling, SAWEM BRP, municipal reconciliation, BESS dispatch, wind SCADA).

### Layer 2: Ona Intelligence Layer — Commercial Platform

The Ona Intelligence Layer is Asoba's commercial platform that consumes ODS-E-formatted data and provides production-grade services:

- **Forecasting** — solar production forecasts with 24-hour horizons, served via the Partner API.
- **Fault detection** — OODA (Observe, Orient, Decide, Act) terminal alerts for real-time fault and diagnostic detection.
- **Data ingestion** — accepts ODS-E records, validates them against the full 65-field schema, and stores them for downstream processing.
- **Standardization service** — server-side normalization that validates incoming data against ODS-E schemas.
- **ML operations** — model training triggers, gap detection for missing intervals, and edge device management.
- **Partner API** — pre-computed KPI rollups, maintenance signals, forecast snapshots, and preventive maintenance schedules with sub-100ms response via ETag caching.

The SDK ([github.com/AsobaCloud/sdk](https://github.com/AsobaCloud/sdk)) provides Python and JavaScript clients for all Layer 2 services.

### Layer 3: Domain AI

Specialized AI models built on top of the Ona platform:

- **Nehanda 27B** — a large language model for RAG (Retrieval-Augmented Generation) synthesis, enabling natural language querying of energy data, asset histories, and maintenance records.
- **Zorora** — vertical-specific models for targeted use cases such as solar forecasting optimization, BESS dispatch intelligence, and wind turbine fault prediction.

## Data Flow

```
OEM Data Sources              ODS-E Layer              Ona Platform
─────────────────         ──────────────────       ──────────────────
Huawei FusionSolar   ─┐                         ┌─→ Ingestion API
Enphase Envoy         │                         │
SolarEdge Monitoring  ├─→ Transform  ─→ Validate ─┤
SMA Monitoring        │   (YAML spec)   (schema)  │  ┌─→ Forecasting
Fronius Solar API     │                         │  ├─→ OODA Terminal
Vestas Online         │                         ├─→├─→ Partner API
Nordex Control        │                         │  ├─→ ML Training
Siemens Gamesa        │                         │  └─→ Edge Management
Eskom AMR            ─┘                         │
                                                 │
Generic CSV / SCADA ──→ Transform ──→ Validate ──┘
                       (column_map)   (schema +
                                      profile)
```

The flow is:

1. **Raw OEM data** arrives in vendor-specific formats (CSV exports, API responses, SCADA feeds).
2. **Transform** — the ODS-E runtime applies the appropriate vendor transform spec (or a generic column mapping) to produce canonical ODS-E records.
3. **Validate** — records are checked against the energy-timeseries schema and optionally against a conformance profile. Invalid records are flagged before they enter downstream systems.
4. **Ona APIs** — validated ODS-E records are ingested by the Ona platform, which provides forecasting, fault detection, KPI rollups, and ML operations.

## The Upgrade Path

A key architectural principle: **when data is ODS-E-native, upgrading to the Ona commercial platform requires zero reintegration.**

If you start with ODS-E alone — transforming vendor data and validating locally — your data is already in the format the Ona platform expects. When you're ready to add forecasting, fault detection, or ML operations, you simply:

1. Obtain an API key from Asoba.
2. Install the SDK (`pip install -e .` or `npm install`).
3. Upload your validated ODS-E records via the data ingestion service.

No schema changes, no field remapping, no new integration work. The ODS-E schema is the contract between Layer 1 and Layer 2 — it doesn't change when you adopt commercial services.

## Related Pages

- [ODS-E Overview](/odse/overview) — components and quick start
- [ODS-E & the SDK](/odse/sdk-integration) — SDK standardization and ingestion
- [Schema Reference](/odse/schemas) — field-level documentation
- [Transform Specifications](/odse/transforms) — vendor transform catalog
- [Validation Guide](/odse/validation) — validation levels and profiles
