/* js/components/table/stockTable.js */

import { clearContainer, createElementWithClass } from '../../utils/domHelper.js';
import { formatCurrency, formatDate } from '../../utils/formatter.js';

let sortColumn = 'datetime';
let sortAsc = false;

/**
 * Renders a sortable table of all price data.
 * @param {string} containerId
 * @param {Array} values
 */
export function renderStockTable(containerId, values) {
  const container = document.getElementById(containerId);
  if (!container) return;
  clearContainer(container);

  const table = createElementWithClass('table', 'stock-table');
  const thead = document.createElement('thead');
  const headers = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume'];
  const fields = ['datetime', 'open', 'high', 'low', 'close', 'volume'];

  const trHead = document.createElement('tr');
  headers.forEach((label, idx) => {
    const th = document.createElement('th');
    th.textContent = label;
    th.dataset.field = fields[idx];
    th.classList.add('sortable');
    if (fields[idx] === sortColumn) {
      th.classList.add(sortAsc ? 'asc' : 'desc');
    }
    th.addEventListener('click', () => {
      if (sortColumn === fields[idx]) {
        sortAsc = !sortAsc;
      } else {
        sortColumn = fields[idx];
        sortAsc = true;
      }
      renderStockTable(containerId, values);
    });
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const sorted = [...values].sort((a, b) => {
    let valA = a[sortColumn];
    let valB = b[sortColumn];
    if (typeof valA === 'string') valA = new Date(valA);
    if (typeof valB === 'string') valB = new Date(valB);
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  sorted.forEach(entry => {
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