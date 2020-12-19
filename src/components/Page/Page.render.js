import { renderHeader } from '../Header/Header.render';
import { renderFooter } from '../Footer/Footer.render';
import { renderMainContent } from '../Main/Main.render';

export const renderPage = () => {
    document.body.append(renderHeader(), renderMainContent(), renderFooter());
};
