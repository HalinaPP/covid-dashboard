import { LAST_DAY, ALL_PERIOD, ABSOLUTE, RELATIVE } from './filterTypes';
import countriesData from '@/data/countries.json';
import { store } from '@/redux/store';
import { CASES, DEATHS, RECOVERY } from '@/constants/constants';
import { GET_ALL_COUNTRIES_URL, GET_WORLD_URL } from '@/services/constant';

function generateCountryObj(country) {
    if (!country) {
        return {
            id: null
        };
    }
    const countryObj = {
        id: country.countryInfo ? country.countryInfo.iso3 : 'all',
        name: country.country || 'all',
        flag: country.countryInfo ? country.countryInfo.flag : '',
        population: country.population,
        allPeriod: {
            cases: country.cases,
            deaths: country.deaths,
            recovered: country.recovered
        },
        lastDay: {
            cases: country.todayCases,
            deaths: country.todayDeaths,
            recovered: country.todayRecovered
        }
    };
    return countryObj;
}

function generateCountryArr(data) {
    const countryArr = [];
    countriesData.countries.forEach((countryAbbr) => {
        const dataCountry = data.find((country) => country.countryInfo.iso3 === countryAbbr.id);
        countryArr.push(generateCountryObj(dataCountry));
    });
    return countryArr;
}

function getAllCountyriesInfo() {
    let cachedInfo;
    return async () => {
        if (cachedInfo) {
            return cachedInfo;
        }
        const responseCountries = await fetch(GET_ALL_COUNTRIES_URL);
        const coundtryData = await responseCountries.json();
        cachedInfo = await generateCountryArr(coundtryData);
        const responseWorld = await fetch(GET_WORLD_URL);
        const worldData = await responseWorld.json();
        console.log(worldData);
        const worldObj = await generateCountryObj(worldData);
        cachedInfo.push(worldObj);
        return cachedInfo;
    };
}

export const getCountriesInfo = getAllCountyriesInfo();

export const getCountryInfo = (countryId, countriesInfo) => {
    return countriesInfo.filter((country) => country.id === countryId);
};

export async function getMapinfo(id) {
    const state = store.getState();
    const countries = await getCountriesInfo();
    const countryObj = countries.find((item) => item.id === id || item.name === id);
    if (countryObj.id === null) {
        return -1;
    }
    let periodObj;
    let result;
    console.log(state.country.period);
    if (state.country.period === ALL_PERIOD) {
        periodObj = countryObj.allPeriod;
    } else if (state.country.period === LAST_DAY) {
        periodObj = countryObj.lastDay;
    }
    let casesValue;
    switch (state.country.casesType) {
        case CASES:
            casesValue = periodObj.cases;
            break;
        case DEATHS:
            casesValue = periodObj.deaths;
            break;
        case RECOVERY:
            casesValue = periodObj.recovered;
            break;
        default:
            break;
    }

    switch (state.country.valueType) {
        case ABSOLUTE:
            result = casesValue;
            break;
        case RELATIVE:
            result = Math.round(casesValue / (countryObj.population / 100000));
            break;
        default:
            break;
    }
    return result;
}
