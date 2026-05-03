/* js/components/searchBar.js */

import { createElementWithClass } from '../utils/domHelper.js';
import { setSymbol } from '../state.js';

/**
 * Renders a stock symbol search input with a submit button.
 * @param {string} containerId - ID of the container element.
 */
export function renderSearchBar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.className = 'search-bar';

  const input = createElementWithClass('input', 'search-input');
  input.type = 'text';
  input.placeholder = 'Enter stock symbol (e.g., AAPL)';
  input.setAttribute('aria-label', 'Stock symbol');

  const button = createElementWithClass('button', 'search-button');
  button.textContent = 'Search';
  button.setAttribute('aria-label', 'Search stock');

  const handleSearch = () => {
    const symbol = input.value.trim();
    if (symbol) setSymbol(symbol);
  };

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  button.addEventListener('click', handleSearch);

  container.append(input, button);
}