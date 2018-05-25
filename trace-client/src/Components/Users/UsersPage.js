import React, { Component } from "react";
import PropTypes from "prop-types";
import UsersInfo from "./UsersInfo";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/userActions";
import { Menu, Input, Loader } from "semantic-ui-react";

class UsersPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { usersList, loading } = this.props.users;
    let allUsers;

    if (loading) {
      allUsers = <Loader active inline="centered" />;
    } else {
      if (Object.keys(usersList).length > 0) {
        allUsers = <UsersInfo usersList={usersList} />;
      } else {
        allUsers = <h4> No Candidates registered </h4>;
      }
    }
    return (
      <div>
        <h1 className="display-4 text-center">Consultant List</h1>
        <Menu secondary>
          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu>
        {allUsers}
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
