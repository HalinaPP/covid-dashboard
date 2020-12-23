import { FAVICON_URL } from '@/constants/constants';
import { renderFavicon } from '@/helpers/utils';
import { renderHeader } from '../Header/Header.render';
import { renderFooter } from '../Footer/Footer.render';
import { renderMainContent } from '../Main/Main.render';
import { getCountriesInfo } from '@/services/Countries';
import { store } from '@/redux/store';
import { renderKeyboard } from '@/components/Keyboard/Keyboard.render';

export const renderPage = async () => {
    renderFavicon(FAVICON_URL);
    document.body.append(renderHeader());
    await renderMainContent();
    document.body.append(renderFooter());
    document.body.append(renderKeyboard());

    store.dispatch({}, { type: '__INIT__' });
};
