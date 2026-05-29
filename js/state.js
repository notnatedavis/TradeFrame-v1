/* js/state.js */

import { DEFAULT_SYMBOL, DEFAULT_RANGE, DEFAULT_SETTINGS } from './config.js';
import { loadSettings, saveSettings } from './utils/settingsStorage.js';

/**
 * Reactive state container.
 * Notifies subscribers when relevant keys change,
 * providing both the new and previous state.
 */
const state = {
  symbol: DEFAULT_SYMBOL,
  range: DEFAULT_RANGE,
  values: [],
  latest: null,
  settings: loadSettings(DEFAULT_SETTINGS),
};

let subscribers = [];
let previousState = { ...state };

/**
 * Returns a shallow copy of the current state.
 * @returns {Object}
 */
export function getState() {
  return { ...state };
}

/** @param {string} symbol */
export function setSymbol(symbol) {
  if (!symbol || symbol === state.symbol) return;
  state.symbol = symbol.toUpperCase();
  notify(['symbol']);
}

/** @param {string} range - key from RANGES config */
export function setRange(range) {
  if (!range || range === state.range) return;
  state.range = range;
  notify(['range']);
}

/**
 * Updates stock data (values + latest).
 * @param {{ values: Array, latest: Object }} data
 */
export function setStockData({ values, latest }) {
  state.values = values;
  state.latest = latest;
  notify(['data']);
}

/**
 * Merges new settings, persists, and notifies.
 * @param {Object} partialSettings
 */
export function setSettings(partialSettings) {
  state.settings = { ...state.settings, ...partialSettings };
  saveSettings(state.settings);
  notify(['settings']);
}

/**
 * Subscribes a listener to state changes.
 * The listener receives (newState, oldState).
 * @param {Function} fn - callback(newState, oldState)
 * @returns {Function} Unsubscribe function
 */
export function subscribe(fn) {
  subscribers.push(fn);
  return () => {
    subscribers = subscribers.filter(sub => sub !== fn);
  };
}

function notify(keys) {
  const newState = getState();
  const oldState = previousState;
  previousState = newState;   // store for next change
  subscribers.forEach(fn => fn(newState, oldState));
}