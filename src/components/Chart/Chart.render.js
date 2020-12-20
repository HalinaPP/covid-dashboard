import { createHtmlElement } from '@/helpers/utils';
import { CHART_DIV_ID } from './constants';
import zingchart from 'zingchart';
import { getChartInfo } from '@/services/Countries';
import { ONE_HUNDRED, ONE_MILLION } from '@/components/Chart/constants';
zingchart.ASYNC = true;

window.formatChartAxis = (v) => {
    let formattingLabel = v;
    if (v >= ONE_MILLION) formattingLabel = Math.round(v / ONE_MILLION) + 'm';
    else if (v >= ONE_HUNDRED) formattingLabel = Math.round(v / ONE_HUNDRED) + 'k';
    return formattingLabel;
};

const myConfig = {
    type: 'bar',
    backgroundColor: '#f4f4f4',
    title: {
        text: 'Covid stats',
        backgroundColor: 'none',
        color: '#818181',
        fontFamily: 'Roboto',
        fontSize: '16px',
        height: '16px',
    },
    legend: {
        visible: false,
    },
    scaleX: {
        guide: {
            lineColor: '#c7c9c9',
            lineStyle: 'solid',
        },
        item: {
            fontColor: '#818181',
            fontSize: '10px',
        },
        label: {
            visible: false,
        },
        labels: [],
        lineColor: '#c7c9c9',
        lineWidth: '1px',
        maxLabels: 7,
        mirrored: true,
        tick: {
            lineColor: '#c7c9c9',
            lineWidth: '1px',
        },
    },
    scaleY: {
        format: 'formatChartAxis()',
        guide: {
            lineColor: '#c7c9c9',
            lineStyle: 'solid',
        },
        item: {
            paddingRight: '0px',
            fontColor: '#818181',
            fontSize: '10px',
        },
        lineColor: '#c7c9c9',
        lineWidth: '1px',
        refLine: {
            alpha: 0.25,
            lineColor: '#c7c9c9',
            visible: true,
        },
        shadow: false,
        tick: {
            lineColor: '#c7c9c9',
            lineWidth: '1px',
        },
        labels: [],
        maxLabels: 7,
    },
    plot: {
        lineColor: '#00baf0',
        lineWidth: '1px',
        marker: {
            backgroundColor: '#fbfbfb',
            borderColor: '#00baf0',
            borderWidth: '2px',
            shadow: false,
            size: '3px',
        },
        maxTrackers: 0,
        mode: 'fast',
        shadow: false,
    },
    plotarea: {
        backgroundColor: '#fbfbfb',
        margin: '10% 25px 5% 40px',
    },
    crosshairX: {
        plotLabel: {
            text: '%t was %v<br>on %kl',
            borderRadius: '5px',
        },
    },
    series: [
        {
            type: 'bar',
            text: 'Cases',
            values: [],
            backgroundColor: '#003849',
            scales: 'scale-x,scale-y',
        },
    ],
};

function fetchData() {
    // after initial chart render. Fetch data.
    fetch('https://cdn.zingchart.com/datasets/gold-stock-data.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (jsonData) {
            zingchart.exec('myChart', 'setseriesvalues', {
                values: [jsonData.cases],
            });
            zingchart.exec('myChart', 'modify', {
                data: {
                    scaleX: {
                        labels: jsonData.timeLabels,
                    },
                },
            });
        });
}

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

const setChartData = async () => {
    const jsonData = await getChartInfo();
    // set
    zingchart.exec(CHART_DIV_ID, 'modify', {
        data: {
            series: [
                {
                    type: 'bar',
                    text: jsonData.casesType,
                    values: jsonData.casesCount,
                    backgroundColor: '#003849',
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
