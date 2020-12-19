import { FOOTER_COPYRIGHT_DEVELOPERS, FOOTER_COPYRIGHT_RSSCHOOL } from '../../constants/constants';
import { createHtmlElement } from '../../helpers/utils';

export const renderFooter = () => {
    const footer = createHtmlElement('footer');
    footer.innerHTML = FOOTER_COPYRIGHT_DEVELOPERS + FOOTER_COPYRIGHT_RSSCHOOL;

    return footer;
};
