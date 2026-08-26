---
title: "Data Sources"
layout: default
nav_order: 8
parent: "Zorora"
---

# Data Sources

Zorora ingests 80 market series across 6 providers, refreshed automatically via background threads.

## Background-Refreshed Providers

| Provider | Series | Frequency | Coverage |
|----------|--------|-----------|----------|
| **FRED** | 13 | Daily | Oil, gas, coal, uranium, treasuries, FX (ZAR/USD, ZMW/USD), policy rates |
| **yfinance** | 12 | Daily | Gold, copper, silver, platinum, palladium, aluminum, iron ore, lithium/uranium/rare earth ETFs |
| **World Bank** | 18 | Annual | SADC electricity indicators — coal %, renewables %, T&D loss %, access %, per-capita consumption for ZA/ZW/MZ/ZM |
| **Ember Energy** | 8 | Monthly | South Africa and Zimbabwe coal, wind, solar generation, demand, total gen, renewables share |
| **SAPP** | 6 | Hourly | DAM prices for RSA-North, RSA-South, Zimbabwe in USD and ZAR |
| **Eskom** | 27 | Hourly | System demand (4 series), RE generation (4 series), station-level build-up (19 series) |

## On-Demand Sources

These are fetched per request rather than background-refreshed:

| Source | Used for |
|--------|----------|
| **NASA POWER** | Solar irradiance, wind speed, temperature — [Scouting](/zorora-scouting) greenfield site scoring |
| **USGS MRDS** | Mineral deposit locations — [Discovery](/zorora-discovery) map |
| **TankerMap** | Live AIS vessel positions — [Global View](/zorora-global-view) Shipping tab (`GET /api/shipping/vessels/live`) |
| **Newsroom (Ona)** | Curated energy news articles, 1-hour cache |
| **Academic search** | PubMed, OpenAlex, Semantic Scholar — [Deep Research](/zorora-deep-research) |
| **Brave Search** | Web and news results — [Deep Research](/zorora-deep-research) |
| **World Bank Documents** | Policy and development reports |
| **Congress.gov / Federal Register** | US policy and regulatory filings |
| **SEC EDGAR** | Corporate filings and financial statements |
| **Local SME corpus** | Optional Markdown/PDF knowledge base for diligence-mode research — see [Deep Research: Local SME Corpus](/zorora-deep-research#local-sme-corpus-diligence) |

## Caching

The market/latest endpoint sits behind an in-memory cache with a 60-second TTL, which reduces what would otherwise be 160+ SQLite queries down to a single cache hit on a warm read.

## Related

- [Scouting](/zorora-scouting) — how NASA POWER and SAPP feed site scoring
- [Deep Research](/zorora-deep-research) — how these sources are cited in synthesis
- [Regulatory Monitoring](/zorora-regulatory) — EIA, OpenEI, NERSA, and IPP Office coverage
