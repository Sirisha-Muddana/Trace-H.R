import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      passwordConfirmation: ""
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
    if (!data.password) errors.password = "Please enter a password";
    if (data.password !== data.passwordConfirmation)
      errors.password = "Passwords must match";

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
        <h3 id="heading">Reset Password</h3>

        <Form.Field required error={!!errors.password}>
          <label htmlFor="password">New Password</label>
          <Form.Input
            type="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
            width={10}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field required error={!!errors.passwordConfirmation}>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <Form.Input
            type="password"
            name="passwordConfirmation"
            value={data.passwordConfirmation}
            onChange={this.onChange}
            width={10}
          />
          {errors.passwordConfirmation && (
            <InlineError text={errors.passwordConfirmation} />
          )}
        </Form.Field>
        <Button primary>Reset password</Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
