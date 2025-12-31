---
layout: default
---
# Terminal API: Asset Management

Manage your solar asset inventory through the Terminal API. Add assets, list all assets, or retrieve specific asset details.

## Endpoint

```
POST https://api.asoba.co/terminal/assets
```

## Request Body

The request body must include an `action` field that specifies the operation to perform. The schema is defined in `TerminalAssetAddRequest.json`.

### Add Asset

To add a new asset to your inventory:

```json
{
  "action": "add",
  "asset_id": "INV-001",
  "name": "Main Solar Inverter",
  "type": "Solar Inverter",
  "capacity_kw": 100.0,
  "location": "Durban, South Africa",
  "components": [
    {
      "oem": "Huawei",
      "model": "SUN2000-100KTL",
      "serial": "HV2024001234"
    }
  ]
}
```

### List Assets

To list all assets for a customer:

```json
{
  "action": "list"
}
```

### Get Asset

To retrieve details for a specific asset:

```json
{
  "action": "get",
  "asset_id": "INV-001"
}
```

## Request Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | string | Yes | Operation to perform: `"add"`, `"list"`, or `"get"` |
| `asset_id` | string | Yes (for add/get) | Unique identifier for the asset |
| `name` | string | Yes (for add) | Human-readable name of the asset |
| `type` | string | Yes (for add) | Type of the asset (e.g., "Solar Inverter") |
| `capacity_kw` | number | Yes (for add) | Capacity of the asset in kilowatts |
| `location` | string | Yes (for add) | Location of the asset |
| `components` | array | No | List of components that make up the asset |
| `components[].oem` | string | Yes (if components provided) | Original equipment manufacturer |
| `components[].model` | string | Yes (if components provided) | Model number of the component |
| `components[].serial` | string | Yes (if components provided) | Serial number of the component |

## Response Format

### Successful Add Response

```json
{
  "message": "Asset created successfully",
  "asset_id": "INV-001"
}
```

### Successful List Response

```json
{
  "success": true,
  "assets": [
    {
      "asset_id": "INV-001",
      "name": "Main Solar Inverter",
      "type": "Solar Inverter",
      "capacity_kw": 100.0,
      "location": "Durban, South Africa",
      "components": [
        {
          "oem": "Huawei",
          "model": "SUN2000-100KTL",
          "serial": "HV2024001234"
        }
      ],
      "created_at": "2025-01-23T10:00:00Z"
    }
  ],
  "count": 1
}
```

### Successful Get Response

```json
{
  "success": true,
  "asset": {
    "asset_id": "INV-001",
    "name": "Main Solar Inverter",
    "type": "Solar Inverter",
    "capacity_kw": 100.0,
    "location": "Durban, South Africa",
    "components": [
      {
        "oem": "Huawei",
        "model": "SUN2000-100KTL",
        "serial": "HV2024001234"
      }
    ],
    "created_at": "2025-01-23T10:00:00Z"
  }
}
```

## cURL Example

```bash
curl -X POST https://api.asoba.co/terminal/assets \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "asset_id": "INV-001",
    "name": "Main Solar Inverter",
    "type": "Solar Inverter",
    "capacity_kw": 100.0,
    "location": "Durban, South Africa",
    "components": [
      {
        "oem": "Huawei",
        "model": "SUN2000-100KTL",
        "serial": "HV2024001234"
      }
    ]
  }'
```

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `Missing required field: asset_id` | Required field was not provided |
| `400 Bad Request` | `Invalid action` | Action must be "add", "list", or "get" |
| `404 Not Found` | `Asset not found` | Asset ID does not exist |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |

## See Also

- [Terminal API Overview](./overview) - Complete API reference
- [Fault Detection](./detect) - Run detection on assets
- [Authentication](../authentication) - API authentication guide
