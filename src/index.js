import './styles/styles.scss';
import { renderPage } from './components/Page/Page.render';
import { getMapinfo, getCountriesInfo } from '@/services/Countries';
import { connectedCountryActions } from '@/redux/store';
import { LAST_DAY, RELATIVE } from '@/services/filterTypes';
import { DEATHS } from '@/constants/constants';


(async () => {
    let res = await getCountriesInfo();
    let blr = await getMapinfo('BLR');
    console.log(res);
    console.log(blr);
    connectedCountryActions.changePeriod(LAST_DAY);
    connectedCountryActions.changeCasesType(DEATHS);
    blr = await getMapinfo('BLR');
    console.log(blr);
})()

window.addEventListener('DOMContentLoaded', renderPage());
