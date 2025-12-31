# Terminal API: Maintenance Scheduling

Create and manage maintenance schedules for your assets. This endpoint supports the Decide stage of the OODA loop by enabling proactive maintenance planning.

## Endpoint

```
POST https://api.asoba.co/terminal/schedule
```

## Request Body

To create a maintenance schedule:

```json
{
  "action": "create",
  "asset_id": "INV-001",
  "maintenance_type": "preventive",
  "scheduled_date": "2025-02-01T10:00:00Z",
  "priority": "high",
  "reason": "Routine maintenance based on OODA recommendations"
}
```

Or to list schedules:

```json
{
  "action": "list",
  "asset_id": "INV-001"
}
```

## Request Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | string | Yes | Operation: `"create"` or `"list"` |
| `asset_id` | string | Yes | Asset identifier |
| `maintenance_type` | string | Yes (for create) | Type: "preventive", "corrective", "emergency" |
| `scheduled_date` | string (ISO 8601) | Yes (for create) | When maintenance is scheduled |
| `priority` | string | Yes (for create) | Priority: "high", "medium", "low" |
| `reason` | string | Yes (for create) | Reason for maintenance |

## Response Format

### Successful Create Response

```json
{
  "success": true,
  "message": "Schedule created",
  "schedule_id": "sched_20250123_120000",
  "asset_id": "INV-001",
  "scheduled_date": "2025-02-01T10:00:00Z"
}
```

### Successful List Response

```json
{
  "success": true,
  "schedules": [
    {
      "schedule_id": "sched_20250123_120000",
      "asset_id": "INV-001",
      "maintenance_type": "preventive",
      "scheduled_date": "2025-02-01T10:00:00Z",
      "priority": "high",
      "status": "pending"
    }
  ],
  "count": 1
}
```

## cURL Example

```bash
curl -X POST https://api.asoba.co/terminal/schedule \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "asset_id": "INV-001",
    "maintenance_type": "preventive",
    "scheduled_date": "2025-02-01T10:00:00Z",
    "priority": "high",
    "reason": "Routine maintenance"
  }'
```

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `Invalid action` | Action must be "create" or "list" |
| `400 Bad Request` | `Missing required field` | Required field was not provided |
| `404 Not Found` | `Asset not found` | Asset ID does not exist |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |

## See Also

- [Terminal API Overview](./overview.md) - Complete API reference
- [Bill of Materials](./bom.md) - Generate BOM for maintenance
- [Work Orders](./order.md) - Create work orders
