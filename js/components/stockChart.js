/* js/components/stockChart.js */

import { formatDate } from '../utils/formatter.js';
import { getState, subscribe } from '../state.js';

let chartInstance = null;
let canvasId = null; // keep reference

/**
 * Renders a Chart.js chart using current settings and data.
 * @param {string} id - ID of the canvas element.
 * @param {Array} values - Array of {datetime, close}.
 */
export function renderStockChart(id, values) {
  canvasId = id;
  const ctx = document.getElementById(id).getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  const { settings } = getState();
  const labels = values.map(v => formatDate(v.datetime));
  const closes = values.map(v => v.close);

  chartInstance = new Chart(ctx, {
    type: settings.chartType,
    data: {
      labels,
      datasets: [{
        label: 'Close Price (USD)',
        data: closes,
        borderColor: settings.chartLineColor,
        backgroundColor: settings.chartFillColor,
        fill: true,
        tension: 0.2,
        pointRadius: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `$${context.raw.toFixed(2)}`,
          },
        },
      },
      scales: {
        x: { display: true },
        y: { beginAtZero: false },
      },
    },
  });
}

/**
 * Re‑renders chart when settings change, using last known data.
 */
subscribe((state) => {
  if (!canvasId || !state.values.length) return;
  renderStockChart(canvasId, state.values);
});