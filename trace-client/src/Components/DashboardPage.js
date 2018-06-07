import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import SubmissionsPage from "./Recruiters/Submissions/SubmissionsPage";
import AllSubmissionsPage from "./Management/All Submissions/AllSubmissionsPage";
import DashboardCalendar from "./Human Resources/DashboardCalendar";
import Profile from "./Consultants/Dashboard/Profile";

const DashboardPage = ({ userAccessRole }) => (
  <div>
    {userAccessRole === "ACCESS LEVEL 1" && <Profile />}
    {userAccessRole === "ACCESS LEVEL 2" && <SubmissionsPage />}
    {userAccessRole === "ACCESS LEVEL 3" && <DashboardCalendar />}
    {userAccessRole === "ACCESS LEVEL 4" && <AllSubmissionsPage />}
  </div>
);
DashboardPage.propTypes = {
  userAccessRole: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    userAccessRole: state.auth.user.userAccessRole
  };
}

export default withRouter(connect(mapStateToProps)(DashboardPage));
