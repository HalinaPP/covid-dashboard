import { MAP_CENTER, WORLD_MAP_URL, MAP_DIV_ID, LEGEND_TITLE } from '@/constants/map';
import { createHtmlElement } from '@/helpers/utils';
import { onEachFeature, getLegendText } from './Map.service';
import { store } from '@/redux/store';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '@/data/countries.geo.json';

const mapLayerOptions = {
    attribution: '',
    maxZoom: 16,
    continuousWorld: false,
    noWrap: true
};

const mapOptions = {
    center: MAP_CENTER,
    zoom: 2,
    worldCopyJump: true,
    preferCanvas: true,
    zoomSnap: 0,
    doubleClickZoom: false,
    minZoom: 0
};

const getMapOptions = () => {
    return mapOptions;
};

export const renderMapContainer = (mainEl) => {
    const mapEl = createHtmlElement('div');
    mapEl.setAttribute('id', MAP_DIV_ID);
    mainEl.appendChild(mapEl);
    return mapEl;
};

const renderWorldMap = (mapEl) => {
    return new L.Map(mapEl, getMapOptions()).setView([40, 0], 2);
};

const renderCountriesPoligonLayer = () => {
    return new L.GeoJSON(data, {
        onEachFeature
    });
};

const renderScaleControl = () => {
    return L.control.scale();
};

const renderWorldMapLayer = () => {
    return L.tileLayer(WORLD_MAP_URL, mapLayerOptions);
};

export const renderLegendToMap = () => {
    const innerText = `<div class="legend">
                            ${LEGEND_TITLE}
                            <div class="legend-info">${getLegendText()}</div>
                        </div>`;

    const attrOptions = {
        prefix: innerText,
        position: 'bottomleft'
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
