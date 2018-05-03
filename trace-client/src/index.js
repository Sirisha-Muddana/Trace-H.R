import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './App';
import setAuthorizationToken from './utils/setAuthorizationToken'
import rootReducer from './rootReducer';
import decode from 'jwt-decode';
import { userLoggedIn, logout } from './actions/authActions';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.jwtToken) {
    const payload = decode(localStorage.jwtToken);

    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(userLoggedIn(payload));
    const currentTime = Date.now()/1000;
    if(payload.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = '/login';
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
