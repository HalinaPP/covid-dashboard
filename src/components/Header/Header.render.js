import { TITLE } from '@/constants/constants.js';
import { createHtmlElement } from '@/helpers/utils';

export const renderHeader = () => {
    const header = createHtmlElement('header', 'header');
    header.innerHTML = `<img src="./assets/icons/logo.svg" alt="Coronavirus">
                        <h1>${TITLE}</h1>`;

    return header;
};
