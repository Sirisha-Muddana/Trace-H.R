import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/authActions';
import {Menu, Icon} from 'semantic-ui-react';

const Navbar = ({logout}) => (
    <Menu secondary pointing>
        <Menu.Item as={Link} to="/dashboard">
            Dashboard
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item as={Link} to="/"> Homepage </Menu.Item>
            <Menu.Item as={Link} to="/login"> Login </Menu.Item>
            <Menu.Item as={Link} to="/signup"> Sign Up </Menu.Item>
            <Menu.Item onClick={() => logout()}>Logout</Menu.Item>

        </Menu.Menu>
    </Menu>
);
Navbar.propTypes = {
    logout: PropTypes.func.isRequired
}

Navbar.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        //isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps, {logout: actions.logout})(Navbar);
