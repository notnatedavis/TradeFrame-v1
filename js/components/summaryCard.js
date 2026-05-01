/* js/components/summaryCard.js */

import { formatCurrency } from '../utils/formatter.js';
import { clearContainer, createElementWithClass } from '../utils/domHelper.js';

/**
 * Renders the summary card with latest stock stats.
 * @param {string} containerId - ID of the container element.
 * @param {{open: number, high: number, low: number, close: number, volume: number}} latest
 */
export function renderSummaryCard(containerId, latest) {
  const container = document.getElementById(containerId);
  if (!container) return;
  clearContainer(container);

  const stats = [
    { label: 'Open', value: formatCurrency(latest.open) },
    { label: 'High', value: formatCurrency(latest.high) },
    { label: 'Low', value: formatCurrency(latest.low) },
    { label: 'Close', value: formatCurrency(latest.close) },
    { label: 'Volume', value: latest.volume.toLocaleString() },
  ];

  stats.forEach(stat => {
    const item = createElementWithClass('div', 'stat-item');
    item.innerHTML = `
      <span class="label">${stat.label}</span>
      <span class="value">${stat.value}</span>
    `;
    container.appendChild(item);
  });
}