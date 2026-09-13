// Project metadata for the Projects page.
window.PROJECTS = [
  {
    folder: "Simpsons-DaVinci",
    name: "Simpsons DaVinci",
    description: "A comparative study of generative models — DCGAN, Wasserstein GAN, an Autoencoder-GAN, and StyleGAN2 — trained to synthesize images in The Simpsons' cartoon style. Benchmarks training stability and output quality across architectures rather than optimizing a single model.",
    tags: ["Python", "PyTorch", "GANs", "Computer Vision"],
    image: "../images/simpsons.jpg",
    imageAlt: "Grid of GAN-generated Simpsons character faces in the show's cartoon style",
    link: "https://github.com/aitorDiezMateo/Simpsons-DaVinci"
  },
  {
    folder: "algorithmic-thresholding-and-baseline-detection-for-ev-charging-detection",
    name: "Algorithmic Thresholding and Baseline Detection for EV Charging Detection",
    description: "A rule-based algorithm (ATBD) that detects electric vehicle charging sessions directly from aggregate household power consumption, with no sub-metering or labeled data required. Builds an adaptive consumption baseline and derives a dynamic threshold to isolate sustained charging-like load, validated on real residential data and published at Splitech 2026.",
    tags: ["Python", "Pandas", "Time Series", "Energy Systems"],
    image: "../images/ev_charging_baseline_threshold.png",
    imageAlt: "Household power consumption with adaptive baseline and dynamic charging threshold overlaid",
    imagePosition: "left center",
    link: "https://github.com/aitorDiezMateo/algorithmic-thresholding-and-baseline-detection-for-ev-charging-detection"
  },
  {
    folder: "clustering-hybrid-load-forecasting",
    name: "Hybrid Classification-Regression Methodology for Energy Load Forecasting",
    description: "A two-stage forecasting pipeline for short-term building energy loads that decouples daily load shape from peak magnitude: K-Means clustering and classification predict the day's load pattern, while regression estimates its peak magnitude. Benchmarked against ARIMAX, Prophet, and zero-shot foundation models (TimesFM, Chronos), reaching R² = 0.83 and a 26% improvement in explained variance over the strongest baseline.",
    tags: ["Python", "Scikit-learn", "K-Means", "Forecasting"],
    image: "../images/energy-grid-sunset.jpg",
    imageAlt: "High-voltage transmission towers silhouetted against a sunset",
    link: "https://github.com/aitorDiezMateo/clustering-hybrid-load-forecasting"
  },
  {
    folder: "heat-pump-analysis-and-load-optimization",
    name: "Heat Pump Analysis and Load Optimization",
    description: "An analysis of a real ground-source heat pump plant that models its efficiency (COP) from operational data and runs a price-aware load-shifting algorithm to shift thermal demand toward cheaper electricity windows. Applied to a full year of building data, the approach cut daily peak loads by up to 60% and annual energy costs by 2.5% without degrading system efficiency.",
    tags: ["Python", "Optimization", "Energy Systems"],
    image: "../images/heat-pump-unit.jpg",
    imageAlt: "Outdoor ground-source heat pump unit installed beside a house",
    link: "https://github.com/aitorDiezMateo/heat-pump-analysis-and-load-optimization"
  },
  {
    folder: "HEDGING_RL",
    name: "Deep Reinforcement Learning for Option Hedging",
    description: "Trains SAC and TD3 reinforcement learning agents to hedge S&P 500 options inside a custom trading environment with realistic transaction costs, learning entirely from simulated price paths. Evaluated out-of-sample on real market data from 2004–2025 against a Black-Scholes delta-hedging benchmark, the agents post higher P&L and Sharpe ratio at the cost of higher transaction costs and drawdown — a trade-off analyzed in depth rather than oversold as a clean win.",
    tags: ["Python", "PyTorch", "Reinforcement Learning", "Optuna"],
    image: "../images/trading-candlestick-screen.jpg",
    imageAlt: "Candlestick trading chart glowing on a dark screen",
    link: "https://github.com/aitorDiezMateo/DeepHedging"
  },
  {
    folder: "News2Stock",
    name: "News Analysis to Stock Prediction",
    description: "Tests whether financial news adds predictive signal to next-day stock direction forecasts by fusing FinBERT news embeddings with price-series encoders (LSTM, PatchTST, Chronos) across seven large-cap tech stocks. Across a controlled architecture/embedding/window grid, adding news consistently improves F1-macro over price-only baselines, with an attention-based fusion model extracting the most value from it.",
    tags: ["Python", "PyTorch", "NLP", "FinBERT"],
    image: "../images/financial-newspaper-stock-chart.jpg",
    imageAlt: "Financial newspaper page showing a stock price chart",
    link: "https://github.com/aitorDiezMateo/News2StockPredictor"
  },
  {
    folder: "SMARTCO-DeliveryStatus-Prediction",
    name: "Delivery Status Prediction",
    description: "Predicts e-commerce delivery outcomes (late, early, on-time, canceled) on a 180K-order, severely imbalanced supply-chain dataset, using a leakage-safe feature pipeline and a chronological train/test split. Tunes imbalance-mitigation strategy jointly with model hyperparameters via Optuna across XGBoost, CatBoost, and ensemble models, improving macro-F1 by 130% over a dummy baseline.",
    tags: ["Python", "XGBoost", "CatBoost", "Optuna"],
    image: "../images/shipping-port-sunset.jpg",
    imageAlt: "Shipping containers and cranes at a busy port at sunset",
    link: "https://github.com/aitorDiezMateo/delivery-status-prediction"
  }
];
