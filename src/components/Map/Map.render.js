import {
    MAP_OPTIONS,
    MAP_LAYER_OPTIONS,
    WORLD_MAP_URL,
    MAP_DIV_ID,
    LEGEND_TITLE,
    RELATIVE_AMOUNT_LEGEND,
    MAP_CENTER,
    MAP_ZOOM_FS,
    POSITION
} from './map';
import { RELATIVE } from '@/services/filterTypes';
import { createHtmlElement } from '@/helpers/utils';
import {
    renderFullScreenButton,
    hideOtherFullscreenBtn
} from '@/components/FullScreenButton/FullScreenButton.render';
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
    return new L.Map(mapEl, getMapOptions());
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
    return L.tileLayer(WORLD_MAP_URL, MAP_LAYER_OPTIONS);
};

const getLegendPrefix = () => {
    const state = store.getState().country;
    const type = state.casesType;
    const additionalHeader =
        state.valueType === RELATIVE ? `<div>${RELATIVE_AMOUNT_LEGEND}</div>` : '';
    return `<div class="legend">
                <h3>${LEGEND_TITLE} ${type} ${additionalHeader}</h3>

                <div class="legend-info">${getLegendText()}</div>
            </div>`;
};

export const renderLegendToMap = () => {
    const attrOptions = {
        prefix: getLegendPrefix(),
        position: 'bottomleft'
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
    const mapWrapper = createHtmlElement('div', 'map-wrapper');
    const mapEl = createHtmlElement('div');
    mapEl.setAttribute('id', MAP_DIV_ID);

    mapWrapper.appendChild(mapEl);
    mainEl.insertAdjacentElement('afterbegin', mapWrapper);

    renderMapElement(mapEl);

    return mapWrapper;
};

export const loadMap = async () => {
    if (countriesLayer) {
        countriesLayer.remove();
    }
    countriesLayer = renderCountriesPoligonLayer().addTo(map);

    legend.setPrefix(getLegendPrefix());
};

const changeMapElStyle = () => {
    const mapWrapper = document.querySelector('.map-wrapper');
    const position = mapWrapper.style.position;

    let mapZoom = MAP_ZOOM_FS;
    mapWrapper.style.margin = '0';
    mapWrapper.classList.remove('map-fullscreen');

    if (position === POSITION.absolute) {
        mapZoom = MAP_OPTIONS.zoom;
        mapWrapper.style.margin = '1rem';
        mapWrapper.classList.add('map-fullscreen');
    }

    map.setView(MAP_CENTER, mapZoom);

    mapWrapper.style.position =
        position === POSITION.absolute ? POSITION.relative : POSITION.absolute;
    mapWrapper.classList.toggle('fullscreen');
};

const handleFullScreen = (event) => {
    // eslint-disable-next-line no-restricted-globals
    window.scrollTo(pageXOffset, 0);
    document.body.classList.toggle('no-scroll');

    const selector = event.target.closest('div').id;
    hideOtherFullscreenBtn(selector);

    changeMapElStyle();

    map.invalidateSize(true);
};

store.subscribe(async () => {
    const mapEl = document.body.querySelector(`#${MAP_DIV_ID}`);

    const filter = mapEl.querySelector('.filter');
    if (filter) {
        filter.remove();
    }

    const mapWrapper = mapEl.parentElement;
    const fullscreenBtn = renderFullScreenButton(mapWrapper, handleFullScreen);
    fullscreenBtn.addEventListener('click', handleFullScreen);
    mapWrapper.appendChild(fullscreenBtn);

    await loadMap();
    mapEl.appendChild(renderFilter());
});
