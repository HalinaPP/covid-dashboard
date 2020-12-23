import { DEATHS, RECOVERY, CASES } from '@/constants/constants';
import { createHtmlElement } from '@/helpers/utils';
import { getTableInfo } from './CountryTable.service';
import { store } from '@/redux/store';

const renderTableWrapperContainer = (mainEl) => {
    const table = createHtmlElement('div', 'country-data-table');
    mainEl.appendChild(table);
    return table;
};

export const renderCountryTable = async (mainEl) => {
    const wrapper = renderTableWrapperContainer(mainEl);
};

export const renderCountryTable = async (mainEl) => {
    const wrapper = renderTableWrapperContainer(mainEl);
    await setCountryTableInfo(wrapper);
};

export const updateCountryTable = async () => {
    const wrapper = document.querySelector('.country-data-table');
    await setCountryTableInfo(wrapper);
};

store.subscribe(() => {
    updateCountryTable();
});
