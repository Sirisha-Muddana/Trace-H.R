var bcrypt = require("bcryptjs");
const Users = require("../models/users.model");
const Profile = require("../models/profile.model");
import parseErrors from "../utils/parseErrors";
const mongoose = require("mongoose");
import isEmpty from "lodash/isEmpty";

var db = mongoose.connection;

// @route   GET api/users_list
// @desc    Get all users profile
// @access  Private
exports.usersList = (req, res) => {
  Profile.find()
    .populate("user", ["firstName", "lastName", "email"])
    .then(usersList => {
      if (!usersList) {
        return res.json({
          errors: { global: "No profile" }
        });
      }
      res.json(usersList);
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

// @route   GET api/get_profile_by_id
// @desc    Get user profile by ID
// @access  Private

exports.getProfileById = (req, res) => {
  Profile.findOne({ user: req.params.id })
    .populate("user", ["firstName", "lastName", "email"])
    .then(displayProfile => {
      if (!displayProfile) {
        return res.json({
          errors: { global: "No profile" }
        });
      }
      res.json(displayProfile);
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

// @route   GET api/current_user
// @desc    Get current user profile
// @access  Private
exports.currentUser = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .populate("user", ["firstName", "lastName", "email"])
    .then(userProfile => {
      if (!userProfile) {
        return res.json({
          errors: { global: "No profile" }
        });
      }
      res.json(userProfile);
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

// @route   GET api/all_users
// @desc    Get list of all users
// @access  Private
exports.allUsers = (req, res) => {
  Users.find({ userAccessRole: "ACCESS LEVEL 1" }, ["firstName", "lastName"])
    .then(allUsers => {
      if (allUsers) {
        res.json(allUsers);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user."
      });
    });
};

// @route   GET api/recruiter_list
// @desc    Get list of all recruiters
// @access  Private
exports.recruiterList = (req, res) => {
  Users.find({ userAccessRole: "ACCESS LEVEL 2" }, ["firstName", "lastName"])
    .then(allRecruiters => {
      if (allRecruiters) {
        res.json(allRecruiters);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user."
      });
    });
};

// @route   POST api/create_profile
// @desc    Create or edit user profile
// @access  Private
exports.createProfile = (req, res) => {
  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.cellphone) profileFields.cellphone = req.body.cellphone;
  if (req.body.onProject) profileFields.onProject = req.body.onProject;
  if (typeof req.body.endDate !== "undefined")
    profileFields.endDate = req.body.endDate;
  else profileFields.endDate = "";
  if (req.body.relocation) profileFields.relocation = req.body.relocation;
  // Skillset - Split into array
  if (typeof req.body.skillset !== "undefined") {
    profileFields.skillset = req.body.skillset.split(",");
  }
  // Address
  profileFields.address = {};
  if (req.body.street) profileFields.address.street = req.body.street;
  if (req.body.apartment) profileFields.address.apartment = req.body.apartment;
  if (req.body.city) profileFields.address.city = req.body.city;
  if (req.body.state) profileFields.address.state = req.body.state;
  if (req.body.zip) profileFields.address.zip = req.body.zip;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // Update user profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err =>
            res.status(404).json({ errors: parseErrors(err.errors) })
          );
      } else {
        //Create user profile
        new Profile(profileFields)
          .save()
          .then(profile => res.json(profile))
          .catch(err =>
            res.status(404).json({ errors: parseErrors(err.errors) })
          );
      }
    })
    .catch(err => res.status(500).json({ errors: parseErrors(err.errors) }));
};

// Immigration Info
exports.immigrationInfo = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newImmigrationInfo = {
      visaStatus: req.body.visaStatus,
      dateOfHire: req.body.dateOfHire,
      visaExp: req.body.visaExp,
      i94Exp: req.body.i94Exp,
      organizationTitle: req.body.organizationTitle,
      jobTitle: req.body.jobTitle,
      lcaSalary: req.body.lcaSalary
    };
    // Add to immigration array
    profile.immigrationInfo.unshift(newImmigrationInfo);

    profile.save().then(profile => res.json(profile));
  });
};

exports.addExperience = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {};
    newExp.title = req.body.title;
    newExp.company = req.body.company;
    newExp.location = req.body.location;
    newExp.from = req.body.from;
    newExp.to = req.body.to;
    newExp.description = req.body.description;

    if (profile) {
      //console.log(req.body.id);
      if (!isEmpty(req.body.id)) {
        //console.log(req.body.id);
        Profile.updateOne(
          { "experience._id": req.body.id },
          { $set: { "experience.$[exp]": newExp } },
          {
            arrayFilters: [{ "exp._id": mongoose.Types.ObjectId(req.body.id) }]
          }
        )
          .then(profile => {
            res.json(profile);
            //console.log(profile);
          })
          .catch(err =>
            res.status(404).json({ errors: parseErrors(err.errors) })
          );
      } else {
        // Add to exp array
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
      }
      //});
    }
  });
};

exports.addEducation = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEdu = {};
    newEdu.from = req.body.from;
    newEdu.to = req.body.to;
    newEdu.school = req.body.school;
    newEdu.degree = req.body.degree;
    newEdu.fieldOfStudy = req.body.fieldOfStudy;

    if (profile) {
      if (!isEmpty(req.body.id)) {
        //console.log(req.body.id);
        Profile.updateOne(
          { "education._id": req.body.id },
          { $set: { "education.$[edu]": newEdu } },
          {
            arrayFilters: [{ "edu._id": mongoose.Types.ObjectId(req.body.id) }]
          }
        )
          .then(profile => {
            res.json(profile);
            //console.log(profile);
          })
          .catch(err =>
            res.status(404).json({ errors: parseErrors(err.errors) })
          );
      } else {
        // Add to edu array
        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile));
      }
      //});
    }
  });
};

// @route   GET api/get_education/:id
// @desc    Get education by ID
// @access  Private
exports.getEducation = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //console.log(profile.education);
      profile.education.map(education => {
        if (education._id == req.params.id) {
          res.json(education);
        }
      });
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

// @route   GET api/get_experience/:id
// @desc    Get experience by ID
// @access  Private
exports.getExperience = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //console.log(profile.education);
      profile.experience.map(experience => {
        if (experience._id == req.params.id) {
          res.json(experience);
        }
      });
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

// @route   DELETE api/get_experience/:id
// @desc    Delete experience by ID
// @access  Private
exports.deleteExperience = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
};

// @route   DELETE api/get_education/:id
// @desc    Delete education by ID
// @access  Private
exports.deleteEducation = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      // Splice out of array
      profile.education.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
};
