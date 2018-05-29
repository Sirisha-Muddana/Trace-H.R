import React, { Component } from "react";
import PropTypes from "prop-types";
import UserRecord from "./UserRecord";
import { connect } from "react-redux";
import { fetchUsers } from "../../../actions/userActions";
import { Loader } from "semantic-ui-react";

class UserList extends Component {
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
        allUsers = <UserRecord usersList={usersList} />;
      } else {
        allUsers = <h4> No Candidates registered </h4>;
      }
    }
    return (
      <div>
        <h1 className="display-4 text-center">Consultant List</h1>
        {allUsers}
      </div>
    );
  }
}

UserList.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { fetchUsers })(UserList);
