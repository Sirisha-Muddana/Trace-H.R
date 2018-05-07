import React, { Component } from "react";
import EditSubmissionForm from "./EditSubmissionForm";
import { connect } from "react-redux";
import {
  submissionForm,
  fetchSubmission
} from "../../../actions/submissionListActions";
import PropTypes from "prop-types";
import { Header, Divider } from "semantic-ui-react";

class EditSubmissionPage extends Component {
  submit = data =>
    this.props
      .submissionForm(data)
      .then(() => this.props.history.push("/dashboard"));

  componentDidMount() {
    this.props.fetchSubmission(this.props.match.params.id);
  }

  render() {
    const { submission } = this.props.submission;
    let submissionItem;

    if (submission !== null || Object.keys(submission).length !== 0) {
      submissionItem = (
        <EditSubmissionForm submit={this.submit} submission={submission} />
      );
    }
    return (
      <div className="container h-100">
        <Divider hidden />
        <Header className="border-bottom pb-2 mb-3" textAlign="center" as="h2">
          Edit submission
        </Header>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <div className="card">
              {submissionItem}
              <div className="card-body" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditSubmissionPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  submissionForm: PropTypes.func.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  submission: state.submission
});

export default connect(mapStateToProps, { submissionForm, fetchSubmission })(
  EditSubmissionPage
);
