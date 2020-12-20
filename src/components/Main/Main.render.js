import { loadMap } from '../Map/Map.render';
import { createHtmlElement } from '../../helpers/utils';
import { renderCountryTable } from '../CountryTable/CountryTable.render';
import { renderChart } from '../Chart/Chart.render';
import { renderCountriesList } from '../CountriesList/CountriesList.render';

export const renderMainContent = () => {
    const mainEl = createHtmlElement('main', 'main');
    document.body.appendChild(mainEl);

    mainEl.appendChild(renderCountriesList());
    loadMap(mainEl);

    const rightCol = createHtmlElement('aside', 'right-col');
    mainEl.appendChild(rightCol);
    rightCol.appendChild(renderCountryTable());
    renderChart(rightCol);

    return mainEl;
};
