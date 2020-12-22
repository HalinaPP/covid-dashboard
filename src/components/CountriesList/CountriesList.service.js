import { connectedCountryActions, store } from '@/redux/store';
import { getCountriesInfo, getMapinfo } from '@/services/Countries';
import { ALL_PERIOD, LAST_DAY } from '@/services/filterTypes';
import { CASES, DEATHS, RECOVERY } from '@/constants/map';
import { createHtmlElement } from '@/helpers/utils';

async function getCountries() {
    const state = store.getState();

    const countries = await getCountriesInfo();
    return countries.map((country) => {
        if (!country.id) {
            return null;
        }
        let casesObj;
        let cases;
        switch (state.country.period) {
            case ALL_PERIOD:
                casesObj = country.allPeriod;
                break;
            case LAST_DAY:
                casesObj = country.lastDay;
                break;
            default:
                break;
        }
        switch (state.country.casesType) {
            case CASES:
                cases = casesObj.cases;
                break;
            case DEATHS:
                cases = casesObj.deaths;
                break;
            case RECOVERY:
                cases = casesObj.recovered;
                break;
            default:
                break;
        }
        return {
            name: country.name,
            flag: country.flag,
            cases: cases,
            id: country.id,
        };
    });
}

function renderCountryItem(country) {
    const countryLi = createHtmlElement('li');
    const countryDiv = createHtmlElement('div');
    countryDiv.id = country.id;
    countryDiv.innerHTML = `
            <img src="${country.flag}" width="35" height="25" alt="flag">
            <span>${country.name}</span>
            <span> ${country.cases}</span>
            `;
    countryLi.append(countryDiv);
    countryDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        connectedCountryActions.changeCountry(e.target.closest('div').id);
    });
    return countryLi;
}

export const setCountries = async () => {
    const list = document.querySelector('.countries-list');
    list.innerHTML = '';
    const countries = await getCountries();

    countries.forEach((country) => {
        if (!country) {
            return;
        }
        const countryLi = renderCountryItem(country);

        list.append(countryLi);
    });
};

store.subscribe(() => {
    setCountries();
});
