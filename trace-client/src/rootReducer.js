import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import sales from './reducers/sales';

export default combineReducers({
    auth: authReducer,
    sales
});