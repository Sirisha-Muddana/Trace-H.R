import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import Moment from "react-moment";

const color = "teal";

class TimesheetsForm extends Component {
  render() {
    const timesheetsList = this.props.timesheetsList.map(timesheets => (
      <Table.Row key={timesheets._id}>
        <Table.Cell textAlign="center">
          <Moment format="YYYY-MMM-DD">{timesheets.uploadDate}</Moment>
        </Table.Cell>
        <Table.Cell textAlign="center">{timesheets.filename}</Table.Cell>
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
            {timesheetsList}
          </Table.Header>
        </Table>
      </div>
    );
  }
}

export default TimesheetsForm;
