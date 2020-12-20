export const CHART_DIV_ID = 'chart';
export const ONE_MILLION = 1000000;
export const ONE_HUNDRED = 1000;

export const GET_COUNTRY_HISTORY_URL_BY_NAME = (name) =>
    `https://disease.sh/v3/covid-19/historical/${name}?lastdays=365`;

export const myConfig = {
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
