import {
    DEATHS,
    RECOVERY,
    CASES,
    DEATHS_COLOR,
    RECOVERY_COLOR,
    CASES_COLOR
} from '../../constants/constants';

import L from 'leaflet';

function handleClick() {
    /*
  setCurrCountry(country, event);
  */
}

const highlightStyle = {
    weight: 1,
    dashArray: '',
    fillOpacity: 0.2,
    color: 'red',
    fillColor: 'red'
};

function mouseOverFeature(event) {
    const feature = event.target;

    feature.bindPopup(`${feature.feature.properties.name}`).openPopup();
    feature.setStyle(highlightStyle);
    if (!L.Browser.ie && !L.Browser.opera) {
        feature.bringToFront();
    }
}

function mouseOutFeature(event) {
    // geoJsonLayer.resetStyle(evt.target);
    const feature = event.target;
    feature.closePopup();
}

export const onEachFeature = (feature, layer) => {
    layer.on({
        mouseover: mouseOverFeature,
        mouseout: mouseOutFeature,
        click: handleClick
    });
};

const getDataType = () => {
    // return state.currDataType;
    return CASES;
};

const getIntensity = (dataType, countryId) => {
    return 0.5;
};

export const setPoligonStyleByDataType = (feature) => {
    const dataType = getDataType();
    const intensity = getIntensity(dataType, feature.id);

    let color;
    switch (dataType) {
        case DEATHS:
            color = DEATHS_COLOR;
            break;
        case RECOVERY:
            color = RECOVERY_COLOR;
            break;
        case CASES:
        default:
            color = CASES_COLOR;
    }
    return { color, weight: 1, fillOpacity: intensity };
};
