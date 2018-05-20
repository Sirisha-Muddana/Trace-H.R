import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
//import { recruiters } from "../common/common";

const color = "teal";

class AllTimesheetsForm extends Component {
  render() {
    const allUsers = this.props.allUsers.map(users => (
      <Table.Row key={users._id}>
        <Table.Cell className="text-capitalize">
          <Link to={`/getTimesheets/${users._id}`}>
            {users.firstName} {users.lastName}
          </Link>
        </Table.Cell>
      </Table.Row>
    ));
    return (
      <div>
        <Table color={color} key={color} size="small" celled singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Full Name</Table.HeaderCell>
            </Table.Row>
            {allUsers}
          </Table.Header>
        </Table>
      </div>
    );
  }
}

export default AllTimesheetsForm;
