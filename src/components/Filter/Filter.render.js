import { FILTERS } from './filter';
import { createHtmlElement, replaceStringFormat } from '@/helpers/utils';
import { filterHandle, getStateFilterTypeValue } from './Filter.service';

const renderOnefilterElement = (filterElement) => {
    const selectEl = createHtmlElement('select', `filter-${filterElement.className}`);
    selectEl.setAttribute('data-type', filterElement.name);
    const stateFilterTypeValue = getStateFilterTypeValue(filterElement.name);
    console.log('st', stateFilterTypeValue);
    const options = filterElement.options.reduce((prev, curr) => {
        let selectedValue = '';
        if (curr === stateFilterTypeValue) {
            selectedValue = 'selected';
        }
        return (
            prev + `<option value=${curr} ${selectedValue}>${replaceStringFormat(curr)}</option>`
        );
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
