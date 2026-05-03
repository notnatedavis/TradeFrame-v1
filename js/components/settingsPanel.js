/* js/components/settingsPanel.js */

import { createElementWithClass } from '../utils/domHelper.js';
import { getState, setSettings } from '../state.js';

let panelElement = null;

/**
 * Renders the settings panel (modal) once and stores reference.
 * @param {string} containerId
 */
export function renderSettingsPanel(containerId) {
  const container = document.getElementById(containerId);
  if (!container || panelElement) return;

  panelElement = createElementWithClass('div', 'settings-panel hidden');
  panelElement.setAttribute('role', 'dialog');
  panelElement.setAttribute('aria-modal', 'true');

  const backdrop = createElementWithClass('div', 'settings-backdrop');
  backdrop.addEventListener('click', hidePanel);
  panelElement.appendChild(backdrop);

  const panelContent = createElementWithClass('div', 'settings-content');
  panelContent.innerHTML = `
    <h2>Customise Dashboard</h2>
    <div class="setting-group">
      <label for="chartType">Chart Type</label>
      <select id="chartType">
        <option value="line">Line</option>
        <option value="bar">Bar</option>
      </select>
    </div>
    <div class="setting-group">
      <label for="chartLineColor">Line Colour</label>
      <input type="color" id="chartLineColor" />
    </div>
    <div class="setting-group">
      <label for="chartFillColor">Fill Colour</label>
      <input type="color" id="chartFillColor" />
    </div>
    <div class="setting-group">
      <label for="positiveColor">Positive Colour</label>
      <input type="color" id="positiveColor" />
    </div>
    <div class="setting-group">
      <label for="negativeColor">Negative Colour</label>
      <input type="color" id="negativeColor" />
    </div>
    <div class="setting-actions">
      <button id="settings-save">Save</button>
      <button id="settings-close">Cancel</button>
    </div>
  `;
  panelElement.appendChild(panelContent);

  // Populate with current state
  const state = getState();
  fillForm(state.settings);

  // Bind events
  panelContent.querySelector('#settings-save').addEventListener('click', () => {
    const newSettings = {
      chartType: panelContent.querySelector('#chartType').value,
      chartLineColor: panelContent.querySelector('#chartLineColor').value,
      chartFillColor: panelContent.querySelector('#chartFillColor').value,
      positiveColor: panelContent.querySelector('#positiveColor').value,
      negativeColor: panelContent.querySelector('#negativeColor').value,
    };
    setSettings(newSettings);
    hidePanel();
  });

  panelContent.querySelector('#settings-close').addEventListener('click', hidePanel);

  container.appendChild(panelElement);
}

function fillForm(settings) {
  if (!panelElement) return;
  panelElement.querySelector('#chartType').value = settings.chartType;
  panelElement.querySelector('#chartLineColor').value = settings.chartLineColor;
  panelElement.querySelector('#chartFillColor').value = settings.chartFillColor;
  panelElement.querySelector('#positiveColor').value = settings.positiveColor;
  panelElement.querySelector('#negativeColor').value = settings.negativeColor;
}

/**
 * Shows the settings panel.
 */
export function showPanel() {
  panelElement?.classList.remove('hidden');
}

/**
 * Hides the settings panel.
 */
function hidePanel() {
  panelElement?.classList.add('hidden');
}

export { hidePanel };