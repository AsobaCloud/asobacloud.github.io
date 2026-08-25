---
title: "Scouting"
layout: default
nav_order: 3
parent: "Zorora"
---

# Scouting

Scouting is Zorora's kanban pipeline for taking a candidate site from first identification through to a go/no-go decision, with automated feasibility scoring at every stage. It's where a site found in [Discovery](/zorora-discovery) gets tracked, scored, and diligenced.

<div class="page-header">
  <div class="version-badge">
    <span class="version-label">Tier</span>
    <span class="version-value">Enterprise</span>
  </div>
</div>

> Scouting is gated to the **Enterprise** plan. On lower tiers, the hosted UI shows a static Scouting shell with an upgrade prompt instead of the live pipeline — entitlement is checked reactively against the `features` field returned by `/api/auth/me`.

## The Pipeline

Every site moves through five stages:

| Stage | What happens |
|-------|--------------|
| **Identified** | A candidate has been added, typically from a Discovery map popup or manual entry |
| **Scored** | Initial resource and grid scoring is complete |
| **Feasibility** | A full automated feasibility study has run across all five dimensions |
| **Diligence** | Brownfield acquisition diligence or greenfield development diligence is underway |
| **Decision** | The site has been approved, rejected, or shelved |

Sites can be dragged between stages as work progresses; each move is tracked as part of the site's history.

## Site Scoring

Greenfield and BESS sites are scored using:

- **NASA POWER** resource data — solar irradiance, wind speed, and temperature
- **Grid proximity** — distance to nearest substation and available capacity
- **DAM arbitrage spreads** — from SAPP day-ahead market pricing
- **TOU tariff differentials** — time-of-use rate spreads relevant to storage economics

Brownfield sites entering the pipeline mid-stream (e.g. an existing asset under acquisition consideration) skip straight to feasibility or diligence scoring rather than the greenfield resource-scoring path.

## Automated Feasibility Studies

Once a site reaches the **Feasibility** stage, Zorora runs a study across five dimensions:

| Dimension | What it evaluates |
|-----------|---------------------|
| **Production** | Resource quality and expected capacity factor |
| **Trading** | Market pricing, arbitrage spread, and revenue potential |
| **Grid** | Interconnection distance, capacity availability, and constraint risk |
| **Regulatory** | Licensing requirements and jurisdiction-specific regulatory exposure |
| **Financial** | Indicative economics given the above inputs |

Each dimension returns an LLM-synthesized conclusion, a risk assessment, and a confidence rating — not just a pass/fail flag. Where evidence is mixed or a source conflict is unresolved (see [Deep Research](/zorora-deep-research)), the study reflects that in the confidence rating rather than forcing a verdict.

## From Discovery to a Decision

The full workflow, start to finish:

1. A candidate is located and pushed into Scouting from [Discovery](/zorora-discovery), landing in **Identified**
2. Baseline resource and grid scoring moves it to **Scored**
3. Running the automated feasibility study moves it to **Feasibility**, producing the five-dimension report above
4. Diligence search (see [Diligence Search](/zorora-deep-research#diligence-search)) against the specific site — tariffs, regulations, performance, vendors — moves it to **Diligence**
5. The site is marked **Decision** once approved, rejected, or shelved

## Related

- [Discovery](/zorora-discovery) — where candidates are found before entering the pipeline
- [Deep Research](/zorora-deep-research) — the diligence and research queries scoped to a Scouting site
- [Data Sources](/zorora-data-sources) — NASA POWER, SAPP, and grid data underlying scoring
- [Authentication & Subscriptions](/zorora-authentication) — tier gating and the `features` entitlement flag
