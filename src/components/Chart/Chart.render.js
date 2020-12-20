import { createHtmlElement } from '@/helpers/utils';
import { CHART_DIV_ID } from './constants';
import zingchart from 'zingchart';
import { setChartData } from './Chart.service';
import { myConfig, ONE_HUNDRED, ONE_MILLION } from '@/components/Chart/constants';
zingchart.ASYNC = true;

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
    mainEl.appendChild(infoEl);
    return infoEl;
};

const renderChartContainer = (mainEl) => {
    const chartEl = createHtmlElement('div', 'chart--container');
    chartEl.setAttribute('id', CHART_DIV_ID);
    mainEl.appendChild(chartEl);
    return chartEl;
};

const renderCovidChart = () => {
    zingchart.render({
        id: CHART_DIV_ID,
        data: myConfig,
        width: '100%',
        height: 400,
    });
};

export const renderChart = (mainEl) => {
    const wrapper = renderChartWrapperContainer(mainEl);
    const infoContainer = renderInfoContainer(wrapper);
    const chart = renderChartContainer(wrapper);
    renderCovidChart();
    setChartData();
    return chart;
};
