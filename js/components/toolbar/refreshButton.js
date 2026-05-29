/* js/components/toolbar/refreshButton.js */

import { createElementWithClass } from '../../utils/domHelper.js';

/**
 * Renders a refresh button that dispatches a custom event.
 * @param {string} containerId
 */
export function renderRefreshButton(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const btn = createElementWithClass('button', 'refresh-btn');
  btn.innerHTML = '↻ Refresh';
  btn.setAttribute('aria-label', 'Refresh data');
  btn.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('tradeframe:refresh'));
  });
  container.appendChild(btn);
}