import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ConfirmEmailMessage from "./messages/ConfirmEmailMessage";
import PropTypes from "prop-types";
import SubmissionsPage from "./Sales/Submissions/SubmissionsPage";
import Profile from "./Consultants/Profile";

const DashboardPage = ({ isConfirmed, userAccessRole }) => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage />}
    {userAccessRole === "ACCESS LEVEL 1" && <Profile />}
    {userAccessRole === "ACCESS LEVEL 2" && <SubmissionsPage />}
  </div>
);
DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  userAccessRole: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.auth.user.confirmed,
    userAccessRole: state.auth.user.userAccessRole
  };
}

export default withRouter(connect(mapStateToProps)(DashboardPage));
