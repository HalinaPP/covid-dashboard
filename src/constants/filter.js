import { DEATHS, RECOVERY, CASES } from './map';
import { LAST_DAY, ALL_PERIOD, ABSOLUTE, RELATIVE } from '@/services/filterTypes';

export const FILTERS = [
    { name: 'CasesType', className: 'type', options: [CASES, DEATHS, RECOVERY] },
    { name: 'Period', className: 'period', options: [ALL_PERIOD, LAST_DAY] },
    { name: 'ValueType', className: 'amount', options: [ABSOLUTE, RELATIVE] },
];
