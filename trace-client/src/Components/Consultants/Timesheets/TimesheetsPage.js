import React, { Component } from "react";
import PropTypes from "prop-types";
import TimesheetsFolder from "./TimesheetsFolder";
import { connect } from "react-redux";
import { fetchTimesheets } from "../../../actions/timesheetsActions";
import { getCurrentProfile } from "../../../actions/userActions";
import { Link } from "react-router-dom";
import { Button, Menu, Input, Loader } from "semantic-ui-react";

class TimesheetsPage extends Component {
  componentDidMount() {
    this.props.fetchTimesheets();
    this.props.getCurrentProfile();
  }

  render() {
    const { timesheetsList, loading } = this.props.timesheets;
    const { profile, loadingUser } = this.props.users;
    let allTimesheets;
    if (loading || loadingUser) {
      allTimesheets = <Loader active inline="centered" />;
    } else {
      if (
        Object.keys(timesheetsList).length > 0 &&
        Object.keys(profile).length > 0
      ) {
        allTimesheets = (
          <TimesheetsFolder timesheetsList={timesheetsList} profile={profile} />
        );
      } else {
        allTimesheets = <h4> No Timesheets found</h4>;
      }
    }

    return (
      <div>
        <h3 className="display-4 text-center">Timesheets</h3>
        <Menu secondary>
          <Menu.Item>
            <Button as={Link} to="/uploadTimesheet" secondary>
              Upload timesheet
            </Button>
          </Menu.Item>
          <Menu.Item position="right">
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu>
        {allTimesheets}
      </div>
    );
  }
}

TimesheetsPage.propTypes = {
  fetchTimesheets: PropTypes.func.isRequired,
  timesheets: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheets,
  users: state.users
});

export default connect(mapStateToProps, { fetchTimesheets, getCurrentProfile })(
  TimesheetsPage
);
