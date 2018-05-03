import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import {Form, Message} from 'semantic-ui-react';
import TextFieldGroup from '../common/TextFieldGroup';

class ForgotPasswordForm extends Component {
    state = {
        data: {
            email: ''
        },

        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = () => {
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
        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;
        return (
            <div className="container h-100">
                <div className="row justify-content-md-center h-100">
                    <div className="col-md-6">
                        <h4 className="text-center">Please enter your email address to recover your password</h4>
                        <Form onSubmit={this.onSubmit} loading={loading}>
                            {!!errors.global && <Message negative>{errors.global}</Message>}
                            <TextFieldGroup
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={this.onChange}
                                label={"Email Address"}
                                error={errors.email}
                            />
                            <div className="text-center">
                                <button className="btn btn-secondary">Forgot Password</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm
