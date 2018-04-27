import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import Users from '../Management/Users';
import LoginPage from '../SignIn/LoginPage';
import UserAccess from '../Consultants/UserAccess';
import Dashboard from '../Management/DashboardPage';
import SignupPage from '../Signup/SignupPage';
import ConfirmationPage from '../SignIn/ConfirmationPage';
import UserInfo from '../Management/UserInfo';
import EditUser from '../Management/EditUser';
import GuestRoute from './GuestRoute';
import UserRoute from './UserRoute';
import requireAuth from '../../utils/requireAuth'

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path='/confirmation/:token' component={ConfirmationPage} />
      <GuestRoute exact path="/signup" component={SignupPage} />
      <GuestRoute exact path="/login" component={LoginPage} />
      <Route exact path="/userAccess" component={UserAccess} />
      <UserRoute exact path="/dashboard" component={Dashboard} />
      <Route exact path="/users" component={requireAuth(Users)} />
      <Route exact path="/users/:_id" component={requireAuth(UserInfo)} />
      <Route exact path="/users/edit/:id" component={requireAuth(EditUser)} />
    </Switch>
  </main>
);

export default Main;
