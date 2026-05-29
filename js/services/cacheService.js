/* js/services/cacheService.js */

import { CACHE_TTL_MS } from '../config.js';

const PREFIX = 'tf_cache_';

/**
 * Generates a storage key for a symbol+range combination.
 * @param {string} symbol
 * @param {string} rangeKey
 * @returns {string}
 */
function makeKey(symbol, rangeKey) {
  return `${PREFIX}${symbol.toUpperCase()}_${rangeKey}`;
}

/**
 * Retrieves cached stock data if it exists and is not stale.
 * @param {string} symbol
 * @param {string} rangeKey
 * @returns {Object|null} The cached {values, latest, cachedAt} or null.
 */
export function getCachedData(symbol, rangeKey) {
  try {
    const raw = localStorage.getItem(makeKey(symbol, rangeKey));
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (Date.now() - entry.cachedAt > CACHE_TTL_MS) {
      localStorage.removeItem(makeKey(symbol, rangeKey));
      return null;
    }
    return entry;
  } catch (e) {
    console.warn('Cache read error:', e);
    return null;
  }
}

/**
 * Saves fetched data to localStorage with a timestamp.
 * @param {string} symbol
 * @param {string} rangeKey
 * @param {Object} data - { values, latest }
 */
export function setCachedData(symbol, rangeKey, data) {
  try {
    const entry = {
      ...data,
      cachedAt: Date.now(),
    };
    localStorage.setItem(makeKey(symbol, rangeKey), JSON.stringify(entry));
  } catch (e) {
    console.warn('Cache write error:', e);
  }
}

/**
 * Clears all TradeFrame cache entries.
 */
export function clearCache() {
  Object.keys(localStorage)
    .filter(key => key.startsWith(PREFIX))
    .forEach(key => localStorage.removeItem(key));
}