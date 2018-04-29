import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LoginPage from '../SignIn/LoginPage';
import ForgotPasswordPage from '../SignIn/ForgotPasswordPage';
import ResetPasswordPage from '../SignIn/ResetPasswordPage';
import SignupPage from '../Signup/SignupPage';
import ConfirmationPage from '../SignIn/ConfirmationPage';
import GuestRoute from './GuestRoute';
import Users from '../Management/Users';
import UserAccess from '../Consultants/UserAccess';
import Dashboard from '../Management/DashboardPage';
import UserInfo from '../Management/UserInfo';
import EditUser from '../Management/EditUser';
import UserRoute from './UserRoute';


const Main = () => (
    <main>
        <Switch>
            <GuestRoute exact path="/signup" component={SignupPage}/>
            <GuestRoute exact path="/login" component={LoginPage}/>
            <GuestRoute exact path="/forgot_password" component={ForgotPasswordPage}/>
            <GuestRoute exact path="/reset_password/:token" component={ResetPasswordPage}/>
            <Route exact path='/confirmation/:token' component={ConfirmationPage}/>

            <UserRoute exact path="/userAccess" component={UserAccess}/>
            <UserRoute exact path="/dashboard" component={Dashboard}/>
            <UserRoute exact path="/users" component={Users}/>
            <UserRoute exact path="/users/:_id" component={UserInfo}/>
            <UserRoute exact path="/users/edit/:id" component={EditUser}/>
        </Switch>
    </main>
);


export default Main
