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
                        </div>`;
    const fullscreenBtn = createHtmlElement('div', 'full-screen');
    fullscreenBtn.id = '.country-data-table';
    fullscreenBtn.innerHTML = `<img width="15" height="15" src=${FULL_SCREEN} alt="fullscreen"/>`;
    fullscreenBtn.addEventListener('click', (e) => {
        const selector = e.target.closest('div').id;
        const fullscreens = document.body.querySelectorAll('.full-screen');
        fullscreens.forEach((item) => {
            if (item.id !== selector) item.classList.toggle('hidden');
        });
        const section = document.body.querySelector(selector);
        section.classList.toggle('fullscreen');
    });
    wrapper.appendChild(fullscreenBtn);
    wrapper.prepend(renderFilter());
};
