import { FULL_SCREEN_IMG } from '@/constants/constants';
import { createHtmlElement } from '@/helpers/utils';

export const hideOtherFullscreenBtn = (currFullScreenBtn) => {
    const fullscreens = document.body.querySelectorAll('.full-screen');
    fullscreens.forEach((item) => {
        if (item.id !== currFullScreenBtn) item.classList.toggle('hidden');
    });
};

export const handleFullScreenButton = (event) => {
    // eslint-disable-next-line no-restricted-globals
    window.scrollTo(pageXOffset, 0);
    document.body.classList.toggle('no-scroll');

    const selector = event.target.closest('div').id;
    hideOtherFullscreenBtn(selector);

    const section = document.body.querySelector(selector);
    section.classList.toggle('fullscreen');
};

export const renderFullScreenButton = (parent) => {
    const fullscreen = parent.querySelector('.full-screen');
    const className =
        fullscreen && fullscreen.className !== '' ? fullscreen.className : 'full-screen';

    if (fullscreen) {
        fullscreen.remove();
    }

    const fullscreenBtn = createHtmlElement('div', className);
    fullscreenBtn.innerHTML = FULL_SCREEN_IMG;

    return fullscreenBtn;
};
