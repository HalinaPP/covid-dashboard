import { createHtmlElement } from '@/helpers/utils';
import { doSearch, setCountries } from '@/components/CountriesList/CountriesList.service';
import { renderFilter } from '../Filter/Filter.render';
import { FULL_SCREEN } from '@/constants/constants';

const renderInfoContainer = (listEl) => {
    const filterBlock = createHtmlElement('div', 'list--search-wrapper');

    const search = createHtmlElement('input', 'list--search-search');
    const filter = createHtmlElement('div', 'list--search-filter filter');

    search.placeholder = 'Search';

    search.addEventListener('keyup', () => {
        doSearch();
    });

    filterBlock.appendChild(search);
    filterBlock.appendChild(filter);

    listEl.appendChild(filterBlock);
    return filterBlock;
};

const renderTableContainer = (mainEl) => {
    const listContainer = createHtmlElement('div', 'countries-list-container');
    const fullscreenBtn = createHtmlElement('div', 'full-screen');
    fullscreenBtn.id = '.countries-list-wrapper';
    fullscreenBtn.addEventListener('click', (e) => {
        const selector = e.target.closest('div').id;
        const fullscreens = document.body.querySelectorAll('.full-screen');
        fullscreens.forEach((item) => {
            if (item.id !== selector) item.classList.toggle('hidden');
        });
        const section = document.body.querySelector(selector);
        section.classList.toggle('fullscreen');
    });
    fullscreenBtn.innerHTML = `<img width="15" height="15" src=${FULL_SCREEN} alt="fullscreen"/>`;

    const countryList = createHtmlElement('ul', 'countries-list');
    listContainer.appendChild(countryList);
    mainEl.appendChild(listContainer);
    mainEl.appendChild(fullscreenBtn);
    return listContainer;
};

const renderTableWrapperContainer = (mainEl) => {
    const wrapper = createHtmlElement('div', 'countries-list-wrapper');
    mainEl.appendChild(wrapper);
    return wrapper;
};

export const renderCountriesList = (mainEl) => {
    const wrapper = renderTableWrapperContainer(mainEl);
    renderInfoContainer(wrapper);
    renderTableContainer(wrapper);
};
