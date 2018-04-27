import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import setAuthorizationToken from './utils/setAuthorizationToken'
import rootReducer from './rootReducer';
import decode from 'jwt-decode';
import { userLoggedIn } from './actions/authActions';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.jwtToken) {
    const payload = decode(localStorage.jwtToken);
    const user = {
        token: localStorage.jwtToken,
        email: payload.email,
        confirmed: payload.confirmed
    };
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
