---
title: "Security"
layout: default
nav_order: 4
parent: "Edge Deployment"
---

# Security

This page covers the auth model, network isolation, and the ISO 27001 behavioral test suite for edge deployments.

---

## Authentication Model

The edge deployment uses JWT-based authentication via the `userManagement` service (port 8013). All API routes behind Nginx require a valid JWT except health endpoints.

### Default credentials

| URL | Default |
|---|---|
| `http://localhost/` (web UI) | `admin` / `admin` |
| `http://localhost/api/auth/login` | `admin` / `admin` |

**Change the default password before connecting the device to any network beyond a local development environment.** The default credentials are seeded for first-run convenience only.

### Auth flow

1. `POST /api/auth/login` with `{"username": "...", "password": "..."}` returns a JWT
2. Include the token as `Authorization: Bearer <token>` on all subsequent requests
3. MFA can be enabled per user via `POST /api/auth/verify-mfa` — see the userManagement service for setup

### Service-level auth mode

The terminal API runs with `TERMINAL_API_AUTH_MODE=monitor` in development deployments. In this mode, certain monitoring endpoints accept requests without a token for easier local testing. Set `TERMINAL_API_AUTH_MODE=strict` for production deployments.

---

## Network Isolation

All services bind exclusively to `localhost` (127.0.0.1) except nginx, which binds to port 80 on all interfaces. The security surface is:

| Port | Exposed | Who Should Access |
|---|---|---|
| 80 (nginx) | All interfaces | LAN clients, SSH tunnel users |
| 5432 (postgres) | localhost only | Service containers via Docker network |
| 6379 (redis) | localhost only | Service containers via Docker network |
| 8001–8013 (services) | localhost only | Service containers, SDK via tunnel |

**Access services from outside the device through SSH tunnels**, not by binding service ports to external interfaces. Opening ports 8001–8013 externally is not recommended.

---

## ISO 27001 Behavioral Test Suite

The platform ships a behavioral test suite mapped to ISO/IEC 27001:2022 Annex A controls. It provides technical evidence for audit purposes — it does not establish certification or whole-control conformity.

### What it tests

- Default credential detection and forced-token attempts
- Protected API read access controls
- Internal port connection checks (verifying services are not exposed externally)
- TLS certificate verification for external integrations

### What it does NOT do

- Restart services or alter accounts
- Run load tests
- Cover controls that require organizational policy verification

### Setup (review workstation on the LAN)

> The commands below assume an Asoba-provided platform checkout. They are intended for Asoba/internal or partner review under a support agreement, not for an end-customer portal-only bundle.

Run the suite from a **separate workstation on the same LAN** as the edge device. Running it on the device itself does not validate LAN isolation.

```bash
sudo apt install -y python3-venv
cd ~/platform
python3 -m venv .venv
.venv/bin/python -m pip install pytest PyYAML
```

### Manual run

Repository configuration checks only (live checks skipped):

```bash
cd ~/platform
umask 077
run_dir=$(mktemp -d /tmp/ona-edge-security.XXXXXX)
.venv/bin/python -m pytest tests/security/test_edge_iso27001_behavioral.py \
  -q --tb=short -o junit_family=legacy \
  --junitxml="$run_dir/results.xml"
echo "exit_code=$?" > "$run_dir/status.txt"
```

Full live suite against the edge device:

```bash
cd ~/platform
umask 077
run_dir=$(mktemp -d /tmp/ona-edge-security.XXXXXX)
EDGE_SECURITY_LIVE=1 EDGE_SECURITY_BASE=http://<device-ip> \
  .venv/bin/python -m pytest tests/security/test_edge_iso27001_behavioral.py \
  -q --tb=short -o junit_family=legacy \
  --junitxml="$run_dir/results.xml"
result=$?
echo "exit_code=$result" > "$run_dir/status.txt"
```

Replace `<device-ip>` with the actual LAN IP of the edge device (e.g. `192.168.5.238`) or its mDNS hostname (e.g. `asobacorp-1.local`).

### Interpreting results

| Exit Code | Meaning |
|---|---|
| 0 | All executed assertions passed |
| 1 | One or more assertions failed — read the log to distinguish configuration findings from security issues |
| Other | Setup, collection, or invocation error — not a passing security result |

Check for skipped tests before treating exit 0 as a complete live review. A skipped test is not a passed test.

### Scheduled runs with cron

Configure on the review workstation (not the edge device). Add the following as one line to crontab (`crontab -e`), running daily at 02:00:

```cron
0 2 * * * /usr/bin/flock -n "$HOME/.cache/ona-edge-security/cron.lock" /bin/sh -c 'umask 077; cd "$HOME/platform" || exit 2; run_dir=$(/usr/bin/mktemp -d /tmp/ona-edge-security.XXXXXX) || exit 2; EDGE_SECURITY_LIVE=1 EDGE_SECURITY_BASE=http://asobacorp-1.local "$HOME/platform/.venv/bin/python" -m pytest tests/security/test_edge_iso27001_behavioral.py -q --tb=short -o junit_family=legacy --junitxml="$run_dir/results.xml" > "$run_dir/pytest.log" 2>&1; result=$?; echo "exit_code=$result" > "$run_dir/status.txt"; exit "$result"'
```

Results are written to `/tmp/ona-edge-security.*`. The JUnit XML and pytest log provide evidence for audit records.

---

## Recommendations for Production

- Change `admin`/`admin` before the device joins any network
- Set `TERMINAL_API_AUTH_MODE=strict`
- Rotate `JWT_SECRET` from the default `local-basement-jwt-secret-change-me`
- Restrict physical and SSH access to authorized personnel
- Run the ISO 27001 behavioral suite regularly and archive the evidence
- Use WireGuard VPN or SSH tunneling for all remote access — do not expose service ports externally

---

## Next Steps

- [SDK Edge Mode](./sdk) — connect the SDK to your secured edge deployment
