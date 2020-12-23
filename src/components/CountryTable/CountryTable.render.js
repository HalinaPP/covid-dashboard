import { createHtmlElement } from '@/helpers/utils';
import { renderFilter } from '../Filter/Filter.render';

export const renderCountryTable = (mainEl) => {
    const table = createHtmlElement('div', 'country-data-table');
    mainEl.appendChild(table);
    table.appendChild(renderFilter());
    return table;
};
