---
title: "PV Insight Service"
layout: default
nav_order: 10
parent: "Service Guides"
grand_parent: "SDK"
---

# PV Insight Service

Turn JEPA inverter anomaly detections into grounded **O&M follow-up recommendations**. The service retrieves site-relevant manuals and troubleshooting guides using hybrid RAG, then synthesizes a recommendation using **Nehanda 27B** (Asoba's fine-tuned LLM for RAG synthesis).

<a href="https://asoba.co/bounded-intelligence-jepa-llm.html" target="_blank" rel="noopener" class="product-category-card">
  <h4>👁️ Bounded Intelligence: JEPA World Models for Per-Inverter Anomaly Detection</h4>
  <p>How the System 1 / System 2 OODA architecture works — JEPA as the fast perceptual detector, RAG + Nehanda as the deliberate diagnostic layer. Per-inverter AUROC results and F1 comparisons against rule-based thresholds.</p>
</a>

**Architecture:**

```
JEPA anomaly detection payload
  │
  │  action: 'pv-insight'  (via terminalApi)
  ▼
pvInsightService
  ├─ 1. Build retrieval query from detection fields
  │      (manufacturer, power deviation, temp, streak, inverter state)
  │
  ├─ 2. Hybrid retrieval
  │      pgvector (BGE 768-d) + BM25 sparse + RRF fusion
  │      + cross-encoder rerank → top N chunks (default 5)
  │
  ├─ 3. Build Nehanda synthesis prompt
  │      O&M analyst persona + detection report + cited chunks
  │
  └─ 4. Return enriched payload with llm_analysis
```

---

## SDK Usage

PV Insight synthesis is exposed on the **TerminalClient** as `run_pv_insight_synthesis` (Python) and `runPvInsightSynthesis` (JavaScript). Pass a detection object — typically from `run_detection` / `runDetection` — and an optional `user_query` prompt.

### Python

```python
from asoba import OnaClient

client = OnaClient()

# Typically you get this from run_detection; here shown as a direct call
detection = {
    "asset_id": "INV-BN2441041190",
    "severity_label": "high",
    "severity_score": 0.82,
    "fault_type": "behavioral_anomaly",
    "summary": "Inverter 1 - World model anomaly score 0.0891 (Streak: 6)",
    "metrics": {
        "latest_power_kw": 45.2,
        "baseline_power_kw": 280.5,
        "latest_temperature_c": 68.3,
        "latest_inverter_state": 513,
        "world_model_streak_length": 6,
    },
    "energy_at_risk_kw": 235.3,
}

result = client.terminal.run_pv_insight_synthesis(
    detection=detection,
    user_query="Analyze JEPA Anomaly & Recommend BOM",  # default — can omit
)

analysis = result["llm_analysis"]
if analysis["status"] == "ok":
    print(f"Recommendation:\n{analysis['recommendation']}")
    for source in analysis["cited_sources"]:
        print(f"  Source: {source['doc_title']} → {source['section_path']}")
```

### JavaScript

```javascript
const { OnaSDK } = require('@asobacloud/sdk');

const sdk = new OnaSDK({
  region: 'af-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  endpoints: {
    terminal: process.env.ASOBA_TERMINAL_ENDPOINT || 'https://api.asoba.co',
  },
  timeout: 90000,  // synthesis can take up to ~90s
});

const detection = {
  asset_id: 'INV-BN2441041190',
  severity_label: 'high',
  severity_score: 0.82,
  fault_type: 'behavioral_anomaly',
  summary: 'Inverter 1 - World model anomaly score 0.0891 (Streak: 6)',
  metrics: {
    latest_power_kw: 45.2,
    baseline_power_kw: 280.5,
    latest_temperature_c: 68.3,
    latest_inverter_state: 513,
    world_model_streak_length: 6,
  },
  energy_at_risk_kw: 235.3,
};

const result = await sdk.terminal.runPvInsightSynthesis({
  detection,
  user_query: 'Analyze JEPA Anomaly & Recommend BOM',  // default — can omit
});

const analysis = result.llm_analysis;
if (analysis.status === 'ok') {
  console.log('Recommendation:', analysis.recommendation);
  analysis.cited_sources.forEach(s => {
    console.log(`  Source: ${s.doc_title} → ${s.section_path}`);
  });
}
```

### Method Reference

| | Python | JavaScript |
|---|---|---|
| **Method** | `client.terminal.run_pv_insight_synthesis(detection, user_query=…)` | `sdk.terminal.runPvInsightSynthesis({ detection, user_query })` |
| **`detection`** | `dict` — required | `Object` — required |
| **`user_query`** | `str`, default `"Analyze JEPA Anomaly & Recommend BOM"` | `string`, same default |
| **Returns** | `dict` with `detection` (echo) + `llm_analysis` | `Promise<Object>`, same shape |
| **Timeout** | 120 s (OnaConfig default) | Set `timeout: 90000` in SDK options |

---

## Response Shape

```json
{
  "detection": { "...": "echo of submitted detection object" },
  "llm_analysis": {
    "status": "ok",
    "recommendation": "The inverter is exhibiting a significant behavioral anomaly...",
    "cited_sources": [
      {
        "doc_title": "Huawei SUN2000 Troubleshooting Guide",
        "section_path": "Error Code 513",
        "source_key": "pv-ops-and-maintenance/OEM Manuals/.../513.pdf"
      }
    ],
    "retrieval_query": "Huawei SUN2000 string inverter behavioral anomaly...",
    "chunks_retrieved": 5,
    "model": "nehanda-rag-synthesis-27b",
    "error": null
  }
}
```

If the detection's `severity_label` is below the service's configured `min_severity` threshold, the detection is returned unchanged with `"llm_analysis": null`.

---

## The Underlying `/analyze` Endpoint

The SDK routes through `terminalApi` (action `pv-insight`), which internally calls the pvInsightService. You can also call the service directly:

### Request

```json
{
  "detection": {
    "asset_id": "INV-1000000054495195",
    "severity_label": "critical",
    "severity_score": 0.82,
    "status": "detected",
    "fault_type": "behavioral_anomaly",
    "summary": "World model anomaly score 0.0891 vs threshold 0.0234 — 6 consecutive windows",
    "anomalies": [],
    "metrics": {
      "latest_power_kw": 45.2,
      "baseline_power_kw": 280.5,
      "latest_irradiance_wm2": 850.0,
      "latest_temperature_c": 68.3,
      "latest_inverter_state": 513,
      "latest_run_state": 1,
      "world_model_latest_score": 0.0891,
      "world_model_max_score": 0.0891,
      "world_model_threshold": 0.0234,
      "world_model_streak_length": 6
    },
    "energy_at_risk_kw": 235.3,
    "last_observation": "2026-07-23T12:30:00Z"
  },
  "top_n": 5,
  "min_severity": "moderate"
}
```

### Python with `httpx`

```python
import httpx

detection = {
    "asset_id": "INV-1000000054495195",
    "severity_label": "critical",
    "severity_score": 0.82,
    "status": "detected",
    "fault_type": "behavioral_anomaly",
    "summary": "World model anomaly score 0.0891 vs threshold 0.0234 — 6 consecutive windows",
    "metrics": {
        "latest_power_kw": 45.2,
        "baseline_power_kw": 280.5,
        "latest_irradiance_wm2": 850.0,
        "latest_temperature_c": 68.3,
        "latest_inverter_state": 513,
        "world_model_streak_length": 6,
    },
    "energy_at_risk_kw": 235.3,
    "last_observation": "2026-07-23T12:30:00Z",
}

r = httpx.post(
    "https://pvinsight.up.railway.app/analyze",
    json={"detection": detection, "top_n": 5, "min_severity": "moderate"},
    timeout=60.0,
)
result = r.json()
analysis = result.get("llm_analysis")
if analysis:
    print(f"Status: {analysis['status']}")
    print(f"Recommendation:\n{analysis['recommendation']}")
    print(f"Sources: {len(analysis['cited_sources'])}")
```

### JavaScript with `fetch`

```javascript
const response = await fetch('https://pvinsight.up.railway.app/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    detection: {
      asset_id: 'INV-1000000054495195',
      severity_label: 'critical',
      severity_score: 0.82,
      fault_type: 'behavioral_anomaly',
      summary: 'World model anomaly score 0.0891 vs threshold 0.0234',
      metrics: {
        latest_power_kw: 45.2,
        baseline_power_kw: 280.5,
        latest_temperature_c: 68.3,
        latest_inverter_state: 513,
        world_model_streak_length: 6,
      },
      energy_at_risk_kw: 235.3,
      last_observation: '2026-07-23T12:30:00Z',
    },
    top_n: 5,
    min_severity: 'moderate',
  }),
});

const result = await response.json();
const analysis = result.llm_analysis;
if (analysis) {
  console.log('Status:', analysis.status);
  console.log('Recommendation:', analysis.recommendation);
  console.log('Sources:', analysis.cited_sources.length);
}
```

---

## Other Endpoints

### Health Check

```bash
curl https://pvinsight.up.railway.app/health
```

```json
{
  "status": "ok",
  "chunk_count": 40908,
  "last_ingest": "2026-07-23T10:00:00Z",
  "nehanda_endpoint": "nehanda-rag-synthesis-27b"
}
```

### Collection Info

```bash
curl https://pvinsight.up.railway.app/collection/info
```

```json
{
  "chunk_count": 40908,
  "last_ingest": "2026-07-23T10:00:00Z"
}
```

### Corpus Ingest (Admin)

```bash
curl -X POST https://pvinsight.up.railway.app/ingest/s3 \
  -H "X-Api-Key: $ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prefix": "pv-ops-and-maintenance/"}'
```

---

## How It Fits Together

The PV Insight Service sits downstream of the JEPA anomaly detection pipeline:

1. **anomalyModelService** computes JEPA world-model detections
2. When severity ≥ moderate or streak ≥ 3, the detection is sent to **pvInsightService** `/analyze`
3. The service retrieves relevant O&M documentation and synthesizes a recommendation via **Nehanda 27B**
4. The enriched detection (with `llm_analysis`) is returned for display in dashboards or O&M workflows

> **Note**: The caller gate (step 2) is not yet wired in `anomalyModelService`. Until then, call `run_pv_insight_synthesis` / `runPvInsightSynthesis` directly with any detection payload.

---

## See Also

- [Terminal OODA Workflow](/sdk/services/terminal-ooda-workflow) — The OODA loop that consumes detection results
- [OODA Terminal Alerts](/sdk/services/ooda-terminal-alerts) — Streaming alert queries
- [Energy Analyst](/sdk/services/energy-analyst) — RAG for energy policy (different corpus, same pattern)
