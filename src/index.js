import './styles/styles.scss';
import { renderPage } from './components/Page/Page.render';
import { getMapinfo, getCountriesInfo } from '@/services/Countries';
import { connectedCountryActions } from '@/redux/store';
import { ABSOLUTE, ALL_PERIOD, LAST_DAY, RELATIVE } from '@/services/filterTypes';
import { DEATHS, CASES } from '@/constants/constants';

connectedCountryActions.changePeriod(ALL_PERIOD);
connectedCountryActions.changeCasesType(CASES);
connectedCountryActions.changeValueType(ABSOLUTE);
connectedCountryActions.changeCountry('all');

window.addEventListener('DOMContentLoaded', renderPage());
