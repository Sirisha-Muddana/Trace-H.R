import axios from 'axios';

export default {
    user: {
        login: credentials =>
            axios.post('http://localhost:3000/api/authenticate', { credentials }).then(res => res.data.user),

        signup: user =>
            axios.post('http://localhost:3000/api/signup', { user }).then(res => res.data.user),

        confirm: token =>
            axios.post('http://localhost:3000/api/confirmation', { token }).then(res => res.data.user)
    }
};