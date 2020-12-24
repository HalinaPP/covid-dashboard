import { store } from '@/redux/store';
import { CASES, DEATHS, RECOVERY } from '@/constants/constants';
import { CASES_COLOR, DEATHS_COLOR, RECOVERY_COLOR } from '@/components/Map/map';

export const createHtmlElement = (tagName, className = '') => {
    const element = document.createElement(tagName);

    if (className !== '') {
        element.className = className;
    }

    return element;
};

export const renderFavicon = (ulr) => {
    const faviconItem = document.createElement('link');
    faviconItem.setAttribute('rel', 'shortcut icon');
    faviconItem.setAttribute('href', ulr);
    document.head.appendChild(faviconItem);
};

export const changeToCamelCaseString = (str) => {
    const arr = str.toLowerCase().split('_');
    return arr.reduce((prev, curr, index) => {
        if (index !== 0) {
            return prev + curr[0].toUpperCase() + curr.slice(1);
        }
        return prev + curr;
    }, '');
};

export const replaceStringFormat = (str) => {
    const arr = str
        .toLowerCase()
        .split('_')
        .map((item) => item.toLowerCase())
        .join(' ');
    return arr;
};

export const createIconHTML = (iconName) => {
    return `<i class="material-icons">${iconName}</i>`;
};

export function getCasesColor() {
    const state = store.getState();
    switch (state.country.casesType) {
        case CASES:
            return CASES_COLOR;
        case DEATHS:
            return DEATHS_COLOR;
        case RECOVERY:
            return RECOVERY_COLOR;
        default:
            break;
    }
    return null;
}

export function countCountryRelativeOneHundred(casesValue, population) {
    return Math.round((casesValue * 100000) / population);
}