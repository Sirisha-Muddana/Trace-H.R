const passport = require('passport');

module.exports = (app) => {
    const auth = require('../controllers/auth.controller.js');
    const sales = require('../controllers/sales.controller.js');

    // AUTH ROUTES
    app.post('/api/signup', auth.create);

    app.post('/api/authenticate', auth.authenticate);

    app.post('/api/confirmation', auth.confirmation);

    app.post('/api/reset_password_request', auth.resetPasswordRequest);

    app.post('/api/validate_token', auth.validateToken);

    app.post('/api/reset_password', auth.resetPassword);


    //USER ROUTES
    // Retrieve all users
    app.get('/api/users', passport.authenticate('jwt', { session: false }), sales.findAll);

    // Retrieve a single user with userId
    app.get('/api/users/:userId', sales.findOne);

    // Update a user with userId
    app.put('/api/users/:userId', sales.update);

    // Delete a user with userId
    app.delete('/api/users/:userId', sales.delete);

    app.get('/api/sales_list', passport.authenticate('jwt', {session: false}), sales.salesList);

    app.post('/api/post_sales', passport.authenticate('jwt', {session: false}),sales.postSales);
}
