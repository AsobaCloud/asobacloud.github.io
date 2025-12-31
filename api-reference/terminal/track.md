# Terminal API: Job Tracking

Subscribe to and manage job tracking subscriptions. This endpoint enables real-time monitoring of work order status and completion.

## Endpoint

```
POST https://api.asoba.co/terminal/track
```

## Request Body

To subscribe to job tracking:

```json
{
  "action": "subscribe",
  "order_id": "order_20250123_120000",
  "callback_url": "https://your-app.com/webhooks/order-status"
}
```

Or to list tracking subscriptions:

```json
{
  "action": "list",
  "order_id": "order_20250123_120000"
}
```

## Request Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | string | Yes | Operation: `"subscribe"` or `"list"` |
| `order_id` | string | Yes | Work order identifier |
| `callback_url` | string | Yes (for subscribe) | Webhook URL for status updates |

## Response Format

### Successful Subscribe Response

```json
{
  "success": true,
  "message": "Subscription created",
  "subscription_id": "sub_20250123_120000",
  "order_id": "order_20250123_120000",
  "status": "active"
}
```

### Successful List Response

```json
{
  "success": true,
  "subscriptions": [
    {
      "subscription_id": "sub_20250123_120000",
      "order_id": "order_20250123_120000",
      "callback_url": "https://your-app.com/webhooks/order-status",
      "status": "active",
      "created_at": "2025-01-23T12:00:00Z"
    }
  ],
  "count": 1
}
```

## Webhook Payload

When order status changes, a POST request is sent to your callback URL:

```json
{
  "order_id": "order_20250123_120000",
  "status": "completed",
  "updated_at": "2025-01-23T16:00:00Z",
  "completion_notes": "Maintenance completed successfully"
}
```

## cURL Example

```bash
curl -X POST https://api.asoba.co/terminal/track \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "subscribe",
    "order_id": "order_20250123_120000",
    "callback_url": "https://your-app.com/webhooks/order-status"
  }'
```

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `Invalid action` | Action must be "subscribe" or "list" |
| `400 Bad Request` | `Invalid callback URL` | Callback URL format is invalid |
| `404 Not Found` | `Order not found` | Order ID does not exist |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |

## See Also

- [Terminal API Overview](./overview.md) - Complete API reference
- [Work Orders](./order.md) - Create work orders
- [Maintenance Scheduling](./schedule.md) - Create schedules
