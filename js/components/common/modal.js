/* js/components/common/modal.js */

import { createElementWithClass } from '../../utils/domHelper.js';

/**
 * Creates a draggable, resizable modal window.
 * @param {Object} options
 * @param {string} options.title - Window title.
 * @param {HTMLElement} options.content - Content element.
 * @param {Object} [options.dimensions] - {width, height}.
 * @returns {{ open: Function, close: Function, element: HTMLElement }}
 */
export function createModal({ title, content, dimensions = { width: '400px', height: 'auto' } }) {
  const overlay = createElementWithClass('div', 'modal-overlay hidden');
  const windowEl = createElementWithClass('div', 'modal-window');
  windowEl.style.width = dimensions.width;
  if (dimensions.height !== 'auto') windowEl.style.height = dimensions.height;

  // Title bar
  const titleBar = createElementWithClass('div', 'modal-titlebar');
  titleBar.innerHTML = `<span>${title}</span><button class="modal-close" aria-label="Close">✕</button>`;
  titleBar.querySelector('.modal-close').addEventListener('click', close);
  windowEl.appendChild(titleBar);

  // Content
  const body = createElementWithClass('div', 'modal-body');
  body.appendChild(content);
  windowEl.appendChild(body);

  // Dragging
  let isDragging = false, offsetX, offsetY;
  titleBar.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('modal-close')) return;
    isDragging = true;
    const rect = windowEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  });

  function onDrag(e) {
    if (!isDragging) return;
    windowEl.style.left = (e.clientX - offsetX) + 'px';
    windowEl.style.top  = (e.clientY - offsetY) + 'px';
    windowEl.style.transform = 'none';
  }
  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

  overlay.appendChild(windowEl);

  function open() {
    overlay.classList.remove('hidden');
    // Reset position if needed
    windowEl.style.left = '50%';
    windowEl.style.top = '50%';
    windowEl.style.transform = 'translate(-50%, -50%)';
  }

  function close() {
    overlay.classList.add('hidden');
  }

  return { open, close, element: overlay };
}