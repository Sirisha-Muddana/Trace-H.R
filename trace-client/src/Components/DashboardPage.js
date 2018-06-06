import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ConfirmEmailMessage from "./messages/ConfirmEmailMessage";
import PropTypes from "prop-types";
import SubmissionsPage from "./Recruiters/Submissions/SubmissionsPage";
import AllSubmissionsPage from "./Management/All Submissions/AllSubmissionsPage";
import DashboardCalendar from "./Human Resources/DashboardCalendar";
import Profile from "./Consultants/Dashboard/Profile";

const DashboardPage = ({ resendEmail, isConfirmed, userAccessRole }) => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage />}
    {userAccessRole === "ACCESS LEVEL 1" && <Profile />}
    {userAccessRole === "ACCESS LEVEL 2" && <SubmissionsPage />}
    {userAccessRole === "ACCESS LEVEL 3" && <DashboardCalendar />}
    {userAccessRole === "ACCESS LEVEL 4" && <AllSubmissionsPage />}
  </div>
);
DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  resendEmail: PropTypes.bool.isRequired,
  userAccessRole: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.auth.user.confirmed,
    userAccessRole: state.auth.user.userAccessRole,
    resendEmail: state.auth.resendEmail
  };
}

export default withRouter(connect(mapStateToProps)(DashboardPage));
