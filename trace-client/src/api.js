import axios from 'axios';

export default {
    user: {
        login: credentials =>
            axios.post('http://localhost:3000/api/authenticate', { credentials }).then(res => res.data.user),

        signup: user =>
            axios.post('http://localhost:3000/api/signup', { user }).then(res => res.data.user),

        confirm: token =>
            axios.post('http://localhost:3000/api/confirmation', { token }).then(res => res.data.user),

        resetPasswordRequest: email =>
            axios.post('http://localhost:3000/api/reset_password_request', { email }),

        validateToken: token =>
            axios.post('http://localhost:3000/api/validate_token', { token }),

        resetPassword: data =>
            axios.post('http://localhost:3000/api/reset_password', { data })
    }
};