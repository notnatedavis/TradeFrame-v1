/* js/config.js */

/**
 * Central configuration for TradeFrame
 * @constant {string} DEFAULT_SYMBOL - Default stock ticker
 * @constant {string} YAHOO_CHART_URL - Yahoo Finance v8 chart API template
 * @constant {string} PROXY_URL - Public CORS proxy prefix
 * @constant {Object} RANGES - Map of range label to {range, interval} for Yahoo API
 * @constant {number} CACHE_TTL_MS - localStorage cache time‑to‑live (30 minutes)
 * @constant {Object} DEFAULT_SETTINGS - Default user customisation
 */
export const DEFAULT_SYMBOL = 'AAPL';
export const YAHOO_CHART_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range={range}&interval={interval}&includePrePost=false';
export const PROXY_URL = 'https://corsproxy.io/?';

export const RANGES = {
  '1D':  { range: '1d',   interval: '5m' },
  '1W':  { range: '5d',   interval: '30m' },
  '1M':  { range: '1mo',  interval: '1d' },
  '1Y':  { range: '1y',   interval: '1wk' },
  '5Y':  { range: '5y',   interval: '1mo' },
  'MAX': { range: 'max',  interval: '1mo' }
};

export const DEFAULT_RANGE = '1M';   // must be a key of RANGES
export const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export const DEFAULT_SETTINGS = {
  chartType: 'line',
  chartLineColor: '#2e86de',
  chartFillColor: 'rgba(46,134,222,0.1)',
  positiveColor: '#2ecc71',
  negativeColor: '#e74c3c',
  showMA: false,        // toggle moving average overlay
  maPeriod: 20,         // moving average period
  maColor: '#f39c12'
};