---
title: "Schema Reference"
layout: default
nav_order: 3
parent: "ODS-E & Architecture"
---

# Schema Reference

ODS-E defines versioned JSON Schema (Draft 2020-12) documents for energy asset data. This page covers the three primary schemas and the standardized error taxonomy. Full schema files are at [github.com/AsobaCloud/odse/tree/main/schemas](https://github.com/AsobaCloud/odse/tree/main/schemas).

## energy-timeseries.json

The core schema for a single energy reading. Defines 65 properties — 3 required, 62 optional — covering generation, consumption, net metering, market settlement, wheeling, tariffs, BESS dispatch, and wind SCADA.

### Required Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `timestamp` | string (date-time) | ISO 8601 with timezone |
| `kWh` | number | ≥ 0 for generation/consumption; may be negative for `direction: net` |
| `error_type` | string (enum) | One of the 7 error categories (see below) |

### Core Optional Fields

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `error_code` | string | — | Original OEM error code, preserved for reference |
| `kVArh` | number | — | Reactive energy in kVArh |
| `kVA` | number | min: 0 | Apparent power in kVA |
| `PF` | number | 0–1 | Power factor |
| `direction` | string (enum) | `generation`, `consumption`, `net` | Energy flow direction; defaults to `generation` |
| `end_use` | string (enum) | 16 values (cooling, heating, pv_generation, etc.) | ComStock/ResStock end-use category |
| `fuel_type` | string (enum) | `electricity`, `natural_gas`, `propane`, `fuel_oil`, `other` | Fuel type for non-electric assets |

### Market & Settlement Fields

| Field | Type | Description |
|-------|------|-------------|
| `seller_party_id` | string (pattern) | Canonical seller ID in `authority:type:id` format |
| `buyer_party_id` | string (pattern) | Canonical buyer ID |
| `network_operator_id` | string (pattern) | Network operator ID |
| `wheeling_agent_id` | string (pattern) | Wheeling intermediary ID |
| `settlement_period_start` | date-time | Settlement window start |
| `settlement_period_end` | date-time | Settlement window end |
| `loss_factor` | number (min: 0) | Applied loss factor (e.g., 0.03 for 3%) |
| `contract_reference` | string | PPA / bilateral / wheeling schedule reference |

### BESS Fields (SEP-026)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `soc` | number | 0–100 | State of charge (%) |
| `soh` | number | 0–100 | State of health (%) |
| `charge_kWh` | number | min: 0 | Energy charged this interval |
| `discharge_kWh` | number | min: 0 | Energy discharged this interval |
| `cycle_count` | number | min: 0 | Cumulative charge/discharge cycles |
| `cell_temp_min_c` | number | — | Min cell temperature (°C) |
| `cell_temp_max_c` | number | — | Max cell temperature (°C) |
| `cell_voltage_min_v` | number | min: 0 | Min cell voltage (V) |
| `cell_voltage_max_v` | number | min: 0 | Max cell voltage (V) |
| `dispatch_mode` | string (enum) | `charging`, `discharging`, `standby`, `balancing` | Battery dispatch state |

### Wind SCADA Fields (SEP-025)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `wind_speed_ms` | number | min: 0 | Wind speed (m/s) |
| `rotor_rpm` | number | min: 0 | Rotor revolutions per minute |
| `blade_pitch_deg` | number | — | Blade pitch angle (degrees) |
| `nacelle_direction_deg` | number | 0–360 | Nacelle orientation (compass bearing) |

The schema also includes fields for tariffs, wheeling, unbundled charges, curtailment, balance responsibility, billing, and renewable certificates. The full property list is in [energy-timeseries.json](https://github.com/AsobaCloud/odse/blob/main/schemas/energy-timeseries.json).

### Conditional Validation

The schema enforces a conditional rule: when `direction` is `generation`, `kWh` must be ≥ 0. This is expressed via the `if`/`then` JSON Schema keywords.

## asset-metadata.json

Defines asset configuration, location, and grid connection metadata.

### Required Fields

| Field | Type | Constraints |
|-------|------|-------------|
| `asset_id` | string | 1–64 chars, pattern `^[a-zA-Z0-9_-]+$` |
| `location` | object | Must contain `latitude`, `longitude`, `timezone` |
| `capacity_kw` | number | min: 0 |
| `oem` | string | — |

### Location Object

| Field | Type | Description |
|-------|------|-------------|
| `latitude` | number | -90 to 90 |
| `longitude` | number | -180 to 180 |
| `timezone` | string | IANA timezone (e.g., `Africa/Johannesburg`) |
| `country_code` | string | ISO 3166-1 alpha-2 (e.g., `ZA`) |
| `municipality_id` | string | Pattern `za.province.municipality` |
| `voltage_level` | string (enum) | `LV`, `MV`, `HV`, `EHV` |
| `connection_point_id` | string | Canonical connection point identifier |
| `connection_status` | string (enum) | `applied`, `pre_feasibility`, `reserved`, `allocated`, `connected`, `decommissioned` |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `capacity_kwh` | number | Nameplate energy storage capacity |
| `model` | string | Equipment model identifier |
| `serial_number` | string | Manufacturer serial number |
| `commissioning_date` | date | ISO 8601 commissioning date |
| `ppa_id` | string | Associated power purchase agreement |
| `asset_type` | string (enum) | `solar_pv`, `wind_turbine`, `battery_storage`, `grid_meter`, `ev_charger`, `hvac_system`, `generator`, `chp`, `fuel_cell`, `other` |
| `building` | object | ComStock/ResStock building metadata (type, climate zone, vintage, floor area) |

## equipment-register.json

Defines the equipment hierarchy and technical attributes for a single piece of site equipment, sourced from ERP/EAM systems.

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `equipment_id` | string | Canonical ODS-E equipment identifier |
| `site_id` | string | Site where equipment is installed |
| `equipment_type` | string (enum) | `site`, `array`, `inverter`, `combiner`, `string`, `module`, `transformer`, `tracker`, `meter` |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `equipment_subtype` | string | Vendor-specific subtype |
| `parent_equipment_id` | string | Parent in hierarchy (for cascade risk traversal) |
| `source_equipment_id` | string | Native ID in originating ERP/SCADA system |
| `manufacturer` | string | Equipment manufacturer name |
| `model` | string | Equipment model identifier |
| `serial_number` | string | Manufacturer serial number |
| `install_date` | date | Installation date (ISO 8601) |
| `warranty_expiry` | date | Warranty expiration date (ISO 8601) |
| `design_capacity_kw` | number (min: 0) | Design or nameplate capacity in kW |
| `cost_center` | string | Financial reporting unit |

## Error Taxonomy

The `error_type` field uses a standardized 7-category taxonomy that replaces OEM-specific error codes. Every energy-timeseries record must classify its state into one of these categories:

| Category | Description | Example |
|----------|-------------|---------|
| `normal` | Equipment operating normally | Inverter running, producing expected power |
| `warning` | Degraded but functional | Grid over-voltage, temperature limited, power limited |
| `critical` | Severe condition requiring attention | DC arc fault, grid relay fault, emergency stop |
| `fault` | Equipment fault | Residual current fault, grid lost |
| `offline` | No data received from the asset | Communication failure, device powered off |
| `standby` | Asset idle or initializing | Nighttime, insulation detection, grid detection |
| `unknown` | Unclassified state | OEM code not in transform mapping |

OEM-specific error codes are preserved in the `error_code` field. The transform specs map each OEM's numeric or string error codes to these 7 categories — see [Transform Specifications](/odse/transforms) for examples.

## Additional Schemas

ODS-E includes 5 additional schemas beyond the three covered above:

| Schema | Purpose |
|--------|---------|
| `equipment-id-map.json` | Source-to-canonical equipment ID mapping |
| `maintenance-history.json` | Work order and maintenance records |
| `spare-parts.json` | Spare parts inventory tracking |
| `failure-taxonomy.json` | Standardized failure classification |
| `procurement-context.json` | Procurement and supplier context |
| `regulatory-event.json` | Regulatory event normalization |
| `alarm-frequency-profile.json` | Alarm frequency and escalation patterns |

## Related Pages

- [ODS-E Overview](/odse/overview)
- [Transform Specifications](/odse/transforms) — how OEM error codes map to the taxonomy
- [Validation Guide](/odse/validation) — validating records against these schemas
- Full schemas: [github.com/AsobaCloud/odse/tree/main/schemas](https://github.com/AsobaCloud/odse/tree/main/schemas)
