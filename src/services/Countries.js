import { LAST_DAY, ALL_PERIOD, ABSOLUTE, RELATIVE } from './filterTypes'

function createDataObject(data,valueType){

}

export async function getTableInfo(country, period, valueType){
    let response;
    switch (period)
    {
        case LAST_DAY:
            response = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=1`);
            break;
        case ALL_PERIOD:
            response = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`);
            break;
        default:
            break;
    }
    let data = await response.json();
    return createDataObject(data,valueType);
}

