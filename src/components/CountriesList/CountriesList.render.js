import { createHtmlElement, createIconHTML } from '@/helpers/utils';
import { doSearch } from '@/components/CountriesList/CountriesList.service';
import { FULL_SCREEN } from '@/constants/constants';
import { openKeyboard } from '@/components/Keyboard/Keyboard.service';

const renderInfoContainer = (listEl) => {
    const filterBlock = createHtmlElement('div', 'list--search-wrapper');

    const filter = createHtmlElement('div', 'list--search-filter filter-wrapper');

    const search = createHtmlElement('input', 'list--search-search');

    const keyboardIcon = createHtmlElement('div', 'keyboardIcon');
    keyboardIcon.innerHTML = createIconHTML('keyboard');
    keyboardIcon.addEventListener('click', () => openKeyboard());

    search.placeholder = 'Search';
    search.setAttribute('id', 'inputText');
    search.addEventListener('click', () => openKeyboard());
    search.addEventListener('keyup', () => doSearch());

    filterBlock.append(search, keyboardIcon, filter);

    listEl.appendChild(filterBlock);
    return filterBlock;
};

const renderTableContainer = (mainEl) => {
    const listContainer = createHtmlElement('div', 'countries-list-container');
    const fullscreenBtn = createHtmlElement('div', 'full-screen');
    fullscreenBtn.id = '.countries-list-wrapper';
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
