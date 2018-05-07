var bcrypt = require("bcryptjs");
const Users = require("../models/users.model");
const Sales = require("../models/sales.model");
import parseErrors from "../utils/parseErrors";

// Find a single user with a userId
exports.findOne = (req, res) => {
  Users.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ errors: { global: "Invalid credentials" } });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
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
  if (!req.body.email) {
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
  Users.findByIdAndUpdate(
    req.params.userId,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
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

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  Users.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId
      });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user."
      });
    });
};

exports.salesList = (req, res) => {
  Sales.find()
    .then(salesList => {
      res.json(salesList);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving sales list."
      });
    });
};

exports.postSales = (req, res) => {
  // Validate request
  const {
    consultantName,
    skillset,
    location,
    billingRate,
    vendor,
    client,
    interviewDate,
    interviewType
  } = req.body.data;
  const salesData = new Sales({
    consultantName,
    skillset,
    location,
    billingRate,
    vendor,
    client,
    interviewDate,
    interviewType
  });
  salesData
    .save()
    .then(salesData => {
      res.status(200).json({});
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};
