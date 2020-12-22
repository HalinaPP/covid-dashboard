import { createHtmlElement } from '@/helpers/utils';
import { doSearch, setCountries } from '@/components/CountriesList/CountriesList.service';

const renderInfoContainer = (listEl) => {
    const filterBlock = createHtmlElement('div', 'list--search-wrapper');
    const search = createHtmlElement('input', 'list--search-search');
    const filter = createHtmlElement('div', 'list--search-filter');

    search.placeholder = 'Search';
    filter.innerHTML = 'filter';

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
