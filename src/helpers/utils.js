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
