import { loadMap, renderMapContainer } from '../Map/Map.render';
import { createHtmlElement } from '../../helpers/utils';

export const renderMainContent = () => {
    const mainEl = createHtmlElement('main', 'main');
    /* const map = renderMapContainer();
    console.log('main');
    mainEl.appendChild(map);
    console.log('main load'); */
    loadMap(mainEl);
    /* mainEl.appendChild(map); */
    // setTimeout(() => loadMap(), 2000);
    console.log('main load2');

    return mainEl;
};
