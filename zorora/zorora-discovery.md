---
title: "Discovery"
layout: default
nav_order: 2
parent: "Zorora"
---

# Discovery

Discovery is Zorora's Leaflet-based geospatial view for finding candidate sites — mineral deposits, generation assets, transmission zones, substations, and supply areas — before they enter the Scouting pipeline.

<img src="{{ site.baseurl }}/assets/images/zorora-discovery-map.png" alt="Zorora Discovery map showing deposits, generation assets, and concessions across Southern Africa" class="screenshot">
<p class="screenshot-caption">Discovery's satellite view with VIIRS Nightlights, Deposits, Concessions, and Generation layers toggled on</p>

## Map Layers

| Layer | Source | Shown as |
|-------|--------|----------|
| **Deposits** | USGS MRDS | Circle markers, colored by commodity |
| **Generation** | GEM (Global Energy Monitor) | Triangle markers, colored by technology |
| **Concessions** | GCCA transmission zone data | Polygon overlays |
| **Substations & supply areas** | GCCA | Point markers with viability scoring overlays |
| **VIIRS Nightlights** | NASA | Raster overlay for load-center proxy |
| **Borders & Labels / Railways** | Basemap | Toggleable reference layers |

Use the **Jump to lat, lon** field to center the map on a known coordinate, or pan and zoom directly. Layer visibility is controlled from the panel in the top-right of the map.

## From Map to Site Card

Clicking any marker opens a popup with the asset's core attributes — capacity, technology, operator, and construction status for generation assets; commodity and deposit type for mineral deposits.

<img src="{{ site.baseurl }}/assets/images/zorora-discovery-popup.png" alt="Zorora Discovery popup for a solar farm showing capacity, status, and Research/Diligence buttons" class="screenshot">
<p class="screenshot-caption">Every asset popup exposes one-click hand-off into Research or Diligence</p>

Every popup carries two actions:

- **Research** — opens a Deep Research query scoped to that asset, pulling in the same regulatory and market sources used elsewhere in Zorora
- **Diligence** — launches a diligence search against that specific site

## Handing Off to Scouting

Discovery is where a candidate is *found*. [Scouting](/zorora-scouting) is where it's *tracked and scored*. The two are meant to be used together:

1. Locate a candidate site in Discovery — by browsing the map or jumping to known coordinates
2. Open the asset popup and review its baseline attributes
3. Push the site into Scouting's **Identified** column, or launch a Research/Diligence query directly if you need more context first
4. From there, Scouting takes over: resource, grid, regulatory, and financial scoring, then a full feasibility study

This means Discovery's map counts double as a sourcing tool: as of this writing, it surfaces 1,144 mapped mineral deposits and 739 generation assets across the SADC region, all of which are eligible to enter the Scouting pipeline directly from the map.

## Related

- [Scouting](/zorora-scouting) — the pipeline a Discovery candidate feeds into
- [Data Sources](/zorora-data-sources) — USGS MRDS, GEM, and GCCA provider detail
- [Deep Research](/zorora-deep-research) — what a Research hand-off from a map popup produces
