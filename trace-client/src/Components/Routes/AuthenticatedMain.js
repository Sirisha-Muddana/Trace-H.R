import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Users from '../Management/Users';
import UserAccess from '../Consultants/UserAccess';
import Dashboard from '../Management/DashboardPage';
import UserInfo from '../Management/UserInfo';
import EditUser from '../Management/EditUser';
import UserRoute from './UserRoute';

const AuthenticatedMain = () => (
    <main>
        <Switch>
            <UserRoute exact path="/userAccess" component={UserAccess}/>
            <UserRoute exact path="/dashboard" component={Dashboard}/>
            <UserRoute exact path="/users" component={Users}/>
            <UserRoute exact path="/users/:_id" component={UserInfo}/>
            <UserRoute exact path="/users/edit/:id" component={EditUser}/>
        </Switch>
    </main>

);

export default AuthenticatedMain
