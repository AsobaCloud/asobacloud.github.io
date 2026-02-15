---
layout: default
title: "Transform Specifications"
parent: "Ona Protocol (ODS-E)"
nav_order: 4
---

# Transform Specifications

ODS-E transforms convert OEM-specific data formats into the standardized schema. This guide covers using existing transforms and creating new ones.

## Using Transforms

### Python API

```python
from odse import transform

# Transform Huawei FusionSolar export
ods_data = transform(
    "fusionsolar_export.csv",
    source="huawei",
    asset_id="site-001"
)

# Transform with explicit timezone
ods_data = transform(
    "enphase_data.json",
    source="enphase",
    timezone="Africa/Johannesburg"
)

# Batch transform
for record in transform_stream("large_export.csv", source="solarman"):
    process(record)
```

### CLI

```bash
# Basic transform
odse transform --source huawei input.csv -o output.json

# With asset ID
odse transform --source huawei --asset-id site-001 input.csv

# Stream to stdout
odse transform --source enphase input.json | jq '.[] | select(.error_type != "normal")'
```

---

## Included Transforms

### Huawei FusionSolar

**Source format**: CSV export from FusionSolar portal

**Expected columns**:
- `timestamp` or `Time` - Datetime
- `power` or `Active Power(kW)` - Float
- `inverter_state` or `Inverter State` - Integer
- `run_state` or `Running State` - Integer (optional)

**Transform specification**:

```yaml
# transforms/huawei-fusionsolar.yaml
transform:
  name: huawei-fusionsolar
  version: "1.0"
  oem: Huawei

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
    - name: run_state
      aliases: ["Running State", "Run State"]
      type: integer
      required: false
      default: 1

output_mapping:
  timestamp:
    source: input.timestamp
    transform: to_iso8601
  kWh:
    source: input.power
    transform: multiply
    factor: interval_hours  # Calculated from data
  error_type:
    function: map_error_code
    inputs: [input.inverter_state, input.run_state]
  error_code:
    source: input.inverter_state
    transform: to_string

error_code_mapping:
  normal:
    - 0      # Standby: initializing
    - 1      # Standby: detecting insulation
    - 2      # Standby: detecting irradiation
    - 3      # Standby: grid detecting
    - 256    # Starting
    - 512    # Running
    - 1025   # Running: power limited
    - 1026   # Running: self-derating
    - 1280   # Shutdown: fault
    - 1281   # Shutdown: command
    - 1536   # Grid dispatch
    - 1792   # Running: cos phi-P curve
    - 2048   # Running: Q-U curve
    - 2304   # Running: PF-U curve
    - 40960  # Running: power limited (grid)
    - 49152  # Running
  warning:
    - 513    # Running: grid over-voltage
    - 514    # Running: grid under-voltage
    - 772    # Running: frequency limited
    - 773    # Running: temperature limited
    - 774    # Running: power limited
  critical:
    - 768    # Shutdown: high string voltage
    - 770    # Shutdown: DC arc fault
    - 771    # Shutdown: grid relay fault
    - 45056  # Emergency stop
  fault:
    - 769    # Shutdown: residual current fault
    - 1024   # Shutdown: grid lost
  offline:
    condition: "no_data_received"
  standby:
    condition: "input.power == 0 AND is_nighttime(timestamp, location)"
```

### Enphase Envoy

**Source format**: JSON from Envoy API or export

```yaml
# transforms/enphase-envoy.yaml
transform:
  name: enphase-envoy
  version: "1.0"
  oem: Enphase

input_schema:
  format: json
  structure: array
  fields:
    - name: end_at
      type: unix_timestamp
      required: true
    - name: wh_del
      type: integer
      required: true
    - name: devices_reporting
      type: integer
      required: false

output_mapping:
  timestamp:
    source: input.end_at
    transform: unix_to_iso8601
  kWh:
    source: input.wh_del
    transform: divide
    divisor: 1000  # Wh to kWh
  error_type:
    function: derive_status
    inputs: [input.devices_reporting, expected_devices]
  error_code:
    value: null  # Enphase doesn't provide error codes

status_derivation:
  normal:
    condition: "input.devices_reporting >= expected_devices * 0.95"
  warning:
    condition: "input.devices_reporting >= expected_devices * 0.80"
  critical:
    condition: "input.devices_reporting > 0"
  offline:
    condition: "input.devices_reporting == 0"
```

### Solarman Logger

**Source format**: CSV from Solarman platform

```yaml
# transforms/solarman-logger.yaml
transform:
  name: solarman-logger
  version: "1.0"
  oem: Solarman

input_schema:
  format: csv
  encoding: utf-8
  datetime_format: "%Y-%m-%d %H:%M:%S"
  columns:
    - name: update_time
      type: datetime
      required: true
    - name: generation
      type: float
      required: true
    - name: device_state
      type: string
      required: false

output_mapping:
  timestamp:
    source: input.update_time
    transform: to_iso8601
    timezone: input  # Use timezone from data if present
  kWh:
    source: input.generation
    transform: delta  # Cumulative to interval
  error_type:
    function: map_device_state
    input: input.device_state

device_state_mapping:
  normal: ["Normal", "Operating", "1"]
  warning: ["Warning", "Degraded"]
  fault: ["Fault", "Error"]
  offline: ["Offline", "Disconnected", "0"]
  standby: ["Standby", "Idle"]
```

---

## Creating Custom Transforms

### Transform Structure

```yaml
transform:
  name: your-oem-name
  version: "1.0"
  oem: "Your OEM"
  author: "Your Name"
  description: "Transform for Your OEM data format"

input_schema:
  format: csv | json | xml
  encoding: utf-8
  # Format-specific options...

output_mapping:
  # Field mappings...

error_code_mapping:
  # Error classifications...

validation:
  # Optional validation rules...
```

### Input Schema Options

#### CSV Format

```yaml
input_schema:
  format: csv
  encoding: utf-8
  delimiter: ","
  skip_rows: 0
  datetime_format: "%Y-%m-%d %H:%M:%S"
  columns:
    - name: internal_name
      aliases: ["Column Header", "Alt Header"]
      type: datetime | float | integer | string
      required: true | false
      default: null
```

#### JSON Format

```yaml
input_schema:
  format: json
  structure: array | object
  root_path: "$.data.readings"  # JSONPath to data
  fields:
    - name: field_name
      path: "$.nested.field"
      type: datetime | float | integer | string
```

### Output Mapping

#### Direct Mapping

```yaml
output_mapping:
  error_code:
    source: input.status_code
    transform: to_string
```

#### With Transformation

```yaml
output_mapping:
  kWh:
    source: input.wh
    transform: divide
    divisor: 1000

  timestamp:
    source: input.unix_time
    transform: unix_to_iso8601
    timezone: "Africa/Johannesburg"
```

#### Calculated Fields

```yaml
output_mapping:
  kWh:
    source: input.power_kw
    transform: multiply
    factor: interval_hours  # Auto-calculated from data

  error_type:
    function: map_error_code
    inputs: [input.state, input.fault_code]
```

### Error Code Mapping

#### Static Mapping

```yaml
error_code_mapping:
  normal: [0, 1, 2, 100, 101]
  warning: [200, 201, 202]
  critical: [300, 301]
  fault: [400, 401, 500]
```

#### Conditional Mapping

```yaml
error_code_mapping:
  normal:
    - 0
    - 1
    - condition: "input.state == 'OK' AND input.power > 0"
  warning:
    - 200
    - range: [201, 299]
  standby:
    condition: "input.power == 0 AND is_nighttime(timestamp, location)"
  offline:
    condition: "no_data_received OR input.state == 'OFFLINE'"
```

### Validation Rules

```yaml
validation:
  physical_bounds:
    kWh:
      min: 0
      max: "capacity_kw * interval_hours * 1.1"  # 110% of max
    PF:
      min: 0
      max: 1

  temporal:
    monotonic: true
    max_gap: "4h"

  completeness:
    required_fields: ["timestamp", "kWh", "error_type"]
```

---

## Testing Transforms

### Unit Testing

```python
from odse.transforms import load_transform, test_transform

# Load your transform
transform = load_transform("my-oem.yaml")

# Test with sample data
sample_input = """
timestamp,power,state
2026-02-05 14:00:00,100.5,1
2026-02-05 15:00:00,95.2,1
2026-02-05 16:00:00,0,0
"""

results = test_transform(transform, sample_input)

# Assertions
assert results[0]["kWh"] == 100.5
assert results[0]["error_type"] == "normal"
assert results[2]["error_type"] == "standby"
```

### CLI Testing

```bash
# Validate transform syntax
odse transform --validate my-oem.yaml

# Test with sample file
odse transform --source my-oem sample.csv --dry-run

# Compare output
odse transform --source my-oem sample.csv | \
  diff - expected_output.json
```

---

## Contributing Transforms

### Submission Requirements

1. **Transform YAML** with complete specification
2. **Sample input file** (anonymized)
3. **Expected output file**
4. **Test cases** covering edge cases
5. **Documentation** of OEM-specific quirks

### Process

1. Fork `github.com/AsobaCloud/odse`
2. Add transform to `transforms/` directory
3. Add tests to `tests/transforms/`
4. Submit pull request with:
   - OEM name and data source
   - Sample data (anonymized)
   - Any known limitations

### Naming Convention

```
transforms/
├── huawei-fusionsolar.yaml
├── huawei-smartpvms.yaml      # Different Huawei product
├── enphase-envoy.yaml
├── enphase-enlighten-api.yaml # Different Enphase source
└── your-oem-product.yaml
```
