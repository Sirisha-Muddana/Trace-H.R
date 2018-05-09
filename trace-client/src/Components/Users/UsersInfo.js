import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
//import { recruiters } from "../common/common";

class UsersInfo extends Component {
  render() {
    const { users } = this.props;

    return (
      <Table.Body>
        <Table.Row>
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
      </Table.Body>
    );
  }
}

UsersInfo.propTypes = {
  users: PropTypes.object.isRequired
};

export default UsersInfo;
