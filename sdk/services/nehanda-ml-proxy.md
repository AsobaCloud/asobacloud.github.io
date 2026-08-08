---
title: "Nehanda ML Proxy"
layout: default
nav_order: 11
parent: "Service Guides"
grand_parent: "SDK"
---

# Nehanda ML Proxy

The **Nehanda ML Proxy** service (`ona-nehandaMlProxy-prod`) provides an OpenAI-compatible HTTP interface for Asoba's self-hosted **Nehanda 27B** vLLM inference endpoint running on AWS SageMaker (`nehanda-rag-synthesis-27b-vllm`).

It handles AWS SigV4 request signing transparently, enabling standard OpenAI-compatible client tools (such as `nehanda-cli`, the official `openai` Python/JS SDKs, web dashboards, and `curl`) to query the SageMaker model over standard HTTPS without client-side AWS SDK dependencies.

---

## Overview

```text
    Client (nehanda-cli / OpenAI SDK / Web UI / curl)
        │  POST https://nehanda-ml.asoba.co/v1/chat/completions (OpenAI JSON)
        ▼
    Route53 CNAME (nehanda-ml.asoba.co)
        │
        ▼
    API Gateway HTTP API (ona-platform-nehanda-ml-proxy-api-prod)
        │  CORS: AllowOrigins [*], AllowMethods [POST, OPTIONS]
        │  Routes: POST /v1/chat/completions, OPTIONS /v1/chat/completions
        ▼
    Lambda Function (ona-nehandaMlProxy-prod)
        │  AWS SigV4 Signing via boto3 sagemaker-runtime
        ▼
    SageMaker Endpoint (nehanda-rag-synthesis-27b-vllm on ml.g6e.12xlarge)
        │  vLLM Engine (Qwen3.6-27B / Nehanda RAG Synthesis 27B)
        ▼
    Response formatted in OpenAI Chat Completion JSON -> Client
```

---

## Endpoint Details

* **Base URL**: `https://nehanda-ml.asoba.co/v1`
* **Protocol**: HTTPS / JSON (OpenAI Chat Completions API specification)
* **Target Model**: `nehanda-rag-synthesis-27b`

---

## API Specification

### 1. Chat Completions (`POST /v1/chat/completions`)

Accepts a standard OpenAI Chat Completions JSON payload and proxies the request to the SageMaker vLLM engine.

#### Request Body

```json
{
  "model": "nehanda-rag-synthesis-27b",
  "messages": [
    {
      "role": "system",
      "content": "You are Nehanda, an AI energy analyst for Asoba."
    },
    {
      "role": "user",
      "content": "What is the recommended maintenance interval for string inverters?"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 512
}
```

#### Response (`200 OK`)

```json
{
  "id": "chatcmpl-a1b2c3d4e5f6",
  "object": "chat.completion",
  "created": 1785350282,
  "model": "nehanda-rag-synthesis-27b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "String inverters should undergo annual visual inspection and thermal imaging..."
      },
      "finish_reason": "stop"
    }
  ],
  "system_fingerprint": "vllm-0.25.1-tp4-ae39dca4",
  "usage": {
    "prompt_tokens": 32,
    "completion_tokens": 145,
    "total_tokens": 177
  }
}
```

---

### 2. CORS Preflight (`OPTIONS /v1/chat/completions`)

Handles browser preflight checks for web frontends. Returns `200 OK` with headers:
* `Access-Control-Allow-Origin: *`
* `Access-Control-Allow-Methods: POST, OPTIONS`
* `Access-Control-Allow-Headers: Content-Type, Authorization`

---

## HTTP Status Codes

| Status Code | Description | Cause |
|-------------|-------------|-------|
| **200 OK** | Success | Request processed and response returned from model. |
| **400 Bad Request** | Validation Error | Missing required `messages` field or malformed JSON payload. |
| **503 Service Unavailable** | Model Error | Target SageMaker endpoint is offline, updating, or throwing runtime errors. |
| **500 Internal Server Error** | Server Error | Uncaught exception during proxy execution or SigV4 signing. |

---

## Usage Examples

### 1. `nehanda-cli`

Configure `nehanda-cli` to direct chat completions to the Nehanda ML Proxy endpoint:

```bash
export NEHANDA_SELF_HOST_ENDPOINT=https://nehanda-ml.asoba.co/v1
export NEHANDA_SELF_HOST_MODEL=nehanda-rag-synthesis-27b

nehanda
```

### 2. Python (`openai` SDK)

Since the proxy strictly matches the OpenAI Chat Completion interface, you can use the official `openai` Python SDK:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://nehanda-ml.asoba.co/v1",
    api_key="not-required"  # SigV4 is handled server-side by the proxy
)

response = client.chat.completions.create(
    model="nehanda-rag-synthesis-27b",
    messages=[
        {"role": "user", "content": "Explain grid code compliance for South African solar farms."}
    ],
    temperature=0.7,
    max_tokens=512
)

print(response.choices[0].message.content)
```

### 3. `curl`

Query directly from command line:

```bash
curl -X POST https://nehanda-ml.asoba.co/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nehanda-rag-synthesis-27b",
    "messages": [
      {"role": "user", "content": "Reply with OK."}
    ]
  }'
```

---

## Service Architecture & Deployment Notes

* **Lambda Function**: `ona-nehandaMlProxy-prod` (Container Image based on `ona-base:latest`)
* **API Gateway**: `ona-platform-nehanda-ml-proxy-api-prod`
* **Target SageMaker Endpoint**: `nehanda-rag-synthesis-27b-vllm` (`us-east-1`, `ml.g6e.12xlarge`)
* **Target Region Handling**: The Lambda proxy explicitly targets `us-east-1` (`TARGET_REGION=us-east-1`) to interact with SageMaker Runtime even when deployed in other AWS primary regions (e.g. `af-south-1`).

---

## See Also

* [Energy Analyst](/sdk/services/energy-analyst) — Higher-level RAG service utilizing Nehanda 27B
* [PV Insight Service](/sdk/services/pv-insight) — JEPA anomaly recommendation engine utilizing Nehanda RAG synthesis
