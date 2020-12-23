import { getMapinfo } from '@/services/Countries';
import { store } from '@/redux/store';
import { CASES, DEATHS, RECOVERY, WORLD_ID, WORLD_NAME } from '@/constants/constants';
import { doSearch, setCountries } from '@/components/CountriesList/CountriesList.service';
import { renderFilter } from '@/components/Filter/Filter.render';

export const getTableInfo = async () => {
    const state = store.getState();
    const countryId = state.country.activeCountry;
    const info = await getMapinfo(countryId);
    return info;
};

export const setTableInfo = async () => {
    const wrapper = document.body.querySelector('.country-data-table');
    const info = await getTableInfo();
    const { countryName, casesValueAmount } = info;
    wrapper.innerHTML = `<div class="country-data-wrapper"><h3>${
        countryName !== WORLD_ID ? countryName : WORLD_NAME
    }</h3>
                        <div class="country-data-table-header">
                            <div>${CASES}</div>
                            <div>${DEATHS}</div>
                            <div>${RECOVERY}</div>
                        </div>
                        <div class="country-data-table-data">
                            <div>${casesValueAmount[CASES]}</div>
                            <div>${casesValueAmount[DEATHS]}</div>
                            <div>${casesValueAmount[RECOVERY]}</div>
                        </div></div>`;
    wrapper.prepend(renderFilter());
};
