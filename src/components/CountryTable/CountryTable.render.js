import { createHtmlElement } from '@/helpers/utils';

export const renderCountryTable = (mainEl) => {
    const table = createHtmlElement('div', 'country-data-table');
    mainEl.appendChild(table);
    return table;
};
