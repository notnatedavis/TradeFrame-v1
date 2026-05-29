/* js/components/layout/header.js */

/**
 * Renders the top app header.
 * @param {string} containerId
 */
export function renderHeader(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <h1 class="app-title">TradeFrame</h1>
    <button id="global-settings-btn" class="icon-btn" aria-label="Settings" title="Settings">⚙️</button>
  `;
}