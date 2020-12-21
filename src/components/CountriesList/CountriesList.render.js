import { createHtmlElement } from '@/helpers/utils';

const renderTableWrapperContainer = (mainEl) => {
    const list = createHtmlElement('div', 'countries-list');
    mainEl.appendChild(list);
    return list;
};

export const renderCountriesList = (mainEl) => {
    const wrapper = renderTableWrapperContainer(mainEl);
    wrapper.innerHTML = 'list';
};
