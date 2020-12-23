import { createHtmlElement, createIconHTML } from '@/helpers/utils';
import { doSearch, setCountries } from '@/components/CountriesList/CountriesList.service';
import { renderFilter } from '../Filter/Filter.render';
import { openKeyboard } from '@/components/Keyboard/Keyboard.service';

const renderInfoContainer = (listEl) => {
    const filterBlock = createHtmlElement('div', 'list--search-wrapper');
    const filter = createHtmlElement('div', 'list--search-filter filter');
    filter.innerHTML = 'filter';

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
    const countryList = createHtmlElement('ul', 'countries-list');
    listContainer.appendChild(countryList);
    mainEl.appendChild(listContainer);
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
