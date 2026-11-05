---
title: "Edge Deployment"
layout: default
nav_order: 5
---

# Edge Deployment

The Ona Platform runs fully on-premise on Ubuntu 22.04 — no AWS, no internet connection required after initial setup. All services run as Docker containers on a single machine, with PostgreSQL as the data plane, a local filesystem volume for ML artifacts, and Redis for caching.

This section covers everything needed to deploy, operate, and build against an edge installation.

---

## What You Need

| Component | Minimum | Recommended |
|---|---|---|
| CPU | 4 cores | 8+ cores |
| RAM | 8 GB | 16 GB |
| Disk | 20 GB free | 50+ GB |
| GPU | None | NVIDIA 4+ GB VRAM |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |

8 GB RAM supports inference only. 16 GB supports site-specific training alongside all running services.

---

## Pages in This Section

| Page | What it covers |
|---|---|
| [Deploy](./deploy) | Hardware preflight, install script, post-install verification, accessing the UI |
| [Architecture](./architecture) | Service map, data planes, training pipeline, FastAPI wrapper pattern |
| [Training CLI](./training-cli) | `ona_train.py` command reference with examples |
| [Security](./security) | Auth model, network isolation, ISO 27001 behavioral test suite |
| [SDK Edge Mode](./sdk) | `ONA_MODE=edge`, endpoint env vars, available clients |
