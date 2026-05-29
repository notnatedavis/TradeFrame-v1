/* js/components/chart/stockChart.js */

import { formatDate } from '../../utils/formatter.js';
import { getState, subscribe } from '../../state.js';
import { calculateSMA } from './indicators.js';

let chartInstance = null;
let canvasId = null;

/**
 * Renders/updates the main chart with full interactivity.
 * @param {string} id - Canvas element ID.
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

  const datasets = [{
    label: 'Close Price (USD)',
    data: closes,
    borderColor: settings.chartLineColor,
    backgroundColor: settings.chartFillColor,
    fill: true,
    tension: 0.2,
    pointRadius: 0,
  }];

  // Overlay moving average if enabled
  if (settings.showMA) {
    const sma = calculateSMA(closes, settings.maPeriod);
    datasets.push({
      label: `MA(${settings.maPeriod})`,
      data: sma,
      borderColor: settings.maColor,
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
      tension: 0.1,
    });
  }

  chartInstance = new Chart(ctx, {
    type: settings.chartType,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += `$${context.raw?.toFixed(2) ?? context.raw}`;
              return label;
            },
          },
        },
        zoom: {
          pan: { enabled: true, mode: 'x' },
          zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
        },
      },
      scales: {
        x: { display: true },
        y: { beginAtZero: false },
      },
    },
  });
}

// Re‑render when settings change, but only if values exist
subscribe((state) => {
  if (!canvasId || !state.values.length) return;
  renderStockChart(canvasId, state.values);
});