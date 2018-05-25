import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Landing from "../Landing";
import LoginPage from "../SignIn/Login/LoginPage";
import ForgotPasswordPage from "../SignIn/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "../SignIn/ResetPassword/ResetPasswordPage";
import SignupPage from "../Signup/SignupPage";
import ConfirmationPage from "../SignIn/ConfirmationPage";

import AllSubmissionsPage from "../Management/All Submissions/AllSubmissionsPage";
import GetSubmissionsPage from "../Management/All Submissions/GetSubmissionsPage";
import AllTimesheetsPage from "../Management/Timesheets/AllTimesheetsPage";
import GetTimesheetPage from "../Management/Timesheets/GetTimesheetPage";

import CreateUserPage from "../Management/Employee Management/CreateUserPage";
import DashboardCalendar from "../Human Resources/DashboardCalendar";
import UserList from "../Human Resources/Users/UserList";
import HRRoute from "./HRRoute";

import Profile from "../Consultants/Dashboard/Profile";
import TimesheetsPage from "../Consultants/Timesheets/TimesheetsPage";
import TimesheetsForm from "../Consultants/Timesheets/TimesheetsForm";
import UploadTimesheet from "../Consultants/Timesheets/UploadTimesheet";
import CreateProfilePage from "../Consultants/Profile/CreateProfilePage";
import EditProfile from "../Consultants/Profile/EditProfile";
import AddImmigrationInfoPage from "../Consultants/Immigration/AddImmigrationInfoPage";
import AddExperiencePage from "../Consultants/Experience/AddExperiencePage";
import AddEducationPage from "../Consultants/Education/AddEducationPage";

import Dashboard from "../DashboardPage";
import SubmissionsPage from "../Recruiters/Submissions/SubmissionsPage";
import PostSubmissionPage from "../Recruiters/Submissions/PostSubmissionPage";
import EditSubmissionForm from "../Recruiters/Submissions/EditSubmissionForm";
import UsersPage from "../Users/UsersPage";

import GuestRoute from "./GuestRoute";
import UserRoute from "./UserRoute";
import RecruiterRoute from "./RecruiterRoute";
import ManagementRoute from "./ManagementRoute";
import ViewTimesheet from "../Management/Timesheets/ViewTimesheet";

const Main = ({ isAuthenticated }) => (
  <div>
    <Switch>
      <GuestRoute exact path="/" component={Landing} />
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

      {/*********************MANAGEMENT ROUTES*********************************/}
      {isAuthenticated ? (
        <ManagementRoute
          exact
          path="/allSubmissions"
          component={AllSubmissionsPage}
        />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <ManagementRoute
          exact
          path="/getSubmissions/:id"
          component={GetSubmissionsPage}
        />
      ) : (
        <Redirect to="/login" />
      )}

      {isAuthenticated ? (
        <ManagementRoute
          exact
          path="/getTimesheets/:id"
          component={GetTimesheetPage}
        />
      ) : (
        <Redirect to="/login" />
      )}

      {isAuthenticated ? (
        <Route
          exact
          path="/viewTimesheet/:filename"
          component={ViewTimesheet}
        />
      ) : (
        <Redirect to="/login" />
      )}

      {isAuthenticated ? (
        <ManagementRoute
          exact
          path="/alltimesheetsPage"
          component={AllTimesheetsPage}
        />
      ) : (
        <Redirect to="/login" />
      )}

      {isAuthenticated ? (
        <ManagementRoute exact path="/createUser" component={CreateUserPage} />
      ) : (
        <Redirect to="/login" />
      )}

      {/*********************HR ROUTES*********************************/}
      {isAuthenticated ? (
        <HRRoute
          exact
          path="/dashboardCalendar"
          component={DashboardCalendar}
        />
      ) : (
        <Redirect to="/login" />
      )}

      {isAuthenticated ? (
        <HRRoute exact path="/userlist" component={UserList} />
      ) : (
        <Redirect to="/login" />
      )}

      {/*********************CONSULTANT ROUTES*********************************/}
      {isAuthenticated ? (
        <UserRoute exact path="/profile" component={Profile} />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <UserRoute exact path="/timesheetsPage" component={TimesheetsPage} />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <UserRoute
          exact
          path="/timesheetsForm/:date"
          component={TimesheetsForm}
        />
      ) : (
        <Redirect to="/login" />
      )}

      {isAuthenticated ? (
        <UserRoute exact path="/uploadTimesheet" component={UploadTimesheet} />
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
          component={AddImmigrationInfoPage}
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
      {/************************COMMON DASHBOARD*******************************/}
      {isAuthenticated ? (
        <Route exact path="/dashboard" component={Dashboard} />
      ) : (
        <Redirect to="/login" />
      )}
      {/*************************RECRUITER ROUTES******************************/}
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
        <Route exact path="/users" component={UsersPage} />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <Route exact path="/users" component={UsersPage} />
      ) : (
        <Redirect to="/login" />
      )}
      {isAuthenticated ? (
        <Route exact path="/users" component={UsersPage} />
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
