import { getTableInfo } from '@/services/Countries';
import { LAST_DAY, ALL_PERIOD } from '@/services/filterTypes'

(async () =>{
    let countryData1 = await getTableInfo('all',LAST_DAY);
    let countryData2 = await getTableInfo('belarus',ALL_PERIOD);
    console.log(countryData1);
    console.log(countryData2);
})()

