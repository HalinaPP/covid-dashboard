import { connectedCountryActions, store } from '@/redux/store';
import { getCountriesInfo, getMapinfo } from '@/services/Countries';
import { ALL_PERIOD, LAST_DAY } from '@/services/filterTypes';
import { CASES, DEATHS, RECOVERY, WORLD_ID, WORLD_NAME } from '@/constants/constants';
import { createHtmlElement, getCasesColor } from '@/helpers/utils';
import { WORLD_IMG_URL } from '@/components/Chart/constants';
import { renderFilter, renderOnefilterElement } from '@/components/Filter/Filter.render';
import { FILTERS } from '@/components/Filter/filter';

async function getCountries() {
    const state = store.getState();

    const countries = await getCountriesInfo();
    const countryResult = [];
     countries.forEach((country) => {
        if (country.id) {
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
         countryResult.push({
            name: country.name,
            flag: country.flag,
            cases: cases,
            id: country.id,
        });
        }
    });
     return countryResult;
}

function renderCountryItem(country) {
    const countryLi = createHtmlElement('li');
    const countryDiv = createHtmlElement('div');
    countryDiv.id = country.id;
    countryDiv.innerHTML = `
            <img src="${
                country.name !== WORLD_ID ? country.flag : WORLD_IMG_URL
            }" width="35" height="25" alt="flag">
            <span id="name"  >${country.name !== WORLD_ID ? country.name : WORLD_NAME}</span>
            <span style="color: ${getCasesColor()}"> ${country.cases}</span>
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

const setFilter = () => {
    const filterWrap = document.querySelector('.list--search-filter');
    const cases = FILTERS.find((item) => item.name === 'CasesType');
    filterWrap.innerHTML = '';
    filterWrap.appendChild(renderOnefilterElement(cases));
};

export const setCountries = async () => {
    const list = document.querySelector('.countries-list');
    const state = store.getState().country;
    let selectedCountry = null;
    let worldOption = null;
    list.innerHTML = '';
    const countries = await getCountries();

    countries.sort((a, b) => {
            return b.cases - a.cases;
    });

    countries.forEach((country) => {
        if (!country) {
            return;
        }
        const countryLi = renderCountryItem(country, state);
        if (state.activeCountry === country.id) {
            selectedCountry = countryLi;
        } else if(country.id === WORLD_ID){
            worldOption = countryLi;
        }
        else{
            list.append(countryLi)
        }
    });
    selectedCountry.classList.add('active');
    if(worldOption){
        list.prepend(worldOption);
    }
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
    setFilter();
    await setCountries();
    doSearch();
});
