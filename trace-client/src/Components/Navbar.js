import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {

    return (
      <div>
      <nav className="blue darken-3">
      <div className="nav-wrapper">
      <a href="/" className="brand-logo">Focus HR</a>
      <ul className="right hide-on-small-only">
      <li><Link to ="/"><i className="fa fa-users"></i> Homepage</Link></li>
      <li><Link to ="/users/register"><i className="fa fa-plus"></i> Register</Link></li>
      <li><Link to ="/users/login"><i className="fa fa-sign-in"></i> Login</Link></li>
      </ul>
      </div>
      </nav>

      </div>
    );
  }
}


export default Navbar;
