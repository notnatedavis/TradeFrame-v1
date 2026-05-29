/* js/components/dashboard/summaryCard.js */

import { formatCurrency } from '../../utils/formatter.js';
import { clearContainer, createElementWithClass } from '../../utils/domHelper.js';
import { getState } from '../../state.js';
import { renderMiniChart } from './miniChart.js';

/**
 * Renders the summary card with latest stats and a mini sparkline.
 * @param {string} containerId
 */
export function renderSummaryCard(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  clearContainer(container);

  const { latest, values, symbol } = getState();
  if (!latest) {
    container.textContent = 'No data available.';
    return;
  }

  const card = createElementWithClass('div', 'summary-card');

  // Symbol header
  const header = createElementWithClass('div', 'card-header');
  header.innerHTML = `<h2>${symbol}</h2>`;
  card.appendChild(header);

  // Stats grid
  const statsGrid = createElementWithClass('div', 'stats-grid');
  const stats = [
    { label: 'Open', value: formatCurrency(latest.open) },
    { label: 'High', value: formatCurrency(latest.high) },
    { label: 'Low', value: formatCurrency(latest.low) },
    { label: 'Close', value: formatCurrency(latest.close) },
    { label: 'Volume', value: latest.volume.toLocaleString() },
  ];
  stats.forEach(stat => {
    const item = createElementWithClass('div', 'stat-item');
    item.innerHTML = `<span class="label">${stat.label}</span><span class="value">${stat.value}</span>`;
    statsGrid.appendChild(item);
  });
  card.appendChild(statsGrid);

  // Mini chart
  if (values.length) {
    const miniCanvas = createElementWithClass('canvas', 'mini-chart');
    card.appendChild(miniCanvas);
    // Defer rendering after DOM attach
    setTimeout(() => renderMiniChart(miniCanvas, values), 0);
  }

  container.appendChild(card);
}