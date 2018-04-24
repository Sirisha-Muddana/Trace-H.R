import React, { Component } from "react";
import axios from "axios";
//import PropTypes from "prop-types";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getUserDetails();
  }
  getUserDetails() {
    let userId = this.props.match.params.id;
    axios
      .get(`http://localhost:3000/api/users/${userId}`)
      .then(response => {
        this.setState(
          {
            id: response.data._id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            password: response.data.password
          },
          () => {
            //console.log(this.state);
          }
        );
      })
      .catch(err => console.log(err));
  }

  editUser(newUser) {
    axios
      .request({
        method: "PUT",
        url: `http://localhost:3000/api/users/${this.state.id}`,
        data: newUser
      })
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  handleSubmit(e) {
    if (this.refs.email.value === "") {
      alert("Email is required");
    } else {
      const newUser = {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        email: this.refs.email.value
      };
      this.editUser(newUser);
    }
    e.preventDefault();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div id="section" className="col-md-6">
            <h3 id="heading">Edit User {this.state.status}</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  ref="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  ref="lastName"
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  ref="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="wrapper">
                <input type="submit" value="Submit" className="btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
