---
title: "Python vs JavaScript"
layout: default
nav_order: 2
parent: "Code Examples"
---

# Python vs JavaScript

The Ona Intelligence Layer SDK provides first-class support for both Python and JavaScript. While the two SDKs expose the same underlying APIs, there are idiomatic differences in how you initialize the client, structure requests, and consume streaming data.

This page provides side-by-side comparisons for the most common operations. All examples are drawn from the SDK's example files:

- Python: [`inverter_telemetry_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/inverter_telemetry_example.py), [`ooda_terminal_example.py`](https://github.com/AsobaCloud/sdk/blob/main/python/examples/ooda_terminal_example.py)
- JavaScript: [`inverter-telemetry-example.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/inverter-telemetry-example.js), [`ooda-terminal-example.js`](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/ooda-terminal-example.js)

## SDK Initialization

### Python

```python
from ona_platform import OnaClient

# Reads endpoint URLs and API keys from environment variables
client = OnaClient()

# Access a service
it = client.inverter_telemetry
```

### JavaScript

```javascript
const { OnaSDK } = require('../src/index');

// Explicitly pass endpoints and API keys
const sdk = new OnaSDK({
  endpoints: {
    inverterTelemetry: process.env.INVERTER_TELEMETRY_ENDPOINT,
  },
  inverterTelemetryApiKey: process.env.INVERTER_TELEMETRY_API_KEY,
});

// Access a service
const it = sdk.inverterTelemetry;
```

**Key differences:**

| Aspect | Python | JavaScript |
|--------|--------|------------|
| Class name | `OnaClient` | `OnaSDK` |
| Config | Auto-reads from environment variables | Explicitly passed in constructor options |
| Service access | `client.inverter_telemetry` (snake_case) | `sdk.inverterTelemetry` (camelCase) |

## Querying Historical Telemetry

### Python

```python
from ona_platform.models.telemetry import TimeRange

records = it.get_inverter_telemetry(
    asset_id=asset_id,
    site_id=site_id,
    time_range=TimeRange(
        start=data_start,
        end="2025-11-01T06:00:00",
    ),
    resolution="5min",
    limit=10,
)

for r in records:
    print(f"  {r.timestamp}  power={r.power} kW")
```

### JavaScript

```javascript
const records = await it.getInverterTelemetry({
  asset_id: assetId,
  site_id: siteId,
  time_range: { start: dataStart, end: '2025-11-01T06:00:00' },
  resolution: '5min',
  limit: 10,
});

records.forEach(r =>
  console.log(`  ${r.timestamp}  power=${r.power} kW`)
);
```

**Key differences:**

| Aspect | Python | JavaScript |
|--------|--------|------------|
| Method name | `get_inverter_telemetry` (snake_case) | `getInverterTelemetry` (camelCase) |
| Arguments | Keyword arguments | Single options object |
| Time range | `TimeRange(start=..., end=...)` typed object | Plain `{ start, end }` object |
| Return type | Synchronous list of dataclass instances | Promise resolving to array of plain objects |
| Iteration | `for r in records` | `records.forEach(...)` or `for...of` |

## Streaming Live Data

### Python

```python
for count, record in enumerate(
    it.stream_inverter(
        asset_id=asset_id,
        site_id=site_id,
        polling_interval=30,
    )
):
    print(f"  [{count + 1}] {record.timestamp}  power={record.power} kW")
    if count >= 2:
        break  # save record.cursor here to resume later
```

### JavaScript

```javascript
let count = 0;
for await (const record of it.streamInverter({
  asset_id: assetId,
  site_id: siteId,
  polling_interval: 30,
})) {
  console.log(`  [${count + 1}] ${record.timestamp}  power=${record.power} kW`);
  count++;
  if (count >= 3) break; // save record.cursor here to resume later
}
```

**Key differences:**

| Aspect | Python | JavaScript |
|--------|--------|------------|
| Method name | `stream_inverter` (snake_case) | `streamInverter` (camelCase) |
| Iterator protocol | `for ... in` over a generator | `for await ... of` over an async iterator |
| Blocking | Synchronous generator (blocks thread) | Async iterator (non-blocking, `await` required) |
| Arguments | Keyword arguments | Single options object |
| Early termination | `break` | `break` (same) |

## Querying OODA Alerts

### Python

```python
from ona_platform.models.ooda import TimeRange
from datetime import datetime, timedelta

end_time = datetime.now()
start_time = end_time - timedelta(hours=24)

time_range = TimeRange(
    start=start_time.isoformat(),
    end=end_time.isoformat()
)

alerts = client.ooda_terminal.get_terminal_alerts(
    terminal_device_id=terminal_device_id,
    site_id=site_id,
    time_range=time_range,
    resolution="5min",
    limit=10,
)

for alert in alerts[:3]:
    print(f"  {alert.timestamp}: {alert.alert_severity.upper()} - {alert.message}")
```

### JavaScript

```javascript
const endTime = new Date();
const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

const timeRange = {
  start: startTime.toISOString(),
  end: endTime.toISOString()
};

const alerts = await sdk.oodaTerminal.getTerminalAlerts({
  terminal_device_id: terminalDeviceId,
  site_id: siteId,
  time_range: timeRange,
  resolution: '5min',
  limit: 10
});

alerts.slice(0, 3).forEach(alert => {
  console.log(`  ${alert.timestamp}: ${alert.alert_severity.toUpperCase()} - ${alert.message}`);
});
```

**Key differences:**

| Aspect | Python | JavaScript |
|--------|--------|------------|
| Date math | `datetime` + `timedelta(hours=24)` | `new Date()` with millisecond subtraction |
| Service access | `client.ooda_terminal` (snake_case) | `sdk.oodaTerminal` (camelCase) |
| Time range | `TimeRange` typed object from `ona_platform.models.ooda` | Plain `{ start, end }` object |
| Slicing | `alerts[:3]` (Python slice syntax) | `alerts.slice(0, 3)` (method call) |
| Async | Synchronous call | `await` required |

## Error Handling

### Python

```python
from ona_platform.exceptions import AuthenticationError, ValidationError
from ona_platform.services.inverter_telemetry import RateLimitError

try:
    records = it.get_inverter_telemetry(...)
except ValidationError as e:
    print(f"Validation error: {e}")
except AuthenticationError as e:
    print(f"Auth error: {e}")
except RateLimitError as e:
    print(f"Rate limit exceeded: {e}")
```

### JavaScript

```javascript
const { AuthenticationError, ValidationError } = require('../src/index');
const { RateLimitError } = require('../src/services/InverterTelemetryClient');

try {
  const records = await it.getInverterTelemetry({...});
} catch (err) {
  if (err instanceof AuthenticationError) {
    console.error('Auth error:', err.message);
  } else if (err instanceof ValidationError) {
    console.error('Validation error:', err.message);
  } else if (err instanceof RateLimitError) {
    console.error('Rate limit exceeded:', err.message);
  } else {
    throw err; // re-throw unknown errors
  }
}
```

**Key differences:**

| Aspect | Python | JavaScript |
|--------|--------|------------|
| Exception type | `Exception` subclasses | `Error` subclasses (instanceof checks) |
| Error message | `str(e)` or `f"{e}"` | `err.message` |
| Exception imports | From `ona_platform.exceptions` | From SDK root or service module |
| Re-throwing | Not needed (no catch-all) | `throw err` for unhandled cases |
| Catch-all | Last `except Exception` | Final `else { throw err }` branch |

## Summary of Idiomatic Differences

| Concept | Python | JavaScript |
|---------|--------|------------|
| **Naming** | `snake_case` for methods and properties | `camelCase` for methods and properties |
| **Arguments** | Keyword arguments (`asset_id=...`) | Options object (`{ asset_id: ... }`) |
| **Time ranges** | Typed `TimeRange` objects | Plain `{ start, end }` objects |
| **Async model** | Synchronous generators | Async iterators (`for await`) |
| **Date handling** | `datetime` / `timedelta` | `Date` with millisecond math |
| **Error handling** | `except` blocks with typed exceptions | `catch` with `instanceof` checks |
| **List operations** | Slice syntax `[:3]` | `.slice(0, 3)` |
| **Client class** | `OnaClient` (env-based config) | `OnaSDK` (explicit config object) |

Both SDKs expose identical functionality — the same endpoints, the same data models, and the same streaming protocols. Choose the one that matches your runtime environment: Python for data science and backend services, JavaScript for Node.js applications and edge deployment.

For the full list of runnable examples, see [Code Examples](/examples/overview). For the multi-service capstone walkthrough, see [Complete Workflow](/examples/complete-workflow).
