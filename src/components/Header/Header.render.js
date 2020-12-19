import { TITLE } from '../../constants/constants.js';
import { createHtmlElement } from '../../helpers/utils';

export const renderHeader = () => {
    const header = createHtmlElement('header', 'header');
    header.innerHTML = TITLE;
    return header;
};
