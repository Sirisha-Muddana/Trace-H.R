import React, { Component } from "react";
import PropTypes from "prop-types";
import UsersInfo from "./UsersInfo";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/userActions";
import { Table, Menu, Input } from "semantic-ui-react";

const color = "teal";

class UsersPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { usersList } = this.props.users;

    let allUsers;
    console.log(Object.keys(usersList).length);
    if (Object.keys(usersList).length > 0) {
      allUsers = usersList.map(users => (
        <UsersInfo key={users._id} users={users} />
      ));
    } else {
      allUsers = (
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="center">Empty</Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    }

    return (
      <div>
        <h1 className="display-4 text-center">Consultant List</h1>
        <Menu secondary>
          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Search..." />
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
          </Table.Header>
          {allUsers}
        </Table>
      </div>
    );
  }
}

UsersPage.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { fetchUsers })(UsersPage);
