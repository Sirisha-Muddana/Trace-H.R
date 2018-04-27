var bcrypt = require('bcryptjs');
const Users = require('../models/users.model');
const passport = require('passport');
import parseErrors from '../utils/parseErrors';
import { sendConfirmationEmail } from '../mailer';

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  const { firstName, lastName, email, password } = req.body.user;
  const user = new Users({ firstName, lastName, email, userAccessRole: "ACCESS LEVEL 1" });
  user.setPassword(password);
  user.setConfirmationToken();
  user
  .save()
  .then(userData => {

   sendConfirmationEmail(userData);
   res.json({ user: userData.toAuthJSON() })})
  .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));

};

exports.confirmation = (req, res) => {
  const token = req.body.token;
  Users.findOneAndUpdate(
    { confirmationToken: token }, 
    { confirmationToken: "", confirmed: true },
    { new: true}
    ).then(user => 
    user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
    );
  }

// Find a single user with a userId
exports.findOne = (req, res) => {
  Users.findById(req.params.userId)
  .then(user => {
    if(!user) {
      return res.status(404).json({ errors: { global: "Invalid credentials"}});
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

  // // retrieve the password field
  // var password = req.body.password
  // // generate a salt
  // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
  //   if (err) return next(err);
  //   // update it with hash
  //   bcrypt.hash(password, salt, function(err, hash) {
  //     if (err) return next(err);

  //     // override the cleartext password with the hashed one
  //     req.body.password = hash;
  //     //console.log(req.body.password);

      // Find user and update it with the request body
      Users.findByIdAndUpdate(req.params.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
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
    //});
  //});
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
  const { credentials } = req.body;
  //console.log(JSON.stringify(credentials.email));
  Users.findOne({ email: credentials.email }) 
  .then(user => {
    if(user && user.comparePassword(credentials.password)) { 
      res.json({ user: user.toAuthJSON() });
    } else res.status(404).json({ errors: { global: "Invalid credentials"}});
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