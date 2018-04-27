const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');
import dotenv from 'dotenv';

dotenv.config();
// create express app
const app = express();

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/api', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

// Require Users routes
require('./app/routes/users.routes.js')(app);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
