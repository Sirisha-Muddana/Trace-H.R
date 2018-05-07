var bcrypt = require("bcryptjs");
const Users = require("../models/users.model");
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail } from "../mailer";
import { sendResetPasswordEmail } from "../mailer";
import jwt from "jsonwebtoken";

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  const { firstName, lastName, email, password } = req.body.user;
  const user = new Users({
    firstName,
    lastName,
    email,
    userAccessRole: "ACCESS LEVEL 1"
  });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(userData => {
      sendConfirmationEmail(userData);
      res.json({ user: userData.toAuthJSON() });
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

exports.confirmation = (req, res) => {
  const token = req.body.token;
  Users.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(
    user =>
      user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
  );
};

exports.resetPasswordRequest = (req, res) => {
  Users.findOne({ email: req.body.email }).then(user => {
    if (user) {
      sendResetPasswordEmail(user);
      res.json({});
    } else {
      res
        .status(400)
        .json({ errors: { global: "Please check your email again" } });
    }
  });
};

exports.validateToken = (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({});
    } else {
      res.json({});
    }
  });
};

exports.resetPassword = (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: "Invalid token" } });
    } else {
      Users.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(password);
          user.save().then(() => res.json({}));
        } else {
          res.status(404).json({ errors: { global: "Invalid token" } });
        }
      });
    }
  });
};

// Authenticate Login
exports.authenticate = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({ email }).then(user => {
    if (user && user.comparePassword(password)) {
      res.json({ user: user.toAuthJSON() });
    } else res.status(404).json({ errors: { global: "Invalid credentials" } });
  });
};
