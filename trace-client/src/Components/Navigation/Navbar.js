import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../actions/authActions";
import {Segment, Menu, Icon, Dropdown} from 'semantic-ui-react';

const Navbar = ({isAuthenticated, logout}) => (

        <Segment inverted>
            <Menu inverted secondary size='tiny'>
                <Menu.Item as={Link} to="/dashboard">
                    Trace H.R
                </Menu.Item>
                {isAuthenticated ? (
                    <Menu.Menu position="right">
                        <Dropdown item text='Account Settings'>
                            <Dropdown.Menu>
                                <Dropdown.Item>Account Settings</Dropdown.Item>
                                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                ) : (
                    <Menu.Menu position="right">
                        <Menu.Item as={Link} to="/login">
                            <Icon name="sign in" />
                            Sign In </Menu.Item>
                        <Menu.Item as={Link} to="/signup">
                            <Icon name="signup" />
                            Sign Up </Menu.Item>
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
        isAuthenticated: !!state.user.token
    };
}

export default connect(mapStateToProps, {logout: actions.logout})(Navbar);