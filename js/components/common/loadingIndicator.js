/* js/components/common/loadingIndicator.js */

import { createElementWithClass } from '../../utils/domHelper.js';

/**
 * Creates a small spinner element.
 * @param {string} [size='24px'] - CSS size.
 * @returns {HTMLElement}
 */
export function createLoadingIndicator(size = '24px') {
  const spinner = createElementWithClass('div', 'loading-spinner');
  spinner.style.width = size;
  spinner.style.height = size;
  return spinner;
}