import axios from 'axios';

export default {
    auth: {
        login: credentials =>
            axios.post('/authenticate', { credentials }).then(res => res.data.user),

        signup: user =>
            axios.post('/signup', { user }).then(res => res.data.user),

        confirm: token =>
            axios.post('/confirmation', { token }).then(res => res.data.user),

        resetPasswordRequest: email =>
            axios.post('/reset_password_request', { email }),

        validateToken: token =>
            axios.post('/validate_token', { token }),

        resetPassword: data =>
            axios.post('/reset_password', { data })
    },

    sales: {
        salesList: () =>
            axios.get('/sales_list').then(res => res.data),

        postSales: data =>
            axios.post('/post_sales', { data })
    }
};