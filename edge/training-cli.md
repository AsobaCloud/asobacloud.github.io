---
title: "Training CLI"
layout: default
nav_order: 3
parent: "Edge Deployment"
---

# Training CLI

`ona_train.py` wraps the entire ML pipeline into one-line commands. It manages memory automatically — stopping non-essential containers before each operation and restarting them afterward.

```bash
python3 ~/platform/scripts/local/ona_train.py <command> --customer <name> [options]
```

---

## Commands

| Command | Purpose |
|---|---|
| `seed-control` | Initialize `ona_control` with customer + asset records |
| `build` | Build lstm-prep and lstm-train Docker images |
| `prep` | Run data preparation: PostgreSQL telemetry → numpy artifacts (45+ features, 24-hour sliding windows) |
| `train` | Train LSTM/TCN model: numpy arrays → model + challenger |
| `metrics` | Inspect Gate 4 metrics and model status |
| `promote` | Force-promote challenger to production (if Gate 4 failed) |
| `forecast` | Request a forecast from forecastingApi |
| `rollback` | Restore the previous production model |
| `freshness` | Check whether prep artifacts are fresh enough to skip re-running prep |

All commands require `--customer <name>`.

---

## Key Options

| Option | Applies To | Description |
|---|---|---|
| `--customer` | All | Customer/site name (required) |
| `--loss-fn` | `train` | Loss function (`mse`, `mae`, `huber`) |
| `--loss-alpha` | `train` | Alpha for asymmetric loss |
| `--attention` | `train` | Enable temporal attention layer |
| `--tz-name` | `prep`, `train` | Site timezone (e.g. `Africa/Johannesburg`) |
| `--epochs` | `train` | Training epochs |
| `--batch-size` | `train` | Batch size |
| `--target-date` | `forecast` | ISO 8601 date for date-parameterized forecasting (`YYYY-MM-DD`) |

---

## Training Flow

### 1. Prep — feature engineering

```bash
python3 ~/platform/scripts/local/ona_train.py prep --customer Sibaya
```

Reads 5-min telemetry from PostgreSQL, engineers 45+ features (solar zenith, clearness index, weather lags, MPPT power, irradiance), creates 24-hour sliding-window sequences, and writes numpy artifacts to `/var/ona/artifacts/training_data/Sibaya/`.

Memory required: ~6 GB. The CLI stops heavy services automatically before starting.

### 2. Train — model training

```bash
python3 ~/platform/scripts/local/ona_train.py train --customer Sibaya
```

Loads numpy arrays, trains an LSTM (or TCN) model with optional temporal attention, evaluates against Gate 4 thresholds:

| Gate 4 Threshold | Must Pass |
|---|---|
| nRMSE | < 0.15 |
| R² | ≥ 0.80 |
| Diurnal sanity | Pass |

If Gate 4 passes, the model is auto-promoted to production. Memory required: ~7 GB.

### 3. Check metrics

```bash
python3 ~/platform/scripts/local/ona_train.py metrics --customer Sibaya
```

Prints Gate 4 metrics, challenger status, and current production model details.

### 4. Force promote (if Gate 4 failed)

```bash
python3 ~/platform/scripts/local/ona_train.py promote --customer Sibaya
```

### 5. Request a forecast

```bash
# Next N hours from now
python3 ~/platform/scripts/local/ona_train.py forecast --customer Sibaya

# Date-parameterized (backtesting or up to 15 days forward)
python3 ~/platform/scripts/local/ona_train.py forecast --customer Sibaya --target-date 2026-10-01
```

Calls the forecastingApi `/forecast` endpoint with the trained model.

### 6. Rollback

```bash
python3 ~/platform/scripts/local/ona_train.py rollback --customer Sibaya
```

Restores the previous production model from archives.

---

## Anomaly Model Training

The anomaly detection system uses a LeWorldModel (JEPA) — a Joint-Embedding Predictive Architecture that learns normal inverter dynamics in latent space.

### Build the training container

```bash
docker compose -f ~/docker-compose.local.yml --profile ml-train build anomaly-model-train
```

### Run training

```bash
docker compose -f ~/docker-compose.local.yml --profile ml-train run --rm \
  anomaly-model-train \
  --customer-id Sibaya \
  --asset-id INV-1000000054495190
```

This reads 5-min telemetry from PostgreSQL for the specified inverter, builds a 12-feature observation vector (power, temperature, voltage, efficiency, MPPT power, daily capacity, irradiance, wind speed, inverter state, run state, hour_sin/cos), trains a ~216K parameter model, and saves a per-inverter artifact bundle to the local artifact store.

The bundle contains model weights, normalizer, anomaly thresholds, and metadata. The `terminalApi /detect` endpoint automatically loads it the next time detection runs for that asset.

---

## Running Behavioral Tests

```bash
export LOCAL_E2E=1
export TELEMETRY_BACKEND=postgres
export CONTROL_PLANE_BACKEND=postgres
python3 -m pytest -m local_e2e -v --tb=short \
  tests/local_e2e/test_installed_stack_e2e_behavioral.py
```

---

## Next Steps

- [Security](./security) — ISO 27001 test suite and auth model
- [SDK Edge Mode](./sdk) — query the trained models via the SDK
