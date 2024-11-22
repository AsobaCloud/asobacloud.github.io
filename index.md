---
title: "Introduction"
layout: default
nav_order: 1
---

## Introduction

Our Energy-as-a-Service platform provides robust forecasting and dispatching APIs tailored for energy traders, Independent Power Producers (IPPs), and bulk electricity buyers and resellers. The platform empowers users by integrating advanced AI models for energy demand and generation forecasting, allowing optimal dispatch strategies for improved profitability and efficiency.

> This product is currently in beta, so endpoint parameters and syntax are subject to change.  An API Key is also required to make successful requests via these API endpoints.  We provide access to the API and to our most up-to-date docs for clients in our API beta program.  You can [register here](https://asoba.co/on-demand/)

![Architecture diagram of API's](https://staging-internal.asoba.co/api-architecture.png)


### Key Use Cases

- **Energy Traders**: Leverage accurate demand forecasts to optimize trades in electricity markets, maximize returns, and reduce cost of over/under supplying contracts.
- **IPPs**: Enhance generation scheduling and support demand response efforts by using our forecasting models to predict production output and off-taker demand.
- **Bulk Buyers/Resellers**: Predict market trends and align purchasing strategies with anticipated demand surges, avoiding high market prices and reducing costs.
- **Solar Asset Insurers**: Utilize forecasting data to enhance preventive maintenance reporting for asset owners, improving reliability and reducing unexpected downtime.
- **Carbon Accounting Firms**: Integrate forecasting data into carbon emissions calculations for regulatory compliance and reporting, ensuring accurate and timely submissions.

---

## Pricing

We offer monthly tiered, volume-based pricing.  For clients primarily working with low voltage off-taker, pricing tiers are based on number of individually metered off-takers we would be supporting.  For clients in the C&I production space or who are managing utility-scale off-takers, pricing tiers are based on kWh produced.

**Note**: we offer a 10% discount for contracts paid annually, up-front

### Low Voltage

| Meters        | Fee per Meter | Base Fee | Min p.m. | Max p.m. |
|---------------|---------------|----------|----------|----------|
| 1 - 25,000    | $0.06         | $250     | $250     | $1,500   | 
| 25,001 - 50,000 | $0.04       | $1,500   | $1,500   | $2,000   | 
| 50,001+       | $0.02         | $2,000   | $2,000   |          | 

#### Interactive Example
- **Number of Meters**: 45,000  
- **Fee Composition**:
  - Base Fee: $1,500  
  - Fee per Meter: $0.04  
  - **Total Fee**: $1,800  

### Commercial & Industrial

| KWh Managed  | Fee per KWh   | Base Fee | Min p.m. | Max p.m. | 
|---------------|---------------|----------|----------|----------|
| 1 - 12,500,000  | $0.00008     | $250     | $250     | $1,000   |
| 12,500,001 - 25,000,000 | $0.00006 | $1,000   | $1,000   | $1,500   | 
| 25,000,001+   | $0.00004      | $1,500   | $1,500   |          |

#### Interactive Example
- **Monthly Usage**: 18,000,000 kWh  
- **Fee Composition**:
  - Base Fee: $1,250  
  - Fee per kWh: $1,330  
  - **Total Fee**: $2,580  

---

## Conclusion 


The APIs provided by the Energy-as-a-Service platform allow developers and energy professionals to integrate powerful forecasting and dispatching functionalities into their applications. Whether you are managing DER asset portfolios, optimizing dispatch strategies, or trading in real-time markets, these APIs offer flexible and powerful tools to maximize efficiency and profitability.
