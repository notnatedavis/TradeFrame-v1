/* js/state.js */

import { DEFAULT_SYMBOL, DEFAULT_SETTINGS } from './config.js';
import { loadSettings, saveSettings } from './utils/settingsStorage.js';

/**
 * Reactive state container for the TradeFrame app.
 * Notifies subscribers when state changes.
 */
const state = {
  symbol: DEFAULT_SYMBOL,
  values: [],
  latest: null,
  settings: loadSettings(DEFAULT_SETTINGS),
};

let subscribers = [];

/**
 * Returns a shallow copy of the current state.
 * @returns {Object}
 */
export function getState() {
  return { ...state };
}

/**
 * Updates the current stock symbol and notifies listeners.
 * @param {string} symbol
 */
export function setSymbol(symbol) {
  if (!symbol || symbol === state.symbol) return;
  state.symbol = symbol.toUpperCase();
  notify();
}

/**
 * Updates the stock data (values + latest).
 * @param {{ values: Array, latest: Object }} data
 */
export function setStockData({ values, latest }) {
  state.values = values;
  state.latest = latest;
  notify();
}

/**
 * Merges new settings, persists them, and notifies.
 * @param {Object} partialSettings
 */
export function setSettings(partialSettings) {
  state.settings = { ...state.settings, ...partialSettings };
  saveSettings(state.settings);
  notify();
}

/**
 * Subscribes a listener to state changes.
 * @param {Function} fn
 * @returns {Function} Unsubscribe function
 */
export function subscribe(fn) {
  subscribers.push(fn);
  return () => {
    subscribers = subscribers.filter(sub => sub !== fn);
  };
}

function notify() {
  // Shallow copy so subscribers cannot mutate internal state
  const snapshot = getState();
  subscribers.forEach(fn => fn(snapshot));
}