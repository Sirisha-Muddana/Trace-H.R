import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LoginPage from '../SignIn/LoginPage';
import ForgotPasswordPage from '../SignIn/ForgotPasswordPage';
import ResetPasswordPage from '../SignIn/ResetPasswordPage';
import SignupPage from '../Signup/SignupPage';
import ConfirmationPage from '../SignIn/ConfirmationPage';
import GuestRoute from './GuestRoute';

const Main = () => (
  <main>
    <Switch>
      <GuestRoute exact path="/signup" component={SignupPage} />
      <GuestRoute exact path="/login" component={LoginPage} />
      <GuestRoute exact path="/forgot_password" component={ForgotPasswordPage} />
      <GuestRoute exact path="/reset_password/:token" component={ResetPasswordPage} />
      <Route exact path='/confirmation/:token' component={ConfirmationPage} />
    </Switch>
  </main>
);



export default Main
