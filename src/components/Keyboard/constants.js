const KEY_PRESS_COLOR = '#40f167';
const KEY_PRESS_BG_COLOR = 'rgba(255, 255, 255, 0.2)';

const shiftButtonVariant = {
    1: '!',
    2: '@',
    3: '#',
    4: '$',
    5: '%',
    6: '^',
    7: '&',
    8: '*',
    9: '(',
    0: ')',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    ';': ':',
    '\'': '"',
    ',': '<',
    '.': '>',
    '/': '?'
};

const keyLayout = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    'backspace',
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    '[',
    ']',
    'caps',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    ';',
    '\'',
    'enter',
    'shift',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    ',',
    '.',
    '/',
    'done',
    'volume',
    'space',
    'left',
    'right'
];

const SOUND_KEY = 'key';

const KEYS = {
    backspace: {
        class: 'keyboard__key keyboard__key--wide',
        icon: 'backspace',
        code: 'Backspace'
    },
    caps: {
        class: 'keyboard__key keyboard__key--wide keyboard__key--activatable',
        icon: 'keyboard_capslock',
        code: 'CapsLock'
    },
    enter: {
        class: 'keyboard__key keyboard__key--wide',
        icon: 'keyboard_return',
        code: 'Enter'
    },
    space: {
        class: 'keyboard__key keyboard__key--extra-wide',
        icon: 'space_bar',
        code: 'Space'
    },
    done: {
        class: 'keyboard__key keyboard__key--wide keyboard__key--dark',
        icon: 'check_circle',
        code: 'Done'
    },
    shift: {
        class: 'keyboard__key keyboard__key--wide keyboard__key--activatable',
        icon: 'arrow_upward',
        code: 'Shift'
    },
    left: {
        class: 'keyboard__key',
        icon: 'keyboard_arrow_left',
        code: 'ArrowLeft'
    },
    right: {
        class: 'keyboard__key',
        icon: 'keyboard_arrow_right',
        code: 'ArrowRight'
    },
    volume: {
        class: 'keyboard__key',
        icon: { on: 'volume_up', off: 'volume_off' },
        code: 'Volume'
    }
};

export { shiftButtonVariant, keyLayout, SOUND_KEY, KEYS, KEY_PRESS_COLOR, KEY_PRESS_BG_COLOR };
