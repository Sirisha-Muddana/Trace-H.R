import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Divider, Icon } from "semantic-ui-react";

class Sidebar extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { userAccessRole } = this.props.auth.user;

    const userLinks = (
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link active" to="/dashboard">
            <Icon name="dashboard" />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="" onClick={this.logout.bind(this)}>
            <Icon name="sign out" />
            Sign out
          </a>
        </li>
      </ul>
    );

    const recruiterLinks = (
      <div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/dashboard">
              <Icon name="dashboard" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/submissionPage">
              <Icon name="block layout" />
              Marketting Sales
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              <Icon name="list layout" />
              Consultant List
            </Link>
          </li>
        </ul>
        <Divider />
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Submission reports</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className="nav-link" to="">
              <Icon name="write square" />
              Current week
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              <Icon name="calendar" />
              Current month
            </Link>
          </li>
        </ul>
        <Divider />
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>
            <Icon name="settings" />
            Account settings
          </span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="">
              <Icon name="settings" />
              Edit Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={this.logout.bind(this)}>
              <Icon name="sign out" />
              Sign out
            </a>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
        <Link className="navbar-brand " to="/dashboard">
          Trace H.R
        </Link>
        <Divider />
        <div className="sidebar-sticky">
          {userAccessRole === "ACCESS LEVEL 1" && userLinks}
          {userAccessRole === "ACCESS LEVEL 2" && recruiterLinks}
        </div>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Sidebar);
