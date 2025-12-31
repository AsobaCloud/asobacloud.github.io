---
layout: default
---
# Asoba Protocol Overview

The Asoba Protocol is a performance-collateralized intelligence and settlement layer designed to solve a fundamental coordination problem in distributed energy systems: the gap between knowing what should happen and being able to rely on it happening.

## Quick Start

To understand the Asoba Protocol, start with the [Whitepaper](./whitepaper), which provides a comprehensive technical explanation of the protocol's design, mechanisms, and regulatory positioning. The whitepaper covers:

- The coordination constraint in distributed energy systems
- How the protocol binds operational commitments to consequences
- Token role and scope
- Treasury participation and risk capacity
- Performance-indexed financing
- Regulatory positioning and enforcement modes

## What You Can Find Here

<div class="overview-cards-grid">
  <div class="overview-card">
    <h3>Whitepaper</h3>
    <p>A comprehensive technical document explaining the Asoba Protocol's design, mechanisms, and implementation. Learn how the protocol addresses coordination constraints, enables performance-collateralized commitments, and provides verifiable guarantees for distributed energy systems.</p>
    <a href="./whitepaper" class="card-link">Read Whitepaper →</a>
  </div>
</div>

## The Problem

Distributed energy systems are not primarily constrained by generation capacity or technical capability. They are constrained by **the cost of being wrong**.

Operational data is fragmented across OEM dashboards and manual reports. Municipal approval and dispatch processes are necessarily conservative because penalties, grid instability, and political accountability are asymmetric. Asset owners can optimize locally but struggle to translate that optimization into trust at the system level.

The result is delay. Decisions are postponed not because intelligence is unavailable, but because enforcement mechanisms are slow, manual, and retrospective.

## The Solution

The Asoba Protocol introduces a mechanism that binds operational commitments to consequences at the same timescale at which those commitments are made. It enables:

- **Performance-collateralized commitments**: Pre-committed collateral for activities that create shared risk
- **Automatic enforcement**: Contemporaneous enforcement based on observed performance
- **Localized failure**: Failures are absorbed where commitments are made, not propagated through the system
- **Performance-indexed financing**: Financing arrangements indexed to measured operational performance

## Key Principles

### Intelligence + Enforcement

The Asoba platform provides the intelligence layer—continuous auditable performance signals, forecast error distributions, penalty-at-risk exposure, and dispatch confidence. The protocol adds the enforcement layer, ensuring that intelligence translates into binding commitments rather than advisory recommendations.

### Selective Protocol Involvement

Not all operational decisions require protocol involvement. The protocol intervenes only when decisions cross a boundary into shared exposure—behind-the-meter export commitments, virtual power plant availability guarantees, grid-sensitive dispatch promises, and performance-backed financing.

### Narrow Token Scope

The ASB-P token exists solely to serve as collateral. It is required for participation in activities that externalize risk, is locked rather than circulated, and confers no entitlement to revenue, dividends, or governance. Tokens do not appear in customer workflows—all customers contract and pay Asoba in fiat currency.

### Two Enforcement Modes

The protocol uses two distinct enforcement modes:

- **Continuous enforcement** (intraday trading and real-time dispatch): Account-based collateral balances functioning as margin, with exposure calculated on a net basis
- **Discrete enforcement** (longer-lived obligations): Bounded commitments with defined scope and duration, backed by explicitly locked collateral

## Popular Topics

These protocol topics are frequently referenced:

- **[Whitepaper](./whitepaper)**: Complete technical documentation of the protocol
- **[Performance-Indexed Financing](./whitepaper#9-performance-indexed-financing)**: How financing is indexed to measured performance
- **[Enforcement Modes](./whitepaper#10-regulatory-positioning-and-enforcement-modes)**: Continuous vs discrete enforcement mechanisms
- **[Token Role](./whitepaper#6-token-role-and-scope)**: What the token is and is not

## Next Steps

Now that you understand the Asoba Protocol:

1. **Read the Whitepaper**: Explore the [complete whitepaper](./whitepaper) for detailed technical information
2. **Understand Enforcement**: Review [Enforcement Modes](./whitepaper#10-regulatory-positioning-and-enforcement-modes) to see how different activities are handled
3. **Learn About Financing**: Check [Performance-Indexed Financing](./whitepaper#9-performance-indexed-financing) for how capital deployment works
4. **Explore Token Design**: Read [Token Role and Scope](./whitepaper#6-token-role-and-scope) to understand the narrow scope

## See Also

- [Technical Concepts Overview](../overview) - Other technical concepts
- [Machine Learning](../machine-learning/overview) - ML models and algorithms
- [Data Standardization](../data-standardization) - Data processing details
