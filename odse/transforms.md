---
title: "Transform Specifications"
layout: default
nav_order: 4
parent: "ODS-E & Architecture"
---

# Transform Specifications

ODS-E transforms are declarative YAML specifications that map vendor-specific data to the canonical ODS-E energy-timeseries format. Each spec defines input column aliases, output field mappings, error code mappings, and physical validation bounds. The Python runtime reads these specs and applies them to raw data files.

## Supported OEMs

20 vendor transforms are included, covering solar PV, wind, BESS, utility metering, and industrial systems:

| Asset Type | Vendor | Source Key | Transform File |
|------------|--------|------------|----------------|
| Solar PV | Huawei FusionSolar | `huawei-fusionsolar` | `huawei-fusionsolar.yaml` |
| Solar PV | Enphase Envoy | `enphase-envoy` | `enphase-envoy.yaml` |
| Solar PV | Fronius Solar API | `fronius-solar-api` | `fronius-solar-api.yaml` |
| Solar PV | SMA Monitoring | `sma-monitoring-api` | `sma-monitoring-api.yaml` |
| Solar PV | SolarEdge Monitoring | `solaredge-monitoring` | `solaredge-monitoring.yaml` |
| Solar PV | Solarman Logger | `solarman-logger` | `solarman-logger.yaml` |
| Solar PV | SolaX Cloud API v2 | `solaxcloud-api-v2` | `solaxcloud-api-v2.yaml` |
| Solar PV | Solis Cloud API | `soliscloud-api` | `soliscloud-api.yaml` |
| Solar PV | Sungrow iSolarCloud | `sungrow-isolarcloud-api` | `sungrow-isolarcloud-api.yaml` |
| Solar PV | FIMER AuroraVision | `fimer-auroravision-api` | `fimer-auroravision-api.yaml` |
| BESS | Sungrow PowerTitan | `sungrow_bess` | `sungrow-powertitan.yaml` |
| BESS | BYD BatteryBox | `byd_bess` | `byd-bess.yaml` |
| Wind | Vestas Online | `vestas` | `vestas-online.yaml` |
| Wind | Nordex Control | `nordex` | `nordex-control.yaml` |
| Wind | Siemens Gamesa | `siemens_gamesa` | `siemens-gamesa-diagnostic.yaml` |
| Meter | Switch Meter | `switch-meter` | `switch-meter.yaml` |
| Industrial | Higeco API | `higeco-api` | `higeco-api.yaml` |
| Industrial | Terraco Historian | `terraco-historian` | `terraco-historian.yaml` |
| Utility | Eskom AMR | `eskom-amr` | `eskom-amr.yaml` |
| Regulatory | Regulatory Events | `regulatory-events` | `regulatory-events-unified.yaml` |

## Transform Spec Structure

Each YAML spec contains four sections: `transform` (metadata), `input_schema` (column definitions), `output_mapping` (field transformations), and `error_code_mapping` (OEM-to-ODS-E error classification).

### Example: Huawei FusionSolar

```yaml
transform:
  name: huawei-fusionsolar
  version: "1.0"
  oem: Huawei
  description: Transform Huawei FusionSolar CSV exports to ODS-E format

input_schema:
  format: csv
  encoding: utf-8
  columns:
    - name: timestamp
      aliases: ["Time", "Timestamp", "time"]
      type: datetime
      required: true
    - name: power
      aliases: ["Active Power(kW)", "Power", "power_kw"]
      type: float
      required: true
    - name: inverter_state
      aliases: ["Inverter State", "State", "status"]
      type: integer
      required: true

output_mapping:
  timestamp:
    source: input.timestamp
    transform: to_iso8601
  kWh:
    source: input.power
    transform: multiply
    factor: interval_hours
  error_type:
    function: map_error_code
    inputs: [input.inverter_state, input.run_state]
  error_code:
    source: input.inverter_state
    transform: to_string

error_code_mapping:
  normal:
    - 0      # Standby: initializing
    - 512    # Running
    - 1025   # Running: power limited
  warning:
    - 513    # Running: grid over-voltage
    - 773    # Running: temperature limited
  critical:
    - 768    # Shutdown: high string voltage
    - 770    # Shutdown: DC arc fault
    - 45056  # Emergency stop
  fault:
    - 769    # Shutdown: residual current fault
    - 1024   # Shutdown: grid lost
  offline:
    condition: "no_data_received"
  standby:
    condition: "input.power == 0 AND is_nighttime(timestamp, location)"

validation:
  physical_bounds:
    kWh:
      min: 0
      max_formula: "capacity_kw * interval_hours * 1.1"
  temporal:
    expected_interval: "5min"
    max_gap: "4h"
```

Key elements:

- **`input_schema.columns`** — each column has a canonical `name`, a list of `aliases` (different OEM export variants), a `type`, and a `required` flag. The runtime matches incoming CSV headers against aliases.
- **`output_mapping`** — maps input columns to ODS-E fields. Supports transforms like `to_iso8601`, `multiply`, `to_string`, and functions like `map_error_code`.
- **`error_code_mapping`** — lists of OEM numeric codes mapped to the 7 ODS-E error categories. Conditions can also be defined (e.g., `no_data_received` → `offline`).
- **`validation`** — physical bounds (kWh must not exceed capacity × interval × 1.1) and temporal checks (expected 5-minute intervals, max 4-hour gap).

## Using the Python Runtime

### Transform vendor data

Use the `transform()` function with a named source:

```python
from pathlib import Path
from odse import transform, validate_batch, to_json, to_parquet

# Transform Huawei CSV to ODS-E records
records = transform(
    Path("examples/fixtures/huawei_sample.csv"),
    source="huawei",
    asset_id="SITE-HW-001",
)

print(f"Transformed records: {len(records)}")
# Transformed records: 100
```

### Transform generic CSV

For vendors without a dedicated transform spec, use `generic_csv` with a column mapping:

```python
records = transform(
    Path("data/scada_export.csv"),
    source="generic_csv",
    column_map={
        "timestamp": "Timestamp",
        "kWh": "Energy_kWh",
        "asset_id": "Asset",
    },
)
```

### Validate and persist

```python
# Validate all transformed records
result = validate_batch(records, level="schema")
print(result.summary)
# 100/100 valid, 0 errors

# Write to newline-delimited JSON
to_json(records, "output/transformed.jsonl")

# Write to partitioned Parquet
to_parquet(records, "output/parquet/", partition_by=["asset_id", "year", "month", "day"])
```

## CLI Usage

```bash
# Transform a vendor CSV
odse transform --source huawei \
  --input data/huawei_export.csv \
  --asset-id SITE-HW-001 \
  --output output/huawei.cleaned.json

# Transform generic CSV with column mapping
odse transform --source generic_csv \
  --input data/scada.csv \
  --column-map timestamp=Timestamp,kWh=ActiveEnergy,asset_id=Asset \
  --output output/scada.cleaned.json

# Output as Parquet instead of JSON
odse transform --source generic_csv \
  --input data/scada.csv \
  --column-map timestamp=Timestamp,kWh=ActiveEnergy,asset_id=Asset \
  --format parquet \
  --output output/scada.parquet
```

## Adding a Custom Transform

To support a new OEM, create a YAML spec following the structure above and place it in the `transforms/` directory. The spec must define:

1. **Input columns** with aliases matching the OEM's export format
2. **Output mappings** to ODS-E fields (at minimum: `timestamp`, `kWh`, `error_type`)
3. **Error code mapping** translating OEM status codes to the 7 ODS-E categories
4. **Validation bounds** appropriate for the asset type

See the [Huawei FusionSolar spec](https://github.com/AsobaCloud/odse/blob/main/transforms/huawei-fusionsolar.yaml) as a reference template.

## Related Pages

- [ODS-E Overview](/odse/overview) — components and quick start
- [Schema Reference](/odse/schemas) — ODS-E field definitions
- [Validation Guide](/odse/validation) — validating transformed records
- All transform specs: [github.com/AsobaCloud/odse/tree/main/transforms](https://github.com/AsobaCloud/odse/tree/main/transforms)
