import { connectedCountryActions, store } from '@/redux/store';
import { getCountriesInfo, getMapinfo } from '@/services/Countries';
import { ALL_PERIOD, LAST_DAY } from '@/services/filterTypes';
import { CASES, DEATHS, RECOVERY } from '@/constants/constants';
import { createHtmlElement } from '@/helpers/utils';
import { WORLD_IMG_URL } from '@/components/Chart/constants';

async function getCountries() {
    const state = store.getState();

    const countries = await getCountriesInfo();
    return countries.map((country) => {
        if (!country.id) {
            return null;
        }
        const casesObj = country.allPeriod;
        let cases;
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
            <img src="${
                country.name !== 'all' ? country.flag : WORLD_IMG_URL
            }" width="35" height="25" alt="flag">
            <span id="name">${country.name !== 'all' ? country.name : 'World'}</span>
            <span> ${country.cases}</span>
            `;
    countryLi.append(countryDiv);
    countryDiv.addEventListener('click', (e) => {
        const state = store.getState().country;
        e.stopPropagation();
        if (e.target.closest('div').id !== state.activeCountry)
            connectedCountryActions.changeCountry(e.target.closest('div').id);
    });
    return countryLi;
}

export const setCountries = async () => {
    const list = document.querySelector('.countries-list');
    const state = store.getState().country;
    let selectedCountry = null;
    list.innerHTML = '';
    const countries = await getCountries();
    countries.forEach((country) => {
        if (!country) {
            return;
        }
        const countryLi = renderCountryItem(country);
        if (state.activeCountry === country.id) {
            selectedCountry = countryLi;
        } else {
            list.append(countryLi);
        }
    });
    selectedCountry.classList.add('active');
    list.prepend(selectedCountry);
};

export const doSearch = () => {
    const countryListContainer = document.body.querySelector('.countries-list');
    const search = document.body.querySelector('.list--search-search');
    const liArr = countryListContainer.children;
    for (let i = 1; i < liArr.length; i++) {
        const node = liArr[i].querySelector('#name');
        if (node.innerHTML.toLowerCase().indexOf(search.value.toLowerCase()) !== -1) {
            liArr[i].classList.remove('hidden');
        } else {
            liArr[i].classList.add('hidden');
        }
    }
};

store.subscribe(async () => {
    await setCountries();
    doSearch();
});
