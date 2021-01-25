import { CHANGE_COUNTRY, CHANGE_PERIOD, CHANGE_VALUE_TYPE, CHANGE_CASES_TYPE } from '../types';
import { ABSOLUTE, ALL_PERIOD } from '@/services/filterTypes';
import { CASES } from '@/constants/constants';

const initialState = {
    activeCountry: 'all',
    period: ALL_PERIOD,
    valueType: ABSOLUTE,
    casesType: CASES,
};

export function countryReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_COUNTRY:
            return {
                ...state,
                activeCountry: action.payload,
            };
        case CHANGE_PERIOD:
            return {
                ...state,
                period: action.payload,
            };
        case CHANGE_VALUE_TYPE:
            return {
                ...state,
                valueType: action.payload,
            };
        case CHANGE_CASES_TYPE:
            return {
                ...state,
                casesType: action.payload,
            };
        default:
            return state;
    }
}
