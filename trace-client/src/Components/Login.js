import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

class Login extends Component {

  constructor(){
    super();
    this.state = {
      login: {}
    }
  }

  authLogin(userInfo){
    axios.request({
      method: 'POST',
      url: 'http://localhost:3000/api/authenticate',
      data: userInfo
    }).then(response => {
      console.log(response.data.success);
       if(response.data.success === true){
        localStorage.setItem('jwtToken', response.data.token);
        this.props.history.push('/users/success');  
       }

    }).catch(err => console.log(err))
  }

  handleSubmit(e){
    if(this.refs.email.value === ''){
      alert('Email is required');
    } else if(this.refs.password.value === ''){
      alert('Password is required');
    }else{
      const userInfo = {
        // id: uuid.v4(),
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      this.authLogin(userInfo);
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
      <h3>Sign in {this.state.status}</h3>
      <form onSubmit={this.handleSubmit.bind(this)}>
      <div className="input-field">
      <input type="text" name="email" ref="email" value={this.state.email}/>
      <label htmlFor="email">Email Address</label>
      <br />
      </div>
      <div className="input-field">
      <input type="password" name="password" ref="password" value={this.state.password}/>
      <label htmlFor="password">Password</label>
      <br />
      </div>
      <input type="submit" value="Submit" className="btn"/>
      </form>
      </div>
      );
  }
}

Login.propTypes = {
}

export default Login;
