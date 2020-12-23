import { createHtmlElement, createIconHTML } from '@/helpers/utils';
import { keyLayout, SOUND_KEY, KEYS } from './constants';
import { keyboardState, handleKeyElement } from './Keyboard.service';

export const Keyboard = {};

const renderKeys = () => {
    const fragment = document.createDocumentFragment();

    keyLayout.forEach((key) => {
        const keyElement = createHtmlElement('button', 'keyboard__key');
        keyElement.setAttribute('type', 'button');

        const volumeOn = keyboardState.properties.volumeOn;

        if (key in KEYS) {
            keyElement.className = KEYS[key].class;

            let iconName = KEYS[key].icon;

            if (key === 'volume') {
                iconName = volumeOn ? iconName.on : iconName.off;
            }

            keyElement.innerHTML = createIconHTML(iconName);
            keyElement.dataset.code = KEYS[key].code;
        } else {
            keyElement.textContent = key.toLowerCase();
            keyElement.dataset.code = key.toLowerCase();
        }
        handleKeyElement(keyElement);
        fragment.appendChild(keyElement);

        const insertLineBreak = ['backspace', ']', 'enter', '/'].indexOf(key) !== -1;

        if (insertLineBreak) {
            fragment.appendChild(document.createElement('br'));
        }
    });

    return fragment;
};

const renderAudio = () => {
    const audioKeyElement = createHtmlElement('audio');
    audioKeyElement.src = `./assets/sounds/${SOUND_KEY}.wav`;
    audioKeyElement.dataset.audio = SOUND_KEY;
    return audioKeyElement;
};

const renderKeysContainer = () => {
    const keysContainer = createHtmlElement('div', 'keyboard__keys');

    keysContainer.appendChild(renderKeys());
    return keysContainer;
};

export const renderKeyboard = () => {
    const keyboardWrapper = createHtmlElement('div', 'keyboard keyboard--hidden');
    keyboardWrapper.appendChild(renderKeysContainer());
    keyboardWrapper.appendChild(renderAudio());

    return keyboardWrapper;
};
