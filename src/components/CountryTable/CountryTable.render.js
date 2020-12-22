import { DEATHS, RECOVERY, CASES } from '@/constants/map';
import { createHtmlElement } from '@/helpers/utils';
import { getTableInfo } from './CountryTable.service';

const renderTableWrapperContainer = (mainEl) => {
    const table = createHtmlElement('div', 'country-data-table');
    mainEl.appendChild(table);
    return table;
};

export const renderCountryTable = async (mainEl) => {
    const wrapper = renderTableWrapperContainer(mainEl);
};
