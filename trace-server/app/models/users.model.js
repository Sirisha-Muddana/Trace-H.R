const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import uniqueValidator from 'mongoose-unique-validator';

// User Schema
const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    unique: true
  },

  passwordHash: {
    type: String,
    required: true
  }, 

  userAccessRole: {
    type: String
  },

  confirmed: {
    type: Boolean,
    default: false
  },

  confirmationToken: { 
    type: String,
    default: ''
  }
}, 
{
  timestamps: true
});

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
 UserSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
  {
    _id: this.id,
    email: this.email,
    userAccessRole: this.userAccessRole,
    confirmed: this.confirmed
  }, 
  process.env.JWT_SECRET, { expiresIn: 600}
  );
};

UserSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
  {
    _id: this._id,
  }, 
  process.env.JWT_SECRET, { expiresIn: '1h' });
};

UserSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    userAccessRole: this.userAccessRole,
    confirmed: this.confirmed,
    token: this.generateJWT()
  }
}

//Hashing a password before saving it to the database
UserSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

UserSchema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

UserSchema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
}

UserSchema.plugin(uniqueValidator, {message: "This email is already in use!"});

UserSchema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${process.env.HOST}/reset_password/${this.generateResetPasswordToken()}`;
}


module.exports = mongoose.model('users', UserSchema);
