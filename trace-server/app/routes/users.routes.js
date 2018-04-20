module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    // Create a new user
    app.post('/api/register', users.create);

    // Retrieve all users
    app.get('/api/users', users.findAll);

    // Retrieve a single user with userId
    app.get('/api/users/:userId', users.findOne);

    // Update a user with userId
    app.put('/api/users/:userId', users.update);

    // Delete a user with userId
    app.delete('/api/users/:userId', users.delete);

    app.post('/api/authenticate', users.authenticate);

    app.get('/api/login', users.login);
}
