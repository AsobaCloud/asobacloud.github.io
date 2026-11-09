---
title: "ODS-E & Architecture"
layout: default
nav_order: 4
has_children: true
---

# ODS-E & Architecture

ODS-E (Open Data Schema for Energy) is an open specification for interoperable energy asset data across generation, consumption, and net metering. It ships with versioned JSON schemas, vendor transforms, a Python reference runtime with CLI, and integration guides for inverters, industrial protocols, SCADA, and utility data portals.

<div class="concept4-diagram" style="margin:24px 0 18px 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 300" width="100%" height="auto" style="display:block; border-radius:16px;">
  <!-- Canvas -->
  <rect width="960" height="300" rx="16" fill="#4551BF"/>
  <text x="32" y="34" font-family="'DM Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">ODS-E CONCEPT PIPELINE</text>
  <text x="32" y="50" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="500" fill="#C7CCF2" letter-spacing="0.5">From raw OEM telemetry to plain-English operational answers</text>
  <line x1="32" y1="60" x2="928" y2="60" stroke="#C7CCF2" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Connectors -->
  <line x1="238" y1="172" x2="258" y2="172" stroke="#8892E0" stroke-width="2.5" stroke-dasharray="4,3"/>
  <polygon points="258,172 250,167 250,177" fill="#8892E0"/>
  <line x1="468" y1="172" x2="488" y2="172" stroke="#8892E0" stroke-width="2.5" stroke-dasharray="4,3"/>
  <polygon points="488,172 480,167 480,177" fill="#8892E0"/>
  <line x1="698" y1="172" x2="718" y2="172" stroke="#8892E0" stroke-width="2.5" stroke-dasharray="4,3"/>
  <polygon points="718,172 710,167 710,177" fill="#8892E0"/>

  <!-- Stage 1: ODS-E -->
  <g transform="translate(30,78)">
    <rect x="0" y="0" width="212" height="184" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="12" y="14" width="72" height="20" rx="4" fill="#3B4CCA"/>
    <text x="48" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STAGE 1</text>
    <text x="20" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">ODS-E Standard</text>
    <text x="20" y="82" font-family="'DM Sans', system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#8892E0">Universal Telemetry</text>
    <text x="20" y="112" font-family="'DM Sans', system-ui, sans-serif" font-size="11" fill="#C7CCF2">
      <tspan x="20" dy="0">Normalizes multi-vendor data</tspan>
      <tspan x="20" dy="16">into a canonical 65-field</tspan>
      <tspan x="20" dy="16">ODS-E record stream.</tspan>
    </text>
    <rect x="20" y="146" width="172" height="22" rx="11" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="106" y="161" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">21 Vendor Transforms</text>
  </g>

  <!-- Stage 2: Ona Platform -->
  <g transform="translate(264,78)">
    <rect x="0" y="0" width="212" height="184" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="12" y="14" width="72" height="20" rx="4" fill="#5C67DE"/>
    <text x="48" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF" letter-spacing="0.8">STAGE 2</text>
    <text x="20" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">Ona Platform &amp; SDK</text>
    <text x="20" y="82" font-family="'DM Sans', system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#8892E0">Intelligence &amp; APIs</text>
    <text x="20" y="112" font-family="'DM Sans', system-ui, sans-serif" font-size="11" fill="#C7CCF2">
      <tspan x="20" dy="0">Processes 5-minute telemetry,</tspan>
      <tspan x="20" dy="16">evaluates energy-at-risk, and</tspan>
      <tspan x="20" dy="16">serves sub-100ms snapshots.</tspan>
    </text>
    <rect x="20" y="146" width="172" height="22" rx="11" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="106" y="161" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">6 Conformance Profiles</text>
  </g>

  <!-- Stage 3: MCP -->
  <g transform="translate(494,78)">
    <rect x="0" y="0" width="212" height="184" rx="12" fill="#2E378C" stroke="#5C67DE" stroke-width="1.2"/>
    <rect x="12" y="14" width="72" height="20" rx="4" fill="#8892E0"/>
    <text x="48" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#0A0A0A" letter-spacing="0.8">STAGE 3</text>
    <text x="20" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">MCP Protocol</text>
    <text x="20" y="82" font-family="'DM Sans', system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#C7CCF2">Standardized Bridge</text>
    <text x="20" y="112" font-family="'DM Sans', system-ui, sans-serif" font-size="11" fill="#C7CCF2">
      <tspan x="20" dy="0">Secure open protocol exposing</tspan>
      <tspan x="20" dy="16">telemetry tools, calculations,</tspan>
      <tspan x="20" dy="16">and tariffs directly to AI.</tspan>
    </text>
    <rect x="20" y="146" width="172" height="22" rx="11" fill="#2A3390" stroke="#5C67DE" stroke-width="1"/>
    <text x="106" y="161" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Zero API Glue Code</text>
  </g>

  <!-- Stage 4: Nehanda CLI -->
  <g transform="translate(724,78)">
    <rect x="0" y="0" width="208" height="184" rx="12" fill="#0A0A0A" stroke="#7B86EE" stroke-width="1.5"/>
    <rect x="12" y="14" width="72" height="20" rx="4" fill="#FFFFFF"/>
    <text x="48" y="28" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="800" fill="#0A0A0A" letter-spacing="0.8">STAGE 4</text>
    <text x="20" y="62" font-family="'DM Sans', system-ui, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">Nehanda CLI</text>
    <text x="20" y="82" font-family="'DM Sans', system-ui, sans-serif" font-size="11.5" font-weight="700" fill="#8892E0">Business Accessibility</text>
    <text x="20" y="112" font-family="'DM Sans', system-ui, sans-serif" font-size="11" fill="#C7CCF2">
      <tspan x="20" dy="0">Business teams ask plain-</tspan>
      <tspan x="20" dy="16">English questions and get</tspan>
      <tspan x="20" dy="16">verified yield reports.</tspan>
    </text>
    <rect x="18" y="146" width="172" height="22" rx="11" fill="#1F1F1F" stroke="#444444" stroke-width="1"/>
    <text x="104" y="161" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#8892E0">Zero Coding Required</text>
  </g>
</svg>
</div>

<div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center; margin-bottom:24px;">
  <a href="https://opendataschema.energy/docs" class="quick-start-button">Read the Docs</a>
  <a href="https://asoba.co/tutorials/index.html" class="quick-start-button">ODSE Tutorials</a>
</div>

## The Problem

Every OEM — Huawei, Enphase, SolarEdge, Fronius, SMA, Vestas, and dozens more — exposes telemetry through proprietary APIs, CSV exports, and SCADA protocols with different field names, units, and error taxonomies. Integrating each new vendor typically costs **120–160 hours** of engineering effort: mapping columns, normalizing timestamps, classifying error states, and writing bespoke validation. With 20+ common OEMs across solar PV, wind, BESS, and utility metering, the integration tax compounds rapidly.

ODS-E eliminates this by defining a single canonical schema. OEM-specific data is transformed into ODS-E records via declarative YAML specs, validated against versioned schemas, and then consumed by any downstream system — analytics platforms, ML pipelines, billing engines, or market settlement workflows — without re-integration.

## Components

### JSON Schemas

Versioned JSON Schema (Draft 2020-12) definitions for energy data structures:

- **`energy-timeseries.json`** — 65-field canonical record for a single energy reading (3 required fields, 62 optional). Covers core telemetry, market settlement, wheeling, tariffs, curtailment, BESS dispatch, wind SCADA, and renewable certificates.
- **`asset-metadata.json`** — asset configuration, location, and grid connection details.
- **`equipment-register.json`** — equipment hierarchy and technical attributes from ERP/EAM systems.
- 7 additional schemas for equipment ID mapping, maintenance history, spare parts, failure taxonomy, and more.

### Error Taxonomy

Seven standardized error categories that replace OEM-specific error codes:

| Category | Description |
|----------|-------------|
| `normal` | Equipment operating normally |
| `warning` | Degraded but functional (e.g., grid over-voltage, temperature limited) |
| `critical` | Severe condition requiring attention (e.g., DC arc fault, emergency stop) |
| `fault` | Equipment fault (e.g., residual current fault, grid lost) |
| `offline` | No data received from the asset |
| `standby` | Asset idle (e.g., nighttime, initializing) |
| `unknown` | Unclassified state |

### Transform Specifications

Declarative YAML files that map OEM-specific data to ODS-E records. Each spec defines input column aliases, output field mappings, error code mappings, and validation bounds. 21 vendor transforms are included — see [Transform Specifications](/odse/transforms).

### Python Reference Runtime + CLI

A Python package (`odse`) providing:

- `transform()` — convert vendor data to ODS-E records
- `validate()` / `validate_batch()` — validate records against schemas and conformance profiles
- `to_json()` / `to_parquet()` — persist validated records
- CLI commands: `odse transform` and `odse validate`

## Quick Start

### Install

```bash
pip install -e src/python[parquet]
```

### Transform vendor data

```bash
odse transform --source generic_csv \
  --input examples/fixtures/quickstart_scada.csv \
  --column-map timestamp=Timestamp,kWh=ActiveEnergy,asset_id=Asset \
  --output examples/output/quickstart.cleaned.json
```

### Validate

```bash
odse validate --input examples/output/quickstart.cleaned.json --level schema
```

Expected output:

```
3/3 valid, 0 errors
```

### In Python

```python
from pathlib import Path
from odse import transform, validate_batch, to_parquet

records = transform(
    Path("examples/fixtures/quickstart_scada.csv"),
    source="generic_csv",
    column_map={
        "timestamp": "Timestamp",
        "kWh": "ActiveEnergy",
        "asset_id": "Asset",
    },
)

result = validate_batch(records, level="schema")
print(result.summary)
# 3/3 valid, 0 errors

to_parquet(records, "output/", partition_by=["asset_id", "year", "month", "day"])
```

## What's Next

- [Ona Intelligence Layer Architecture](/odse/architecture) — how ODS-E fits within the broader platform
- [ODS-E & the SDK](/odse/sdk-integration) — using ODS-E with the Ona SDK
- [Schema Reference](/odse/schemas) — field-level documentation for all schemas
- [Transform Specifications](/odse/transforms) — vendor transform catalog and usage
- [Validation Guide](/odse/validation) — validation levels and conformance profiles

## Repository

**Source code and schemas:** [github.com/AsobaCloud/odse](https://github.com/AsobaCloud/odse)

**Licensing:**

- Specification, schemas, transforms: CC-BY-SA 4.0
- Reference implementation and tools: Apache 2.0

Maintained by [Asoba Corporation](https://asoba.co).
