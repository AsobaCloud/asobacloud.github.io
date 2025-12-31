---
layout: default
---
# Asoba Protocol
## A Performance-Collateralized Intelligence & Settlement Layer

**Whitepaper**  
Shingai Samudzi — December 2025

## 1. Overview

Asoba is building the intelligence and coordination layer required for distributed energy systems to operate reliably under real-world constraints. The platform unifies operational, financial, and regulatory intelligence across heterogeneous assets, enabling faster fault detection, improved dispatch decisions, automated compliance, and verifiable performance guarantees.

In practice, improved intelligence alone is insufficient. Once operational decisions affect shared infrastructure—municipal grids, counterparties, or pooled capacity—the limiting factor becomes coordination under uncertainty. The Asoba Protocol addresses this second-order problem by introducing a mechanism that binds operational commitments to consequences at the same timescale at which those commitments are made.

All customers continue to contract and pay Asoba in fiat currency. Tokens do not appear in customer workflows. They operate exclusively at the protocol and treasury layer to support enforcement, guarantees, and performance-linked coordination.

## 2. The Coordination Constraint

Distributed energy systems are not primarily constrained by generation capacity or technical capability. They are constrained by the cost of being wrong.

Operational data is fragmented across OEM dashboards and manual reports. Municipal approval and dispatch processes are necessarily conservative because penalties, grid instability, and political accountability are asymmetric. Asset owners can optimize locally but struggle to translate that optimization into trust at the system level. Capital is available, but deploying it against projected performance rather than verified outcomes introduces unacceptable risk.

The result is delay. Decisions are postponed not because intelligence is unavailable, but because enforcement mechanisms are slow, manual, and retrospective.

*(Diagram: a horizontal timeline showing a commitment at T₀, performance deviation at T₁, and enforcement at T₂, with accumulated penalties and grid impact growing between T₁ and T₂. The visual reinforces that failure arises from delayed enforcement, not lack of data.)*

## 3. Intelligence Without Enforcement

The Asoba platform resolves the intelligence layer. It continuously produces auditable performance signals, including forecast error distributions, penalty-at-risk exposure, dispatch confidence, compliance state, and realized operational deltas relative to historical and counterfactual baselines.

These signals materially improve situational awareness. They do not, by themselves, change incentives.

In environments where commitments affect others, knowledge without stakes does not prevent risk transfer. A dispatch promise that fails still imposes costs on the grid regardless of how accurately that failure was predicted. Without a mechanism that ties decisions to immediate consequences, intelligence remains advisory rather than binding.

No amount of improved forecasting resolves this gap.

## 4. When Commitments Create Shared Risk

Not all operational decisions require protocol involvement. Many optimizations are private, and their consequences are fully internalized by the actor making them.

The protocol intervenes only when decisions cross a boundary into shared exposure. Behind-the-meter export commitments, virtual power plant availability guarantees, grid-sensitive dispatch promises, and performance-backed financing all introduce risks borne by parties other than the decision-maker.

At this boundary, voluntary trust and delayed enforcement do not scale. What is required is a way to ensure that the cost of failure is absorbed where the commitment is made, rather than propagated outward.

*(Diagram: a single page split vertically into two labeled halves. Left: "Decisions whose failure only affects the operator," with examples listed. Right: "Decisions whose failure imposes costs on municipalities or counterparties," with examples listed. A bold vertical line between them is labeled "Failure externalizes cost.")*

## 5. The Protocol Mechanism

The Asoba Protocol introduces pre-committed collateral for activities that create shared risk.

Participation in protocol-level activities requires locking collateral in the form of ASB-P tokens. This collateral is explicitly at risk and is adjusted automatically based on observed performance as certified by the Asoba intelligence layer. When commitments are met, collateral remains intact. When commitments fail, losses are absorbed by the posted stake.

The protocol does not attempt to prevent operational failure. Instead, it localizes its impact. Failures no longer propagate unpredictably through the system; they are resolved at the point where the commitment was made.

This mechanism functions as a programmable performance bond. Unlike traditional guarantees, enforcement is automatic and contemporaneous with observed outcomes, rather than delayed and discretionary.

*(Diagram: two side-by-side panels showing identical commitment failures. In the left panel (no collateral), penalties and instability propagate outward. In the right panel (collateralized), loss is absorbed by the committed stake and does not propagate.)*

## 6. Token Role and Scope

The ASB-P token exists solely to serve this collateral function.

It is required for participation in activities that externalize risk. It is locked rather than circulated. It confers no entitlement to revenue, dividends, or governance. It is not a payment instrument, and electricity is not tokenized.

Tokens are unnecessary for consumption of Asoba's software or services. They are required only when an actor elects to make commitments whose failure would affect others.

This narrow scope is intentional. Expanding the token's role beyond collateral weakens its function and introduces unnecessary regulatory and operational complexity.

## 7. Treasury Participation and Risk Capacity

Asoba participates in the protocol it operates.

A fixed, capped percentage of Asoba's fiat revenues is allocated to protocol participation through the acquisition and locking of ASB-P tokens. This allocation is an internal treasury decision. It does not constitute a distribution, does not create entitlement for any external party, and does not route customer funds into on-chain systems. Customers contract and pay Asoba exclusively in fiat.

The ASB-P token has a fixed supply. When Asoba allocates revenue to protocol participation, it does so by acquiring existing tokens from circulation and locking them in protocol contracts under the same conditions that apply to any other participant. No new tokens are minted as a function of revenue, usage, or performance. Treasury participation therefore carries real economic cost and is subject to the same slashing and loss mechanics as external collateral.

The role of these tokens is to provision risk capacity, not yield. The protocol can mediate only as many risk-bearing commitments as it has collateral to absorb potential failure. As platform usage grows, the volume and scope of commitments—such as performance guarantees, dispatch assurances, and performance-indexed financing—approach a hard ceiling defined by available locked collateral.

Treasury participation raises this ceiling. By committing additional tokens to protocol contracts, Asoba increases the amount of risk the system can safely intermediate without increasing systemic exposure. This allows protocol usage to scale in proportion to verified demand while preserving the principle that every commitment is backed by scarce, loss-bearing collateral.

*(Diagram: a single chart with time on the horizontal axis and "active protocol commitments" on the vertical axis; a horizontal line marks the maximum commitment capacity set by available collateral, and a second, higher line shows the increased capacity after treasury-acquired tokens are locked.)*

## 8. External Capital Participation

External parties may participate in the protocol only by assuming defined categories of risk.

There is no passive liquidity provision. Tokens acquired by external participants must be locked into active protocol roles, such as backing guarantees or supporting performance-indexed financing. Participants are exposed to slashing and explicitly accept protocol-level risk.

Compensation, where applicable, is variable and usage-dependent. There are no fixed yields, revenue shares, or guaranteed returns. Capital is compensated for absorbing risk and enabling coordination, not for mere presence.

This structure aligns participation with underwriting rather than speculation.

## 9. Performance-Indexed Financing

The protocol enables financing arrangements indexed to measured operational performance rather than projected cash flows.

Capital is deployed to enable operational changes—such as control-layer upgrades, battery integration, or accelerated rollout—that are expected to affect specific, predefined performance metrics. Repayment is calculated as a function of realized improvement relative to baseline, as continuously certified by the Asoba platform.

If uplift underperforms expectations, repayment adjusts downward proportionally. If uplift fails to materialize, repayment converges toward zero. Downside is expressed as reduced cash flow rather than binary default, and risk is bounded through collateral and predefined payout caps.

This converts long-tail uncertainty into continuously settled variance. The innovation is not financial novelty, but the compression of feedback between performance and settlement.

## 10. Regulatory Positioning and Enforcement Modes

The protocol is designed to align with existing regulatory and institutional frameworks by clearly separating operational enforcement from contractual commitment.

Municipalities and customers never hold or transact in tokens. All municipal, customer, and counterparty contracts are denominated and settled in fiat currency under conventional legal frameworks. Tokens function solely as internal performance collateral within the protocol and are not presented or marketed as financial products. There is no retail solicitation and no public investment offering.

A central design choice supporting this posture is the protocol's use of two distinct enforcement modes, each matched to a different class of activity.

**Intraday trading and real-time dispatch** operate under a continuous enforcement mode. In this mode, participants maintain account-based collateral balances that function as margin. Exposure is calculated on a net basis and updated continuously as dispatch decisions and trades occur. Enforcement is fast, automatic, and proportional to current exposure. No non-fungible instruments are created, transferred, or settled in this context. This model mirrors established practices in power markets, exchanges, and clearing systems, where real-time risk is managed through margining rather than contract issuance.

**Longer-lived obligations**—such as availability guarantees, performance-backed financing, and municipal service commitments—operate under a discrete enforcement mode. In this mode, each obligation is instantiated as a bounded commitment with defined scope and duration, backed by explicitly locked collateral. These commitments are represented internally as non-fungible instruments that record the terms, collateral backing, and lifecycle state of the obligation. Enforcement occurs through slashing or release of collateral as the commitment is fulfilled or expires, creating a clear audit trail over time.

This separation ensures that each class of activity is enforced using mechanisms appropriate to its risk profile and time horizon. Continuous exposure is managed through margin and netting, avoiding unnecessary complexity and latency. Discrete commitments are managed through auditable instruments that mirror familiar constructs such as performance bonds and guarantees.

By aligning enforcement mechanisms with existing financial and operational norms, the protocol automates established institutional practices rather than attempting to replace them. In regulated environments, this conservatism is a feature: it minimizes novelty where it would create friction, while still enabling tighter, more reliable enforcement than traditional manual processes allow.

*(Diagram: a two-panel layout. The left panel is labeled "Continuous Enforcement (Intraday)" and shows a single margin account with a fluctuating net exposure line constrained by a collateral balance. The right panel is labeled "Discrete Enforcement (Commitments)" and shows several distinct commitment blocks, each labeled with scope and duration, each locking a fixed amount of collateral, and each moving through a simple lifecycle from issuance to expiry.)*

## 11. Conclusion

The Asoba Protocol is designed to solve a specific and persistent problem in distributed energy systems: the gap between knowing what should happen and being able to rely on it happening.

Across modern grids, intelligence has improved faster than coordination. Forecasts are more accurate, telemetry is richer, and optimization is more sophisticated. Yet decisions that affect shared infrastructure are still enforced through delayed contracts, manual oversight, and asymmetric penalties. The result is a system that defaults to caution, not because participants are irrational, but because the cost of being wrong is poorly contained.

The protocol addresses this failure mode directly. It introduces a programmable layer of accountability that binds operational commitments to contemporaneous consequences. Risk is absorbed where it is created, rather than propagated outward through the system. Enforcement shifts from retrospective and discretionary to immediate and mechanical, without requiring new currencies, new markets, or new burdens on municipalities and customers.

Tokens play a narrow but essential role in this design. They function as scarce, loss-bearing collateral that provisions risk capacity. They are required only when commitments externalize risk, and they are subject to slashing under the same conditions for all participants, including Asoba itself. They do not represent ownership, yield, or governance, and they do not appear in customer workflows. Their purpose is enforcement, not speculation.

By separating continuous intraday exposure from discrete, longer-lived commitments, the protocol aligns each class of activity with enforcement mechanisms already familiar to regulators and institutions. Real-time operations are governed through margin and net exposure. Guarantees, financing arrangements, and service obligations are governed through bounded commitments with clear lifecycle semantics. This separation minimizes novelty where it would create friction, while still enabling a level of precision and reliability that traditional processes cannot achieve.

The intended end state is a distributed energy system in which coordination scales with intelligence rather than lagging behind it. Municipalities receive enforceable guarantees without adopting new technical or financial complexity. Asset owners and operators gain the ability to make higher-value commitments without exposing the system to uncontrolled downside. Capital can be deployed against measured performance rather than optimistic projections, with risk resolved incrementally rather than through dispute.

In that end state, failures still occur—but they are contained, understood, and paid for locally. Growth is no longer capped by institutional hesitation or opaque risk, but by the availability of real, scarce collateral willing to stand behind commitments. Trust becomes optional, not foundational.

This is not an attempt to reimagine energy markets. It is an attempt to make them work as they already claim to—reliably, transparently, and at scale.
