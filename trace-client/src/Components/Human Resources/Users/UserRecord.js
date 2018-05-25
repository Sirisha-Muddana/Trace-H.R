import React, { Component } from "react";
import { Table } from "semantic-ui-react";
//import { recruiters } from "../common/common";

const color = "teal";

class UserRecord extends Component {
  render() {
    const usersList = this.props.usersList.map(users => (
      <Table.Row key={users._id}>
        <Table.Cell textAlign="center" className="text-capitalize">
          {users.user.firstName} {users.user.lastName}
        </Table.Cell>
        <Table.Cell textAlign="center">{users.user.email}</Table.Cell>
        <Table.Cell textAlign="center">{users.cellphone}</Table.Cell>
        {users.immigrationInfo.map(immigration => (
          <Table.Cell key={immigration._id} textAlign="center">
            {immigration.visaStatus}
          </Table.Cell>
        ))}
        {users.immigrationInfo.map(immigration => (
          <Table.Cell key={immigration._id} textAlign="center">
            {immigration.visaExp}
          </Table.Cell>
        ))}
        {users.immigrationInfo.map(immigration => (
          <Table.Cell key={immigration._id} textAlign="center">
            {immigration.i94Exp}
          </Table.Cell>
        ))}
      </Table.Row>
    ));
    return (
      <div>
        <Table color={color} key={color} size="small" celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center"> Full Name</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Email Address
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Cell Phone#
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Visa Status
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Visa Expiry
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                I-94 Expiry
              </Table.HeaderCell>
            </Table.Row>
            {usersList}
          </Table.Header>
        </Table>
      </div>
    );
  }
}

export default UserRecord;
