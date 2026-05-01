# TradeFrame-v1

TradeFrame is a live, reactive stock analysis dashboard that displays daily price data, a chart, and a detailed table – all refreshed periodically. It uses a free API (Twelve Data demo) for demonstration purposes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project-Structure](#project-structure)
- [Additional-Information](#additional-info)

## Introduction

TradeFrame provides a clean, responsive web interface to monitor a stock’s key metrics. It fetches time‑series data, renders a summary card with latest Open/High/Low/Close/Volume, draws a line chart of closing prices, and shows a sortable table of recent trading days. The UI updates automatically every 60 seconds.

---

## Features

- Modern, lightweight vanilla JavaScript (ES modules)
- Chart.js integration for interactive price chart
- Responsive layout with CSS Grid
- Auto‑refresh at configurable interval
- Modular codebase with clear separation of concerns
- Demo API key for instant testing (no registration required)

---

## Usage 

- Open the [TradeFrame live page](https://notnatedavis.github.io/TradeFrame-v1/) in any modern browser.
- To change the stock symbol, edit `js/config.js` → `DEFAULT_SYMBOL`.

---

## Configuration

All customisable settings live in `js/config.js`:

- `DEFAULT_SYMBOL` – stock ticker (default `'AAPL'`)
- `API_BASE_URL` – endpoint for time series data
- `API_KEY` – Twelve Data API key (demo key works for testing)
- `REFRESH_INTERVAL_MS` – milliseconds between automatic updates

---

## Project-Structure

```bash
TradeFrame-v1/
├── css/
│   └── styles.css
├── js/
│   ├── components/
│   │   ├── stockChart.js
│   │   ├── stockTable.js
│   │   └── summaryCard.js
│   ├── services/
│   │   └── stockService.js # API fetching & normalisation
│   ├── utils/
│   │   ├── domHelper.js
│   │   └── formatter.js
│   ├── app.js              # Main controller
│   └── config.js           # App configuration
├── index.html
└── ReadMe.md
```

---

## Additional-Info
The dashboard currently uses the Twelve Data demo key, which has rate limits and data may be delayed. For production use, obtain a free API key from twelvedata.com and replace API_KEY in config.js. The project is built for easy extension – adding moving averages, WebSocket live quotes, or additional indicators is straightforward.

**Next‑focus advice**

- **Real‑time updates** – replace periodical polling with WebSocket or Server‑Sent Events for instant price changes.  
- **Caching & offline resilience** – store the last fetched data in `localStorage` so the dashboard works immediately on load, then update in the background.  
- **Performance** – add debouncing for rapid API calls, lazy‑load Chart.js only when the chart is in view, and optimise table rendering for thousands of rows with virtual scrolling.  
- **Error recovery** – implement exponential back‑off for failed requests and show a “Retry” button in the UI instead of just a text error.  
- **Testing** – introduce unit tests for the service and formatter modules (Jest) and end‑to‑end tests (Cypress) to ensure dashboard stability across browsers