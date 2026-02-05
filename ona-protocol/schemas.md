# Schema Reference

Complete specifications for ODS-E JSON schemas.

## Production Timeseries Schema

The core schema for energy production readings.

### Full Schema Definition

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://ona-protocol.org/schemas/v1/production-timeseries.json",
  "title": "ODS-E Production Timeseries",
  "description": "Standardized energy production reading",
  "type": "object",
  "required": ["timestamp", "kWh", "error_type"],
  "properties": {
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp with timezone"
    },
    "kWh": {
      "type": "number",
      "minimum": 0,
      "description": "Active energy in kilowatt-hours"
    },
    "error_type": {
      "type": "string",
      "enum": ["normal", "warning", "critical", "fault", "offline", "standby", "unknown"],
      "description": "Standardized error classification"
    },
    "error_code": {
      "type": "string",
      "description": "Original OEM error code"
    },
    "kVArh": {
      "type": "number",
      "description": "Reactive energy in kilovolt-ampere reactive hours"
    },
    "kVA": {
      "type": "number",
      "minimum": 0,
      "description": "Apparent power in kilovolt-amperes"
    },
    "PF": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "Power factor"
    }
  },
  "additionalProperties": false
}
```

### Field Details

#### timestamp (required)

ISO 8601 format with timezone specification.

```json
// Valid
"2026-02-05T14:00:00Z"
"2026-02-05T16:00:00+02:00"
"2026-02-05T14:00:00.000Z"

// Invalid
"2026-02-05 14:00:00"      // Missing timezone
"02/05/2026 2:00 PM"       // Wrong format
"1707145200"               // Unix timestamp
```

**Implementation note**: Always store and transmit in UTC. Convert to local time only for display.

#### kWh (required)

Active energy reading for the interval.

- **Type**: number
- **Minimum**: 0
- **Precision**: Recommended 3 decimal places

```json
// Valid
847.5
0
1234.567

// Invalid
-50.0       // Negative not allowed
"847.5"     // String not allowed
```

**Implementation note**: For cumulative meters, calculate interval delta before validation.

#### error_type (required)

Standardized error classification. Maps OEM-specific codes to seven categories.

| Value | Description | When to Use |
|-------|-------------|-------------|
| `normal` | Operating within parameters | No errors, production expected |
| `warning` | Degraded but operational | Minor issues, reduced output |
| `critical` | Requires immediate attention | Significant issues, may affect safety |
| `fault` | Equipment failure | Hardware failure, protection triggered |
| `offline` | No communication | Inverter unreachable, network issue |
| `standby` | Intentionally idle | Nighttime, maintenance mode |
| `unknown` | Cannot classify | New error codes, parsing failures |

#### error_code (optional)

Preserves the original OEM error code for reference and debugging.

```json
{
  "error_type": "warning",
  "error_code": "513"       // Huawei: Grid over-voltage
}
```

#### kVArh (optional)

Reactive energy in kilovolt-ampere reactive hours.

```json
{
  "kWh": 847.5,
  "kVArh": 102.3
}
```

#### kVA (optional)

Apparent power in kilovolt-amperes.

#### PF (optional)

Power factor, bounded 0-1.

```json
{
  "PF": 0.98    // Valid
  "PF": 1.02    // Invalid: exceeds maximum
}
```

---

## Asset Metadata Schema

Describes the physical asset and its configuration.

### Full Schema Definition

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://ona-protocol.org/schemas/v1/asset-metadata.json",
  "title": "ODS-E Asset Metadata",
  "description": "Energy asset configuration and location",
  "type": "object",
  "required": ["asset_id", "location", "capacity_kw", "oem"],
  "properties": {
    "asset_id": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_-]+$",
      "minLength": 1,
      "maxLength": 64,
      "description": "Unique identifier for the asset"
    },
    "location": {
      "type": "object",
      "required": ["latitude", "longitude", "timezone"],
      "properties": {
        "latitude": {
          "type": "number",
          "minimum": -90,
          "maximum": 90
        },
        "longitude": {
          "type": "number",
          "minimum": -180,
          "maximum": 180
        },
        "timezone": {
          "type": "string",
          "description": "IANA timezone identifier"
        },
        "region": {
          "type": "string",
          "description": "Administrative region"
        },
        "grid_connection_point": {
          "type": "string",
          "description": "Grid connection identifier"
        }
      }
    },
    "capacity_kw": {
      "type": "number",
      "minimum": 0,
      "description": "Nameplate capacity in kilowatts"
    },
    "oem": {
      "type": "string",
      "description": "Original equipment manufacturer"
    },
    "model": {
      "type": "string",
      "description": "Equipment model identifier"
    },
    "serial_number": {
      "type": "string",
      "description": "Manufacturer serial number"
    },
    "commissioning_date": {
      "type": "string",
      "format": "date",
      "description": "ISO 8601 date of commissioning"
    },
    "ppa_id": {
      "type": "string",
      "description": "Associated power purchase agreement"
    }
  }
}
```

### Field Details

#### asset_id (required)

Unique identifier within your system.

```json
// Valid
"site-001-inv-a"
"gauteng_pv_farm_12"
"INV_2024_0847"

// Invalid
"site 001"          // Spaces not allowed
""                  // Empty not allowed
"a".repeat(100)     // Exceeds 64 characters
```

#### location (required)

Geographic and administrative location.

```json
{
  "location": {
    "latitude": -26.2041,
    "longitude": 28.0473,
    "timezone": "Africa/Johannesburg",
    "region": "Gauteng",
    "grid_connection_point": "ESKOM-GP-12345"
  }
}
```

**timezone**: Must be valid IANA timezone (e.g., `Africa/Johannesburg`, not `SAST` or `UTC+2`).

#### capacity_kw (required)

Nameplate DC capacity in kilowatts.

```json
{
  "capacity_kw": 500.0
}
```

#### oem (required)

Equipment manufacturer name.

```json
// Standardized OEM names
"Huawei"
"Enphase"
"Solarman"
"SMA"
"Fronius"
```

---

## Error Taxonomy Schema

Defines the mapping from OEM error codes to standardized categories.

### Schema Definition

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://ona-protocol.org/schemas/v1/error-taxonomy.json",
  "title": "ODS-E Error Taxonomy",
  "type": "object",
  "required": ["oem", "version", "mappings"],
  "properties": {
    "oem": {
      "type": "string"
    },
    "version": {
      "type": "string"
    },
    "mappings": {
      "type": "object",
      "properties": {
        "normal": {
          "type": "array",
          "items": { "type": ["integer", "string"] }
        },
        "warning": {
          "type": "array",
          "items": { "type": ["integer", "string"] }
        },
        "critical": {
          "type": "array",
          "items": { "type": ["integer", "string"] }
        },
        "fault": {
          "type": "array",
          "items": { "type": ["integer", "string"] }
        },
        "offline": {
          "type": "array",
          "items": { "type": ["integer", "string"] }
        },
        "standby": {
          "type": "array",
          "items": { "type": ["integer", "string"] }
        }
      }
    },
    "default": {
      "type": "string",
      "enum": ["unknown"],
      "description": "Category for unmapped codes"
    }
  }
}
```

### Example: Huawei Error Mapping

```json
{
  "oem": "Huawei",
  "version": "1.0",
  "mappings": {
    "normal": [0, 1, 2, 3, 256, 512, 1025, 1026, 1280, 1281, 1536, 1792, 2048, 2304, 40960, 49152],
    "warning": [513, 514, 772, 773, 774],
    "critical": [768, 770, 771, 45056],
    "fault": [769, 1024],
    "offline": [],
    "standby": []
  },
  "default": "unknown"
}
```

---

## Carbon Extension Schema (Draft)

Extension for carbon tracking attributes.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://ona-protocol.org/schemas/v1/carbon-extension.json",
  "title": "ODS-E Carbon Extension",
  "description": "Carbon tracking attributes for production data",
  "type": "object",
  "properties": {
    "grid_emission_factor": {
      "type": "number",
      "minimum": 0,
      "description": "Grid carbon intensity in kgCO2e/kWh"
    },
    "avoided_emissions": {
      "type": "number",
      "minimum": 0,
      "description": "Calculated avoided emissions in kgCO2e"
    },
    "certificate_eligible": {
      "type": "boolean",
      "description": "Eligible for I-REC or similar certificate"
    },
    "scope": {
      "type": "string",
      "enum": ["scope1", "scope2_location", "scope2_market", "scope3"]
    }
  }
}
```

### Usage

Combine with production timeseries:

```json
{
  "timestamp": "2026-02-05T14:00:00Z",
  "kWh": 847.5,
  "error_type": "normal",
  "grid_emission_factor": 0.92,
  "avoided_emissions": 779.7,
  "certificate_eligible": true,
  "scope": "scope2_location"
}
```

---

## Validation

### Using the Validator

```python
from ods_e import validate_production, validate_asset

# Validate single record
result = validate_production({
    "timestamp": "2026-02-05T14:00:00Z",
    "kWh": 847.5,
    "error_type": "normal"
})

if not result.is_valid:
    for error in result.errors:
        print(f"{error.path}: {error.message}")

# Validate asset metadata
asset_result = validate_asset({
    "asset_id": "site-001",
    "location": {
        "latitude": -26.2041,
        "longitude": 28.0473,
        "timezone": "Africa/Johannesburg"
    },
    "capacity_kw": 500,
    "oem": "Huawei"
})
```

### CLI Validation

```bash
# Validate JSON file
ods-e validate production_data.json

# Validate with verbose output
ods-e validate --verbose production_data.json

# Validate asset metadata
ods-e validate --schema asset asset_metadata.json
```
