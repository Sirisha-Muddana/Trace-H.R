import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import App from './App';
import setAuthorizationToken from './utils/setAuthorizationToken'
import rootReducer from './rootReducer';
import decode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
