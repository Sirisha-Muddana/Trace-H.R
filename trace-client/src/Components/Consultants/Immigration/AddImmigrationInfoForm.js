import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";

class AddImmigrationInfoForm extends Component {
  state = {
    data: {
      visaStatus: "",
      dateOfHire: "",
      visaExp: "",
      i94Exp: "",
      OrganizationTitle: "",
      jobTitle: "",
      lcaSalary: ""
    },

    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
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

    if (!data.title) errors.title = "Please enter your Job title";
    if (!data.company) errors.company = "Please enter your Client name";
    if (!data.from) errors.from = "Please enter the from date";
    if (!data.to) errors.to = "Please enter your to date";

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <TextFieldGroup
          type="text"
          name="title"
          value={data.title}
          label="Job Title"
          onChange={this.onChange}
          error={errors.title}
        />
        <TextFieldGroup
          type="text"
          name="company"
          value={data.company}
          label="Client name"
          onChange={this.onChange}
          error={errors.company}
        />
        <TextFieldGroup
          type="text"
          name="location"
          value={data.location}
          label="Job Location"
          onChange={this.onChange}
        />
        <TextFieldGroup
          type="date"
          name="from"
          value={data.from}
          label="From date"
          onChange={this.onChange}
          error={errors.from}
        />
        <TextFieldGroup
          type="date"
          name="to"
          value={data.to}
          label="To date"
          onChange={this.onChange}
          error={errors.to}
        />

        <button className="btn btn-secondary btn-lg btn-block">Submit</button>
      </Form>
    );
  }
}

AddImmigrationInfoForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default AddImmigrationInfoForm;
