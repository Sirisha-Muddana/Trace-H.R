const passport = require("passport");
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const moment = require("moment");

// Create storage engine

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  file: (req, file) => {
    //Profile.findOne({ user: req.user.id }).then(profile => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename =
          moment(Date.now()).format("YYYY-MM-DD") +
          "_" +
          req.user.firstName +
          "_" +
          req.user.lastName +
          path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          metadata: {
            user: req.user.id,
            date: moment(Date.now()).format("YYYY-MM-DD")
          },
          bucketName: "timesheets"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  const submissions = require("../controllers/submissions.controller.js");
  const users = require("../controllers/users.controller.js");
  const file = require("../controllers/fileUpload.controller.js");

  // AUTH ROUTES
  app.post("/api/register", auth.register);

  app.post("/api/authenticate", auth.authenticate);

  app.post("/api/confirmation", auth.confirmation);

  app.post("/api/reset_password_request", auth.resetPasswordRequest);

  app.post("/api/validate_token", auth.validateToken);

  app.post("/api/reset_password", auth.resetPassword);

  // TIMESHEET UPLOAD ROUTES
  // Route to upload file
  app.post(
    "/api/uploadTimesheet",
    passport.authenticate("jwt", { session: false }),
    upload.single("file"),
    file.uploadTimesheet
  );

  // Route to display all files
  app.get(
    "/api/allTimesheets",
    passport.authenticate("jwt", { session: false }),
    file.getAllTimesheets
  );

  // Route to display all files by user id
  app.get(
    "/api/timesheets",
    passport.authenticate("jwt", { session: false }),
    file.getTimesheets
  );
  app.get(
    "/api/get_timesheets/:id",
    passport.authenticate("jwt", { session: false }),
    file.getTimesheet
  );
  app.get(
    "/api/get_timesheets_by_date/:date",
    passport.authenticate("jwt", { session: false }),
    file.getTimesheetsByDate
  );

  /*// Route to get file by name
  app.get(
    "/api/timesheets/:filename",
    passport.authenticate("jwt", { session: false }),
    file.getTimesheet
  );*/

  // Get image by filename
  app.get(
    "/api/image/:filename",
    passport.authenticate("jwt", { session: false }),
    file.getImage
  );

  // Retrieve all users
  app.get(
    "/api/users_list",
    passport.authenticate("jwt", { session: false }),
    users.usersList
  );

  app.get(
    "/api/get_profile_by_id/:id",
    passport.authenticate("jwt", { session: false }),
    users.getProfileById
  );

  app.get(
    "/api/all_users",
    passport.authenticate("jwt", { session: false }),
    users.allUsers
  );

  //USER ROUTES
  // Get current user profile
  app.get(
    "/api/current_user",
    passport.authenticate("jwt", { session: false }),
    users.currentUser
  );

  // Create profile
  app.post(
    "/api/create_profile",
    passport.authenticate("jwt", { session: false }),
    users.createProfile
  );

  // Add immigration info
  app.post(
    "/api/immigration_info",
    passport.authenticate("jwt", { session: false }),
    users.immigrationInfo
  );

  // Add experience
  app.post(
    "/api/add_experience",
    passport.authenticate("jwt", { session: false }),
    users.addExperience
  );

  // Add education
  app.post(
    "/api/add_education",
    passport.authenticate("jwt", { session: false }),
    users.addEducation
  );

  app.get(
    "/api/get_education/:id",
    passport.authenticate("jwt", { session: false }),
    users.getEducation
  );

  app.get(
    "/api/get_experience/:id",
    passport.authenticate("jwt", { session: false }),
    users.getExperience
  );

  app.delete(
    "/api/delete_experience/:exp_id",
    passport.authenticate("jwt", { session: false }),
    users.deleteExperience
  );

  app.delete(
    "/api/delete_education/:edu_id",
    passport.authenticate("jwt", { session: false }),
    users.deleteEducation
  );

  // RECRUITER ROUTES

  // Get all submissions for current user
  app.get(
    "/api/submissions_list",
    passport.authenticate("jwt", { session: false }),
    submissions.submissionsList
  );

  // Get submission by ID
  app.get(
    "/api/get_submission/:id",
    passport.authenticate("jwt", { session: false }),
    submissions.getSubmission
  );

  app.get(
    "/api/get_submissions/:id",
    passport.authenticate("jwt", { session: false }),
    submissions.getSubmissions
  );

  // Edit or Create submission
  app.post(
    "/api/post_submission",
    passport.authenticate("jwt", { session: false }),
    submissions.postSubmission
  );

  // MANAGEMENT ROUTES

  // Get all recriters
  app.get(
    "/api/recruiter_list",
    passport.authenticate("jwt", { session: false }),
    users.recruiterList
  );
};
