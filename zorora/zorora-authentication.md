---
title: "Authentication & Subscriptions"
layout: default
nav_order: 10
parent: "Zorora"
---

# Authentication & Subscriptions

The hosted platform uses the Ona Platform auth system with JWT tokens and multi-tier subscription gating.

## Tiers

| Tier | Price | Research Queries | Features |
|------|-------|-------------------|----------|
| **Explorer** | $20/mo | 10/month | Basic research, market intel, news |
| **Professional** | $99/mo | Unlimited | Full research, alerts, chat, scouting, Global View Shipping |
| **Enterprise** | $299/mo | Unlimited | All features + API access, custom integrations |

## Authentication Flow

1. **Signup** — the user creates an account via `POST /api/auth/signup`, stored in the `ona-platform-users` DynamoDB table
2. **Tier Selection** — the user picks a tier and is redirected to Stripe checkout with `client_reference_id=user_id`
3. **Payment** — Stripe processes payment and fires a `checkout.session.completed` webhook
4. **Activation** — the webhook Lambda updates the DynamoDB `subscriptions` field with tier info
5. **Polling** — the frontend polls `/api/auth/me` until the subscription appears, to handle the activation race condition

## Gated vs. Free Actions

**Free** (no login required):

- Browse Global View Indicators / market data
- Read news intel

**Gated** (requires an active subscription):

- Start research — `POST /api/research`
- Chat with research — `POST /api/research/<id>/chat`
- Create alerts — `POST /api/alerts`
- Scouting actions — `POST /api/scouting/*` (pipeline vs. upgrade card is driven by the `features` field from `/api/auth/me`)
- Live Shipping vessels — `GET /api/shipping/vessels/live` (Professional tier or above)
- Settings changes

## Local Development

Local mode bypasses auth entirely — every feature is available without login. Auth middleware only enforces gating when the `ONA_JWT_SECRET` environment variable is present; the production ECS task definition includes it from SSM.

## Related

- [Deployment](/zorora-deployment) — where `ONA_JWT_SECRET` is configured in production
- [Scouting](/zorora-scouting) — how the `features` entitlement flag toggles the pipeline vs. upgrade card
- [Global View](/zorora-global-view) — Shipping tier requirement
