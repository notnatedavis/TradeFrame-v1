/* js/app.js */

import { fetchStockData } from './services/stockService.js';
import { renderSummaryCard } from './components/summaryCard.js';
import { renderStockTable } from './components/stockTable.js';
import { renderStockChart } from './components/stockChart.js';
import { renderSearchBar } from './components/searchBar.js';
import { renderSettingsPanel, showPanel } from './components/settingsPanel.js';
import { setText, toggleClass } from './utils/domHelper.js';
import { getState, setSymbol, setStockData, subscribe } from './state.js';
import { REFRESH_INTERVAL_MS } from './config.js';

/**
 * Main application controller.
 * Renders static UI, binds state changes, and manages refresh.
 */
async function init() {
  // Render static parts once
  renderSearchBar('search-bar');
  renderSettingsPanel('settings-panel');

  // Settings button handler
  document.getElementById('settings-btn').addEventListener('click', showPanel);

  // Fetch initial data using symbol from state
  await fetchAndRender();

  // Subscribe to symbol changes → refetch & render
  subscribe((newState, oldState) => {
    if (newState.symbol !== oldState?.symbol) {
      fetchAndRender();
    }
  });

  // Periodic refresh (only re‑fetch, keep same symbol)
  setInterval(async () => {
    await fetchAndRender();
  }, REFRESH_INTERVAL_MS);
}

async function fetchAndRender() {
  const { symbol } = getState();
  try {
    setText('last-updated', 'Loading…');
    const { values } = await fetchStockData(symbol);

    if (!values.length) throw new Error('No data returned');

    const latest = values[values.length - 1];
    setStockData({ values, latest });

    renderSummaryCard('summary', latest);
    renderStockChart('price-chart', values);
    renderStockTable('table-container', values);

    const now = new Date().toLocaleTimeString();
    setText('last-updated', `Last updated: ${now}`);
    toggleClass('retry-btn', 'hidden', true); // hide retry button
  } catch (error) {
    console.error('Dashboard error:', error);
    setText('last-updated', `Error: ${error.message}`);
    toggleClass('retry-btn', 'hidden', false);
  }
}

// Add retry button logic
document.addEventListener('DOMContentLoaded', () => {
  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', fetchAndRender);
  }
});

// Boot
init();