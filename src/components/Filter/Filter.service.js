import { connectedCountryActions, store } from '@/redux/store';

export const getStateFilterTypeValue = (name) => {
    const filterType = name[0].toLowerCase() + name.slice(1);
    const state = store.getState();

    return state.country[filterType];
};

export const filterHandle = (event) => {
    const selectEl = event.target;
    const selIndex = selectEl.options.selectedIndex;
    const selOption = selectEl.options[selIndex].value;
    const type = selectEl.getAttribute('data-type');

    connectedCountryActions[`change${type}`](selOption);
};
