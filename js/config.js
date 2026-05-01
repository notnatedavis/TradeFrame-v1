/* js/config.js */

/**
 * Central configuration for TradeFrame
 * @constant {string} DEFAULT_SYMBOL - Default stock ticker
 * @constant {string} API_BASE_URL - Twelve Data demo endpoint
 * @constant {number} REFRESH_INTERVAL_MS - Data refresh interval in milliseconds
 */
export const DEFAULT_SYMBOL = 'AAPL';
export const API_BASE_URL = 'https://api.twelvedata.com/time_series';
export const API_KEY = 'demo'; // demo key for development
export const REFRESH_INTERVAL_MS = 60000; // 1 minute
export const CHART_TYPE = 'line'; // Chart.js type