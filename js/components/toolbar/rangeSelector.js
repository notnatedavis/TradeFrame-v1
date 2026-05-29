/* js/components/toolbar/rangeSelector.js */

import { createElementWithClass } from '../../utils/domHelper.js';
import { RANGES, DEFAULT_RANGE } from '../../config.js';
import { setRange } from '../../state.js';

/**
 * Renders a group of buttons to select the time range.
 * @param {string} containerId
 */
export function renderRangeSelector(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.className = 'range-selector';

  const rangeKeys = Object.keys(RANGES);

  rangeKeys.forEach(key => {
    const btn = createElementWithClass('button', 'range-btn');
    btn.textContent = key;
    btn.dataset.range = key;
    if (key === DEFAULT_RANGE) btn.classList.add('active');
    btn.addEventListener('click', () => {
      container.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setRange(key);
    });
    container.appendChild(btn);
  });
}