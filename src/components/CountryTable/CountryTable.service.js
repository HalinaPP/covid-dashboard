import { getMapinfo } from '@/services/Countries';
import { store } from '@/redux/store';

export const getTableInfo = async () => {
    const state = store.getState();
    const countryId = state.country.activeCountry;
    const info = await getMapinfo(countryId);

    return info;
};
