import React, { Component } from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import { Form } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectListGroup from "../../common/SelectListGroup";

class CreateUserForm extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userAccessRole: ""
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

    if (!data.firstName) errors.firstName = "Please enter your First name";
    if (!data.lastName) errors.lastName = "Please enter your Last name";
    if (!Validator.isEmail(data.email))
      errors.email = "Please enter a valid email";
    if (!data.password) errors.password = "Please enter a password";
    if (!data.userAccessRole) errors.userAccessRole = "Please select a role";

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    const accessOptions = [
      {
        key: "ACCESS LEVEL 1",
        text: "ACCESS LEVEL 1 - Candidate",
        value: "ACCESS LEVEL 1"
      },
      {
        key: "ACCESS LEVEL 2",
        text: "ACCESS LEVEL 2 - Recruiter",
        value: "ACCESS LEVEL 2"
      },
      {
        key: "ACCESS LEVEL 3",
        text: "ACCESS LEVEL 3 - H.R",
        value: "ACCESS LEVEL 3"
      },
      {
        key: "ACCESS LEVEL 4",
        text: "ACCESS LEVEL 4 - Management",
        value: "ACCESS LEVEL 4"
      }
    ];

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <h1 id="heading" className="text-center">
          Create User{" "}
        </h1>
        <h4 className="text-center">Create a new Trace account</h4>
        <TextFieldGroup
          type="text"
          name="firstName"
          value={data.firstName}
          label="First Name"
          onChange={this.onChange}
          error={errors.firstName}
        />
        <TextFieldGroup
          type="text"
          name="lastName"
          value={data.lastName}
          label="Last Name"
          onChange={this.onChange}
          error={errors.lastName}
        />
        <TextFieldGroup
          type="email"
          name="email"
          value={data.email}
          label="Email Address"
          onChange={this.onChange}
          error={errors.email}
        />
        <TextFieldGroup
          type="password"
          name="password"
          value={data.password}
          label="Password"
          onChange={this.onChange}
          error={errors.password}
        />
        <SelectListGroup
          placeholder="Select Access Role"
          name="userAccessRole"
          value={data.userAccessRole}
          onChange={this.onChange}
          options={accessOptions}
          error={errors.userAccessRole}
        />
        <br />
        <button className="btn btn-secondary btn-lg btn-block">Submit</button>
      </Form>
    );
  }
}

CreateUserForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default CreateUserForm;
