import color from '@/styles/colors.scss';

export const PRIMARY_COLOR = '#a9c7ea';
export const SECOND_COLOR = '#000';
export const GRAPHIC_COLOR = '#376398';
export const CHART_DIV_ID = 'chart';
export const ONE_MILLION = 1000000;
export const ONE_HUNDRED = 1000;

export const GET_COUNTRY_HISTORY_URL_BY_NAME = (name) =>
    `https://disease.sh/v3/covid-19/historical/${name}?lastdays=365`;

export const myConfig = {
    type: 'bar',
    backgroundColor: PRIMARY_COLOR,
    legend: {
        visible: false,
    },
    scaleX: {
        guide: {
            lineColor: SECOND_COLOR,
            lineStyle: 'solid',
        },
        item: {
            fontColor: SECOND_COLOR,
            fontSize: '10px',
        },
        label: {
            visible: false,
        },
        labels: [],
        lineColor: SECOND_COLOR,
        lineWidth: '1px',
        maxLabels: 12,
        mirrored: true,
        tick: {
            lineColor: SECOND_COLOR,
            lineWidth: '1px',
        },
    },
    scaleY: {
        format: 'formatChartAxis()',
        guide: {
            lineColor: SECOND_COLOR,
            lineStyle: 'solid',
        },
        item: {
            paddingRight: '0px',
            fontColor: SECOND_COLOR,
            fontSize: '10px',
        },
        lineColor: SECOND_COLOR,
        lineWidth: '1px',
        refLine: {
            alpha: 0.25,
            lineColor: SECOND_COLOR,
            visible: true,
        },
        shadow: false,
        tick: {
            lineColor: SECOND_COLOR,
            lineWidth: '1px',
        },
        labels: [],
        maxLabels: 7,
    },
    plot: {
        lineColor: SECOND_COLOR,
        lineWidth: '1px',
        marker: {
            backgroundColor: SECOND_COLOR,
            borderColor: SECOND_COLOR,
            borderWidth: '2px',
            shadow: false,
            size: '3px',
        },
        maxTrackers: 0,
        mode: 'fast',
        shadow: false,
    },
    plotarea: {
        backgroundColor: PRIMARY_COLOR,
        margin: '10% 25px 11% 40px',
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
            backgroundColor: PRIMARY_COLOR,
            scales: 'scale-x,scale-y',
        },
    ],
};
