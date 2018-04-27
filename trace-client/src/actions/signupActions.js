import api from '../api';
import { userLoggedIn } from './authActions';
export const signup = data => dispatch =>
    api.user.signup(data).then(user => {
        localStorage.jwtToken = user.token;
        dispatch(userLoggedIn(user));
    });