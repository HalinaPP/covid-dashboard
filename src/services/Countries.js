import { LAST_DAY, ALL_PERIOD, ABSOLUTE, RELATIVE } from './filterTypes'

function getDate(dateObj){
    let dateArr =  Object.keys(dateObj);
    return (dateArr.length < 2 ? 'all' : dateArr[1]);
}

function countNumberOf(cases, valueType, population)
{
    let quantity;
    let quantityArr = Object.values(cases);
    if(valueType === ABSOLUTE) {
        if (quantityArr.length < 2) {
            quantity = quantityArr[0];
        }
        else {
            quantity = quantityArr[1] - quantityArr[0];
        }
    }
    else if(valueType === RELATIVE) {
        if (quantityArr.length < 2) {
            quantity =  Math.round(quantityArr[0] / (population/ 100000));
        }
        else {
            quantity = Math.round((quantityArr[1] - quantityArr[0]) / (population / 100000));
        }
    }
    return quantity;
}

async function createDataObject(responseData, valueType){

    let population = 7594000000;
    let resultObj = {
        country: 'all',
        cases: 0,
        deaths: 0,
        recovered: 0,
        date: 'all'
    };
    if(responseData.country) {
        let response = await fetch(`https://restcountries.eu/rest/v2/name/${responseData.country}`);
        let dataResp = await response.json();
        console.log(dataResp[0].population);
        population = dataResp[0].population;
        resultObj.country = responseData.country
    }
    if(responseData.cases){
        resultObj.cases = countNumberOf(responseData.cases,valueType,population);
        resultObj.deaths = countNumberOf(responseData.deaths,valueType,population);
        resultObj.recovered = countNumberOf(responseData.recovered,valueType,population);
        resultObj.date = getDate(responseData.cases);
    }
    else
    {
        resultObj.cases = countNumberOf(responseData.timeline.cases,valueType,population);
        resultObj.deaths = countNumberOf(responseData.timeline.deaths,valueType,population);
        resultObj.recovered = countNumberOf(responseData.timeline.recovered,valueType,population);
        resultObj.date = getDate(responseData.timeline.cases);
    }
    return resultObj;
}

/**
 * Return obj with field:
 * country: name of country or all
 * cases: count of cases
 * deaths: count of deaths
 * recovered: count of recovered
 * date: last date or all
 * @param { string } country - name of country
 * @param { string }  period  - constant value of period ALL_PERIOD/LAST_DAY
 * @param { string }  valueType  - constant value of ABSOLUTE/RELATIVE value
 * @returns { object } covid info
 */
export async function getTableInfo(country, period, valueType){

    let response;
    let resultQuery;
    let responseData;

    switch (period)
    {
        case LAST_DAY:
            response = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=2`);
            break;
        case ALL_PERIOD:
            response = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=1`);
            break;
        default:
            break;
    }
    responseData = await response.json();
    console.log(responseData);
    resultQuery = await createDataObject(responseData,valueType);
    return resultQuery;
}

