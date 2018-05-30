import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const color = "teal";

class TimesheetsFolder extends Component {
  render() {
    const timesheetsList = this.props.timesheetsList.map(timesheets => (
      <Table.Row key={timesheets}>
        <Table.Cell textAlign="left">
          <Icon name="folder" />
          <Link to={`/timesheetsDisplay/${timesheets}`}>
            <Moment format="YYYY-MMM-DD">{timesheets}</Moment>
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

export default TimesheetsFolder;
