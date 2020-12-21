import { createHtmlElement } from '@/helpers/utils';

export const renderCountriesList = () => {
    const list = createHtmlElement('aside', 'countries-list');
    list.innerHTML = 'list';
    return list;
};
