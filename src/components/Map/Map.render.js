import { MAP_CENTER, WORLD_MAP_URL, MAP_DIV_ID } from '../../constants/constants';
import { createHtmlElement } from '../../helpers/utils';
import { onEachFeature, setPoligonStyleByDataType } from './Map.service';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../../data/countries.geo.json';

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
    minZoom: 1.5
};

const getMapOptions = () => {
    return mapOptions;
};

export const renderMapContainer = (mainEl) => {
    const mapEl = createHtmlElement('div');
    mapEl.setAttribute('id', MAP_DIV_ID);
    console.log('map render');
    mainEl.appendChild(mapEl);
    return mapEl;
};

const renderWorldMap = (mapEl) => {
    return new L.Map(mapEl, getMapOptions()).setView([40, 0], 2);
};

const renderCountriesPoligonLayer = () => {
    return new L.GeoJSON(data, {
        style: setPoligonStyleByDataType,
        onEachFeature: onEachFeature
    });
};

const renderScaleControl = () => {
    return L.control.scale();
};

const renderWorldMapLayer = () => {
    return L.tileLayer(WORLD_MAP_URL, mapLayerOptions);
};

const renderLegendToMap = () => {
    const attrOptions = {
        prefix: '<b>Legend:</b><div>Color range of cases</div>',
        position: 'bottomleft'
    };

    return L.control.attribution(attrOptions);
};

export const loadMap = (mainEl) => {
    console.log('map load');
    const mapEl = renderMapContainer(mainEl);

    const map = renderWorldMap(mapEl);
    map.addLayer(renderWorldMapLayer());
    renderCountriesPoligonLayer().addTo(map);
    renderScaleControl().addTo(map);
    renderLegendToMap().addTo(map);
};
