import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import {Form, Message} from 'semantic-ui-react';
import TextFieldGroup from '../common/TextFieldGroup';

class LoginForm extends Component {
    state = {
        data: {
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

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props.submit(this.state.data)
                .catch(err => this.setState({errors: err.response.data.errors, loading: false})
                );
        }
    };

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Please enter a valid email";
        if (!data.password) errors.password = "Please enter a password";
        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;
        return (
            <Form className="form-signin" onSubmit={this.onSubmit} loading={loading}>
                                    {errors.global && (
                                        <Message negative>
                                            <Message.Header>Something went wrong</Message.Header>
                                            <p>{errors.global}</p>
                                        </Message>
                                    )}
                                    <h1 id="heading" className="text-center">Sign In </h1>
                                    <h4 className="text-center">Please sign into your Trace account</h4>
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
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" value="remember-me"/> Remember me
                                        </label>
                                    </div>
                                    <button className="btn btn-secondary btn-lg btn-block">Login</button>
                                </Form>

        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};


export default LoginForm;