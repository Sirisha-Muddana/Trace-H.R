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
    "/api/users",
    passport.authenticate("jwt", { session: false }),
    users.findAll
  );

  /*// Retrieve a single user with userId
  app.get("/api/users/:userId", sales.findOne);

  // Update a user with userId
  app.put("/api/users/:userId", sales.update);

  // Delete a user with userId
  app.delete("/api/users/:userId", sales.delete);*/

  app.get(
    "/api/submissions_list",
    passport.authenticate("jwt", { session: false }),
    submissions.submissionsList
  );

  app.get(
    "/api/get_submission/:id",
    passport.authenticate("jwt", { session: false }),
    submissions.getSubmission
  );

  app.post(
    "/api/post_submission",
    passport.authenticate("jwt", { session: false }),
    submissions.postSubmission
  );
};
