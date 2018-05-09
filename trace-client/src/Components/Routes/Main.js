import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LoginPage from "../SignIn/LoginPage";
import ForgotPasswordPage from "../SignIn/ForgotPasswordPage";
import ResetPasswordPage from "../SignIn/ResetPasswordPage";
import SignupPage from "../Signup/SignupPage";
import ConfirmationPage from "../SignIn/ConfirmationPage";
import GuestRoute from "./GuestRoute";

import Profile from "../Consultants/Profile";
import CreateProfilePage from "../Consultants/CreateProfilePage";
import EditProfile from "../Consultants/EditProfile";
import AddImmigrationInfo from "../Consultants/AddImmigrationInfo";
import AddExperiencePage from "../Consultants/AddExperiencePage";
import AddEducationPage from "../Consultants/AddEducationPage";

import Dashboard from "../DashboardPage";
import SubmissionsPage from "../Sales/Submissions/SubmissionsPage";
import PostSubmissionPage from "../Sales/Submissions/PostSubmissionPage";
import EditSubmissionForm from "../Sales/Submissions/EditSubmissionForm";
import UsersPage from "../Users/UsersPage";
import EditUser from "../Sales/EditUser";
import UserRoute from "./UserRoute";
import RecruiterRoute from "./RecruiterRoute";

const Main = ({ isAuthenticated }) => (
  <div>
    <Switch>
      {/*
      <GuestRoute exact path="/" component={}
*/}
      <GuestRoute exact path="/signup" component={SignupPage} />
      <GuestRoute exact path="/login" component={LoginPage} />
      <GuestRoute
        exact
        path="/forgot_password"
        component={ForgotPasswordPage}
      />
      <GuestRoute
        exact
        path="/reset_password/:token"
        component={ResetPasswordPage}
      />
      {isAuthenticated ? (
        <Route exact path="/confirmation/:token" component={ConfirmationPage} />
      ) : (
        <Redirect to="/login" />
      )}

      {/*CONSULTANT ROUTES*/}
      {isAuthenticated ? (
        <UserRoute exact path="/profile" component={Profile} />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <UserRoute exact path="/createProfile" component={CreateProfilePage} />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <UserRoute exact path="/editProfile" component={EditProfile} />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <UserRoute
          exact
          path="/addImmigrationInfo"
          component={AddImmigrationInfo}
        />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <UserRoute exact path="/addExperience" component={AddExperiencePage} />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <UserRoute exact path="/addEducation" component={AddEducationPage} />
      ) : (
        <Redirect to="/login" />
      )}
      {/*COMMON DASHBOARD*/}
      {isAuthenticated ? (
        <Route exact path="/dashboard" component={Dashboard} />
      ) : (
        <Redirect to="/login" />
      )}
      {/*RECRUITER ROUTES*/}
      {isAuthenticated ? (
        <RecruiterRoute
          exact
          path="/submissionPage"
          component={SubmissionsPage}
        />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <RecruiterRoute
          exact
          path="/newSubmission"
          component={PostSubmissionPage}
        />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <RecruiterRoute
          exact
          path="/editSubmission/:id"
          component={EditSubmissionForm}
        />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <RecruiterRoute exact path="/users" component={UsersPage} />
      ) : (
        <Redirect to="/login" />
      )}
      {/*{isAuthenticated ? (
        <RecruiterRoute exact path="/users/:_id" component={UserInfo} />
      ) : (
        <Redirect to="/login" />
      )}*/}
      {isAuthenticated ? (
        <RecruiterRoute exact path="/users/edit/:id" component={EditUser} />
      ) : (
        <Redirect to="/login" />
      )}
    </Switch>
  </div>
);

Main.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Main));
