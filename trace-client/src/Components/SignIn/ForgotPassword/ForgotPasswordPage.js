import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Navbar from "../../Navigation/Navbar";
import { resetPasswordRequest } from "../../../actions/authActions";

class ForgotPasswordPage extends Component {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <div>
        <Navbar />
        {this.state.success ? (
          <div className="container h-100">
            <div className="row justify-content-md-center h-100">
              <div className="col-md-6">
                <div className="text-center">
                  <Link to="/login" className="btn btn-light mb-3 float-left">
                    Back To Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center h-100">
              <div className="col-md-6">
                <Message className="text-left">
                  Email has been sent. Please follow the link in your email to
                  reset your password.
                </Message>
              </div>
            </div>
          </div>
        ) : (
          <ForgotPasswordForm submit={this.submit} />
        )}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
