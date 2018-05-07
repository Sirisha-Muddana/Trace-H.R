import React, { Component } from "react";
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/authActions";

class LoginPage extends Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div className="container h-100">
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper">
            <div className="card">
              <div className="card-body">
                <LoginForm submit={this.submit} />
                <Link className="float-right" to="/forgot_password">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(LoginPage);
