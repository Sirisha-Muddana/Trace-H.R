import React, { Component } from "react";
import CreateUserForm from "./CreateUserForm";
import { connect } from "react-redux";
import { signup } from "../../../actions/signupActions";
import PropTypes from "prop-types";

class CreateUserPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/login"));

  render() {
    return (
      <div className="container h-100">
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper">
            <div className="card">
              <div className="card-body">
                <CreateUserForm submit={this.submit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateUserPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(CreateUserPage);
