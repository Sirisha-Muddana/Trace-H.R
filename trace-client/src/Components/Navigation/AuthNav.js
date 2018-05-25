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
        <div className="container-fluid">
          <div className="navbar-collapse collapse justify-content-end ">
            <ul className="navbar-nav ">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="http://example.com"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="button">
                    <i className="fa fa-globe" />
                    <span className="button-badge">5</span>
                    <p className="hidden-lg hidden-md hidden-sm" />
                  </div>
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="http://example.com"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Icon circular color="brown" name="user" />
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
