var bcrypt = require("bcryptjs");
const Users = require("../models/users.model");
const Submissions = require("../models/submissions.model");
const mongoose = require("mongoose");
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

exports.submissionsList = (req, res) => {
  Submissions.find({ user: req.user.id })
    .sort({ date: -1 })
    .then(submissionsList => {
      if (!submissionsList) {
        return res.json({
          errors: { global: "No profile for this user" }
        });
      }
      res.json(submissionsList);
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

exports.getSubmission = (req, res) => {
  Submissions.findById(req.params.id)
    .then(submission => res.json(submission))
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

exports.postSubmission = (req, res) => {
  //Create or Edit sales list
  const submissionsList = {};
  submissionsList.user = req.user.id;

  if (req.body.data.consultantName)
    submissionsList.consultantName = req.body.data.consultantName;
  if (req.body.data.skillset) submissionsList.skillset = req.body.data.skillset;
  if (req.body.data.location) submissionsList.location = req.body.data.location;
  if (req.body.data.billingRate)
    submissionsList.billingRate = req.body.data.billingRate;
  if (req.body.data.vendor) submissionsList.vendor = req.body.data.vendor;
  if (req.body.data.client) submissionsList.client = req.body.data.client;
  if (req.body.data.interviewDate)
    submissionsList.interviewDate = req.body.data.interviewDate;
  if (req.body.data.interviewType)
    submissionsList.interviewType = req.body.data.interviewType;
  Submissions.findOne({ user: req.user.id }).then(submissions => {
    if (submissions) {
      // Update sales list
      Submissions.findById(req.body.data.id).then(submission => {
        if (submission) {
          Submissions.findByIdAndUpdate(
            req.body.data.id,
            { $set: submissionsList },
            { new: true }
          )
            .then(submission => res.json(submission))
            .catch(err =>
              res.status(404).json({ errors: parseErrors(err.errors) })
            );
        } else {
          //Create sales list
          new Submissions(submissionsList)

            .save()
            .then(submission => res.json(submission))
            .catch(err =>
              res.status(404).json({ errors: parseErrors(err.errors) })
            );
        }
      });
    } else {
      //Create sales list
      new Submissions(submissionsList)

        .save()
        .then(submission => res.json(submission))
        .catch(err =>
          res.status(404).json({ errors: parseErrors(err.errors) })
        );
    }
  });
};
