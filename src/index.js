import { getTableInfo, getFlagsCountry } from '@/services/Countries';
import { LAST_DAY, ALL_PERIOD,ABSOLUTE ,RELATIVE } from '@/services/filterTypes'

(async () =>{
    let countryData1 = await getTableInfo('all', LAST_DAY,ABSOLUTE);
    let countryData2 = await getTableInfo('all', LAST_DAY,RELATIVE);
    let countryData3 = await getTableInfo('all', ALL_PERIOD,ABSOLUTE);
    let countryData4 = await getTableInfo('all', ALL_PERIOD,RELATIVE);
    let countryData5 = await getTableInfo('belarus',ALL_PERIOD,ABSOLUTE);
    let countryData6 = await getTableInfo('belarus',ALL_PERIOD,RELATIVE);
    let countryData7 = await getTableInfo('belarus',LAST_DAY,ABSOLUTE);
    let countryData8 = await getTableInfo('belarus',LAST_DAY,RELATIVE);
    console.log(countryData1);
    console.log(countryData2);
    console.log(countryData3);
    console.log(countryData4);
    console.log(countryData5);
    console.log(countryData6);
    console.log(countryData7);
    console.log(countryData8);

    let flags = await getFlagsCountry();
    console.log(flags);
    let map1 = await getFlagsCountry(LAST_DAY,ABSOLUTE);
    let map2 = await getFlagsCountry(LAST_DAY,RELATIVE);
    let map3 = await getFlagsCountry(ALL_PERIOD,ABSOLUTE);
    let map4 = await getFlagsCountry(ALL_PERIOD,RELATIVE);
    console.log(map1);
    console.log(map2);
    console.log(map3);
    console.log(map4);
})()

