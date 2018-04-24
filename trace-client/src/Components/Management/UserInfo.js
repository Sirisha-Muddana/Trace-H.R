import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: ""
    };
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    let userId = this.props.match.params._id;
    axios
      .get(`http://localhost:3000/api/users/${userId}`)
      .then(response => {
        this.setState({ info: response.data }, () => {
          //console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  onDelete() {
    let userId = this.state.info._id;
    axios
      .delete(`http://localhost:3000/api/users/${userId}`)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <br />
        <Link className="btn" to="/home">
          Back
        </Link>
        <h3>User Info</h3>
        <ul className="">
          <li className="">
            <strong>First Name:</strong> {this.state.info.firstName}
          </li>
          <li className="">
            <strong>Last Name:</strong> {this.state.info.lastName}
          </li>
          <li className="">
            <strong>Email Address:</strong> {this.state.info.email}
          </li>
        </ul>
        <Link className="btn" to={`/users/edit/${this.state.info._id}`}>
          Edit
        </Link>
        <button onClick={this.onDelete.bind(this)} className="btn">
          Delete
        </button>
      </div>
    );
  }
}

export default UserInfo;
