/* js/services/stockService.js */

import { YAHOO_CHART_URL, PROXY_URL, RANGES } from '../config.js';

/**
 * Fetches daily stock data for a given symbol and time range.
 * Supports AbortController, retry with exponential backoff.
 *
 * @param {string} symbol - Stock ticker (e.g., AAPL).
 * @param {string} rangeKey - Key from config.RANGES.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{symbol: string, values: Array, latest: Object}>}
 * @throws Will throw on failure after retries.
 */
export async function fetchStockData(symbol, rangeKey, signal) {
  const rangeCfg = RANGES[rangeKey];
  if (!rangeCfg) throw new Error(`Invalid range key: ${rangeKey}`);

  let yahooUrl = YAHOO_CHART_URL
    .replace('{symbol}', encodeURIComponent(symbol))
    .replace('{range}', rangeCfg.range)
    .replace('{interval}', rangeCfg.interval);

  const proxyUrl = PROXY_URL + encodeURIComponent(yahooUrl);

  const maxRetries = 3;
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(proxyUrl, { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      return parseYahooResponse(json, symbol);
    } catch (err) {
      if (signal?.aborted) throw new Error('Request aborted');
      lastError = err;
      if (attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s...
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
      }
    }
  }
  throw lastError || new Error('Failed to fetch stock data');
}

/**
 * Normalises Yahoo Finance v8 chart response.
 * @param {Object} json - Parsed JSON.
 * @param {string} symbol
 * @returns {{symbol: string, values: Array, latest: Object}}
 */
function parseYahooResponse(json, symbol) {
  const result = json?.chart?.result?.[0];
  if (!result) throw new Error(`No data found for symbol "${symbol}".`);

  const { timestamp, indicators } = result;
  const quote = indicators?.quote?.[0];
  if (!timestamp || !quote) throw new Error('Incomplete data returned.');

  const values = timestamp.map((ts, i) => ({
    datetime: new Date(ts * 1000).toISOString().split('T')[0],
    open:   quote.open[i] != null ? parseFloat(quote.open[i]) : null,
    high:   quote.high[i] != null ? parseFloat(quote.high[i]) : null,
    low:    quote.low[i]  != null ? parseFloat(quote.low[i])  : null,
    close:  quote.close[i] != null ? parseFloat(quote.close[i]) : null,
    volume: quote.volume[i] != null ? parseInt(quote.volume[i], 10) : null,
  })).filter(entry => entry.close != null && entry.close !== 0);

  if (values.length === 0) throw new Error('No valid price data returned.');

  const latest = values[values.length - 1];
  return {
    symbol: symbol.toUpperCase(),
    values,
    latest,
  };
}