const AMOUNT_PERIOD = [
    [0, 1000],
    [1001, 10000],
    [10001, 100000],
    [100001, 1000000],
    [1000001, 30000000]
];
const AMOUNT_PERIOD_DEATH = [
    [0, 100],
    [101, 1000],
    [1001, 10000],
    [10001, 100000],
    [100001, 5000000]
];

const COLORS_MAP = {
    cases: ['#FFACAE', '#FF6064', '#9F3C3E', '#FF0007', '#790003'],
    recovered: ['#ABFECA', '#5FFE9A', '#00FA5D', '#3B9C5F', '#00772C'],
    deaths: ['#B7B7B7', '#757575', '#484848', '#232323', '#111111']
};

const COLORS_MAP_BORDER = {
    cases: '#790003',
    recovered: '#00772C',
    deaths: '#111111'
};
const MAP_DIV_ID = 'map';
const WORLD_MAP_URL =
    'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
const MAP_CENTER = [17.385044, 78.486671];
const DEATHS = 'deaths';
const RECOVERY = 'recovered';
const CASES = 'cases';
const DEATHS_COLOR = 'black';
const RECOVERY_COLOR = 'green';
const CASES_COLOR = 'red';
const LEGEND_TITLE = '<h3>Color range of cases:</h3>';

export {
    MAP_CENTER,
    DEATHS,
    RECOVERY,
    CASES,
    DEATHS_COLOR,
    RECOVERY_COLOR,
    CASES_COLOR,
    WORLD_MAP_URL,
    MAP_DIV_ID,
    AMOUNT_PERIOD,
    AMOUNT_PERIOD_DEATH,
    LEGEND_TITLE,
    COLORS_MAP,
    COLORS_MAP_BORDER
};
