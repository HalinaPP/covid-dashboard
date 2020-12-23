import { MAP_OPTIONS, MAP_LAYER_OPTIONS, WORLD_MAP_URL, MAP_DIV_ID, LEGEND_TITLE } from './map';
import { createHtmlElement } from '@/helpers/utils';
import { onEachFeature, getLegendText } from './Map.service';
import { store } from '@/redux/store';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '@/data/countries.geo.json';
import { renderFilter } from '../Filter/Filter.render';

const getMapOptions = () => {
    return MAP_OPTIONS;
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

const getLegendPrefix = () => {
    return `<div class="legend">
                ${LEGEND_TITLE}
                <div class="legend-info">${getLegendText()}</div>
            </div>`;
};

export const renderLegendToMap = () => {
    const attrOptions = {
        prefix: getLegendPrefix(),
        position: 'bottomleft',
    };

    return L.control.attribution(attrOptions);
};

let map;
let legend;
let countriesLayer;

const renderMapElement = async (mapEl) => {
    map = renderWorldMap(mapEl);
    map.addLayer(renderWorldMapLayer());
    renderScaleControl().addTo(map);
    legend = renderLegendToMap().addTo(map);
};

export const renderMapContainer = (mainEl) => {
    const mapEl = createHtmlElement('div');
    mapEl.setAttribute('id', MAP_DIV_ID);
    mainEl.insertAdjacentElement('afterbegin', mapEl);

    mapEl.appendChild(renderFilter());
    renderMapElement(mapEl);
    return mapEl;
};
export const loadMap = async () => {
    if (countriesLayer) {
        countriesLayer.remove();
    }
    countriesLayer = renderCountriesPoligonLayer().addTo(map);
    legend.setPrefix(getLegendPrefix());
};

store.subscribe(() => {
    loadMap();
});
