import React, { Component } from "react";

class AuthNav extends Component {
  render() {
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
                  <i className="fa fa-globe" />
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
                  <span className="no-icon">Dropdown</span>
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
export default AuthNav;
