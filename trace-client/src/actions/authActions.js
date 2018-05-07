import setAuthorizationToken from '../utils/setAuthorizationToken';
import { USER_LOGGED_IN } from '../actions/types';
import api from '../api';
import decode from 'jwt-decode';

export const userLoggedIn = decoded => ({
    type: USER_LOGGED_IN,
    payload: decoded
});

export const login = credentials => dispatch =>
    api.auth.login(credentials).then(user => {
        localStorage.jwtToken = user.token;
        setAuthorizationToken(user.token);
        const decoded = decode(user.token);
        dispatch(userLoggedIn(decoded));
    });

export const logout = () => dispatch => {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        dispatch(userLoggedIn({}));
};

export const confirm = token => dispatch =>
    api.auth.confirm(token).then(user => {
        localStorage.jwtToken = user.token;
        dispatch(userLoggedIn(user));
    });

export const resetPasswordRequest = ({ email }) => () =>
    api.auth.resetPasswordRequest(email);

export const validateToken = ( token ) => () =>
    api.auth.validateToken(token);

export const resetPassword = ( data ) => () =>
    api.auth.resetPassword(data);