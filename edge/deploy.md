---
title: "Deploy"
layout: default
nav_order: 1
parent: "Edge Deployment"
---

# Deploy the Edge Stack

This guide deploys the full Ona Platform stack on Ubuntu 22.04 — real-time monitoring, LSTM/TCN forecasting, JEPA anomaly detection, and automated maintenance workflows. No cloud account required.

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

### Clone the repository

```bash
git clone https://github.com/AsobaCloud/platform.git ~/platform
cp ~/platform/docker-compose.local.yml ~/docker-compose.local.yml
```

The compose file must live in the home directory (`~`). Running it from `~/platform/` creates a conflicting Docker project name.

---

## API Keys

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

## Installation

```bash
bash ~/platform/scripts/local/install.sh
```

The installer is idempotent — safe to re-run. It performs these steps:

| Step | Action |
|---|---|
| 1 | Preflight checks (Docker, Python, psql) |
| 2 | Start PostgreSQL and Redis |
| 3 | Initialize databases (ona_telemetry, ona_auth, ona_control, pvinsight) |
| 4 | Seed auth (admin/admin) and control-plane baseline data |
| 5 | Start all microservices and copy shared utilities into containers |
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

Default credentials: `admin` / `admin`. Change these before exposing to a network.

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

## Next Steps

- [Architecture](./architecture) — understand the service map and data planes
- [Training CLI](./training-cli) — train site-specific LSTM and JEPA models
- [SDK Edge Mode](./sdk) — connect the SDK to your edge deployment
