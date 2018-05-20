import React, { Component } from "react";
import AddImmigrationInfoForm from "./AddImmigrationInfoForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addImmigrationInfo } from "../../../actions/userActions";
import PropTypes from "prop-types";

class AddImmigrationInfoPage extends Component {
  submit = data =>
    this.props
      .addImmigrationInfo(data)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div className="container h-100">
        <h1 className="display-4 text-center">Add Education</h1>
        <p className="lead text-center">
          Please fill out the education details below
        </p>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <div className="card">
              <div className="card-body">
                <AddImmigrationInfoForm submit={this.submit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddImmigrationInfoPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  addImmigrationInfo: PropTypes.func.isRequired
};

export default withRouter(
  connect(null, { addImmigrationInfo })(AddImmigrationInfoPage)
);
