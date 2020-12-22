import { FAVICON_URL } from '@/constants/constants';
import { renderFavicon } from '@/helpers/utils';
import { renderHeader } from '../Header/Header.render';
import { renderFooter } from '../Footer/Footer.render';
import { renderMainContent } from '../Main/Main.render';
import { getCountriesInfo } from '@/services/Countries';

export const renderPage = async () => {
    renderFavicon(FAVICON_URL);
    document.body.append(renderHeader());
    await renderMainContent();
    document.body.append(renderFooter());
};
