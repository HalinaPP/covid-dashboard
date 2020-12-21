import { FILTERS } from '@/constants/filter';
import { createHtmlElement, replaceStringFormat } from '@/helpers/utils';
import { filterHandle } from './Filter.service';

const renderOnefilterElement = (filterElement) => {
    const selectEl = createHtmlElement('select', `filter-${filterElement.className}`);
    selectEl.setAttribute('data-type', filterElement.name);

    const options = filterElement.options.reduce((prev, curr) => {
        return prev + `<option value=${curr}>${replaceStringFormat(curr)}</option>`;
    }, '');

    selectEl.innerHTML = options;
    selectEl.addEventListener('change', filterHandle);
    return selectEl;
};

export const renderFilter = () => {
    const filterWrapper = createHtmlElement('div', 'filter');

    const filtersEl = FILTERS.map((item) => renderOnefilterElement(item));

    filtersEl.forEach((filter) => filterWrapper.appendChild(filter));
    return filterWrapper;
};
