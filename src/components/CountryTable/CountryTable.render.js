import { createHtmlElement } from '@/helpers/utils';

const renderTableWrapperContainer = (mainEl) => {
    const table = createHtmlElement('div', 'countriy-data-table');
    mainEl.appendChild(table);
    return table;
};

export const renderCountryTable = (mainEl) => {
    const wrapper = renderTableWrapperContainer(mainEl);
    wrapper.innerHTML = 'table';
};
