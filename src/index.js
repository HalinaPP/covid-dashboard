import './styles/styles.scss';
import { renderPage } from './components/Page/Page.render';
import { getMapinfo, getCountriesInfo } from '@/services/Countries';
import { connectedCountryActions, store } from '@/redux/store';
import { LAST_DAY, RELATIVE } from '@/services/filterTypes';
import { DEATHS } from '@/constants/map';
import { CASES, RECOVERY } from './constants/map';
import { renderLegendToMap } from './components/Map/Map.render';

(async () => {
    const res = await getCountriesInfo();
    let blr = await getMapinfo('BLR');

    connectedCountryActions.changePeriod(LAST_DAY);
    connectedCountryActions.changeCasesType(DEATHS);

    blr = await getMapinfo('BLR');
    console.log('blr2=', blr);
})();

window.addEventListener('DOMContentLoaded', renderPage());
