# TradeFrame Vision

TradeFrame aims to be the cleanest, most intuitive browser‑based stock dashboard for everyday traders and learners. It should offer **real‑time insights** with minimal friction, **full visual customisation**, and **robust performance** on any device.

## Core Goals
- **Instant search** – type any symbol and see data immediately.
- **Interactive, customisable charts** – change chart type, colours, and indicators without touching code.
- **Offline resilience** – cache data so the last view is always available.
- **Accessibility** – keyboard navigation, proper ARIA roles, and high‑contrast options.

## Architectural Pillars
- **Vanilla ES modules** – no frameworks, zero dependencies beyond Chart.js.
- **Reactive state** – a lightweight pub/sub system keeps UI in sync with data and settings.
- **Separation of concerns** – components, services, utils each with a single responsibility.
- **Future‑proof** – easy to extend with WebSocket streams, technical indicators, or multi‑symbol watchlists.

## Roadmap (next 6 months)
- [x] Symbol search
- [x] Settings panel (colours, chart type)
- [ ] Add moving average overlays
- [ ] Replace polling with WebSocket (when API supports it)
- [ ] LocalStorage data cache for instant loads
- [ ] Full test suite (Jest + Cypress)