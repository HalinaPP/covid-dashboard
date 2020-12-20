import { LAST_DAY, ALL_PERIOD, ABSOLUTE, RELATIVE } from './filterTypes';
import countriesData from '@/data/countries.json';
import { store } from '@/redux/store';
import { CASES, DEATHS, RECOVERY } from '@/constants/constants';

function generateCountryObj(country) {
    if (!country) {
        return {
            id: null,
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
            recovered: country.recovered,
        },
        lastDay: {
            cases: country.todayCases,
            deaths: country.todayDeaths,
            recovered: country.todayRecovered,
        },
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
        const responseCountries = await fetch('https://disease.sh/v3/covid-19/countries');
        const coundtryData = await responseCountries.json();
        cachedInfo = await generateCountryArr(coundtryData);
        const responseWorld = await fetch('https://disease.sh/v3/covid-19/all');
        const worldData = await responseWorld.json();
        console.log(worldData);
        const worldObj = await generateCountryObj(worldData);
        cachedInfo.push(worldObj);
        return cachedInfo;
    };
}

export const getCountriesInfo = getAllCountyriesInfo();

function countCountryRelativeOneHundred(casesValue, population) {
    return Math.round(casesValue / (population / 100000));
}

export async function getMapinfo(id) {
    const state = store.getState();
    const countries = await getCountriesInfo();
    console.log(id);
    console.log(countries);
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

export async function getChartInfo() {
    const state = store.getState();

    let casesArray;
    const result = {
        casesType: null,
        casesCount: 0,
        timeLine: 0,
    };
    const countries = await getCountriesInfo();
    const countryName = state.country.activeCountry;
    const countryPop = countries.find(
        (item) => item.id === countryName || item.name === countryName
    );
    const population = countryPop.population;
    const response = await fetch(
        `https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=365`
    );
    const responseData = await response.json();

    switch (state.country.casesType) {
        case CASES:
            result.casesType = CASES;
            casesArray = responseData.cases || responseData.timeline.cases;
            break;
        case DEATHS:
            result.casesType = DEATHS;
            casesArray = responseData.deaths || responseData.timeline.deaths;
            break;
        case RECOVERY:
            result.casesType = RECOVERY;
            casesArray = responseData.recovered || responseData.timeline.recovered;
            break;
        default:
            break;
    }

    const periodArray = {
        timeLine: null,
        casesCount: null,
    };

    if (state.country.period === ALL_PERIOD) {
        periodArray.timeLine = Object.keys(casesArray);
        periodArray.casesCount = Object.values(casesArray);
    } else if (state.country.period === LAST_DAY) {
        periodArray.timeLine = Object.keys(casesArray);
        periodArray.casesCount = Object.values(casesArray).map((item, index, array) => {
            if (index === 0) {
                return item;
            }
            return item - array[index - 1];
        });
    }
    console.log();
    result.timeLine = periodArray.timeLine.reverse();
    switch (state.country.valueType) {
        case ABSOLUTE:
            result.casesCount = periodArray.casesCount.reverse();
            break;
        case RELATIVE:
            result.casesCount = periodArray.casesCount
                .map((item) => countCountryRelativeOneHundred(item, population))
                .reverse();
            break;
        default:
            break;
    }
    console.log(result);
    return result;
}
