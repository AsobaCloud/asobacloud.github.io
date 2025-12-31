# Terminal API: Fault Detection

Run fault detection on your assets to identify anomalies and potential issues. This endpoint triggers the Observe stage of the OODA loop.

## Endpoint

```
POST https://api.asoba.co/terminal/detect
```

## Request Body

```json
{
  "action": "run",
  "asset_id": "INV-001"
}
```

Or to list detection results:

```json
{
  "action": "list",
  "asset_id": "INV-001"
}
```

## Request Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | string | Yes | Operation: `"run"` to execute detection, `"list"` to retrieve results |
| `asset_id` | string | Yes (for run) | Asset identifier to run detection on |

## Response Format

### Successful Run Response

```json
{
  "success": true,
  "message": "Detection completed",
  "detection_id": "detect_20250123_120000",
  "asset_id": "INV-001",
  "anomalies_detected": 3,
  "status": "completed"
}
```

### Successful List Response

```json
{
  "success": true,
  "detections": [
    {
      "detection_id": "detect_20250123_120000",
      "asset_id": "INV-001",
      "detected_at": "2025-01-23T12:00:00Z",
      "anomalies_detected": 3,
      "severity": "critical"
    }
  ],
  "count": 1
}
```

## cURL Example

```bash
curl -X POST https://api.asoba.co/terminal/detect \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "run",
    "asset_id": "INV-001"
  }'
```

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `Invalid action` | Action must be "run" or "list" |
| `404 Not Found` | `Asset not found` | Asset ID does not exist |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |

## See Also

- [Terminal API Overview](./overview.md) - Complete API reference
- [AI Diagnostics](./diagnose.md) - Run diagnostics on detected faults
- [OODA Summaries](./ooda.md) - Get ML-enhanced summaries
