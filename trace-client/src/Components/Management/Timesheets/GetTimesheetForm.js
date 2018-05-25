import React, { Component } from "react";
import { Table, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const color = "teal";

class GetTimesheetForm extends Component {
  render() {
    const new_item = this.props.new_item;
    let new_label;
    if (new_item) {
      new_label = (
        <Label color="red" tag>
          New
        </Label>
      );
    }
    const getTimesheets = this.props.getTimesheets.map(timesheets => (
      <Table.Row key={timesheets._id}>
        <Table.Cell textAlign="center">
          <Moment format="YYYY-MMM-DD">{timesheets.uploadDate}</Moment>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Icon name="image" color="brown" />
          {/*<i className="far fa-image text-dark mr-2" />
          */}
          <Link to={`/viewTimesheet/${timesheets.filename}`}>
            {timesheets.filename}
            {new_label}
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
