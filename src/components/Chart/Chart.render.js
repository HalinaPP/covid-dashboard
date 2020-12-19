import { createHtmlElement } from '../../helpers/utils';

export const renderChart = () => {
    const chart = createHtmlElement('div', 'chart');
    chart.innerHTML = 'chart';
    return chart;
};
