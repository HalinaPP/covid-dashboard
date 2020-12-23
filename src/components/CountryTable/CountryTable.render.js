import { createHtmlElement } from '@/helpers/utils';
import { renderFilter } from '../Filter/Filter.render';
import { store } from '@/redux/store';
import { setTableInfo } from './CountryTable.service';
import { FULL_SCREEN } from '@/constants/constants';

export const renderCountryTable = (mainEl) => {
    const table = createHtmlElement('div', 'country-data-table');
    const fullscreenBtn = createHtmlElement('div', 'full-screen');
    fullscreenBtn.id = '.country-data-table';
    fullscreenBtn.innerHTML = `<img width="15" height="15" src=${FULL_SCREEN} alt="fullscreen"/>`;
    fullscreenBtn.addEventListener('click', (e) => {
        // eslint-disable-next-line no-restricted-globals
        window.scrollTo(pageXOffset, 0);
        const selector = e.target.closest('div').id;
        const fullscreens = document.body.querySelectorAll('.full-screen');
        fullscreens.forEach((item) => {
            if (item.id !== selector) item.classList.toggle('hidden');
        });
        const section = document.body.querySelector(selector);
        section.classList.toggle('fullscreen');
        document.body.classList.toggle('no-scroll');
    });
    table.appendChild(fullscreenBtn);
    mainEl.appendChild(table);
    return table;
};

store.subscribe(async () => {
    await setTableInfo();
});
