import React, { Component } from "react";
import { Table } from "semantic-ui-react";
//import { recruiters } from "../common/common";

const color = "teal";

class UsersInfo extends Component {
  render() {
    const usersList = this.props.usersList.map(users => (
      <Table.Row key={users._id}>
        <Table.Cell className="text-capitalize">
          {users.user.firstName} {users.user.lastName}
        </Table.Cell>
        <Table.Cell textAlign="center">{users.user.email}</Table.Cell>
        <Table.Cell>{users.skillset}</Table.Cell>
        <Table.Cell textAlign="center">{users.cellphone}</Table.Cell>
        <Table.Cell textAlign="center">{users.address.state}</Table.Cell>
        <Table.Cell textAlign="center">{users.onProject}</Table.Cell>
        <Table.Cell textAlign="center">{users.endDate}</Table.Cell>
      </Table.Row>
    ));
    return (
      <div>
        <Table color={color} key={color} size="small" celled singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Full Name</Table.HeaderCell>
              <Table.HeaderCell>Email Address</Table.HeaderCell>
              <Table.HeaderCell>Skillset</Table.HeaderCell>
              <Table.HeaderCell>Cell Phone#</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Current Project</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
            </Table.Row>
            {usersList}
          </Table.Header>
        </Table>
      </div>
    );
  }
}

export default UsersInfo;
