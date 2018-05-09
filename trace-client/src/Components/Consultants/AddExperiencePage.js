import React, { Component } from "react";
import AddExperienceForm from "./AddExperienceForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../../actions/userActions";
import PropTypes from "prop-types";

class AddExperiencePage extends Component {
  submit = data =>
    this.props
      .addExperience(data)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div className="container h-100">
        <h1 className="display-4 text-center">Add Experience</h1>
        <p className="lead text-center">
          Please fill out any position you have held in the present or past
        </p>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <div className="card">
              <div className="card-body">
                <AddExperienceForm submit={this.submit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperiencePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  addExperience: PropTypes.func.isRequired
};

export default withRouter(connect(null, { addExperience })(AddExperiencePage));
