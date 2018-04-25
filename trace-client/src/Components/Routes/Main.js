import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Users from '../Management/Users';
import LoginPage from '../SignIn/LoginPage';
import UserAccess from '../Consultants/UserAccess';
import HrDashboard from '../Management/HrDashboard';
import SignupPage from '../Signup/SignupPage';
import UserInfo from '../Management/UserInfo';
import EditUser from '../Management/EditUser';
import requireAuth from '../../utils/requireAuth'

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/userAccess" component={UserAccess} />
      <Route exact path="/dashboard" component={requireAuth(HrDashboard)} />
      <Route exact path="/users" component={requireAuth(Users)} />
      <Route exact path="/users/:_id" component={requireAuth(UserInfo)} />
      <Route exact path="/users/edit/:id" component={requireAuth(EditUser)} />
    </Switch>
  </main>
);

export default Main;
