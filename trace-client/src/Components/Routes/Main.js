import React from "react";
import { Switch, Route } from "react-router-dom";
import Users from "../Management/Users";
import LoginPage from "../SignIn/LoginPage";
import UserAccess from "../Consultants/UserAccess";
import AdminAccess from "../Management/AdminAccess";
import SignupPage from "../Signup/SignupPage";
import UserInfo from "../Management/UserInfo";
import EditUser from "../Management/EditUser";

const Main = () => (
  <main>
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/userAccess" component={UserAccess} />
      <Route path="/adminAccess" component={AdminAccess} />
      <Route path="/users" component={Users} />
      <Route path="/:_id" component={UserInfo} />
      <Route path="/edit/:id" component={EditUser} />
    </Switch>
  </main>
);

export default Main;
