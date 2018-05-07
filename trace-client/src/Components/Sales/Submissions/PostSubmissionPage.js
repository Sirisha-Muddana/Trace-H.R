import React, { Component } from "react";
import PostSubmissionForm from "./PostSubmissionForm";
import { connect } from "react-redux";
import { submissionForm } from "../../../actions/submissionListActions";
import PropTypes from "prop-types";
import { Header, Divider } from "semantic-ui-react";

class PostSubmissionPage extends Component {
  submit = data =>
    this.props
      .submissionForm(data)
      .then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div className="container h-100">
        <Divider hidden />
        <Header className="border-bottom pb-2 mb-3" textAlign="center" as="h2">
          Add submission
        </Header>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <div className="card">
              <div className="card-body">
                <PostSubmissionForm submit={this.submit} />
              </div>
            </div>
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
