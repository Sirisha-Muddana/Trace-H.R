import React, { Component } from "react";
import SignupForm from "./SignupForm";
import { connect } from "react-redux";
import Navbar from "../Navigation/Navbar";
import { signup } from "../../actions/signupActions";
import PropTypes from "prop-types";

class SignupPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/login"));

  render() {
    return (
      <div>
        <Navbar />
        <div className="container h-100">
          <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
              <div className="card">
                <div className="card-body">
                  <SignupForm submit={this.submit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
