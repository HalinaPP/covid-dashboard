const ICON_PATH = './assets/icons';
const FAVICON_URL = `${ICON_PATH}/favicon.ico`;
const TITLE = 'Covid-19 dashboard';
export const WORLD_ID = 'all';
export const FULL_SCREEN = 'https://img.icons8.com/metro/26/000000/fit-to-width.png';
const FULL_SCREEN_IMG = `<img width="15" height="15" src=${FULL_SCREEN} alt="fullscreen"/>`;
export const WORLD_NAME = 'World';
const IMAGES = {
    rsLogo: `${ICON_PATH}/rs_school_js.svg`
};
const FOOTER_COPYRIGHT_DEVELOPERS = `<span><a href='https://github.com/Arcuman'>@arcuman</a> & <a href='https://github.com/HalinaPP'>
                             @halinapp
                           </a> </span>
                           <span>2020</span>`;
const FOOTER_COPYRIGHT_RSSCHOOL = `<a href='https://rs.school/js/'>
                                         <img src="${IMAGES.rsLogo}" alt="RS SCHOOL">
                                     </a>`;

const DEATHS = 'deaths';
const RECOVERY = 'recovered';
const CASES = 'cases';

export {
    TITLE,
    FOOTER_COPYRIGHT_DEVELOPERS,
    FOOTER_COPYRIGHT_RSSCHOOL,
    FAVICON_URL,
    DEATHS,
    RECOVERY,
    CASES,
    FULL_SCREEN_IMG
};
