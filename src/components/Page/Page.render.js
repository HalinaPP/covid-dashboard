import { FAVICON_URL } from '@/constants/constants';
import { renderFavicon } from '@/helpers/utils';
import { renderHeader } from '../Header/Header.render';
import { renderFooter } from '../Footer/Footer.render';
import { renderMainContent } from '../Main/Main.render';

export const renderPage = () => {
    renderFavicon(FAVICON_URL);
    document.body.append(renderHeader());
    renderMainContent();
    document.body.append(renderFooter());
};
