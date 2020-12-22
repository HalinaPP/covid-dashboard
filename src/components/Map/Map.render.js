import {
    MAP_OPTIONS,
    MAP_LAYER_OPTIONS,
    WORLD_MAP_URL,
    MAP_DIV_ID,
    LEGEND_TITLE,
} from '@/constants/map';
import { createHtmlElement } from '@/helpers/utils';
import { onEachFeature, getLegendText } from './Map.service';
import { store } from '@/redux/store';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '@/data/countries.geo.json';

const getMapOptions = () => {
    return MAP_OPTIONS;
};

export const renderMapContainer = (mainEl) => {
    const mapEl = createHtmlElement('div');
    mapEl.setAttribute('id', MAP_DIV_ID);
    mainEl.prepend(mapEl);
    return mapEl;
};

const renderWorldMap = (mapEl) => {
    return new L.Map(mapEl, getMapOptions()).setView([40, 0], 2);
};

const renderCountriesPoligonLayer = () => {
    return new L.GeoJSON(data, {
        onEachFeature,
    });
};

const renderScaleControl = () => {
    return L.control.scale();
};

const renderWorldMapLayer = () => {
    return L.tileLayer(WORLD_MAP_URL, MAP_LAYER_OPTIONS);
};

export const renderLegendToMap = () => {
    const innerText = `<div class="legend">
                            ${LEGEND_TITLE}
                            <div class="legend-info">${getLegendText()}</div>
                        </div>`;

    const attrOptions = {
        prefix: innerText,
        position: 'bottomleft',
    };

    return L.control.attribution(attrOptions);
};

const changeLegendText = () => {
    const legend = document.querySelector('.legend-info');
    legend.innerHTML = getLegendText();
};

export const loadMap = async (mainEl) => {
    const mapEl = renderMapContainer(mainEl);

    const map = renderWorldMap(mapEl);
    map.addLayer(renderWorldMapLayer());
    renderCountriesPoligonLayer().addTo(map);

    renderScaleControl().addTo(map);
    renderLegendToMap().addTo(map);
};

store.subscribe(() => {
    changeLegendText();
});
