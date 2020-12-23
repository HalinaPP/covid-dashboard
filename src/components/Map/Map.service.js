import { DEATHS, RECOVERY } from '@/constants/constants';
import {
    DEATHS_COLOR,
    RECOVERY_COLOR,
    CASES_COLOR,
    AMOUNT_PERIOD,
    AMOUNT_PERIOD_DEATH,
    COLORS_MAP,
    COLORS_MAP_BORDER,
    COUNTRY_HOVER_STYLE,
    RELATIVE_DIVIDER,
    RELATIVE_DIVIDER_LEGEND,
    RELATIVE_DIVIDER_DEATH_LEGEND
} from './map';
import { RELATIVE } from '@/services/filterTypes';
import L from 'leaflet';
import { store } from '@/redux/store';
import { getCountryInfo, getCountriesInfo } from '@/services/Countries';
import { changeToCamelCaseString } from '@/helpers/utils';
import { connectedCountryActions } from '@/redux/store';

const getDataType = () => {
    const state = store.getState();
    return state.country.casesType;
};

const getColorPalite = (type) => {
    let colorName;

    switch (type) {
        case DEATHS:
            colorName = DEATHS_COLOR;
            break;
        case RECOVERY:
            colorName = RECOVERY_COLOR;
            break;
        default:
            colorName = CASES_COLOR;
            break;
    }
    return colorName;
};

const isRelativeValue = (valueType) => {
    return valueType === RELATIVE;
};

const getRelativeValue = (value, population) => {
    return Math.ceil(value / (population / RELATIVE_DIVIDER));
};

export const getLegendText = () => {
    const state = store.getState();
    const { casesType, valueType } = state.country;

    const colorName = getColorPalite(casesType);
    let amountArr = AMOUNT_PERIOD;
    let dividerLegend = RELATIVE_DIVIDER_LEGEND;
    if (casesType === DEATHS) {
        amountArr = AMOUNT_PERIOD_DEATH;
        dividerLegend = RELATIVE_DIVIDER_DEATH_LEGEND;
    }

    let text = '';
    amountArr.forEach((item, index) => {
        const className = `${colorName}-i${index + 1}-circle`;
        const amountRange = isRelativeValue(valueType)
            ? `${Math.ceil(item[0] / dividerLegend)} - ${Math.ceil(item[1] / dividerLegend)}`
            : `${item[0]} - ${item[1]}`;
        text += `<div class="legend-item">
                    <span class="${className}"></span>
                     ${amountRange}
                </div>`;
    });
    return text;
};

const getCasesByPeriod = async (countryId) => {
    const countriesInfo = await getCountriesInfo();

    const countryInfo = (await getCountryInfo(countryId, countriesInfo))[0];

    const state = store.getState();

    const { casesType, period, valueType } = state.country;
    const typeParam = changeToCamelCaseString(casesType);
    const periodParam = changeToCamelCaseString(period);

    if (countryInfo && countryInfo[periodParam] && countryInfo[periodParam][typeParam]) {
        const value = countryInfo[periodParam][typeParam];
        if (isRelativeValue(valueType)) {
            return getRelativeValue(value, countryInfo.population);
        }
        return value;
    }
    return 0;
};

const createPopup = async (feature) => {
    const countryId = feature.feature.id;
    const type = getDataType();
    let amountCases;
    try {
        amountCases = await getCasesByPeriod(countryId);
    } catch (e) {
        amountCases = 0;
    }
    const popupText = `<div class="popup-country-title">
                            <h3>${feature.feature.properties.name}</h3>
                            <div>
                                ${type}:
                                <span class="${type}-color">${amountCases}</span>
                            </div>
                        </div>
                        `;
    const popupOptions = {
        autoPanPaddingTopLeft: L.point(0, 0),
        className: 'custom-popup'
    };
    feature.bindPopup(`${popupText}`, popupOptions).openPopup();
};

const mouseOverFeature = (event) => {
    const feature = event.target;

    feature.setStyle(COUNTRY_HOVER_STYLE);

    createPopup(feature);
    if (!L.Browser.ie && !L.Browser.opera) {
        feature.bringToFront();
    }
};

const mouseOutFeature = (event) => {
    const feature = event.target;
    feature.setStyle({
        fillOpacity: 1
    });

    // feature.closePopup();
};

const handleClick = (event) => {
    const countryId = event.target.feature.id;
    connectedCountryActions.changeCountry(countryId);
};

const getColorIntensity = async (countryId) => {
    const amountCases = await getCasesByPeriod(countryId);

    const { valueType, casesType } = store.getState().country;

    let amountRangeArr = AMOUNT_PERIOD;
    let dividerLegend = RELATIVE_DIVIDER_LEGEND;
    if (casesType === DEATHS) {
        dividerLegend = RELATIVE_DIVIDER_DEATH_LEGEND;
        amountRangeArr = AMOUNT_PERIOD_DEATH;
    }

    const colorNum = amountRangeArr.findIndex((item) => {
        let max = item[1];
        let min = item[0];
        if (isRelativeValue(valueType)) {
            max = Math.ceil(max / dividerLegend);
            min = Math.ceil(min / dividerLegend);
        }
        return amountCases >= min && amountCases <= max;
    });

    return COLORS_MAP[casesType][colorNum];
};

export const setPoligonStyleByDataType = async (feature) => {
    const color = await getColorIntensity(feature.id);

    const dataType = getDataType();
    const borderColor = COLORS_MAP_BORDER[dataType];

    return {
        fillColor: color,
        color: borderColor,
        weight: 2,
        fillOpacity: 1
    };
};

export const onEachFeature = async (feature, layer) => {
    const styleF = await setPoligonStyleByDataType(feature);
    layer.setStyle(styleF);
    layer.on({
        mouseover: mouseOverFeature,
        mouseout: mouseOutFeature,
        click: handleClick
    });
};
