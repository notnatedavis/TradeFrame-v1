/* js/components/layout/footer.js */

import { setText } from '../../utils/domHelper.js';

/**
 * Renders the footer status bar.
 * @param {string} containerId
 */
export function renderFooter(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<span id="last-updated" class="footer-status"></span>`;
}

/**
 * Updates the footer message.
 * @param {string} message
 */
export function setFooterMessage(message) {
  setText('last-updated', message);
}