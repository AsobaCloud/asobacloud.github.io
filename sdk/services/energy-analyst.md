---
title: "Energy Analyst"
layout: default
nav_order: 7
parent: "Service Guides"
grand_parent: "SDK"
---

# Energy Analyst

The Energy Analyst service provides **retrieval-augmented generation (RAG)** for energy policy and regulatory compliance queries. Upload policy documents, then ask natural-language questions and get cited answers powered by Nehanda LLM.

## Configuration

```bash
export ENERGY_ANALYST_URL=http://localhost:8000
```

```python
client = OnaClient(
    energy_analyst_url='http://localhost:8000'  # or set ENERGY_ANALYST_URL
)
```

---

## Python

### Query Energy Policies

```python
from ona_platform import OnaClient

client = OnaClient(
    energy_analyst_url='http://localhost:8000'
)

result = client.energy_analyst.query(
    question="What are the grid code compliance requirements for solar installations in South Africa?",
    n_results=3
)
print(f"Answer:\n{result['answer']}")
print(f"Citation: {result['citation']}")
print(f"Model: {result['model_id']}")
```

### Upload Policy PDFs

```python
upload_result = client.energy_analyst.upload_pdfs([
    '/path/to/policy1.pdf',
    '/path/to/policy2.pdf'
])
print(f"Files processed: {upload_result['files_processed']}")
print(f"Documents added: {upload_result['documents_added']}")
for detail in upload_result['details']:
    print(f"  - {detail['filename']}: {detail['status']}")
```

### Add Text Documents

```python
add_result = client.energy_analyst.add_documents(
    texts=[
        "NRS 097-2-1 defines the requirements for embedded generation...",
        "The grid connection process requires compliance with..."
    ],
    metadatas=[
        {"source": "NRS 097-2-1", "document_title": "NRS 097-2-1 Grid Connection Code"},
        {"source": "Grid Guide", "document_title": "Grid Connection Process Guide"}
    ]
)
print(f"Documents added: {add_result['count']}")
```

### Service Health & Collection Info

```python
health = client.energy_analyst.health()
print(f"Status: {health['status']}")
print(f"Model: {health['model_id']}")
print(f"Document count: {health['document_count']}")

info = client.energy_analyst.get_collection_info()
print(f"Collection: {info['name']}")
print(f"Documents: {info['count']}")
print(f"Storage: {info['storage_mb']} MB")
```

---

## JavaScript

```javascript
const { OnaSDK } = require('../src/index');

const sdk = new OnaSDK({
  endpoints: {
    energyAnalyst: process.env.ENERGY_ANALYST_URL || 'http://localhost:8000'
  }
});

// ── Query energy policies ──
const result = await sdk.energyAnalyst.query({
  question: 'What are the grid code compliance requirements for solar installations?',
  n_results: 3,
  // Optional generation parameters:
  max_new_tokens: 512,
  temperature: 0.7
});

console.log('Answer:', result.answer);
console.log('Citation:', result.citation);
console.log('Model:', result.model_id);

// ── Check service health ──
const health = await sdk.energyAnalyst.getHealth();
console.log(`Status: ${health.status}, Documents: ${health.document_count}`);

// ── Collection info ──
const info = await sdk.energyAnalyst.getCollectionInfo();
console.log(`Collection: ${info.name}, ${info.count} documents`);
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `question` | string | *required* | Natural-language question |
| `n_results` | int | 3 | Number of context documents to retrieve (1–10) |
| `max_new_tokens` | int | — | Maximum tokens to generate (50–2048) |
| `temperature` | float | — | Sampling temperature (0.0–2.0) |

---

## Available Methods

| Method (Python) | Method (JS) | Description |
|-----------------|-------------|-------------|
| `query()` | `query()` | Ask a question and get a cited RAG answer |
| `add_documents()` | — | Add text documents with metadata |
| `upload_pdfs()` | — | Upload PDF files to the knowledge base |
| `get_collection_info()` | `getCollectionInfo()` | Get document count and storage info |
| `clear_collection()` | `clearCollection()` | Remove all documents |
| `health()` | `getHealth()` | Service health and model info |

> **Note**: PDF upload and text document addition are Python-only in the current SDK. JS supports querying, health, and collection info.

---

## Full Example

- [Python: energy_analyst_example.py](https://github.com/AsobaCloud/sdk/blob/main/python/examples/energy_analyst_example.py)

## See Also

- [ODS-E & the SDK](/odse/sdk-integration) — How data standardization connects to SDK flows
- [Error Handling](/sdk/error-handling) — Error classes and retry logic
