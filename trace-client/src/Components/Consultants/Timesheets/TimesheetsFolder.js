import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getTimesheetsByDate } from "../../../actions/timesheetsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const color = "teal";

class TimesheetsFolder extends Component {
  render() {
    const timesheetsList = this.props.timesheetsList.map(timesheets => (
      <Table.Row key={timesheets._id}>
        <Table.Cell textAlign="left">
          <Icon name="folder" />
          <Link to={`/timesheetsForm/${timesheets.metadata.date}`}>
            <Moment format="YYYY-MMM-DD">{timesheets.metadata.date}</Moment>
          </Link>
        </Table.Cell>
      </Table.Row>
    ));
    return (
      <div>
        <Table color={color} key={color} size="small" celled singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3} textAlign="left">
                Date Submitted
              </Table.HeaderCell>
            </Table.Row>
            {timesheetsList}
          </Table.Header>
        </Table>
      </div>
    );
  }
}

TimesheetsFolder.propTypes = {
  getTimesheetsByDate: PropTypes.func.isRequired
};

export default connect(null, { getTimesheetsByDate })(TimesheetsFolder);
