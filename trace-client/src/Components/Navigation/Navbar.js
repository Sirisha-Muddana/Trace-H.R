import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

class Navbar extends Component {

  logout(e) {
    e.preventDefault();
    this.props.logout()
        // .then(
        // (res) => this.context.router.history.push('/login'),

  // );
  }

  render() {
    const { isAuthenticated } = this.props.auth

    const userLinks = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/" onClick={this.logout.bind(this)}>Logout</a>
          </li>
        </ul>

    );

    const guestLinks = (
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign up</Link>
          </li>
        </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Trace H.R
          </Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
              { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

Navbar.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(Navbar);
