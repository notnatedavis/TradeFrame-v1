/* js/components/stockTable.js */

import { clearContainer, createElementWithClass } from '../utils/domHelper.js';
import { formatCurrency, formatDate } from '../utils/formatter.js';

/**
 * Renders a scrollable table of recent daily prices.
 * @param {string} containerId - ID of the container element.
 * @param {Array} values - Array of {datetime, open, high, low, close, volume}.
 */
export function renderStockTable(containerId, values) {
  const container = document.getElementById(containerId);
  if (!container) return;
  clearContainer(container);

  const table = createElementWithClass('table', 'stock-table');
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Date</th>
      <th>Open</th>
      <th>High</th>
      <th>Low</th>
      <th>Close</th>
      <th>Volume</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  values.slice(-10).reverse().forEach(entry => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${formatDate(entry.datetime)}</td>
      <td>${formatCurrency(entry.open)}</td>
      <td>${formatCurrency(entry.high)}</td>
      <td>${formatCurrency(entry.low)}</td>
      <td>${formatCurrency(entry.close)}</td>
      <td>${entry.volume.toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}