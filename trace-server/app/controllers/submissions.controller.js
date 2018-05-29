var bcrypt = require("bcryptjs");
const Users = require("../models/users.model");
const Submissions = require("../models/submissions.model");
const mongoose = require("mongoose");
import parseErrors from "../utils/parseErrors";

// @route   GET api/submissions_list
// @desc    Get all submissions for current user
// @access  Private
exports.submissionsList = (req, res) => {
  Submissions.find({ user: req.user.id })
    .sort([["createdAt", -1]])
    .then(submissionsList => {
      if (!submissionsList) {
        return res.json({
          errors: { global: "No submissions for this user" }
        });
      }
      res.json(submissionsList);
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

// @route   GET api/get_submission/:id
// @desc    Get submission by ID
// @access  Private
exports.getSubmission = (req, res) => {
  Submissions.findById(req.params.id)
    .then(submission => res.json(submission))
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

// @route   GET api/get_submissions/:id
// @desc    Get all submissions by ID
// @access  Private
exports.getSubmissions = (req, res) => {
  Submissions.find({ user: req.params.id })
    .sort([["createdAt", -1]])
    .then(getSubmissions => {
      if (!getSubmissions) {
        return res.json({
          errors: { global: "No submissions for this user" }
        });
      }
      res.json(getSubmissions);
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

// @route   POST api/post_submission
// @desc    Create or edit new submission
// @access  Private
exports.postSubmission = (req, res) => {
  //Create or Edit sales list
  const submissionsList = {};
  submissionsList.user = req.user.id;

  if (req.body.consultantName)
    submissionsList.consultantName = req.body.consultantName;
  if (req.body.skillset) submissionsList.skillset = req.body.skillset;
  if (req.body.location) submissionsList.location = req.body.location;
  if (req.body.billingRate)
    submissionsList.billingRate = req.body.billingRate;
  if (req.body.vendor) submissionsList.vendor = req.body.vendor;
  if (req.body.client) submissionsList.client = req.body.client;
  if (req.body.interviewDate)
    submissionsList.interviewDate = req.body.interviewDate;
  if (req.body.interviewType)
    submissionsList.interviewType = req.body.interviewType;
  Submissions.findOne({ user: req.user.id }).then(submissions => {
    if (submissions) {
      // Update sales list
      Submissions.findById(req.body.id).then(submission => {
        if (submission) {
          Submissions.findByIdAndUpdate(
            req.body.id,
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
