import React, { Component } from "react";
import { Table, Icon, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getTimesheetsByDate } from "../../../actions/timesheetsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const color = "teal";

class TimesheetsForm extends Component {
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
        allTimesheets = getTimesheetsByDate.map(timesheets => (
          <Table.Row key={timesheets._id}>
            <Table.Cell textAlign="left">
              <Moment format="YYYY-MMM-DD">{timesheets.uploadDate}</Moment>
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="file outline" />
              <Link to={`/viewTimesheet/${timesheets.filename}`}>
                {timesheets.filename}
              </Link>
            </Table.Cell>
          </Table.Row>
        ));
      } else {
        allTimesheets = <h4> No Timesheets found</h4>;
      }
    }
    return (
      <div>
        <Table color={color} key={color} size="small" celled singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3} textAlign="left">
                Date Submitted
              </Table.HeaderCell>
              <Table.HeaderCell width={13} textAlign="center">
                Timesheet Copy
              </Table.HeaderCell>
            </Table.Row>
            {allTimesheets}
          </Table.Header>
        </Table>
      </div>
    );
  }
}

TimesheetsForm.propTypes = {
  getTimesheetsByDate: PropTypes.func.isRequired,
  timesheets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheets
});

export default connect(mapStateToProps, { getTimesheetsByDate })(
  TimesheetsForm
);
