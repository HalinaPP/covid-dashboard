import { createHtmlElement } from '@/helpers/utils';
import { store } from '@/redux/store';
import { setTableInfo } from './CountryTable.service';
import {
    renderFullScreenButton,
    handleFullScreenButton
} from '@/components/FullScreenButton/FullScreenButton.render';

export const renderCountryTable = (mainEl) => {
    const table = createHtmlElement('div', 'country-data-table');

    const fullscreenBtn = renderFullScreenButton(table);
    fullscreenBtn.id = '.country-data-table';
    fullscreenBtn.addEventListener('click', handleFullScreenButton);
    table.appendChild(fullscreenBtn);

    mainEl.appendChild(table);
    return table;
};

store.subscribe(async () => {
    await setTableInfo();
});
