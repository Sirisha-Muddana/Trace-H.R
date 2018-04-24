const passport = require('passport');

module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    // Create a new user
    app.post('/api/signup', users.create);

    // Retrieve all users
    app.get('/api/users', passport.authenticate('jwt', { session: false }), users.findAll);

    // Retrieve a single user with userId
    app.get('/api/users/:userId', users.findOne);

    // Update a user with userId
    app.put('/api/users/:userId', users.update);

    // Delete a user with userId
    app.delete('/api/users/:userId', users.delete);

    app.post('/api/authenticate', users.authenticate);

}
