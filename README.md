# TradeFrame-v2

TradeFrame is a live, reactive stock analysis dashboard that displays daily price data, a chart, and a detailed table – all refreshed on demand. It scrapes public data from Yahoo Finance using a client‑side CORS proxy, requiring no API keys or backend.

Now with a modern tabbed interface, time‑range selector, draggable settings window, and moving average overlays.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project-Structure](#project-structure)
- [Additional-Information](#additional-info)

## Introduction

TradeFrame provides a clean, responsive web interface to monitor a stock’s key metrics. It retrieves time‑series data directly in the browser, renders a summary card with latest Open/High/Low/Close/Volume, draws a fully interactive chart with zoom/pan, and shows a sortable table of all trading days. You can switch between **1D, 1W, 1M, 1Y, 5Y, and MAX** time ranges. Data is cached in `localStorage` for instant loads.

---

## Features

- Modern, lightweight vanilla JavaScript (ES modules)
- Chart.js integration with zoom, pan, and moving average overlay
- Tabbed navigation: Dashboard, Chart, Table
- Range selector for 1D → MAX
- Draggable settings modal (chart colours, MA toggle)
- Offline caching with TTL (30 min)
- Manual refresh; no background polling
- Client‑side scraping via CORS proxy (no API key required)
- Modular codebase with clear separation of concerns

---

## Usage 

- Open the [TradeFrame live page](https://notnatedavis.github.io/TradeFrame-v1/) in any modern browser.
- Enter a stock symbol (e.g., AAPL, MSFT) and press Search or Enter.
- Use the range buttons to change the timeframe.
- Click **Refresh** to force a new data fetch (bypasses cache).
- Click the gear icon ⚙️ to open settings (chart type, colours, moving average).

---

## Configuration

All customisable settings live in `js/config.js`:

- `DEFAULT_SYMBOL` – stock ticker (default `'AAPL'`)
- `YAHOO_CHART_URL` – Yahoo Finance chart API endpoint template
- `PROXY_URL` – public CORS proxy prefix
- `RANGES` – mapping of range keys to Yahoo `range` and `interval` parameters
- `CACHE_TTL_MS` – cache lifetime in milliseconds (default 30 min)
- `DEFAULT_SETTINGS` – chart type, colours, moving average defaults

The dashboard uses a free public CORS proxy. If the proxy becomes unavailable, replace `PROXY_URL` with another proxy (e.g., `https://api.allorigins.win/raw?url=`).

---

## Project-Structure

```bash
TradeFrame-v2/
├── css/
│   └── styles.css
├── docs/
│   └── ProjectVision.md
├── js/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.js
│   │   │   ├── tabNav.js
│   │   │   └── footer.js
│   │   ├── toolbar/
│   │   │   ├── searchBar.js
│   │   │   ├── rangeSelector.js
│   │   │   └── refreshButton.js
│   │   ├── dashboard/
│   │   │   ├── summaryCard.js
│   │   │   └── miniChart.js
│   │   ├── chart/
│   │   │   ├── stockChart.js
│   │   │   └── indicators.js
│   │   ├── table/
│   │   │   └── stockTable.js
│   │   ├── settings/
│   │   │   └── settingsPanel.js
│   │   └── common/
│   │       ├── modal.js
│   │       └── loadingIndicator.js
│   ├── services/
│   │   ├── stockService.js
│   │   └── cacheService.js
│   ├── utils/
│   │   ├── domHelper.js
│   │   ├── formatter.js
│   │   └── settingsStorage.js
│   ├── app.js
│   ├── config.js
│   └── state.js
├── index.html
└── ReadMe.md
```

---

## Additional-Info
The dashboard scrapes Yahoo Finance via a public CORS proxy. Because there is no API key, no registration is needed. However, proxy services can occasionally be down; the project is configured with a reliable default, but you can swap it out in config.js. All data is fetched only on user action – there is no automatic background refresh. Cached data is stored in localStorage and automatically expires after 30 minutes

**Next‑focus advice**

- **Real‑time updates** – replace periodical polling with WebSocket or Server‑Sent Events for instant price changes.  
- **Caching & offline resilience** – store the last fetched data in `localStorage` so the dashboard works immediately on load, then update in the background.  
- **Performance** – add debouncing for rapid API calls, lazy‑load Chart.js only when the chart is in view, and optimise table rendering for thousands of rows with virtual scrolling.  
- **Error recovery** – implement exponential back‑off for failed requests and show a “Retry” button in the UI instead of just a text error.  
- **Testing** – introduce unit tests for the service and formatter modules (Jest) and end‑to‑end tests (Cypress) to ensure dashboard stability across browsers
- Dynamic force reload of last updated but also keep in mind abiliy to not force reload components that dont change (title , etc. good practice)
- graphs should be 100% customizable, max zoom in to max zoom out support viewing data of live , 1d, 1w, 1m, 1y, 5yr else max that exists