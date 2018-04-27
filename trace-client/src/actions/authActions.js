import setAuthorizationToken from '../utils/setAuthorizationToken';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/types';
import api from '../api';

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = credentials => dispatch =>
    api.user.login(credentials).then(user => {
        localStorage.jwtToken = user.token;
        setAuthorizationToken(user.token);
        dispatch(userLoggedIn(user));
    });

export const logout = () => dispatch => {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken();
        dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
    api.user.confirm(token).then(user => {
        localStorage.jwtToken = user.token;
        dispatch(userLoggedIn(user));
    });