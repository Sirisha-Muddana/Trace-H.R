const passport = require("passport");

module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  const submissions = require("../controllers/submissions.controller.js");
  const users = require("../controllers/users.controller.js");

  // AUTH ROUTES
  app.post("/api/signup", auth.create);

  app.post("/api/authenticate", auth.authenticate);

  app.post("/api/confirmation", auth.confirmation);

  app.post("/api/reset_password_request", auth.resetPasswordRequest);

  app.post("/api/validate_token", auth.validateToken);

  app.post("/api/reset_password", auth.resetPassword);

  //USER ROUTES

  // Retrieve all users
  app.get(
    "/api/users_list",
    passport.authenticate("jwt", { session: false }),
    users.usersList
  );

  // Get current user profile
  app.get(
    "/api/current_user",
    passport.authenticate("jwt", { session: false }),
    users.currentUser
  );

  // Create profile
  app.post(
    "/api/user_profile",
    passport.authenticate("jwt", { session: false }),
    users.userProfile
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

  /*// Retrieve a single user with userId
  app.get("/api/users/:userId", sales.findOne);

  // Update a user with userId
  app.put("/api/users/:userId", sales.update);

  // Delete a user with userId
  app.delete("/api/users/:userId", sales.delete);*/

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

  // Edit or Create submission
  app.post(
    "/api/post_submission",
    passport.authenticate("jwt", { session: false }),
    submissions.postSubmission
  );
};
