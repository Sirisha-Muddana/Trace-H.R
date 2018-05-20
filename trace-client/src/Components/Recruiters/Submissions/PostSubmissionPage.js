import React, { Component } from "react";
import PostSubmissionForm from "./PostSubmissionForm";
import { connect } from "react-redux";
import { submissionForm } from "../../../actions/submissionListActions";
import PropTypes from "prop-types";

class PostSubmissionPage extends Component {
  submit = data =>
    this.props
      .submissionForm(data)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div className="container h-100">
        <h3 className="display-4 text-center">Add submission</h3>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <PostSubmissionForm submit={this.submit} />
          </div>
        </div>
      </div>
    );
  }
}

PostSubmissionPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  submissionForm: PropTypes.func.isRequired
};

export default connect(null, { submissionForm })(PostSubmissionPage);
