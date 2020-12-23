import { shiftButtonVariant, KEYS, KEY_PRESS_COLOR, KEY_PRESS_BG_COLOR } from './constants';
import { createIconHTML } from '@/helpers/utils';
import { doSearch } from '@/components/CountriesList/CountriesList.service';

export const keyboardState = {
    properties: {
        value: '',
        capsLock: false,
        shiftButton: false,
        cursorPosition: 0,
        volumeOn: false
    }
};

const oninput = (currentValue) => {
    document.getElementById('inputText').value = currentValue;
};

const playSound = (attr) => {
    const audio = document.querySelector(`audio[data-audio="${attr}"]`);
    if (audio && keyboardState.properties.volumeOn) {
        audio.currentTime = 0;
        audio.play();
    }
};

const triggerEvent = () => {
    playSound('key');
    oninput(keyboardState.properties.value);

    document.getElementById('inputText').focus();
    const cursorPosition = keyboardState.properties.cursorPosition;
    document.getElementById('inputText').setSelectionRange(cursorPosition, cursorPosition);
};

const toggleCapsLock = () => {
    keyboardState.properties.capsLock = !keyboardState.properties.capsLock;
    playSound('key');
    const keys = document.querySelectorAll('.keyboard__key');
    keys.forEach((key) => {
        if (key.childElementCount === 0) {
            key.textContent =
                keyboardState.properties.shiftButton === keyboardState.properties.capsLock
                    ? key.textContent.toLowerCase()
                    : key.textContent.toUpperCase();
            key.dataset.code = key.textContent;
        }
    });
    document.getElementById('inputText').focus();
};

const changeOnShift = () => {
    const shiftChangedButtonsValues = Object.values(shiftButtonVariant);
    const shiftChangedButtons = Object.keys(shiftButtonVariant);
    const keys = document.querySelectorAll('.keyboard__key');
    keys.forEach((key) => {
        if (key.childElementCount === 0) {
            if (
                shiftChangedButtons.indexOf(key.textContent) !== -1 &&
                keyboardState.properties.shiftButton
            ) {
                key.textContent =
                    shiftChangedButtonsValues[shiftChangedButtons.indexOf(key.textContent)];
            } else if (shiftChangedButtonsValues.indexOf(key.textContent) !== -1) {
                key.textContent =
                    shiftChangedButtons[shiftChangedButtonsValues.indexOf(key.textContent)];
            } else {
                key.textContent =
                    keyboardState.properties.shiftButton === keyboardState.properties.capsLock
                        ? key.textContent.toLowerCase()
                        : key.textContent.toUpperCase();
            }
            key.dataset.code = key.textContent;
        }
    });
};

const toggleShiftButton = () => {
    keyboardState.properties.shiftButton = !keyboardState.properties.shiftButton;

    playSound('key');
    changeOnShift();

    document.getElementById('inputText').focus();
};

const open = (initialValue) => {
    const keyboardWrapper = document.querySelector('.keyboard');
    keyboardState.properties.value = initialValue || '';
    keyboardWrapper.classList.remove('keyboard--hidden');
};

const close = () => {
    const keyboardWrapper = document.querySelector('.keyboard');
    keyboardState.properties.value = '';
    keyboardWrapper.classList.add('keyboard--hidden');
};

export const openKeyboard = () => {
    const searchInput = document.querySelector('.list--search-search');
    open(searchInput.value);
};

const insertInCurrPos = (text) => {
    const cursorPosition = keyboardState.properties.cursorPosition;
    keyboardState.properties.value =
        keyboardState.properties.value.slice(0, cursorPosition) +
        text +
        keyboardState.properties.value.slice(cursorPosition);
    keyboardState.properties.cursorPosition++;
};
const backspace = () => {
    const inputEl = document.querySelector('#inputText');
    if (inputEl.selectionStart > 0) {
        const cursorPosition = inputEl.selectionStart - 1;

        keyboardState.properties.value =
            keyboardState.properties.value.slice(0, cursorPosition) +
            keyboardState.properties.value.slice(cursorPosition + 1);
        keyboardState.properties.cursorPosition = cursorPosition;

        triggerEvent();
    }
};

const caps = (element) => {
    toggleCapsLock();
    element.classList.toggle('keyboard__key--active', keyboardState.properties.capsLock);
};

const enter = () => {
    insertInCurrPos('\n');
    triggerEvent();
};

const space = () => {
    insertInCurrPos(' ');
    triggerEvent();
};

const done = () => {
    playSound('key');
    close();
};

const shift = (element) => {
    toggleShiftButton();
    element.classList.toggle('keyboard__key--active', keyboardState.properties.shiftButton);
};

const left = () => {
    playSound('key');

    const inputEl = document.getElementById('inputText');

    if (keyboardState.properties.cursorPosition > 0) {
        keyboardState.properties.cursorPosition--;

        inputEl.focus();

        const newPosition = keyboardState.properties.cursorPosition;
        inputEl.setSelectionRange(newPosition, newPosition);
    } else {
        inputEl.focus();
    }
};

const right = () => {
    playSound('key');

    const inputEl = document.getElementById('inputText');

    if (keyboardState.properties.cursorPosition < keyboardState.properties.value.length) {
        keyboardState.properties.cursorPosition++;

        inputEl.focus();

        const newPosition = keyboardState.properties.cursorPosition;
        inputEl.setSelectionRange(newPosition, newPosition);
    } else {
        inputEl.focus();
    }
};

const volume = (element) => {
    keyboardState.properties.volumeOn = !keyboardState.properties.volumeOn;
    playSound('key');
    element.innerHTML = keyboardState.properties.volumeOn
        ? createIconHTML('volume_up')
        : createIconHTML('volume_off');
};

const funcArr = {
    backspace: backspace,
    caps: caps,
    enter: enter,
    space: space,
    done: done,
    shift: shift,
    left: left,
    right: right,
    volume: volume
};

const otherKeyHandle = (element) => {
    const cursorPosition = document.querySelector('#inputText').selectionStart;
    const value = keyboardState.properties.value;
    keyboardState.properties.value =
        value.slice(0, cursorPosition) + element.textContent + value.slice(cursorPosition);

    keyboardState.properties.cursorPosition = cursorPosition + 1;

    triggerEvent();
};

const clickElement = (event) => {
    const element = event.target.closest('button');
    const elementCode = element.getAttribute('data-code');

    const elementInfo = Object.entries(KEYS).filter((item) => {
        return item[1].code === elementCode;
    });

    if (elementInfo && elementInfo.length > 0) {
        const fname = elementInfo[0][0];
        funcArr[fname](element);
    } else {
        otherKeyHandle(element);
    }
    doSearch();
};

export const handleKeyElement = (element) => {
    element.addEventListener('click', (event) => clickElement(event));
};

window.addEventListener('keydown', (event) => {
    const dataKeyCode = event.key === ' ' && event.code === 'Space' ? 'Space' : event.key;
    const currKey =
        dataKeyCode === '\''
            ? document.querySelector('[data-code="\'"]')
            : document.querySelector(`[data-code='${dataKeyCode}']`);

    if (currKey) {
        currKey.style.backgroundColor = KEY_PRESS_COLOR;
    }

    if (event.key === 'CapsLock') {
        toggleCapsLock();
        currKey.classList.toggle('keyboard__key--active', keyboardState.properties.capsLock);
    }

    if (event.key === 'Shift') {
        toggleShiftButton();
        currKey.classList.toggle('keyboard__key--active', keyboardState.properties.shiftButton);
    }
});

window.addEventListener('keyup', (event) => {
    const dataKeyCode = event.key === ' ' && event.code === 'Space' ? 'Space' : event.key;
    const currKey =
        dataKeyCode === '\''
            ? document.querySelector('[data-code="\'"]')
            : document.querySelector(`[data-code='${dataKeyCode}']`);

    if (currKey) {
        window.setTimeout(() => {
            currKey.style.backgroundColor = KEY_PRESS_BG_COLOR;
        }, 500);
    }

    if (event.key === 'Shift') {
        toggleShiftButton();
        currKey.classList.toggle('keyboard__key--active', keyboardState.properties.shiftButton);
    }

    const inputEl = document.querySelector('#inputText');
    keyboardState.properties.value = inputEl.value;
    keyboardState.properties.cursorPosition = inputEl.selectionEnd;
});
