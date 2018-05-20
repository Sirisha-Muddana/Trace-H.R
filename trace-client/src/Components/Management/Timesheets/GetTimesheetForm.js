import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const color = "teal";

class GetTimesheetForm extends Component {
  render() {
    const getTimesheets = this.props.getTimesheets.map(timesheets => (
      <Table.Row key={timesheets._id}>
        <Table.Cell textAlign="center">
          <Moment format="YYYY-MMM-DD">{timesheets.uploadDate}</Moment>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Link to={`/viewTimesheet/${timesheets.filename}`}>
            {timesheets.filename}
          </Link>
        </Table.Cell>
      </Table.Row>
    ));
    return (
      <div>
        <Table color={color} key={color} size="small" celled singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3} textAlign="center">
                Date Submitted
              </Table.HeaderCell>
              <Table.HeaderCell width={13} textAlign="center">
                Timesheet Copy
              </Table.HeaderCell>
            </Table.Row>
            {getTimesheets}
          </Table.Header>
        </Table>
      </div>
    );
  }
}

export default GetTimesheetForm;
