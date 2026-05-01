/* js/utils/formatter.js */

/**
 * Formats a number as USD currency.
 * @param {number} value
 * @returns {string}
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a number as a percentage (e.g., 2.35 → "+2.35%").
 * @param {number} value - Decimal representation (e.g., 0.0235).
 * @returns {string}
 */
export function formatPercent(value) {
  return `${value > 0 ? '+' : ''}${(value * 100).toFixed(2)}%`;
}

/**
 * Formats an ISO date string to a short locale date.
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}