import { LAST_DAY, ALL_PERIOD, ABSOLUTE, RELATIVE } from './filterTypes';
import countriesData from '@/data/countries.json';
import { store } from '@/redux/store'
import { CASES, DEATHS, RECOVERY } from '@/constants/constants';

function generateCountryObj(country){
    if(!country)
    {
        return {
            id: null
        };
    }
    let countryObj = {
        id: country.countryInfo.iso3,
        name: country.country,
        flag: country.countryInfo.flag,
        population: country.population,
        allPeriod: {
            cases: country.cases,
            deaths : country.deaths,
            recovered : country.recovered,
        },
        lastDay: {
            cases: country.todayCases,
            deaths : country.todayDeaths,
            recovered : country.todayRecovered,
        }
    }
    return countryObj;
}

function generateCountryArr(data){
    let countryArr = [];
    countriesData.countries.forEach((countryAbbr)=>{
        let dataCountry = data.find((country) => country.countryInfo.iso3 === countryAbbr.id);
        countryArr.push(generateCountryObj(dataCountry));
    })
    return countryArr;
}

 function getAllCountyriesInfo(){
    let cachedInfo;
    return async () => {
        if(cachedInfo){
            return cachedInfo;
        }
        let response = await fetch('https://disease.sh/v3/covid-19/countries?yesterday=1');
        let coundtryData = await response.json();
        cachedInfo = await generateCountryArr(coundtryData);
        return cachedInfo;
    }
}

let getCountryInfoCache = getAllCountyriesInfo();

export async function getCountriesInfo(){
    let countries = await getCountryInfoCache();
    return countries;
}

export async function getMapinfo(id){
    let state = store.getState();
    let countries = await getCountryInfoCache();
    console.log(id);
    console.log(countries);
    let countryObj = countries.find((obj) => obj.id === id);
    if(countryObj.id === null){
        return -1;
    }
    let periodObj ;
    let result;
    console.log(state);
    if(state.country.period === ALL_PERIOD){
        periodObj = countryObj.allPeriod;
    }
    else if(state.country.period === LAST_DAY){
        periodObj = countryObj.lastDay;
    }
    let casesValue ;
    switch (state.country.casesType){
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
    switch (state.country.valueType){
        case ABSOLUTE:
            result = casesValue;
            break;
        case RELATIVE:
            result =  Math.round(casesValue / (countryObj.population/ 100000));
            break;
        default:
            break
    }

    return result;
}