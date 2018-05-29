var bcrypt = require("bcryptjs");
const Users = require("../models/users.model");
const Profile = require("../models/profile.model");
import parseErrors from "../utils/parseErrors";

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
  if (req.body.endDate) profileFields.endDate = req.body.endDate;
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

  Profile.findOne({ user: req.user.id }).then(profile => {
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
    const newExp = {
      title: req.body.data.title,
      company: req.body.data.company,
      location: req.body.data.location,
      from: req.body.data.from,
      to: req.body.data.to,
      description: req.body.data.description
    };

    // Add to exp array
    profile.experience.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  });
};

exports.addEducation = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEdu = {
      school: req.body.data.school,
      degree: req.body.data.degree,
      fieldOfStudy: req.body.data.fieldOfStudy,
      from: req.body.data.from,
      to: req.body.data.to
    };

    // Add to edu array
    profile.education.unshift(newEdu);

    profile.save().then(profile => res.json(profile));
  });
};
