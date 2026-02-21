---
title: "Forecasting Models"
layout: default
nav_order: 3
parent: "Learn"
---
# Technical Concepts: Machine Learning Models

The Ona Intelligence Layer uses a sophisticated ensemble of machine learning models to provide highly accurate forecasts and detect anomalies in your energy assets. This document provides a high-level overview of the key models we use.

This content is designed for **Developers** and technical users.

## The Challenge of Energy Forecasting

Forecasting energy production is a complex task. It is influenced by a wide range of factors, including:

*   **Weather**: Cloud cover, temperature, and other meteorological conditions have a major impact on solar production.
*   **Time of Day and Season**: The position of the sun in the sky is a primary driver of production.
*   **Asset-Specific Factors**: The age, location, and maintenance history of your equipment all play a role.
*   **Grid-Level Events**: Curtailment, grid outages, and other external factors can affect production.

No single machine learning model can effectively capture all of these complexities.

## Our Solution: An Ensemble of Models

To address this challenge, we use an ensemble of different models, each with its own strengths. Our platform automatically selects the best model or combination of models for your specific use case.

### 1. Long Short-Term Memory (LSTM) Networks

*   **What they are**: LSTMs are a type of recurrent neural network (RNN) that is particularly well-suited for time-series forecasting. They can learn long-term dependencies in the data, making them effective at capturing seasonal patterns.
*   **How we use them**: LSTMs form the core of our forecasting engine. We use them to model the complex, non-linear relationships between weather, time of day, and energy production. We also use them for our "cross-portfolio transfer learning," as described in the [Sibaya Casino use case](./../use-cases/sibaya-casino).

### 2. Autoregressive Integrated Moving Average (ARIMA)

*   **What it is**: ARIMA is a classical statistical model for time-series forecasting. It is particularly effective at modeling trends and seasonality in the data.
*   **How we use it**: We use ARIMA for data reconstruction and interpolation, as demonstrated in the [Cummins Portfolio use case](./../use-cases/cummins-portfolio). It allows us to intelligently fill in missing data points with a high degree of accuracy.

### 3. Anomaly Detection Models

In addition to forecasting, we use a variety of unsupervised learning models to detect anomalies in your data that may indicate an equipment malfunction or other issue. These models can identify subtle deviations from normal operating patterns that would be impossible for a human to detect.

## Continuous Improvement

Our data science team is constantly experimenting with new models and techniques to improve the accuracy of our forecasts and the reliability of our platform. As we continue to ingest more data from more assets, our models become more and more intelligent, creating a virtuous cycle of continuous improvement.
