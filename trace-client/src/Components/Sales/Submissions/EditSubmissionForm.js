import React, { Component } from "react";
import PropTypes from "prop-types";
import InlineError from "../../messages/InlineError";
import { Form, Message, Label, Input } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";
import {
  submissionForm,
  fetchSubmission
} from "../../../actions/submissionListActions";
import { connect } from "react-redux";

class EditSubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      consultantName: "",
      skillset: "",
      location: "",
      billingRate: "",
      vendor: "",
      client: "",
      interviewDate: "",
      interviewType: "",
      loading: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSubmission(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submission.submission) {
      const submission = nextProps.submission.submission;

      this.setState({
        id: submission._id,
        consultantName: submission.consultantName,
        skillset: submission.skillset,
        location: submission.location,
        billingRate: submission.billingRate,
        vendor: submission.vendor,
        client: submission.client,
        interviewDate: submission.interviewDate,
        interviewType: submission.interviewType
      });
    }
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = () => {
    const data = {
      id: this.state.id,
      consultantName: this.state.consultantName,
      skillset: this.state.skillset,
      location: this.state.location,
      billingRate: this.state.billingRate,
      vendor: this.state.vendor,
      client: this.state.client,
      interviewDate: this.state.interviewDate,
      interviewType: this.state.interviewType
    };

    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submissionForm(data)
        .then(() => this.props.history.push("/dashboard"))
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.consultantName)
      errors.consultantName = "Please enter a consultant name";
    if (!data.skillset) errors.skillset = "Please enter a skillset";
    if (!data.location) errors.location = "Please enter a location";
    if (!data.billingRate) errors.billingRate = "Please enter a billing rate";
    if (!data.vendor) errors.vendor = "Please enter a vendor name";
    if (!data.client) errors.client = "Please enter a client name";
    if (!data.interviewDate)
      errors.interviewDate = "Please enter an interview date";
    if (!data.interviewType)
      errors.interviewType = "Please enter mode of interview";
    return errors;
  };

  render() {
    const { errors, loading } = this.state;
    return (
      <div className="container h-100">
        <h1 className="display-4 text-center">Edit Submission</h1>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <Form onSubmit={this.onSubmit} loading={loading}>
              {errors.global && (
                <Message negative>
                  <Message.Header>Something went wrong</Message.Header>
                  <p>{errors.global}</p>
                </Message>
              )}

              <div className="row">
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="consultantName"
                    value={this.state.consultantName}
                    label="Consultant name"
                    onChange={this.onChange}
                    error={errors.consultantName}
                  />
                </div>
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="skillset"
                    value={this.state.skillset}
                    label="Skillet"
                    onChange={this.onChange}
                    error={errors.skillset}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="location"
                    value={this.state.location}
                    label="Location"
                    onChange={this.onChange}
                    error={errors.location}
                  />
                </div>
                <div className="col-md-6 form">
                  <Form.Field required error={!!errors.billingRate}>
                    <label htmlFor="billingRate">Billing Rate</label>
                    <Input labelPosition="right" type="text">
                      <Label basic>$</Label>
                      <input
                        type="number"
                        name="billingRate"
                        value={this.state.billingRate}
                        onChange={this.onChange}
                      />
                      <Label>/hr</Label>
                    </Input>
                    {errors.billingRate && (
                      <InlineError text={errors.billingRate} />
                    )}
                  </Form.Field>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="vendor"
                    value={this.state.vendor}
                    label="Vendor name"
                    onChange={this.onChange}
                    error={errors.vendor}
                  />
                </div>
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="client"
                    value={this.state.client}
                    label="Client name"
                    onChange={this.onChange}
                    error={errors.client}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="date"
                    name="interviewDate"
                    value={this.state.interviewDate}
                    label="Interview date"
                    onChange={this.onChange}
                    error={errors.interviewDate}
                  />
                </div>
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="interviewType"
                    value={this.state.interviewType}
                    label="Interview type"
                    onChange={this.onChange}
                    error={errors.interviewType}
                  />
                </div>
              </div>

              <br />
              <button className="btn btn-lg btn-secondary btn-block">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

EditSubmissionForm.propTypes = {
  submissionForm: PropTypes.func.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  submission: state.submission
});

export default connect(mapStateToProps, { submissionForm, fetchSubmission })(
  EditSubmissionForm
);
