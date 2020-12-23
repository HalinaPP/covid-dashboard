import { getMapinfo } from '@/services/Countries';
import { store } from '@/redux/store';

import { CASES, DEATHS, FULL_SCREEN, RECOVERY, WORLD_ID, WORLD_NAME } from '@/constants/constants';


import { renderFilter } from '@/components/Filter/Filter.render';
import { createHtmlElement } from '@/helpers/utils';

export const getTableInfo = async () => {
    const state = store.getState();
    const countryId = state.country.activeCountry;
    const info = await getMapinfo(countryId);
    return info;
};

export const setTableInfo = async () => {
    const table = document.body.querySelector('.country-data-table');
    const filter = document.body.querySelector('.filter');
    let wrapper = document.body.querySelector('.country-data-wrapper');
    if(wrapper){
        wrapper.remove();
    }
    if(filter){
        filter.remove();
    }
    const info = await getTableInfo();
    const { countryName, casesValueAmount } = info;
    wrapper = createHtmlElement('div','country-data-wrapper')
    wrapper.innerHTML = `<h3>${
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
                        </div>`;
    table.appendChild(wrapper);
    table.prepend(renderFilter());
};
