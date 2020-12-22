import zingchart from 'zingchart';
import {
    CHART_DIV_ID,
    GET_COUNTRY_HISTORY_URL_BY_NAME,
    GRAPHIC_COLOR,
    secondColor,
} from '@/components/Chart/constants';
import { store } from '@/redux/store';
import { CASES, DEATHS, RECOVERY } from '@/constants/map';
import { ABSOLUTE, ALL_PERIOD, LAST_DAY, RELATIVE } from '@/services/filterTypes';
import { getCountriesInfo } from '@/services/Countries';
import { createHtmlElement } from '@/helpers/utils';

function countCountryRelativeOneHundred(casesValue, population) {
    return Math.round(casesValue / (population / 100000));
}

export async function getChartInfo() {
    const state = store.getState();

    let casesArray;
    const result = {
        casesType: null,
        casesCount: 0,
        timeLine: 0,
    };
    const countries = await getCountriesInfo();
    const countryName = state.country.activeCountry;
    const countryPop = countries.find(
        (item) => item.id === countryName || item.name === countryName
    );
    console.log(countryPop);
    const population = countryPop.population;
    const response = await fetch(GET_COUNTRY_HISTORY_URL_BY_NAME(countryName));
    const responseData = await response.json();

    switch (state.country.casesType) {
        case CASES:
            result.casesType = CASES;
            casesArray = responseData.cases || responseData.timeline.cases;
            break;
        case DEATHS:
            result.casesType = DEATHS;
            casesArray = responseData.deaths || responseData.timeline.deaths;
            break;
        case RECOVERY:
            result.casesType = RECOVERY;
            casesArray = responseData.recovered || responseData.timeline.recovered;
            break;
        default:
            break;
    }

    const periodArray = {
        timeLine: null,
        casesCount: null,
    };

    if (state.country.period === ALL_PERIOD) {
        periodArray.timeLine = Object.keys(casesArray);
        periodArray.casesCount = Object.values(casesArray);
    } else if (state.country.period === LAST_DAY) {
        periodArray.timeLine = Object.keys(casesArray);
        periodArray.casesCount = Object.values(casesArray).map((item, index, array) => {
            if (index === 0) {
                return item;
            }
            return item - array[index - 1];
        });
    }
    result.timeLine = periodArray.timeLine.reverse();
    switch (state.country.valueType) {
        case ABSOLUTE:
            result.casesCount = periodArray.casesCount.reverse();
            break;
        case RELATIVE:
            result.casesCount = periodArray.casesCount
                .map((item) => countCountryRelativeOneHundred(item, population))
                .reverse();
            break;
        default:
            break;
    }
    return result;
}

export const setChartData = async () => {
    const jsonData = await getChartInfo();
    // set
    zingchart.exec(CHART_DIV_ID, 'modify', {
        data: {
            series: [
                {
                    type: 'bar',
                    text: jsonData.casesType,
                    values: jsonData.casesCount,
                    backgroundColor: GRAPHIC_COLOR,
                    scales: 'scale-x,scale-y',
                },
            ],
            scaleY: {
                items: jsonData.casesCount,
                'min-value': 0,
            },
            scaleX: {
                labels: jsonData.timeLine,
            },
        },
    });
};

export const setInfoContainer = () => {
    const countryName = document.body.querySelector('.chart--info-country');
    countryName.innerHTML = store.getState().country.activeCountry;
};

store.subscribe(() => {
    setChartData();
    setInfoContainer();
});
