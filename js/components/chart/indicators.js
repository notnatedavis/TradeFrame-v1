/* js/components/chart/indicators.js */

/**
 * Calculates Simple Moving Average for an array of numbers.
 * @param {number[]} data - Array of closing prices.
 * @param {number} period
 * @returns {(number|null)[]} Array of same length, with null where insufficient data.
 */
export function calculateSMA(data, period) {
  const result = new Array(data.length).fill(null);
  for (let i = period - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j];
    }
    result[i] = sum / period;
  }
  return result;
}