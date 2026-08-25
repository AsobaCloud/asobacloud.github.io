---
title: "Global View"
layout: default
nav_order: 5
parent: "Zorora"
---

# Global View

Global View has two top-level tabs over the same Leaflet/CARTO map styling: **Indicators**, an interactive country map for market and news data, and **Shipping**, live AIS tanker tracking.

## Indicators

<img src="{{ site.baseurl }}/assets/images/zorora-global-indicators.png" alt="Zorora Global View Indicators tab showing a country popup for the United States with topic breakdown and commodity dataset cards" class="screenshot">
<p class="screenshot-caption">Click any country to filter by topic and source; commodity, FX, and energy series display as cards below the map</p>

Clicking a country on the map opens a popup with:

- Article count for that country
- A topic breakdown (e.g. `economy_politics`, `energy`, `ai`, `geopolitics`) with counts per topic

Below the map, toggle between **Commodity Datasets** — live FRED-backed commodity, FX, and treasury-rate cards with day-over-day change — and **Articles**, the underlying geo-tagged news feed. Article geo-tagging coverage is shown as a percentage at the top of the view.

## Shipping

<img src="{{ site.baseurl }}/assets/images/zorora-global-shipping.png" alt="Zorora Global View Shipping tab showing clustered AIS vessel markers and a vessel detail popup" class="screenshot">
<p class="screenshot-caption">Marker clustering groups nearby vessels; clicking a cluster or vessel opens live AIS detail</p>

The Shipping tab tracks live AIS tanker positions via TankerMap, with:

- **Vessel type** and **Cargo** filters
- **Cluster markers** toggle, for dense shipping lanes
- A manual **Refresh** control, with the last-updated timestamp shown alongside the vessel count

Clicking an individual vessel marker shows its IMO number, flag, vessel type, deadweight tonnage, cargo status, speed, destination, and status (e.g. "At anchor"), along with the AIS observation timestamp.

> The live vessel API (`GET /api/shipping/vessels/live`) requires the **Professional** tier or above. See [Authentication & Subscriptions](/zorora-authentication).

## Related

- [Data Sources](/zorora-data-sources) — FRED commodity/FX feeds and TankerMap AIS data
- [Authentication & Subscriptions](/zorora-authentication) — tier requirements for live Shipping data
- [Deep Research](/zorora-deep-research) — staging an Indicators article or dataset into a research query
