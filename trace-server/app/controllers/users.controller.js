var bcrypt = require("bcryptjs");
const Users = require("../models/users.model");
import parseErrors from "../utils/parseErrors";

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
