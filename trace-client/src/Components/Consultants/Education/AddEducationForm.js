import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";

class AddEducationForm extends Component {
  state = {
    data: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: ""
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

    if (!data.school)
      errors.school = "Please enter your School/University name";
    if (!data.degree) errors.degree = "Please enter your graduate degree";
    if (!data.fieldOfStudy)
      errors.fieldOfStudy = "Please enter your field of study";
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
          name="school"
          value={data.school}
          label="School/University Name"
          onChange={this.onChange}
          error={errors.school}
        />
        <TextFieldGroup
          type="text"
          name="degree"
          value={data.degree}
          label="Degree"
          onChange={this.onChange}
          error={errors.degree}
        />
        <TextFieldGroup
          type="text"
          name="fieldOfStudy"
          value={data.fieldOfStudy}
          label="Field of Study"
          onChange={this.onChange}
          error={errors.fieldOfStudy}
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

AddEducationForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default AddEducationForm;
