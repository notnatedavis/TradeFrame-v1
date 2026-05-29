/* js/components/layout/tabNav.js */

import { createElementWithClass } from '../../utils/domHelper.js';

let currentTab = 'dashboard';

/**
 * Renders the tab navigation bar.
 * @param {string} containerId
 * @param {Function} onTabChange - callback(tabId)
 */
export function renderTabNav(containerId, onTabChange) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.className = 'tab-nav';

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'chart',     label: 'Chart' },
    { id: 'table',     label: 'Table' },
  ];

  tabs.forEach(tab => {
    const btn = createElementWithClass('button', 'tab-btn');
    btn.dataset.tab = tab.id;
    btn.textContent = tab.label;
    btn.addEventListener('click', () => {
      if (currentTab === tab.id) return;
      currentTab = tab.id;
      // Update active state
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Show/hide panels
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
      document.getElementById(`panel-${tab.id}`).classList.remove('hidden');
      if (onTabChange) onTabChange(tab.id);
    });
    container.appendChild(btn);
  });

  // Activate default
  const defaultBtn = container.querySelector(`[data-tab="${currentTab}"]`);
  if (defaultBtn) defaultBtn.classList.add('active');
}