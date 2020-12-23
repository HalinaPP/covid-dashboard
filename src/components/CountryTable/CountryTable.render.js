import { createHtmlElement } from '@/helpers/utils';
import { renderFilter } from '../Filter/Filter.render';
import { store } from '@/redux/store';
import { setTableInfo } from './CountryTable.service';

export const renderCountryTable = (mainEl) => {
    const table = createHtmlElement('div', 'country-data-table');
    mainEl.appendChild(table);
    return table;
};

store.subscribe(async () => {
    await setTableInfo();
});
