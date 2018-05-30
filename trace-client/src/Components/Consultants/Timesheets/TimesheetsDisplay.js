import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTimesheetsByDate } from "../../../actions/timesheetsActions";
import TimesheetsForm from "./TimesheetsForm";
import { Link } from "react-router-dom";
import { Button, Menu, Input, Loader } from "semantic-ui-react";

class TimesheetsDisplay extends Component {
  componentDidMount() {
    this.props.getTimesheetsByDate(this.props.match.params.date);
  }

  render() {
    const { getTimesheetsByDate, loading } = this.props.timesheets;
    let allTimesheets;
    if (loading) {
      allTimesheets = <Loader active inline="centered" />;
    } else {
      if (Object.keys(getTimesheetsByDate).length > 0) {
        allTimesheets = (
          <TimesheetsForm getTimesheetsByDate={getTimesheetsByDate} />
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

TimesheetsDisplay.propTypes = {
  getTimesheetsByDate: PropTypes.func.isRequired,
  timesheets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheets
});

export default connect(mapStateToProps, { getTimesheetsByDate })(
  TimesheetsDisplay
);
