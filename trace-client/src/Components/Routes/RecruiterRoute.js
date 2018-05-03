import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RecruiterRoute = ({ isAuthenticated, userAccessRole, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            userAccessRole === "ACCESS LEVEL 2" ? (<Component {...props} />) : (<Redirect to ="/login" />)}
    />
);

RecruiterRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userAccessRole: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.isAuthenticated,
    userAccessRole: state.auth.user.userAccessRole
});

export default connect(mapStateToProps)(RecruiterRoute);
