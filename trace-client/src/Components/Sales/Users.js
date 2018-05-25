import React, { Component } from "react";
import axios from "axios";
import UserDetails from "./ConsultantsList/UserDetails";
import PropTypes from "prop-types";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    axios
      .get("http://localhost:3000/api/users")
      .then(response => {
        this.setState({ users: response.data }, () => {
          //console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const userInfo = this.state.users.map((user, i) => {
      return <UserDetails key={user._id} user={user} />;
    });
    return (
      <div>
        <h1>User Info</h1>
        <ul>{userInfo}</ul>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
