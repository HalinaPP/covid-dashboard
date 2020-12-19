import {
    CHANGE_COUNTRY,
    CHANGE_PERIOD,
    CHANGE_VALUE_TYPE
} from '../types';

const initialState = {
    activeCountry: null,
    period: null,
    valueType: null,
    countryInfo: {}
};

export function countryReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_COUNTRY:
            return {
                ...state,
                activeCountry: action.payload
            };
        case CHANGE_PERIOD:
            return {
                ...state,
                period: action.payload
            };
        case CHANGE_VALUE_TYPE:
            return {
                ...state,
                valueType: action.payload
            };
        default:
            return state;
    }
}