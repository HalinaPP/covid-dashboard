const ICON_PATH = './assets/icons';
const FAVICON_URL = `${ICON_PATH}/favicon.ico`;
const TITLE = 'Covid-19 dashbord';

const IMAGES = {
    rsLogo: `${ICON_PATH}/rs_school_js.svg`
};

const FOOTER_COPYRIGHT_DEVELOPERS = `<div class="developers">
                                        <a href='https://github.com/HalinaPP'>
                                            @halinapp
                                        </a>,
                                        <a href='https://github.com/Arcuman'>
                                            @arcuman
                                        </a>
                                    </div>
                                    <span>2020</span>`;

const FOOTER_COPYRIGHT_RSSCHOOL = `<a href='https://rs.school/js/' class="school">
<img src="${IMAGES.rsLogo}" alt="RS SCHOOL">
RS SCHOOL
                                    </a>`;

export { TITLE, FOOTER_COPYRIGHT_DEVELOPERS, FOOTER_COPYRIGHT_RSSCHOOL, FAVICON_URL };
