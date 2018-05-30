import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const color = "teal";

class TimesheetsForm extends Component {
  render() {
    const getTimesheetsByDate = this.props.getTimesheetsByDate.map(
      timesheets => (
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
      )
    );
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
            {getTimesheetsByDate}
          </Table.Header>
        </Table>
      </div>
    );
  }
}

export default TimesheetsForm;
