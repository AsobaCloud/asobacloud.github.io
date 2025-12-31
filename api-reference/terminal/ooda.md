# Terminal API: OODA Summaries

Retrieve ML-enhanced OODA (Observe-Orient-Decide-Act) summaries for your assets. These summaries include fault detection results, AI diagnostics, severity assessments, energy-at-risk calculations, and recommended actions.

## Endpoint

```
POST https://api.asoba.co/terminal/ooda
```

## Request Body

The request body schema is defined in `TerminalOODARequest.json`.

```json
{
  "customer_id": "demo-customer"
}
```

## Request Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customer_id` | string | Yes | The identifier for the customer |

## Response Format

The response schema is defined in `TerminalOODAResponse.json`.

### Successful Response

```json
{
  "success": true,
  "customer_id": "demo-customer",
  "ml_enhanced_activities": [
    {
      "summary_id": "ooda_20250123_120000",
      "asset_id": "INV-001",
      "created_at": "2025-01-23T12:00:00Z",
      "last_detection_at": "2025-01-23T11:45:00Z",
      "model_version": "v1.2.0",
      "fault_family": "inverter_fault",
      "severity_label": "critical",
      "confidence": 0.92,
      "energy_at_risk_kw": 45.5,
      "root_cause": "Inverter overheating detected. Temperature exceeds safe operating threshold by 15°C.",
      "recommended_actions": [
        {
          "priority": "high",
          "action": "Schedule immediate maintenance to inspect cooling system and clean air filters"
        },
        {
          "priority": "medium",
          "action": "Reduce load to 80% capacity until maintenance is completed"
        },
        {
          "priority": "low",
          "action": "Monitor temperature trends over next 24 hours"
        }
      ],
      "detections": [
        "Temperature anomaly detected at 11:45:00Z",
        "Power output degradation observed",
        "Error code 768 logged"
      ]
    }
  ],
  "count": 1
}
```

## Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether the request was successful |
| `customer_id` | string | The customer identifier |
| `ml_enhanced_activities` | array | Array of OODA summary objects |
| `ml_enhanced_activities[].summary_id` | string | Unique identifier for the summary |
| `ml_enhanced_activities[].asset_id` | string | Asset identifier |
| `ml_enhanced_activities[].created_at` | string (ISO 8601) | When the summary was created |
| `ml_enhanced_activities[].last_detection_at` | string (ISO 8601) | When the last detection occurred |
| `ml_enhanced_activities[].model_version` | string | Version of the ML model used |
| `ml_enhanced_activities[].fault_family` | string | Category of fault detected |
| `ml_enhanced_activities[].severity_label` | string | Severity level (e.g., "critical", "warning", "normal") |
| `ml_enhanced_activities[].confidence` | number | Confidence score (0-1) |
| `ml_enhanced_activities[].energy_at_risk_kw` | number | Estimated energy production at risk in kilowatts |
| `ml_enhanced_activities[].root_cause` | string | AI-generated root cause analysis |
| `ml_enhanced_activities[].recommended_actions` | array | Prioritized list of recommended actions |
| `ml_enhanced_activities[].recommended_actions[].priority` | string | Action priority ("high", "medium", "low") |
| `ml_enhanced_activities[].recommended_actions[].action` | string | Description of the recommended action |
| `ml_enhanced_activities[].detections` | array | List of detection events that contributed to this summary |
| `count` | integer | Number of summaries returned |

## cURL Example

```bash
curl -X POST https://api.asoba.co/terminal/ooda \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "demo-customer"
  }'
```

## Error Responses

| Status Code | Error Message | Description |
|------------|---------------|-------------|
| `400 Bad Request` | `Missing required field: customer_id` | Customer ID was not provided |
| `404 Not Found` | `No OODA summaries found` | No summaries exist for this customer |
| `401 Unauthorized` | `Unauthorized` | Missing or invalid API key |

## Understanding OODA Summaries

The OODA loop provides a structured approach to operational decision-making:

1. **Observe**: Fault detection identifies anomalies in < 5 minutes
2. **Orient**: AI diagnostics analyze root causes in < 10 minutes
3. **Decide**: Energy-at-risk calculations quantify impact in < 15 minutes
4. **Act**: Recommended actions guide maintenance decisions

### Severity Levels

- **Critical**: Immediate action required, significant energy at risk
- **Warning**: Action recommended within 24-48 hours
- **Normal**: No immediate action needed, monitoring recommended

### Energy at Risk

The `energy_at_risk_kw` field estimates the potential energy production loss if the fault is not addressed. This helps prioritize maintenance activities based on financial impact.

## Use Cases

- **Operational Dashboards**: Display real-time OODA summaries for all assets
- **Maintenance Prioritization**: Sort assets by energy-at-risk to optimize maintenance schedules
- **Root Cause Analysis**: Use AI-generated root causes to guide technician investigations
- **Performance Monitoring**: Track fault frequency and severity trends over time

## See Also

- [Terminal API Overview](./overview.md) - Complete API reference
- [Fault Detection](./detect.md) - Run detection on assets
- [AI Diagnostics](./diagnose.md) - Execute diagnostics
- [Maintenance Scheduling](./schedule.md) - Create maintenance schedules
- [OODA Workflow Guides](../../guides/portfolio-management/overview.md) - How-to guides
