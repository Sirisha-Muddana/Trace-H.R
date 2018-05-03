import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import LoginPage from '../SignIn/LoginPage';
import ForgotPasswordPage from '../SignIn/ForgotPasswordPage';
import ResetPasswordPage from '../SignIn/ResetPasswordPage';
import SignupPage from '../Signup/SignupPage';
import ConfirmationPage from '../SignIn/ConfirmationPage';
import GuestRoute from './GuestRoute';
import Users from '../Sales/Users';
import UserAccess from '../Consultants/UserAccess';
import Dashboard from '../DashboardPage';
import MarkettingSales from '../Sales/MarkettingSales';
import PostSalesPage from '../Sales/PostSalesPage';
import UserInfo from '../Sales/UserInfo';
import EditUser from '../Sales/EditUser';
import UserRoute from './UserRoute';
import RecruiterRoute from './RecruiterRoute';

const Main = ({isAuthenticated}) => (
    <div>
        <Switch>
            <GuestRoute exact path="/signup" component={SignupPage}/>
            <GuestRoute exact path="/login" component={LoginPage}/>
            <GuestRoute exact path="/forgot_password" component={ForgotPasswordPage}/>
            <GuestRoute exact path="/reset_password/:token" component={ResetPasswordPage}/>
            <Route exact path='/confirmation/:token' component={ConfirmationPage}/>

            <UserRoute exact path="/userAccess" component={UserAccess}/>
            {isAuthenticated ? <Route exact path="/dashboard" component={Dashboard}/>: <Redirect to ="/login" /> }
            {isAuthenticated ? <RecruiterRoute exact path="/markettingSales" component={MarkettingSales}/>: <Redirect to ="/login" />}
            {isAuthenticated ? <RecruiterRoute exact path="/newSales" component={PostSalesPage}/>: <Redirect to ="/login" />}
            {isAuthenticated ? <RecruiterRoute exact path="/users" component={Users}/>: <Redirect to ="/login" />}
            {isAuthenticated ? <RecruiterRoute exact path="/users/:_id" component={UserInfo}/>: <Redirect to ="/login" />}
            {isAuthenticated ? <RecruiterRoute exact path="/users/edit/:id" component={EditUser}/>: <Redirect to ="/login" />}
        </Switch>
    </div>
);

Main.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Main));

