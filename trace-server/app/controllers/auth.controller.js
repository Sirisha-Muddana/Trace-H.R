const Users = require("../models/users.model");
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail } from "../mailer";
import { sendResetPasswordEmail } from "../mailer";
import jwt from "jsonwebtoken";
import isEmpty from "lodash/isEmpty";

// Create and Save a new Note
exports.register = (req, res) => {
  // Validate request
  const { firstName, lastName, email, password, userAccessRole } = req.body;

  const newUser = new Users({
    firstName,
    lastName,
    email
  });

  if (isEmpty(userAccessRole)) {
    newUser.userAccessRole = "ACCESS LEVEL 1";
  } else newUser.userAccessRole = userAccessRole;

  newUser.setPassword(password);
  newUser.setConfirmationToken();
  new Users(newUser)
    .save()
    .then(userData => {
      sendConfirmationEmail(userData);
      res.json(userData);
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
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

exports.resendConfirmation = (req, res) => {
  Users.findOne({ email: req.body.email }).then(user => {
    Users.findOneAndUpdate(
      { email: req.body.email },
      { confirmationToken: user.resetConfirmationToken() },
      { new: true }
    ).then(user => {
      user
        ? sendConfirmationEmail(user) && res.json({})
        : res.status(400).json({});
    });
  });
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
      console.log;
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
  Users.findOne({ email })
    .then(user => {
      if (user.confirmed === true) {
        if (user && user.comparePassword(password)) {
          res.json({ user: user.toAuthJSON() });
        } else
          res.status(404).json({ errors: { global: "Invalid credentials" } });
      } else {
        res.status(404).json({
          errors: {
            global:
              "You have to verify your account before logging in. Please click the link in your email."
          }
        });
      }
    })
    .catch(err => res.status(500).json({ errors: parseErrors(err.errors) }));
};
