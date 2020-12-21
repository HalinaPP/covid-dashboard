import { connectedCountryActions, store } from '@/redux/store';

export const filterHandle = (event) => {
    const selectEl = event.target;
    const selIndex = selectEl.options.selectedIndex;
    const selOption = selectEl.options[selIndex].value;
    const type = selectEl.getAttribute('data-type');

    connectedCountryActions[`change${type}`](selOption);
};
