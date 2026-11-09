---
title: "Ona Intelligence Layer Architecture"
layout: default
nav_order: 1
parent: "ODS-E & Architecture"
---

# Ona Intelligence Layer Architecture

The Ona Intelligence Layer is a three-tier architecture that separates open data standards from commercial platform services and domain-specific AI. ODS-E sits at the foundation — a vendor-neutral data format that any system can produce and consume — with the commercial Ona platform and domain AI layers built on top.

## Three-Layer Architecture

<div style="margin:20px 0 28px 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 500" width="100%" height="auto" style="display:block; border-radius:16px;">
  <rect width="960" height="500" rx="16" fill="#4551BF"/>
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">ONA INTELLIGENCE LAYER — THREE-TIER ARCHITECTURE</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">Open standards below, commercial platform services in the middle, domain AI above</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Connector L3-L2 -->
  <line x1="480" y1="170" x2="480" y2="198" stroke="#8892E0" stroke-width="2.5" stroke-dasharray="4,3"/>
  <polygon points="480,206 475,196 485,196" fill="#8892E0"/>
  <rect x="385" y="175" width="190" height="22" rx="11" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="190" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">COMMERCIAL SERVICES</text>

  <!-- Connector L2-L1 -->
  <line x1="480" y1="304" x2="480" y2="332" stroke="#8892E0" stroke-width="2.5" stroke-dasharray="4,3"/>
  <polygon points="480,340 475,330 485,330" fill="#8892E0"/>
  <rect x="375" y="309" width="210" height="22" rx="11" fill="#2E378C" stroke="#5C67DE" stroke-width="1"/>
  <text x="480" y="324" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#C7CCF2" letter-spacing="0.5">ODS-E SCHEMA CONTRACT</text>

  <!-- LAYER 3 -->
  <g transform="translate(100,74)">
    <rect x="0" y="0" width="760" height="96" rx="12" fill="#2E378C" stroke="#7B86EE" stroke-width="1.2"/>
    <rect x="12" y="14" width="78" height="20" rx="4" fill="#7B86EE"/>
    <text x="51" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">LAYER 03</text>
    <text x="118" y="30" font-family="'DM Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">Domain AI</text>
    <text x="230" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Nehanda 27B + Zorora vertical models</text>
    <text x="30" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">
      <tspan x="30" dy="0">RAG synthesis, natural-language querying, solar forecasting optimization, BESS dispatch</tspan>
      <tspan x="30" dy="16">intelligence, and wind turbine fault prediction.</tspan>
    </text>
    <rect x="620" y="14" width="126" height="22" rx="11" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="683" y="29" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">262K Context</text>
    <rect x="620" y="40" width="126" height="22" rx="11" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="683" y="55" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#8892E0">Vertical Models</text>
  </g>

  <!-- LAYER 2 -->
  <g transform="translate(100,196)">
    <rect x="0" y="0" width="760" height="108" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="12" y="14" width="78" height="20" rx="4" fill="#5C67DE"/>
    <text x="51" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">LAYER 02</text>
    <text x="118" y="30" font-family="'DM Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">Ona Intelligence Layer</text>
    <text x="265" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Commercial platform</text>
    <text x="30" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">
      <tspan x="30" dy="0">Forecasting, fault detection, OODA terminal, data ingestion, standardization,</tspan>
      <tspan x="30" dy="16">ML operations, and Partner API over ODS-E data.</tspan>
    </text>
    <rect x="620" y="14" width="126" height="22" rx="11" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="683" y="29" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">5-min telemetry</text>
    <rect x="620" y="40" width="126" height="22" rx="11" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="683" y="55" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#8892E0">&lt;100ms ETag</text>
  </g>

  <!-- LAYER 1 -->
  <g transform="translate(100,340)">
    <rect x="0" y="0" width="760" height="96" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="12" y="14" width="78" height="20" rx="4" fill="#3B4CCA"/>
    <text x="51" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">LAYER 01</text>
    <text x="118" y="30" font-family="'DM Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">ODS-E Open Standard</text>
    <text x="280" y="29" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Free forever</text>
    <text x="30" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">
      <tspan x="30" dy="0">10 JSON schemas, 21 vendor transforms, Python runtime + CLI, and 4 conformance</tspan>
      <tspan x="30" dy="16">profiles. License: CC-BY-SA 4.0 (spec) / Apache 2.0 (code).</tspan>
    </text>
    <rect x="620" y="14" width="126" height="22" rx="11" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="683" y="29" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">10 Schemas</text>
    <rect x="620" y="40" width="126" height="22" rx="11" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="683" y="55" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#8892E0">21 Transforms</text>
  </g>
</svg>
</div>


### Layer 1: ODS-E — Open Standard

ODS-E is the foundation. It is an open specification with versioned JSON schemas, declarative vendor transforms, a Python reference runtime with CLI, and conformance profiles for trading workflows. The specification and schemas are licensed under CC-BY-SA 4.0; the reference implementation and tools are Apache 2.0. ODS-E is free to use, fork, and extend — no license fee, no vendor lock-in.

This layer defines:

- **Schemas** — 10 JSON Schema definitions covering energy timeseries, asset metadata, equipment registers, maintenance history, failure taxonomy, and more.
- **Transform specs** — 21 YAML files mapping OEM-specific data (Huawei, Enphase, Vestas, Eskom, etc.) to canonical ODS-E records.
- **Reference runtime** — Python package with `transform()`, `validate()`, `validate_batch()`, `to_json()`, and `to_parquet()` functions plus CLI commands.
- **Conformance profiles** — 4 profiles enforcing minimum field sets for specific trading contexts (bilateral, wheeling, SAWEM BRP, municipal reconciliation).

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

<div style="margin:20px 0 24px 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 360" width="100%" height="auto" style="display:block; border-radius:16px;">
  <rect width="960" height="360" rx="16" fill="#4551BF"/>
  <text x="32" y="36" font-family="'DM Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">ODS-E DATA FLOW</text>
  <text x="32" y="52" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">From vendor telemetry to commercial platform APIs</text>
  <line x1="32" y1="62" x2="928" y2="62" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <line x1="288" y1="205" x2="328" y2="205" stroke="#8892E0" stroke-width="2.5" stroke-dasharray="4,3"/>
  <polygon points="328,205 320,200 320,210" fill="#8892E0"/>
  <line x1="628" y1="205" x2="668" y2="205" stroke="#8892E0" stroke-width="2.5" stroke-dasharray="4,3"/>
  <polygon points="668,205 660,200 660,210" fill="#8892E0"/>

  <g transform="translate(30,78)">
    <rect x="0" y="0" width="258" height="300" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="12" y="14" width="84" height="20" rx="4" fill="#3B4CCA"/>
    <text x="54" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">INPUTS</text>
    <text x="20" y="60" font-family="'DM Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">OEM Data Sources</text>
    <text x="20" y="80" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Vendor APIs, CSV exports, SCADA</text>
    <g font-family="'DM Sans', system-ui, sans-serif" font-size="11" fill="#FFFFFF">
      <text x="24" y="108">• Huawei FusionSolar</text>
      <text x="24" y="128">• Enphase Envoy</text>
      <text x="24" y="148">• SolarEdge Monitoring</text>
      <text x="24" y="168">• SMA Monitoring</text>
      <text x="24" y="188">• Fronius Solar API</text>
      <text x="24" y="208">• Vestas Online</text>
      <text x="24" y="228">• Nordex Control</text>
      <text x="24" y="248">• Siemens Gamesa</text>
      <text x="24" y="268">• Eskom AMR</text>
    </g>
    <rect x="12" y="268" width="234" height="24" rx="8" fill="#0A0A0A" stroke="#333333" stroke-width="1"/>
    <text x="129" y="284" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#C7CCF2">Generic CSV / SCADA (column_map)</text>
  </g>

  <g transform="translate(336,78)">
    <rect x="0" y="0" width="292" height="300" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="12" y="14" width="84" height="20" rx="4" fill="#5C67DE"/>
    <text x="54" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">ODS-E</text>
    <text x="20" y="60" font-family="'DM Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">ODS-E Layer</text>
    <text x="20" y="80" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Canonical records and validation</text>
    <rect x="20" y="104" width="252" height="56" rx="10" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="146" y="128" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Transform</text>
    <text x="146" y="148" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">YAML spec / column_map</text>
    <line x1="146" y1="160" x2="146" y2="178" stroke="#8892E0" stroke-width="2" stroke-dasharray="3,3"/>
    <polygon points="146,182 141,174 151,174" fill="#8892E0"/>
    <rect x="20" y="186" width="252" height="56" rx="10" fill="#2A3390" stroke="#7B86EE" stroke-width="1"/>
    <text x="146" y="210" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Validate</text>
    <text x="146" y="230" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="500" fill="#C7CCF2">Schema + conformance profile</text>
  </g>

  <g transform="translate(672,78)">
    <rect x="0" y="0" width="258" height="300" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="12" y="14" width="84" height="20" rx="4" fill="#7B86EE"/>
    <text x="54" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">OUTPUTS</text>
    <text x="20" y="60" font-family="'DM Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">Ona Platform</text>
    <text x="20" y="80" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2">Commercial services and APIs</text>
    <g font-family="'DM Sans', system-ui, sans-serif" font-size="11" fill="#FFFFFF">
      <text x="24" y="108">• Ingestion API</text>
      <text x="24" y="128">• Forecasting</text>
      <text x="24" y="148">• OODA Terminal</text>
      <text x="24" y="168">• Partner API</text>
      <text x="24" y="188">• ML Training</text>
      <text x="24" y="208">• Edge Management</text>
    </g>
    <rect x="12" y="264" width="234" height="26" rx="8" fill="#0A0A0A" stroke="#333333" stroke-width="1"/>
    <text x="129" y="281" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#C7CCF2">Validated ODS-E records</text>
  </g>
</svg>
</div>

The flow is:The flow is:

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
