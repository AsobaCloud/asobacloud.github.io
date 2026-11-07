---
title: "Deploy"
layout: default
nav_order: 1
parent: "Edge Deployment"
---

# Deploy the Edge Stack

This guide deploys the full Ona Platform stack on Ubuntu 22.04 — real-time monitoring, LSTM/TCN forecasting, JEPA anomaly detection, and automated maintenance workflows. No cloud account required.

The supported **customer** path is a licensed, offline edge bundle downloaded from the [Ona Edge License Portal](https://license.asoba.co). It does **not** require cloning the private `platform` repository, building from source, logging in to a container registry, or internet access on the target host after the bundle has been transferred.

> **Commercial path:** sales/contract → deposit → entitlement active → one-time set-password email → sign in at https://license.asoba.co → download entitled `ona-edge-<tag>.tar.gz` → load + install on the edge host.  
> **Internal/source path:** Asoba engineering only. If you are not running a licensed customer install, use the internal build flow in the platform repository.

---

## Hardware Requirements

| Component | Minimum | Recommended | Notes |
|---|---|---|---|
| **CPU** | 4 cores | 8+ cores | Training and inference are CPU-bound without a GPU |
| **RAM** | 8 GB | 16 GB | 8 GB supports inference only; 16 GB supports full stack + training |
| **Disk** | 20 GB free | 50+ GB | Docker images (~5 GB), PostgreSQL data, and ML artifacts grow over time |
| **GPU** | None | NVIDIA 4+ GB VRAM | Optional — enables GPU-accelerated LSTM training and TensorFlow inference |
| **Network** | LAN access | LAN + WAN | WAN needed for remote SSH and Huawei FusionSolar API |

### RAM tiers

| RAM | Forecasting Inference | Site-Specific Training | Full Stack + Training |
|---|---|---|---|
| 8 GB | ✅ (stop non-essential services first) | ❌ | ❌ |
| 12 GB | ✅ | ✅ (stop heavy services during training) | ❌ |
| 16 GB | ✅ | ✅ | ✅ |
| 24 GB+ | ✅ | ✅ | ✅ (with headroom) |

---

## Preflight Check

Run these before starting to verify the system meets requirements:

```bash
nproc                                                    # CPU cores (need ≥ 4)
free -m | awk '/^Mem:/{print $2}'                        # RAM in MB (need ≥ 8000)
df -h / | awk 'NR==2{print $4}'                          # Free disk (need ≥ 20G)
nvidia-smi --query-gpu=name,memory.total --format=csv,noheader 2>/dev/null \
  || echo "No NVIDIA GPU (CPU-only mode)"
docker --version
python3 --version
```

Minimum: 4 CPU cores, 8 GB RAM, 20 GB free disk, Docker installed, Python 3.8+.

---

## Prerequisites

### Docker Engine

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable docker && sudo systemctl start docker
sudo usermod -aG docker $USER
# Log out and back in for the group change to take effect
```

### Python dependencies

```bash
sudo apt install -y python3 python3-pip
pip3 install psycopg bcrypt
```

### License portal credentials

Edge bundles are entitlement-gated. You need:

- A license portal account created through your Ona Edge purchase (Stripe checkout flow), and
- The one-time set-password link emailed by `license@asoba.co`, or existing portal credentials.

Sign in at https://license.asoba.co, confirm your entitlement shows the release tag(s) you are licensed for, and download the matching `ona-edge-<tag>.tar.gz`. Do not use `git clone`, `docker compose build`, or registry logins as the customer install path.

### API Keys

| Key | Required For | How to Obtain |
|---|---|---|
| `VISUAL_CROSSING_API_KEY` | Weather data for forecasting | [Visual Crossing](https://www.visualcrossing.com/) — free tier available |
| `HUAWEI_USERNAME` | Huawei FusionSolar inverter data | Huawei FusionSolar admin account |
| `HUAWEI_SYSTEM_CODE` | Huawei FusionSolar API auth | Huawei Northbound API key |

Add to `~/.bashrc` for persistence across reboots:

```bash
echo 'export VISUAL_CROSSING_API_KEY="<your-key>"' >> ~/.bashrc
echo 'export HUAWEI_USERNAME="<your-username>"' >> ~/.bashrc
echo 'export HUAWEI_SYSTEM_CODE="<your-code>"' >> ~/.bashrc
source ~/.bashrc
```

The platform starts without Huawei credentials if you are not collecting from Huawei inverters. The Visual Crossing key is required for weather-dependent forecasting.

---

## Obtain And Verify The Bundle

1. Download `ona-edge-<tag>.tar.gz` from the license portal (or transfer it by USB/`scp` for air-gapped sites).
2. Verify its integrity before loading it:

```bash
# Use the SHA-256 value shown in the portal for your release
echo "<sha256-from-portal>  ona-edge-<tag>.tar.gz" | sha256sum -c
```

If verification fails, re-download the bundle from the portal. Do not load a bundle whose checksum does not match.

---

## Installation

Transfer the bundle to the edge host, then run:

```bash
# 1) Load all container images into the local Docker daemon
bash load_edge_bundle.sh ./ona-edge-<tag>.tar.gz

# 2) Install and start the edge stack from the image-only compose file
bash ./ona-edge-<tag>/scripts/local/install_edge.sh ./ona-edge-<tag>
```

The bundle loader verifies `SHA256SUMS` and runs `docker load -i images.tar`. The installer uses only `docker-compose.edge.yml`, starts PostgreSQL and Redis, initializes the databases, seeds `admin` / `admin`, brings up the microservices, and deploys Nginx and the web UI.

The installer is idempotent — safe to re-run. It performs these steps:

| Step | Action |
|---|---|
| 1 | Preflight checks (Docker, Python, psql) |
| 2 | Start PostgreSQL and Redis |
| 3 | Initialize databases (`ona_telemetry`, `ona_auth`, `ona_control`, `pvinsight`) |
| 4 | Seed auth (`admin`/`admin`) and control-plane baseline data |
| 5 | Start all microservices |
| 6 | Deploy Nginx edge proxy and web UI |
| 7 | Verify key API endpoints (auth, customers, telemetry) |

---

## Post-Install Verification

```bash
# Auth — should return a JWT
curl -s -X POST http://localhost/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"admin"}' | python3 -m json.tool

# Forecasting API health
curl -s http://localhost:8002/health | python3 -m json.tool

# Weather cache — trigger a forecast fetch
curl -s -X POST http://localhost:8004/run \
  -H 'Content-Type: application/json' \
  -d '{"mode": "forecast"}' | python3 -m json.tool
```

### Change the default password immediately

The stack is seeded with `admin` / `admin` for first-run convenience only. Change this password before connecting the device to any network beyond local development.

---

## Accessing the Platform

### Local (on the device)

| URL | Description |
|---|---|
| `http://localhost/` | Platform web UI |
| `http://localhost/api/auth/login` | Auth endpoint |
| `http://localhost:8001/` | terminalApi (OODA, nowcast, assets) |
| `http://localhost:8002/health` | forecastingApi health |
| `http://localhost:8005/` | anomalyModelService |

### Remote access via SSH

```bash
# Enable SSH on the edge device
sudo apt install -y openssh-server
sudo systemctl enable ssh && sudo systemctl start ssh

# Tunnel the web UI from a remote machine
ssh -L 8080:localhost:80 <username>@<device-ip>
# Then open http://localhost:8080 in your browser

# Tunnel multiple ports at once
ssh -L 8080:localhost:80 -L 8001:localhost:8001 -L 8002:localhost:8002 <username>@<device-ip>
```

### Remote access via LAN

Find the device IP:

```bash
hostname -I   # on the edge device
```

Then open `http://<device-ip>/` from any machine on the same LAN.

### WAN access via jump host

```
# ~/.ssh/config on your remote machine
Host edge-device
    HostName 127.0.0.1
    Port 22
    User <edge-user>
    ProxyJump <public-jump-host>
    ServerAliveInterval 30
    ServerAliveCountMax 3
```

For production WAN access, consider WireGuard VPN or reverse SSH tunnel rather than exposing ports directly.

---

## Common Failures

| Symptom | Likely cause | Action |
|---|---|---|
| Bundle SHA-256 verification fails | Corrupt download or partial transfer | Re-download from the portal; compare the portal checksum |
| `missing image asoba/ona-edge-…` on compose up | Bundle load skipped or wrong tag | Re-run `load_edge_bundle.sh`; confirm with `docker images \| grep asoba/ona-edge` |
| Auth login returns no token | `userManagement` not healthy | Check `docker logs ona-user-management`; confirm port 8013 and Nginx |
| Support asks for `git clone` | Wrong playbook | Redirect to this bundle-only path and the license portal |

---

## Next Steps

- [Architecture](./architecture) — understand the service map and data planes
- [Training CLI](./training-cli) — train site-specific LSTM and JEPA models (requires an Asoba-provided training runtime or internal environment)
- [SDK Edge Mode](./sdk) — connect the SDK to your edge deployment