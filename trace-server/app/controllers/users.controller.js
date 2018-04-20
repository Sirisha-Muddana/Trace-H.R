var bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;
const Users = require('../models/users.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database.config');

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if(!req.body.email) {
    return res.status(400).send({
      message: "Email can not be empty"
    });
  }

  // Create a User
  const users = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    userAccessRole: "USER"
  });

  // Save user in the database
  users.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user."
    });
  });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  Users.find()
  .then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving user."
    });
  });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  Users.findById(req.params.userId)
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });
    }
    res.send(user);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });
    }
    return res.status(500).send({
      message: "Error retrieving user with id " + req.params.userId
    });
  });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.email) {
    return res.status(400).send({
      message: "Email content can not be empty"
    });
  }

  // retrieve the password field
  var password = req.body.password
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    // update it with hash
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      req.body.password = hash;
      console.log(req.body.password);

      // Find user and update it with the request body
      Users.findByIdAndUpdate(req.params.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      }, {new: true})
      .then(user => {
        if(!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId
          });
        }
        res.send(user);
      }).catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId
          });
        }
        return res.status(500).send({
          message: "Error updating user with id " + req.params.userId
        });
      });
    });
  });
};

  // Delete a user with the specified noteId in the request
  exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.userId)
    .then(user => {
      if(!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send({message: "User deleted successfully!"});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId
      });
    });
  };

 // Authenticate Login
 exports.authenticate = (req, res) => {
  //console.log(req.body.password);
  Users.findOne({email: req.body.email}) 
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with email " + req.params.email
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if(err) throw err;
      //console.log(isMatch);
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: 1h 
      });

        res.json({
          success: true,
          token: 'JWT ' + token,
          users: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            //password: user.password
          }
        });
      } else{
        return res.status(401).json({success: false, msg: 'Unauthorized Access'});
      }
    });
  });
};

// Login Authorized
exports.login = (req, res, next) => {
  passport.authenticate('jwt', {session:false})
  res.json({user: req.users})
};