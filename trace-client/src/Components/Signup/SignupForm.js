import React, {Component} from "react";
import PropTypes from 'prop-types';
import Validator from 'validator';
import {Form} from 'semantic-ui-react';
import {signup} from '../../actions/signupActions';
import TextFieldGroup from '../common/TextFieldGroup';

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
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
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
        if (!data.lastName) errors.lastName = "Please enter your Last name";
        if (!Validator.isEmail(data.email)) errors.email = "Please enter a valid email";
        if (!data.password) errors.password = "Please enter a password";

        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <h1 id="heading" className="text-center">Sign Up </h1>
                <h4 className="text-center">Please sign up for your Trace account</h4>
                <TextFieldGroup
                    type="firstName"
                    name="firstName"
                    value={data.firstName}
                    label="First Name"
                    onChange={this.onChange}
                    error={errors.firstName}
                />
                <TextFieldGroup
                    type="lastName"
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
                <button className="btn btn-secondary btn-lg btn-block">Sign up</button>
            </Form>

        );
    }
}

SignupForm.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    submit: PropTypes.func.isRequired
}

export default SignupForm
