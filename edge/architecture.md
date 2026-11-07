---
title: "Architecture"
layout: default
nav_order: 2
parent: "Edge Deployment"
---

# Edge Architecture

The Ona Platform edge stack runs entirely on a single Ubuntu 22.04 machine. All services are Docker containers orchestrated by Docker Compose. There are no cloud dependencies — no AWS, no external APIs except for the optional Huawei FusionSolar and Visual Crossing integrations.

Commands below that reference `~/platform/` are **Asoba-internal source-build tooling**. Licensed customer deployments do not need a platform checkout: install from the downloaded bundle (`load_edge_bundle.sh` + `install_edge.sh`) and use [`docker-compose.edge.yml`](https://license.asoba.co) indirectly through the installer. Do not give customers the internal build path as a supported workflow.

---

## Four Operational Flows

| Flow | Path |
|---|---|
| **Training pipeline** | PostgreSQL telemetry → `lstm-prep` (45+ features) → `lstm-train` (Gate 4 auto-promote) → `anomaly-train` (JEPA) → local artifact store |
| **Nowcast ingestion** | Huawei API → `huaweiRealTime` → PostgreSQL → `anomalyModel` → OODA detection event |
| **Weather refresh** | Visual Crossing → `weatherCache` → artifact store (every 15 minutes) |
| **Forecast generation** | API call → `forecastingApi` → load model + weather → 30-day LSTM inference → kWh forecast |

---

## Service Reference

| Service | Container | Port | Role |
|---|---|---|---|
| **nginx** | ona-nginx | 80 | Edge proxy + web UI |
| **terminalApi** | ona-terminal-api | 8001 | OODA workflow, nowcast, assets, detections |
| **forecastingApi** | ona-forecasting-api | 8002 | LSTM/TCN forecast inference |
| **pvInsightService** | ona-pvinsight | 8003 | RAG vector search + LLM synthesis |
| **weatherCache** | ona-weather-cache | 8004 | Weather ingest and 15-min cache |
| **anomalyModelService** | ona-anomaly-model | 8005 | JEPA world model anomaly detection |
| **solarResourceService** | ona-solar-resource | 8006 | P50/P90 PSH yield estimation |
| **listHuaweiCustomers** | ona-list-huawei-customers | 8007 | Huawei customer/plant discovery |
| **gapDetectionService** | ona-gap-detection | 8008 | Telemetry gap scanning |
| **dataStandardizationService** | ona-data-standardization | 8009 | CSV → normalized total_load.csv |
| **assetIntelligenceService** | ona-asset-intelligence | 8010 | KPI rollups, soiling, prognostics |
| **huaweiRealTime** | ona-huawei-realtime | 8011 | Live Huawei inverter ingest |
| **huaweiHistorical** | ona-huawei-historical | 8012 | Historical Huawei backfill |
| **userManagement** | ona-user-management | 8013 | Auth, RBAC, JWT, MFA |
| **postgres** | ona-postgres | 5432 | PostgreSQL — telemetry, control, auth, RAG |
| **redis** | ona-redis | 6379 | TTL cache, session storage |
| **lstm-prep** | ona-lstm-prep | — | One-shot: feature engineering + sequences |
| **lstm-train** | ona-lstm-train | — | One-shot: LSTM/TCN model training |
| **anomaly-model-train** | ona-anomaly-model-train | — | One-shot: JEPA world model training |

`lstm-prep`, `lstm-train`, and `anomaly-model-train` are started with `--profile ml-train`. They run to completion and exit.

---

## Data Planes

| Data Type | Store | Key Env Var |
|---|---|---|
| 5-min kWh telemetry | PostgreSQL `ona_telemetry` | `TELEMETRY_BACKEND=postgres` |
| Customers, assets, detections | PostgreSQL `ona_control` | `CONTROL_PLANE_BACKEND=postgres` |
| Users, roles, groups, audit | PostgreSQL `ona_auth` | `AUTH_BACKEND=postgres` |
| RAG embeddings | PostgreSQL + pgvector `pvinsight` | — |
| ML artifacts, model tarballs, weather | Local filesystem volume | `ARTIFACT_BACKEND=local`, `ARTIFACT_LOCAL_ROOT=/var/ona/artifacts` |
| TTL cache, sessions | Redis | — |

Shared utility modules (`control_store.py`, `telemetry_store.py`, `artifact_store.py`) live at `services/base/utils/` and are copied into service containers at install time.

---

## FastAPI Wrapper Pattern

On AWS cloud the platform services run as Lambda functions. On edge, each Lambda handler is wrapped in a lightweight FastAPI `server.py` that exposes it as an HTTP service on a fixed port:

```
Lambda handler (app.py)  ←  same code in both environments
        ↓
FastAPI server.py wrapper (edge only)
        ↓
Uvicorn HTTP server on localhost:PORT
```

The wrapper translates HTTP requests into the API Gateway proxy event format the Lambda handler expects. There is no separate edge version of any service.

The SDK's `ONA_MODE=edge` setting takes advantage of this: instead of invoking Lambda via boto3, the SDK sends HTTP POST requests directly to the service ports. See [SDK Edge Mode](./sdk) for details.

---

## Redeploying a Single Service

```bash
# Rebuild one service
bash ~/platform/scripts/local/deploy_service.sh <service_directory> [compose_service_name]

# Example: rebuild forecastingApi
bash ~/platform/scripts/local/deploy_service.sh forecastingApi forecasting-api
```

After a rebuild, copy shared utilities into the new container:

```bash
docker cp ~/platform/services/base/utils/control_store.py ona-forecasting-api:/app/control_store.py
docker cp ~/platform/services/base/utils/artifact_store.py ona-forecasting-api:/app/artifact_store.py
```

---

## Memory Management

The training CLI automatically stops non-essential containers before ML operations and restarts them afterward:

| Operation | Memory Required |
|---|---|
| Forecast inference | ~3.5 GB |
| Data preparation (prep) | ~6 GB |
| Model training (train) | ~7 GB |

Manual stop before training if needed:

```bash
docker compose -f ~/docker-compose.local.yml stop \
  ona-pvinsight ona-anomaly-model ona-huawei-realtime ona-huawei-historical
```

---

## Next Steps

- [Training CLI](./training-cli) — train site-specific LSTM and JEPA models
- [Security](./security) — auth model and network isolation
- [SDK Edge Mode](./sdk) — connect the Python and JavaScript SDKs
