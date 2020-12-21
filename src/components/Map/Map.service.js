import {
    DEATHS,
    RECOVERY,
    DEATHS_COLOR,
    RECOVERY_COLOR,
    CASES_COLOR,
    AMOUNT_PERIOD,
    AMOUNT_PERIOD_DEATH,
    COLORS_MAP,
    COLORS_MAP_BORDER,
    COUNTRY_HOVER_STYLE
} from '@/constants/map';

import L from 'leaflet';
import { store } from '@/redux/store';
import { getCountryInfo, getCountriesInfo } from '@/services/Countries';
import { changeToCamelCaseString } from '@/helpers/utils';

function handleClick() {
    /*
  setCurrCountry(country, event);
  */
}

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

export const getLegendText = () => {
    const type = getDataType();

    const colorName = getColorPalite(type);
    const amountArr = type === DEATHS ? AMOUNT_PERIOD_DEATH : AMOUNT_PERIOD;

    let text = '';
    amountArr.forEach((item, index) => {
        const className = `${colorName}-i${index + 1}-circle`;
        text += `<div class="legend-item">
                    <span class="${className}"></span>
                     ${item[0]} - ${item[1]}
                </div>`;
    });
    return text;
};

const getCasesByPeriod = async (countryId) => {
    const countriesInfo = await getCountriesInfo();

    const countryInfo = await getCountryInfo(countryId, countriesInfo);

    const state = store.getState();
    const type = changeToCamelCaseString(state.country.casesType);
    const period = changeToCamelCaseString(state.country.period);

    if (countryInfo && countryInfo[0] && countryInfo[0][period] && countryInfo[0][period][type]) {
        return countryInfo[0][period][type];
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

    feature.bindPopup(`${popupText}`).openPopup();
};

const mouseOverFeature = (event) => {
    const feature = event.target;
    createPopup(feature);

    feature.setStyle(COUNTRY_HOVER_STYLE);
    if (!L.Browser.ie && !L.Browser.opera) {
        feature.bringToFront();
    }
};

const mouseOutFeature = (event) => {
    const feature = event.target;
    feature.setStyle({
        fillOpacity: 1
    });

    feature.closePopup();
};

const getColorIntensity = async (countryId) => {
    const amountCases = await getCasesByPeriod(countryId);
    const dataType = getDataType();

    const amountRangeArr = dataType === DEATHS ? AMOUNT_PERIOD_DEATH : AMOUNT_PERIOD;

    const colorNum = amountRangeArr.findIndex(
        (item) => amountCases >= item[0] && amountCases <= item[1]
    );

    return COLORS_MAP[dataType][colorNum];
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
