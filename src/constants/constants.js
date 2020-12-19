const TITLE = 'Covid-19 dashbord';
const MAP_DIV_ID = 'map';
const WORLD_MAP_URL =
    'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
const MAP_CENTER = [17.385044, 78.486671];
const DEATHS = 'death';
const RECOVERY = 'recovery';
const CASES = 'cases';
const DEATHS_COLOR = 'black';
const RECOVERY_COLOR = 'green';
const CASES_COLOR = 'red';

const IMAGES = {
    rsLogo: './assets/images/icons/rs_school_js.svg'
};

const FOOTER_COPYRIGHT_DEVELOPERS = `<a href='https://github.com/HalinaPP'>
                            @halinapp
                          </a>,
                          <span>2020</span>`;
const FOOTER_COPYRIGHT_RSSCHOOL = `<a href='https://rs.school/js/'>
                                        <img src="${IMAGES.rsLogo}" alt="RS SCHOOL">
                                        RS SCHOOL
                                    </a>`;

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
    TITLE,
    FOOTER_COPYRIGHT_DEVELOPERS,
    FOOTER_COPYRIGHT_RSSCHOOL
};
