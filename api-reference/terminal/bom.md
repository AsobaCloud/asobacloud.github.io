---
layout: default
---
# Terminal API: Bill of Materials

Generate bills of materials (BOM) for maintenance work. This endpoint helps prepare maintenance activities by identifying required parts and components.

## Endpoint

```
POST https://api.asoba.co/terminal/bom
```

## Request Body

To generate a BOM:

```json
{
  "action": "generate",
  "asset_id": "INV-001",
  "maintenance_type": "preventive",
  "schedule_id": "sched_20250123_120000"
}
```

Or to list BOMs:

```json
{
  "action": "list",
  "asset_id": "INV-001"
}
```

## Request Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | string | Yes | Operation: `"generate"` or `"list"` |
| `asset_id` | string | Yes | Asset identifier |
| `maintenance_type` | string | Yes (for generate) | Type: "preventive", "corrective", "emergency" |
| `schedule_id` | string | No | Associated schedule ID |

## Response Format

### Successful Generate Response

```json
{
  "success": true,
  "message": "BOM generated",
  "bom_id": "bom_20250123_120000",
  "asset_id": "INV-001",
  "items": [
    {
      "part_number": "FILTER-001",
      "description": "Air filter replacement",
      "quantity": 2,
      "unit_cost": 25.50,
      "total_cost": 51.00
    },
    {
      "part_number": "CLEAN-001",
      "description": "Cleaning supplies",
      "quantity": 1,
      "unit_cost": 15.00,
      "total_cost": 15.00
    }
  ],
  "total_cost": 66.00
}
```

### Successful List Response

```json
{
  "success": true,
  "boms": [
    {
      "bom_id": "bom_20250123_120000",
      "asset_id": "INV-001",
      "generated_at": "2025-01-23T12:00:00Z",
      "total_cost": 66.00,
      "item_count": 2
    }
  ],
  "count": 1
}
```

## cURL Example

```bash
curl -X POST https://api.asoba.co/terminal/bom \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "generate",
    "asset_id": "INV-001",
    "maintenance_type": "preventive"
  }'
```

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `Invalid action` | Action must be "generate" or "list" |
| `404 Not Found` | `Asset not found` | Asset ID does not exist |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |

## See Also

- [Terminal API Overview](./overview) - Complete API reference
- [Maintenance Scheduling](./schedule) - Create maintenance schedules
- [Work Orders](./order) - Create work orders
