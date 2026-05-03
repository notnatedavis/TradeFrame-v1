/* js/config.js */

/**
 * Central configuration for TradeFrame
 * @constant {string} DEFAULT_SYMBOL - Default stock ticker
 * @constant {string} API_BASE_URL - Twelve Data demo endpoint
 * @constant {number} REFRESH_INTERVAL_MS - Data refresh interval in milliseconds
 * @constant {Object} DEFAULT_SETTINGS - Default user customisation
 */
export const DEFAULT_SYMBOL = 'AAPL';
export const API_BASE_URL = 'https://api.twelvedata.com/time_series';
export const API_KEY = 'demo'; // demo key for development
export const REFRESH_INTERVAL_MS = 60000; // 1 minute

export const DEFAULT_SETTINGS = {
  chartType: 'line',
  chartLineColor: '#2e86de',
  chartFillColor: 'rgba(46,134,222,0.1)',
  positiveColor: '#2ecc71',
  negativeColor: '#e74c3c',
};