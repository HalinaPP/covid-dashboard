import { renderMapContainer } from '../Map/Map.render';
import { createHtmlElement } from '@/helpers/utils';
import { renderCountryTable } from '../CountryTable/CountryTable.render';
import { renderChart } from '../Chart/Chart.render';
import { renderCountriesList } from '../CountriesList/CountriesList.render';
import { getCountriesInfo } from '@/services/Countries';

export const renderMainContent = async () => {
    const mainEl = createHtmlElement('main', 'main');
    document.body.appendChild(mainEl);

    const leftCol = createHtmlElement('aside', 'left-col');
    mainEl.appendChild(leftCol);

    const rightCol = createHtmlElement('aside', 'right-col');
    mainEl.appendChild(rightCol);

    renderCountriesList(leftCol);
    renderCountryTable(leftCol);

    renderChart(rightCol);
    renderMapContainer(rightCol);
    await getCountriesInfo();
    return mainEl;
};
