import React, { Component } from "react";
import { Table, Menu, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import _ from "lodash";
//import { recruiters } from "../common/common";

const color = "teal";

class UsersInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      searchTerm: "",
      searchList: this.props.usersList
    };
  }
  onChange = e => {
    e.preventDefault();
    this.setState({ search: true });
    this.setState({ searchTerm: e.target.value.toLowerCase() }, () => {
      let users;
      users = _.filter(
        this.props.usersList,
        users =>
          users.user.firstName.toLowerCase().includes(this.state.searchTerm) ||
          users.user.lastName.toLowerCase().includes(this.state.searchTerm)
      );
      this.setState({ searchList: users });
    });
  };
  render() {
    const usersList = this.state.searchList.map(users => (
      <Table.Row key={users._id}>
        <Table.Cell className="text-capitalize">
          <Link to={`/displayProfile/${users.user._id}`}>
            {users.user.firstName} {users.user.lastName}
          </Link>
        </Table.Cell>
        <Table.Cell textAlign="center">{users.user.email}</Table.Cell>
        <Table.Cell>{users.skillset}</Table.Cell>
        <Table.Cell textAlign="center">{users.cellphone}</Table.Cell>
        <Table.Cell textAlign="center">{users.address.state}</Table.Cell>
        <Table.Cell textAlign="center">{users.onProject}</Table.Cell>
        <Table.Cell textAlign="center">
          {users.endDate === "" ? "N/A" : users.endDate}
        </Table.Cell>
      </Table.Row>
    ));
    return (
      <div>
        <Menu secondary>
          <Menu.Item>
            <Input
              className="icon"
              icon="search"
              placeholder="Search..."
              onChange={this.onChange.bind(this)}
            />
          </Menu.Item>
        </Menu>
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
