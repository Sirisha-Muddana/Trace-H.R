import { SALES_LIST, POST_SALES } from '../actions/types';

const initialState = {
    salesList: [],
    postSales: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SALES_LIST:
            return {
                ...state,
                salesList: action.sales
            };
        case POST_SALES:
            return {
                ...state,
                postSales: action.sale
            };
        default:
            return state;
    }
}