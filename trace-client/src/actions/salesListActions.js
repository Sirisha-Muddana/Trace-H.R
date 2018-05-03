import { SALES_LIST } from './types';
import api from '../api';

export const fetchSales = () => dispatch =>
     api.sales.salesList().then(sales => {
        dispatch({
            type: SALES_LIST,
            sales
        });
    });

export const salesForm = data => dispatch =>
    api.sales.postSales(data);
