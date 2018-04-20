import React, { Component } from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types';

class Register extends Component {

  constructor(){
    super();
    this.state = {
      register: {}
    }
  }

  newUser(newUser){
    axios.request({
      method: 'POST',
      url: 'http://localhost:3000/api/register',
      data: newUser
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err))
  }

  handleSubmit(e){
    if(this.refs.email.value === ''){
      alert('Email is required');
    } else{
      const newUser = {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      this.newUser(newUser);
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
      <h3>Register new user</h3>
      <form onSubmit={this.handleSubmit.bind(this)}>
      <div className="input-field">
      <input type="text" name="firstName" ref="firstName" />
      <label htmlFor="firstName">First Name</label>
      <br />
      </div>
      <div className="input-field">
      <input type="text" name="lastName" ref="lastName" />
      <label htmlFor="lastName">Last Name</label>
      <br />
      </div>
      <div className="input-field">
      <input type="text" name="email" ref="email" />
      <label htmlFor="email">Email Address</label>
      <br />
      </div>
      <div className="input-field">
      <input type="password" name="password" ref="password"/>
      <label htmlFor="password">Password</label>
      </div>
      <br />
      <input type="submit" value="Submit" className="btn"/>
      </form>
      </div>
    );
  }
}

export default Register;
