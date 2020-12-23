import { createHtmlElement } from '@/helpers/utils';
import { CHART_DIV_ID } from './constants';
import zingchart from 'zingchart';
import { setChartData } from './Chart.service';
import { myConfig, ONE_HUNDRED, ONE_MILLION } from '@/components/Chart/constants';
import { setInfoContainer } from '@/components/Chart/Chart.service';
zingchart.ASYNC = true;
import { renderFilter } from '../Filter/Filter.render';
import { FULL_SCREEN } from '@/constants/constants';

window.formatChartAxis = (v) => {
    let formattingLabel = v;
    if (v >= ONE_MILLION) formattingLabel = Math.round(v / ONE_MILLION) + 'm';
    else if (v >= ONE_HUNDRED) formattingLabel = Math.round(v / ONE_HUNDRED) + 'k';
    return formattingLabel;
};

const renderChartWrapperContainer = (mainEl) => {
    const wrapper = createHtmlElement('div', 'chart-wrapper');
    mainEl.appendChild(wrapper);
    return wrapper;
};

const renderInfoContainer = (mainEl) => {
    const infoEl = createHtmlElement('div', 'chart--info');
    const currentCountry = createHtmlElement('div', 'chart--info-country');
    infoEl.appendChild(currentCountry);
    mainEl.appendChild(infoEl);
    return infoEl;
};

const renderChartContainer = (mainEl) => {
    const chartEl = createHtmlElement('div', 'chart--container');
    const fullscreenBtn = createHtmlElement('div', 'full-screen');
    fullscreenBtn.id = '.chart-wrapper';
    fullscreenBtn.innerHTML = `<img width="15" height="15" src=${FULL_SCREEN} alt="fullscreen"/>`;
    fullscreenBtn.addEventListener('click', (e) => {
        const selector = e.target.closest('div').id;
        const fullscreens = document.body.querySelectorAll('.full-screen');
        fullscreens.forEach((item) => {
            if (item.id !== selector) item.classList.toggle('hidden');
        });
        const section = document.body.querySelector(selector);
        section.classList.toggle('fullscreen');
    });

    chartEl.setAttribute('id', CHART_DIV_ID);
    mainEl.appendChild(chartEl);
    mainEl.appendChild(fullscreenBtn);
    return chartEl;
};

const renderCovidChart = () => {
    zingchart.render({
        id: CHART_DIV_ID,
        data: myConfig,
        width: '100%',
        height: 150,
    });
};

export const renderChart = (mainEl) => {
    const wrapper = renderChartWrapperContainer(mainEl);

    const infoContainer = renderInfoContainer(wrapper);
    const chart = renderChartContainer(wrapper);
    renderCovidChart();
    return chart;
};
