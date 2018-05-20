import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Divider } from "semantic-ui-react";

class Sidebar extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { userAccessRole } = this.props.auth.user;

    const managementLinks = (
      <div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/dashboard">
              <i className="fas fa-chart-line text-info mr-1" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/createUser">
              <i className="fas fa-chart-line text-info mr-1" />
              Create Account
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/alltimesheetsPage">
              <i className="fas fa-chart-line text-info mr-1" />
              Candidate Timesheets
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/users">
              <i className="fas fa-chart-line text-info mr-1" />
              Candidate List
            </Link>
          </li>
        </ul>
        <Divider />
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Account settings</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="fas fa-cogs text-info mr-1" />
              Edit Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={this.logout.bind(this)}>
              <i className="fas fa-power-off text-info mr-1" />
              Sign out
            </a>
          </li>
        </ul>
      </div>
    );

    const userLinks = (
      <div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/dashboard">
              <i className="fas fa-chart-line text-info mr-1" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/timesheetsPage">
              <i className="fas fa-chart-line text-info mr-1" />
              Timesheets
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link active" to="/dashboard">
              <i className="fas fa-chart-line text-info mr-1" />
              Submissions
            </Link>
          </li>
        </ul>
        <Divider />
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Account settings</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="fas fa-cogs text-info mr-1" />
              Edit Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={this.logout.bind(this)}>
              <i className="fas fa-power-off text-info mr-1" />
              Sign out
            </a>
          </li>
        </ul>
      </div>
    );

    const recruiterLinks = (
      <div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/dashboard">
              <i className="fas fa-chart-line text-info mr-1" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              <i className="fas fa-list-ul text-info mr-1" />
              Candidate List
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
              <i className="far fa-calendar-check text-info mr-1" />
              Current week
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="">
              <i className="far fa-calendar-alt text-info mr-1" />
              Current month
            </Link>
          </li>
        </ul>
        <Divider />
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Account settings</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="fas fa-cogs text-info mr-1" />
              Edit Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={this.logout.bind(this)}>
              <i className="fas fa-power-off text-info mr-1" />
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
          {userAccessRole === "ACCESS LEVEL 4" && managementLinks}
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
