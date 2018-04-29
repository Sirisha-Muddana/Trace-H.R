import React, {Component} from "react";
import PropTypes from 'prop-types';
import Validator from 'validator';
import {Form, Button} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class SignupForm extends Component {
    state = {
        data: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },

        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
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
                    this.setState({errors: err.response.data.errors, loading: false})
                );
        }
    };
    validate = data => {
        const errors = {};

        if (!data.firstName) errors.firstName = "Please enter your First name";
        if (!data.lastName) errors.lastName = "Please enter your Last Name";
        if (!Validator.isEmail(data.email)) errors.email = "Please enter a valid email";
        if (!data.password) errors.password = "Please enter a password";

        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <h3 id="heading">Sign up </h3>
                <Form.Field required error={!!errors.firstName}>
                    <label htmlFor="firstName">First name</label>
                    <Form.Input
                        type="text"
                        name="firstName"
                        value={data.firstName}
                        onChange={this.onChange}
                        width={10}
                    />
                    {errors.firstName && <InlineError text={errors.firstName}/>}
                </Form.Field>
                <Form.Field required error={!!errors.lastName}>
                    <label htmlFor="lastName">Last Name</label>
                    <Form.Input
                        type="text"
                        name="lastName"
                        value={data.lastName}
                        onChange={this.onChange}
                        width={10}
                    />
                    {errors.lastName && <InlineError text={errors.lastName}/>}
                </Form.Field>
                <Form.Field required error={!!errors.email}>
                    <label htmlFor="email">Email Address</label>
                    <Form.Input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={this.onChange}
                        width={10}
                    />
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field>
                <Form.Field required error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <Form.Input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={this.onChange}
                        width={10}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>
                <Button primary>Sign up</Button>
            </Form>
        );
    }
}
SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default SignupForm;
