import React, { Component } from "react";
import PropTypes from "prop-types";
import TimesheetsForm from "./TimesheetsForm";
import { connect } from "react-redux";
import { fetchTimesheets } from "../../../actions/timesheetsActions";
import { Link } from "react-router-dom";
import { Button, Menu, Input, Loader } from "semantic-ui-react";

class TimesheetsPage extends Component {
  componentDidMount() {
    this.props.fetchTimesheets();
  }

  render() {
    const { timesheetsList, loading } = this.props.timesheets;
    let allTimesheets;
    if (loading) {
      allTimesheets = <Loader />;
    } else {
      if (Object.keys(timesheetsList).length > 0) {
        allTimesheets = <TimesheetsForm timesheetsList={timesheetsList} />;
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
  timesheets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheets
});

export default connect(mapStateToProps, { fetchTimesheets })(TimesheetsPage);
