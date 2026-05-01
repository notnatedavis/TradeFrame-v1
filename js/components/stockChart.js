/* js/components/stockChart.js */

import { CHART_TYPE } from '../config.js';
import { formatDate } from '../utils/formatter.js';

let chartInstance = null;

/**
 * Renders a Chart.js line chart of closing prices.
 * @param {string} canvasId - ID of the canvas element.
 * @param {Array} values - Array of {datetime, close}.
 */
export function renderStockChart(canvasId, values) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = values.map(v => formatDate(v.datetime));
  const closes = values.map(v => v.close);

  chartInstance = new Chart(ctx, {
    type: CHART_TYPE,
    data: {
      labels,
      datasets: [{
        label: 'Close Price (USD)',
        data: closes,
        borderColor: '#2e86de',
        backgroundColor: 'rgba(46,134,222,0.1)',
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