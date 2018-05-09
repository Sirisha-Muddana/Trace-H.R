import React, { Component } from "react";
import CreateProfileForm from "./CreateProfileForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../../actions/userActions";
import PropTypes from "prop-types";
import { Divider } from "semantic-ui-react";

class CreateProfilePage extends Component {
  submit = data =>
    this.props
      .createProfile(data)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div className="container h-100">
        <Divider hidden />
        <h1 className="display-4 text-center">Create Profile</h1>
        <p className="lead text-center">
          Please fill out the information below
        </p>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <div className="card">
              <div className="card-body">
                <CreateProfileForm submit={this.submit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfilePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  createProfile: PropTypes.func.isRequired
};

export default withRouter(connect(null, { createProfile })(CreateProfilePage));
