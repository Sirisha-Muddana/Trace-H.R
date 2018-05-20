import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon } from "semantic-ui-react";

class AuthNav extends Component {
  render() {
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-bar burger-lines" />
            <span className="navbar-toggler-bar burger-lines" />
            <span className="navbar-toggler-bar burger-lines" />
          </button>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav ml-auto">
              <li className="dropdown nav-item">
                <a
                  href=""
                  className="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <Icon color="teal" name="globe" />
                  <span className="notification">5</span>
                  <span className="d-lg-none">Notification</span>
                </a>
                <ul className="dropdown-menu">
                  <a className="dropdown-item" href="">
                    Notification 1
                  </a>
                  <a className="dropdown-item" href="">
                    Notification 2
                  </a>
                  <a className="dropdown-item" href="">
                    Notification 3
                  </a>
                  <a className="dropdown-item" href="">
                    Notification 4
                  </a>
                  <a className="dropdown-item" href="">
                    Another notification
                  </a>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="http://example.com"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Icon circular color="teal" name="user" />
                  <span className="no-icon">
                    {firstName} {lastName}
                  </span>
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="">
                    Action
                  </a>
                  <a className="dropdown-item" href="">
                    Another action
                  </a>
                  <a className="dropdown-item" href="">
                    Something
                  </a>
                  <a className="dropdown-item" href="">
                    Something else here
                  </a>
                  <div className="divider" />
                  <a className="dropdown-item" href="">
                    Separated link
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

AuthNav.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  firstName: state.auth.user.firstName,
  lastName: state.auth.user.lastName
});

export default withRouter(connect(mapStateToProps)(AuthNav));
