/* js/utils/domHelper.js */

/**
 * Creates an HTML element with optional class.
 * @param {string} tag - HTML tag name.
 * @param {string} [className] - CSS class.
 * @returns {HTMLElement}
 */
export function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

/**
 * Clears all child nodes of a container.
 * @param {HTMLElement} container
 */
export function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

/**
 * Sets text content of an element safely.
 * @param {string} elementId
 * @param {string} text
 */
export function setText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = text;
}

/**
 * Toggles a CSS class on an element.
 * @param {string} elementId
 * @param {string} className
 * @param {boolean} force
 */
export function toggleClass(elementId, className, force) {
  const el = document.getElementById(elementId);
  if (el) el.classList.toggle(className, force);
}