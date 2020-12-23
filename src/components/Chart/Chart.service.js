import zingchart from 'zingchart';
import {
    CHART_DIV_ID,
    GET_COUNTRY_HISTORY_URL_BY_NAME,
    GRAPHIC_COLOR,
    PRIMARY_COLOR,
    secondColor,
} from '@/components/Chart/constants';
import { store } from '@/redux/store';
import { CASES, DEATHS, RECOVERY } from '@/constants/constants';
import { CASES_COLOR, DEATHS_COLOR, RECOVERY_COLOR } from '@/components/Map/map';
import { ABSOLUTE, ALL_PERIOD, LAST_DAY, RELATIVE } from '@/services/filterTypes';
import { getCountriesInfo } from '@/services/Countries';
import { createHtmlElement, getCasesColor } from '@/helpers/utils';
import { renderFilter } from '@/components/Filter/Filter.render';

function countCountryRelativeOneHundred(casesValue, population) {
    return Math.round((casesValue * 100000) / population);
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
    const population = countryPop.population;
    const response = await fetch(GET_COUNTRY_HISTORY_URL_BY_NAME(countryName));
    if (response.status === 404) {
        return null;
    }
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
    if (jsonData !== null) {
        zingchart.exec(CHART_DIV_ID, 'modify', {
            data: {
                series: [
                    {
                        type: 'bar',
                        text: jsonData.casesType,
                        values: jsonData.casesCount,
                        backgroundColor: getCasesColor(),
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
    } else {
        zingchart.exec(CHART_DIV_ID, 'modify', {
            data: {
                noData: {
                    text: 'Data not found',
                    backgroundColor: PRIMARY_COLOR,
                },
                series: [
                    {
                        values: [],
                    },
                ],
            },
        });
    }
};

async function getCountryName(countryId) {
    const countries = await getCountriesInfo();
    return countries.find((country) => country.id === countryId).name;
}

export const setInfoContainer = async () => {
    const wrapper = document.body.querySelector('.chart--info');
    const filter = wrapper.querySelector('.filter');
    const countryName = document.body.querySelector('.chart--info-country');
    if (filter) {
        filter.remove();
    }
    wrapper.appendChild(renderFilter());
    const name = await getCountryName(store.getState().country.activeCountry);
    countryName.innerHTML = name;
};

store.subscribe(() => {
    setChartData();
    setInfoContainer();
});
