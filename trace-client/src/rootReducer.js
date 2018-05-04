import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import salesReducer from './reducers/salesReducer';

export default combineReducers({
    auth: authReducer,
    sales: salesReducer
});