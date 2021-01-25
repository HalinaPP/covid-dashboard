import { getMapinfo } from '@/services/Countries';
import { store } from '@/redux/store';
import { CASES, DEATHS, RECOVERY, WORLD_ID, WORLD_NAME } from '@/constants/constants';
import { CASES_COLOR, DEATHS_COLOR, RECOVERY_COLOR } from '@/components/Map/map';
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
    const filter = table.querySelector('.filter');
    let wrapper = document.body.querySelector('.country-data-wrapper');
    if (wrapper) {
        wrapper.remove();
    }
    if (filter) {
        filter.remove();
    }
    const info = await getTableInfo();
    const { countryName, casesValueAmount } = info;
    wrapper = createHtmlElement('div', 'country-data-wrapper');
    wrapper.innerHTML = `<h3>${countryName !== WORLD_ID ? countryName : WORLD_NAME}</h3>
                        <div class="country-data-table-header">
                            <div>
                                ${CASES}:
                                <span style="color:${CASES_COLOR}">
                                    ${casesValueAmount[CASES]}
                                </span>
                            </div>
                            <div>${DEATHS}:
                                <span style="color:${DEATHS_COLOR}">
                                    ${casesValueAmount[DEATHS]}
                                </span>
                            </div>
                            <div>${RECOVERY}:
                                <span style="color:${RECOVERY_COLOR}">
                                    ${casesValueAmount[RECOVERY]}
                                </span>
                            </div>
                        </div>`;

    table.appendChild(wrapper);
    table.prepend(renderFilter());
};
