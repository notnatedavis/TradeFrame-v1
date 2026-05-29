/* js/components/settings/settingsPanel.js */

import { createModal } from '../common/modal.js';
import { getState, setSettings } from '../../state.js';
import { createElementWithClass } from '../../utils/domHelper.js';

let modalController = null;

/**
 * Creates the settings panel inside a draggable modal.
 * @param {string} containerId - (unused, modal appended to body)
 */
export function renderSettingsPanel(containerId) {
  const content = document.createElement('div');
  content.innerHTML = `
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
    <div class="setting-group">
      <label>
        <input type="checkbox" id="showMA" /> Show Moving Average
      </label>
      <label for="maPeriod" style="margin-left:1rem;">Period:</label>
      <input type="number" id="maPeriod" min="2" max="200" value="20" style="width:70px;"/>
    </div>
    <div class="setting-group">
      <label for="maColor">MA Colour</label>
      <input type="color" id="maColor" />
    </div>
    <div class="setting-actions">
      <button id="settings-save">Save</button>
      <button id="settings-close">Cancel</button>
    </div>
  `;

  modalController = createModal({ title: 'Customise Dashboard', content, dimensions: { width: '420px' } });

  // Populate form with current state
  const state = getState();
  fillForm(state.settings);

  // Attach event listeners
  content.querySelector('#settings-save').addEventListener('click', () => {
    const newSettings = {
      chartType:      content.querySelector('#chartType').value,
      chartLineColor: content.querySelector('#chartLineColor').value,
      chartFillColor: content.querySelector('#chartFillColor').value,
      positiveColor:  content.querySelector('#positiveColor').value,
      negativeColor:  content.querySelector('#negativeColor').value,
      showMA:         content.querySelector('#showMA').checked,
      maPeriod:       parseInt(content.querySelector('#maPeriod').value, 10) || 20,
      maColor:        content.querySelector('#maColor').value,
    };
    setSettings(newSettings);
    modalController.close();
  });

  content.querySelector('#settings-close').addEventListener('click', () => modalController.close());

  // Append modal overlay to body
  document.body.appendChild(modalController.element);
}

function fillForm(settings) {
  const content = modalController.element.querySelector('.modal-body');
  if (!content) return;
  content.querySelector('#chartType').value = settings.chartType;
  content.querySelector('#chartLineColor').value = settings.chartLineColor;
  content.querySelector('#chartFillColor').value = settings.chartFillColor;
  content.querySelector('#positiveColor').value = settings.positiveColor;
  content.querySelector('#negativeColor').value = settings.negativeColor;
  content.querySelector('#showMA').checked = settings.showMA || false;
  content.querySelector('#maPeriod').value = settings.maPeriod || 20;
  content.querySelector('#maColor').value = settings.maColor || '#f39c12';
}

export function showPanel() {
  // Re‑fill form with latest state before opening
  const state = getState();
  fillForm(state.settings);
  modalController?.open();
}