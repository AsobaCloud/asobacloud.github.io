---
title: "Zorora"
layout: default
---

<div class="page-header">
  <h1>Zorora</h1>
  <div class="version-badge">
    <span class="version-label">License</span>
    <span class="version-value">AGPLv3+ | Commercial</span>
    <span class="version-separator">|</span>
    <span class="version-label">Repo</span>
    <a href="https://github.com/AsobaCloud/zorora" class="version-value" target="_blank">GitHub →</a>
  </div>
</div>

<div class="quick-start-section">
  <a href="https://zorora.asoba.org" class="quick-start-button" target="_blank">
    Launch Zorora
  </a>
  <p class="quick-start-subtext">
    A local-first energy intelligence platform for acquisition diligence, regulatory monitoring, geospatial asset discovery, and market analysis across the SADC region. Runs against local LLM endpoints — all data stays on your machine.
  </p>
</div>

## Platform Modes

Zorora provides seven integrated intelligence modes. Every component below is documented in the pages listed under **Zorora** in the sidebar.

<img src="{{ site.baseurl }}/assets/images/zorora-ui.png" alt="Zorora Web UI" class="screenshot">

| Mode | What it does | Documented in |
|------|---------------|---------------|
| **Deep Research** | Multi-source research with credibility scoring, citation graphs, and evidence-grounded synthesis | [Deep Research](/zorora-deep-research) |
| **Scouting** | 5-stage kanban pipeline (identified → scored → feasibility → diligence → decision) for brownfield, greenfield, and BESS site evaluation, with automated feasibility studies across five dimensions | [Scouting](/zorora-scouting) |
| **Discovery** | Geospatial view for mineral deposits, generation assets, transmission zones, and substations with viability scoring | [Discovery](/zorora-discovery) |
| **Regulatory** | Tracks RPS, utility rates, generation assets, and regulatory environments by jurisdiction (EIA, OpenEI, NERSA, IPP Office) | [Regulatory Monitoring](/zorora-regulatory) |
| **Global View** | Country-level market indicators and live AIS tanker tracking (Shipping requires Professional tier) | [Global View](/zorora-global-view) |
| **Digest** | Staged synthesis of articles and market datasets into structured energy market and policy digests | [Digest](/zorora-digest) |
| **Alerts** | Configurable monitoring on topics and sources, with execution history | [Alerts](/zorora-alerts) |

Cross-cutting concerns are documented separately:

- [**Data Sources**](/zorora-data-sources) — 80 market series across 6 background-refreshed providers, plus on-demand sources (NASA POWER, USGS MRDS, TankerMap, SEC EDGAR, and more)
- [**Deployment**](/zorora-deployment) — Local, Docker, and Enterprise (Ona Platform/Fargate) setup, including EFS persistence for hosted deployments
- [**Authentication & Subscriptions**](/zorora-authentication) — JWT auth flow, tier gating, and the Explorer/Professional/Enterprise plans

## Key Features

### Grounded Deep Research

Structured research reports with inline citations, source-conflict detection, and LLM-driven chart selection embedded in synthesis. Research memory persists thumbs up/down feedback and chat threads to SQLite across restarts, and injects scouting feasibility findings as internal sources.

### Automated Site Scouting

Greenfield and BESS sites are scored using NASA POWER resource data, grid proximity, DAM arbitrage spreads, and TOU tariff differentials. Each site moves through a 5-stage pipeline with automated feasibility studies across production, trading, grid, regulatory, and financial dimensions — each with an LLM-synthesized conclusion, risk assessment, and confidence rating.

### Live Regional Market Data

80 market series across FRED, yfinance, World Bank, Ember Energy, SAPP, and Eskom, refreshed automatically via background threads. SAPP and Eskom feeds update hourly; an in-memory cache with a 60-second TTL keeps the market/latest endpoint fast.

### Diligence Search

Brownfield acquisition due diligence with domain-specific analysis — tariffs, regulations, performance, vendors — and automated diligence reports. Supports an optional local SME corpus (Markdown or PDF) for diligence-mode Deep Research.

### MCP Server

Thin-client Model Context Protocol tools (`list_indicators`, `get_observations`, `get_latest`, `get_market_summary`, `refresh_data`) over Zorora's market APIs. See [`mcp_server/README.md`](https://github.com/AsobaCloud/zorora/blob/main/mcp_server/README.md).

### Multi-Provider LLM

Local models via LM Studio, plus HuggingFace, OpenAI, Anthropic, and self-hosted Nehanda/vLLM adapters with specialized model roles (reasoning, codestral, vision, search).

## Quick Start

```bash
pip install git+https://github.com/AsobaCloud/zorora.git
zorora web
```

Or from source:

```bash
git clone https://github.com/AsobaCloud/zorora.git
cd zorora
pip install -e .
zorora web
```

See the [Getting Started](/zorora-getting-started) page for the full setup guide, including local SME corpus configuration and Docker deployment.

## License

Dual-licensed:

- AGPLv3+ for open-source use
- Commercial license available from AsobaCloud for organizations that want to commercialize without AGPL reciprocity obligations

See [LICENSE.md](https://github.com/AsobaCloud/zorora/blob/main/LICENSE.md).
