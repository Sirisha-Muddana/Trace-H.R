import React, { Component } from "react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";
import { Form, Message, Label, Input } from "semantic-ui-react";
import TextFieldGroup from "../common/TextFieldGroup";

class PostSalesForm extends Component {
  state = {
    data: {
      consultantName: "",
      skillset: "",
      location: "",
      billingRate: "",
      vendor: "",
      client: "",
      interviewDate: "",
      interviewType: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.consultantName)
      errors.consultantName = "Please enter a consultantName";
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
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}

        <div className="row">
          <div className="col-md-6 submission-form">
            <TextFieldGroup
              type="consultantName"
              name="consultantName"
              value={data.consultantName}
              label="Consultant name"
              onChange={this.onChange}
              error={errors.consultantName}
            />
          </div>
          <div className="col-md-6 submission-form">
            <TextFieldGroup
              type="skillset"
              name="skillset"
              value={data.skillset}
              label="Skillet"
              onChange={this.onChange}
              error={errors.skillset}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 submission-form">
            <TextFieldGroup
              type="location"
              name="location"
              value={data.location}
              label="Location"
              onChange={this.onChange}
              error={errors.location}
            />
          </div>
          <div className="col-md-6 submission-form">
            <Form.Field required error={!!errors.billingRate}>
              <label htmlFor="billingRate">Billing Rate</label>
              <Input labelPosition="right" type="text">
                <Label basic>$</Label>
                <input
                  type="text"
                  name="billingRate"
                  value={data.billingRate}
                  onChange={this.onChange}
                />
                <Label>/hr</Label>
              </Input>
              {errors.billingRate && <InlineError text={errors.billingRate} />}
            </Form.Field>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 submission-form">
            <TextFieldGroup
              type="vendor"
              name="vendor"
              value={data.vendor}
              label="Vendor name"
              onChange={this.onChange}
              error={errors.vendor}
            />
          </div>
          <div className="col-md-6 submission-form">
            <TextFieldGroup
              type="client"
              name="client"
              value={data.client}
              label="Client name"
              onChange={this.onChange}
              error={errors.client}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 submission-form">
            <TextFieldGroup
              type="interviewDate"
              name="interviewDate"
              value={data.interviewDate}
              label="Interview date"
              onChange={this.onChange}
              error={errors.interviewDate}
            />
          </div>
          <div className="col-md-6 submission-form">
            <TextFieldGroup
              type="interviewType"
              name="interviewType"
              value={data.interviewType}
              label="Interview type"
              onChange={this.onChange}
              error={errors.interviewType}
            />
          </div>
        </div>

        <br />
        <button className="btn btn-lg btn-primary btn-block">Submit</button>
      </Form>
    );
  }
}

PostSalesForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default PostSalesForm;
