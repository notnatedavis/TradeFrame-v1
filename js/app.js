/* js/app.js */

import { fetchStockData } from './services/stockService.js';
import { getCachedData, setCachedData } from './services/cacheService.js';
import { renderHeader } from './components/layout/header.js';
import { renderTabNav } from './components/layout/tabNav.js';
import { renderFooter, setFooterMessage } from './components/layout/footer.js';
import { renderSearchBar } from './components/toolbar/searchBar.js';
import { renderRangeSelector } from './components/toolbar/rangeSelector.js';
import { renderRefreshButton } from './components/toolbar/refreshButton.js';
import { renderSummaryCard } from './components/dashboard/summaryCard.js';
import { renderStockChart } from './components/chart/stockChart.js';
import { renderStockTable } from './components/table/stockTable.js';
import { renderSettingsPanel, showPanel } from './components/settings/settingsPanel.js';
import { getState, setStockData, subscribe } from './state.js';

let abortController = null;

/**
 * Main controller: initialises layout, binds state, handles data flow.
 */
async function init() {
  // Render static layout
  renderHeader('app-header');
  renderFooter('app-footer');
  renderTabNav('tab-nav', onTabChange);
  renderSearchBar('search-bar');
  renderRangeSelector('range-selector');
  renderRefreshButton('refresh-btn');
  renderSettingsPanel(); // modal appended to body

  // Global settings button
  document.getElementById('global-settings-btn')?.addEventListener('click', showPanel);

  // Manual refresh event
  document.addEventListener('tradeframe:refresh', () => forceRefresh());

  // Initial data load (cache-first)
  await loadData();

  // Subscribe to symbol/range changes
  subscribe((newState, oldState) => {
    if (newState.symbol !== oldState?.symbol || newState.range !== oldState?.range) {
      loadData();
    }
  });
}

function onTabChange(tabId) {
  const state = getState();
  // Lazy render: if data exists, render corresponding view
  if (state.values.length) {
    if (tabId === 'dashboard') renderSummaryCard('summary');
    else if (tabId === 'chart')   renderStockChart('price-chart', state.values);
    else if (tabId === 'table')   renderStockTable('table-container', state.values);
  }
}

/**
 * Fetches data with cache-first strategy.
 */
async function loadData(force = false) {
  const { symbol, range } = getState();
  setFooterMessage('Loading…');

  // Cancel any ongoing request
  if (abortController) abortController.abort();
  abortController = new AbortController();

  // Try cache unless force refresh
  if (!force) {
    const cached = getCachedData(symbol, range);
    if (cached) {
      setStockData({ values: cached.values, latest: cached.latest });
      updateAllViews();
      setFooterMessage(`Last updated: ${new Date(cached.cachedAt).toLocaleTimeString()} (cached)`);
      return;
    }
  }

  try {
    const { values, latest } = await fetchStockData(symbol, range, abortController.signal);
    if (!values.length) throw new Error('No data returned');
    setStockData({ values, latest });
    setCachedData(symbol, range, { values, latest });
    setFooterMessage(`Last updated: ${new Date().toLocaleTimeString()}`);
    updateAllViews();
  } catch (error) {
    if (error.message === 'Request aborted') return; // newer request superseded
    console.error('Dashboard error:', error);
    setFooterMessage(`Error: ${error.message}`);
    // Keep last successful data if available
  } finally {
    abortController = null;
  }
}

/** Force refresh ignoring cache */
function forceRefresh() {
  loadData(true);
}

/** Renders the currently visible tab */
function updateAllViews() {
  const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'dashboard';
  const state = getState();
  if (!state.values.length) return;
  if (activeTab === 'dashboard') renderSummaryCard('summary');
  else if (activeTab === 'chart')   renderStockChart('price-chart', state.values);
  else if (activeTab === 'table')   renderStockTable('table-container', state.values);
}

// Boot
init();