import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserDetails extends Component{

  constructor(props){
    super(props);
    this.state = {
      user: props.user
    }
  }

  render(){
    return (
        <li className="collection-item">
        <Link to={`/users/${this.state.user._id}`}>{this.state.user.email}</Link>
        </li>
    )
  }
}

export default UserDetails;
