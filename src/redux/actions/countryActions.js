import {
    CHANGE_COUNTRY,
    CHANGE_PERIOD,
    CHANGE_VALUE_TYPE
} from '../types';

const changeCountry = (countryName) => {
    return {
        type: CHANGE_COUNTRY,
        payload: countryName
    };
}

const changePeriod = (period) => {
    return {
        type: CHANGE_PERIOD,
        payload: period
    };
}

const changeValueType = (valueType) => {
    return {
        type: CHANGE_VALUE_TYPE,
        payload: valueType
    };
}

export default { changeCountry, changePeriod, changeValueType };