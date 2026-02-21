---
title: "Energy Trading"
layout: default
nav_order: 3
parent: "Patterns"
---

# Energy Trading: Arbitrage in Intraday Markets

This use case demonstrates how to leverage AI-powered forecasting and optimization to execute profitable energy trading strategies in intraday markets. By predicting price volatility and identifying arbitrage opportunities, energy asset owners can maximize revenue from their battery storage systems.

## The Challenge: Navigating Volatile Energy Markets

Intraday energy markets are characterized by rapid price fluctuations. To be profitable, traders need to make high-certainty decisions on when to buy (charge) and when to sell (discharge) energy. This requires:
- Accurate price forecasting.
- A deep understanding of market dynamics.
- The ability to make optimal decisions in near real-time.

## The Solution: AI-Powered Trading Strategy

Our platform provides a complete solution for energy trading, from data ingestion and forecasting to optimization and economic analysis. This demo showcases a strategy for a battery energy storage system (BESS) without any associated solar or load, focusing purely on grid arbitrage.

### 1. Price Forecasting

The first step is to generate an accurate price forecast. We use an ensemble of models, including ARIMA, Prophet, and LSTM, to create a robust and reliable forecast. The ensemble approach allows us to capture different aspects of the price dynamics, from long-term trends to short-term volatility.

```python
# Run the three forecasting methods
# This may take a minute
try:
    from core.marketPriceForecast.generate_price_forecast import run_forecasts
    print("✨ Running ARIMA / Prophet / LSTM – this may take a minute")
    arima_df, prophet_df, lstm_df = run_forecasts()
except Exception as e:
    print(f"✨ Import failed: {e}")
    # Fallback: create our own run_forecasts function
    print("✨ Using fallback direct imports")
    
    # Import the main functions directly
    try:
        # Try fully qualified imports
        from core.marketPriceForecast.forecast_price import main as arima_forecast
        from core.marketPriceForecast.forecast_price_prophet import main as prophet_forecast
        from core.marketPriceForecast.forecast_price_lstm import main as lstm_forecast
    except ImportError:
        # Try simple imports if we're already in the right directory
        from forecast_price import main as arima_forecast
        from forecast_price_prophet import main as prophet_forecast
        from forecast_price_lstm import main as lstm_forecast
    
    # Run the forecasts
    print("✨ Running ARIMA forecast...")
    arima_df = arima_forecast()
    print("✨ Running Prophet forecast...")
    prophet_df = prophet_forecast()
    print("✨ Running LSTM forecast...")
    lstm_df = lstm_forecast()
```

The output is a realistic price forecast that captures the inherent volatility of the market.

![Price Forecast](/assets/images/price_forecast.png)

### 2. Dispatch Optimization

With the price forecast in hand, the next step is to determine the optimal charging and discharging schedule for the battery. Our dispatch optimization model takes into account various constraints, including battery capacity, charge/discharge rates, and grid fees, to maximize profitability.

```python
# Sweep battery capacities for arbitrage analysis
battery_capacities = [50, 100, 150, 200, 250, 300]  # kWh
rows = []

for cap in battery_capacities:
    # Configuration dictionary with arbitrage-focused weights and realistic constraints
    cfg = {
        # Battery parameters (more conservative)
        "battery_capacity": cap,
        "battery_min_soc": 0.3,  # More conservative min SOC (30% vs 20%)
        "battery_max_soc": 0.85,  # More conservative max SOC (85% vs 90%)
        "battery_charge_eff": 0.92,  # Lower efficiency (92% vs 95%)
        "battery_discharge_eff": 0.92,  # Lower efficiency (92% vs 95%)
        "battery_max_charge_rate": cap * 0.5,  # 0.5C rate (50% of capacity per hour)
        "battery_max_discharge_rate": cap * 0.5,  # 0.5C rate (50% of capacity per hour)
        # Grid trading must be enabled for arbitrage
        "enable_grid_trading": True,
        # Diesel is turned off but required by the model
        "diesel_capacity": 0.0,
        "diesel_min_output": 0.0,
        "diesel_price": 0.35,
        "diesel_co2": 0.0,
        # Miscellaneous parameters
        "initial_soc": 0.5,
        "heuristic_iterations": 10,  # More iterations for better convergence
        "perturbation_delta": 0.05
    }
    
    # Set weights specifically for arbitrage
    cfg = set_weights_for_objective("arbitrage", cfg)
    
    # ... optimization logic ...
```

### 3. Economic Analysis

The final step is to analyze the economic viability of the trading strategy. We calculate key metrics such as Gross Profit, Net Profit, and Return on Investment (ROI) for different battery capacities.

The results show that even with a pure arbitrage strategy, a well-sized battery system can be profitable. The analysis also highlights the importance of considering factors like battery degradation and rental costs.

![Profit Breakdown](/assets/images/profit_breakdown.png)

## Key Findings

- **Asset-Free Trading:** It's possible to achieve profitability with a pure arbitrage strategy, without the need for co-located solar or load. This provides a high-return, low-capital entry into the energy market.
- **Hybrid Systems for Stability:** While asset-free trading is profitable, hybrid systems (Solar + Battery + Trading) offer more stable returns and additional value streams like self-consumption and peak shaving.
- **Optimal Sizing is Crucial:** The profitability of an energy trading strategy is highly dependent on the size of the battery. Our analysis found that a 100-150 kWh battery was optimal for the analyzed load profile.

This use case demonstrates the power of our platform to turn market volatility into profitable opportunities. By combining accurate forecasting with intelligent dispatch, we enable our users to navigate the complexities of the energy market with confidence.
