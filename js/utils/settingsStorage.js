/* js/utils/settingsStorage.js */

const STORAGE_KEY = 'tradeframe_settings';

/**
 * Loads user settings from localStorage, merged with defaults.
 * @param {Object} defaults
 * @returns {Object}
 */
export function loadSettings(defaults) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaults, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load settings, using defaults.', e);
  }
  return { ...defaults };
}

/**
 * Persists settings object to localStorage.
 * @param {Object} settings
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings.', e);
  }
}