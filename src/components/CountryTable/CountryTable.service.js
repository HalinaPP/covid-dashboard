import { getMapinfo } from '@/services/Countries';
import { store } from '@/redux/store';
import { CASES, DEATHS, RECOVERY } from '@/constants/map';

export const getTableInfo = async () => {
    const state = store.getState();
    const countryId = state.country.activeCountry;
    const info = await getMapinfo(countryId);

    return info;
};

async function setTableInfo() {
    const wrapper = document.body.querySelector('.country-data-table');
    const info = await getTableInfo();
    const { countryName, casesValueAmount } = info;
    wrapper.innerHTML = `<h3>${countryName !== 'all' ? countryName : 'World'}</h3>
                        <div class="country-data-table-header">
                            <div>${CASES}</div>
                            <div>${DEATHS}</div>
                            <div>${RECOVERY}</div>
                        </div>
                        <div class="country-data-table-data">
                            <div>${casesValueAmount[CASES]}</div>
                            <div>${casesValueAmount[DEATHS]}</div>
                            <div>${casesValueAmount[RECOVERY]}</div>
                        </div>`;
}
store.subscribe(async () => {
    await setTableInfo();
});
