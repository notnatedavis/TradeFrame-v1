/* js/app.js */

import { fetchStockData } from './services/stockService.js';
import { renderSummaryCard } from './components/summaryCard.js';
import { renderStockTable } from './components/stockTable.js';
import { renderStockChart } from './components/stockChart.js';
import { setText } from './utils/domHelper.js';
import { DEFAULT_SYMBOL, REFRESH_INTERVAL_MS } from './config.js';

/**
 * Main application controller.
 * Fetches data and renders the dashboard.
 */
async function init() {
  try {
    setText('last-updated', 'Loading…');
    const { values } = await fetchStockData(DEFAULT_SYMBOL);

    if (!values.length) throw new Error('No data returned');

    const latest = values[values.length - 1];

    renderSummaryCard('summary', latest);
    renderStockChart('price-chart', values);
    renderStockTable('table-container', values);

    const now = new Date().toLocaleTimeString();
    setText('last-updated', `Last updated: ${now}`);
  } catch (error) {
    console.error('Dashboard error:', error);
    setText('last-updated', `Error: ${error.message}`);
  }
}

// Initial load and periodic refresh
init();
setInterval(init, REFRESH_INTERVAL_MS);