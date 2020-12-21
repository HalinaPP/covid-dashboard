import { DEATHS, RECOVERY, CASES } from '@/constants/map';
import { createHtmlElement } from '@/helpers/utils';
import { getTableInfo } from './CountryTable.service';
import { store } from '@/redux/store';

const renderTableWrapperContainer = (mainEl) => {
    const table = createHtmlElement('div', 'country-data-table');
    mainEl.appendChild(table);
    return table;
};

const setCountryTableInfo = async (wrapper) => {
    const info = await getTableInfo();
    const { countryName, casesValueAmount } = info;

    wrapper.innerHTML = `<h3>${countryName}</h3>
                        <div class="country-data-table-header">
                            <div>${CASES}</div>
                            <div>${DEATHS}</div>
                            <div>${RECOVERY}</div>
                        </div>
                        <div class="country-data-table-data">
                            <div>${casesValueAmount[CASES]}</div>
                            <div>${casesValueAmount[DEATHS]}</div>
                            <div>${casesValueAmount[RECOVERY]}</div>
                        </div>`;
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
