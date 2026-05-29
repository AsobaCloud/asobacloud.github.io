---
title: "Order"
layout: default
nav_order: 9
parent: "Terminal API"
grand_parent: "Reference"
---
# Terminal API: Work Orders

Create and manage work orders for maintenance activities. This endpoint supports the Act stage of the OODA loop by enabling work order creation and tracking.

## Endpoint

```
POST https://api.asoba.org/terminal/order
```

## Request Body

To create a work order:

```json
{
  "action": "create",
  "asset_id": "INV-001",
  "schedule_id": "sched_20250123_120000",
  "bom_id": "bom_20250123_120000",
  "assigned_technician": "tech-001",
  "estimated_duration_hours": 4,
  "priority": "high"
}
```

Or to list work orders:

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
| `schedule_id` | string | Yes (for create) | Associated schedule ID |
| `bom_id` | string | Yes (for create) | Associated BOM ID |
| `assigned_technician` | string | Yes (for create) | Technician identifier |
| `estimated_duration_hours` | number | Yes (for create) | Estimated duration |
| `priority` | string | Yes (for create) | Priority: "high", "medium", "low" |

## Response Format

### Successful Create Response

```json
{
  "success": true,
  "message": "Order created",
  "order_id": "order_20250123_120000",
  "asset_id": "INV-001",
  "status": "pending",
  "estimated_completion": "2025-01-23T16:00:00Z"
}
```

### Successful List Response

```json
{
  "success": true,
  "orders": [
    {
      "order_id": "order_20250123_120000",
      "asset_id": "INV-001",
      "status": "in_progress",
      "created_at": "2025-01-23T12:00:00Z",
      "estimated_completion": "2025-01-23T16:00:00Z"
    }
  ],
  "count": 1
}
```

## cURL Example

```bash
curl -X POST https://api.asoba.org/terminal/order \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "asset_id": "INV-001",
    "schedule_id": "sched_20250123_120000",
    "bom_id": "bom_20250123_120000",
    "assigned_technician": "tech-001",
    "estimated_duration_hours": 4,
    "priority": "high"
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

- [Terminal API Overview](./overview) - Complete API reference
- [Maintenance Scheduling](./schedule) - Create schedules
- [Bill of Materials](./bom) - Generate BOMs
- [Job Tracking](./track) - Track order status
