/* js/services/stockService.js */

import { API_BASE_URL, API_KEY } from '../config.js';

/**
 * Fetches and normalises stock time series data.
 * @param {string} symbol - Stock ticker (e.g., AAPL).
 * @returns {Promise<{symbol: string, values: Array}>} Normalised stock data.
 * @throws Will throw if network fails or API returns error.
 */
export async function fetchStockData(symbol) {
  const params = new URLSearchParams({
    symbol,
    interval: '1day',
    outputsize: 30,
    apikey: API_KEY,
  });
  const url = `${API_BASE_URL}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  const json = await response.json();

  // Twelve Data returns { meta: ..., values: [...] }
  if (json.status === 'error') {
    throw new Error(json.message || 'API error');
  }

  const values = json.values.map(entry => ({
    datetime: entry.datetime,
    open: parseFloat(entry.open),
    high: parseFloat(entry.high),
    low: parseFloat(entry.low),
    close: parseFloat(entry.close),
    volume: parseInt(entry.volume, 10),
  }));

  // Reverse so oldest is first (useful for charts)
  values.reverse();

  return {
    symbol: json.meta.symbol,
    values,
  };
}