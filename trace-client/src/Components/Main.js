import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Users from './Users';
import Login from './Login';
import Success from './Success';
import Register from './Register';
import UserInfo from './UserInfo';
import EditUser from './EditUser';

const Main = () => (
  <main>
  <Switch>
    <Route exact path = '/' component={Users} />
    <Route exact path = '/users/login' component={Login} />
    <Route exact path = '/users/success' component={Success} />
    <Route exact path = '/users/register' component={Register} />
    <Route exact path = '/users/:_id' component={UserInfo} />
    <Route exact path = '/users/edit/:id' component={EditUser} />
  </Switch>
  </main>
)

export default Main;
