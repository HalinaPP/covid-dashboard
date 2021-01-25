import { TITLE } from '@/constants/constants';
import { createHtmlElement } from '@/helpers/utils';

function getYesterday() {
    var n = new Date;
    n.setDate(n.getDate() -1);
    return n.toLocaleDateString();
}

export const renderHeader = () => {
    const header = createHtmlElement('header', 'header');
    header.innerHTML = `<img src="./assets/icons/logo.svg" alt="Coronavirus">
                        <h1>${TITLE}</h1>`;
    const timeWrapper = createHtmlElement('div', 'update');
    timeWrapper.innerHTML = `<span>Last update: </span>&nbsp<span> ${getYesterday()}</span>`;
    header.appendChild(timeWrapper);
    return header;
};
