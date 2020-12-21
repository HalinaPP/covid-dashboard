import { createHtmlElement } from '@/helpers/utils';

export const renderCountryTable = () => {
    const table = createHtmlElement('div', 'countriy-data-table');
    table.innerHTML = 'table';
    return table;
};
