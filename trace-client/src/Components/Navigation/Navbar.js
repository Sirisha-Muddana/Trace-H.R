import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/authActions";
import { Segment, Menu, Icon } from "semantic-ui-react";

const Navbar = ({ isAuthenticated, logout }) => (
  <Segment inverted style={{ background: "#343a40" }}>
    <Menu secondary size="tiny">
      <Menu.Item as={Link} to="/dashboard" style={{ color: "white" }}>
        Trace H.R
      </Menu.Item>
      {!isAuthenticated && (
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login" style={{ color: "white" }}>
            <Icon name="sign in" />
            Sign In{" "}
          </Menu.Item>
          <Menu.Item as={Link} to="/signup" style={{ color: "white" }}>
            <Icon name="signup" />
            Sign Up{" "}
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  </Segment>
);

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(Navbar);
