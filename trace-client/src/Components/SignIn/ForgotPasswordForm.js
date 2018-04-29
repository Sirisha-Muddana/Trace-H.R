import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

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
            <Form onSubmit={this.onSubmit} loading={loading}>
                {!!errors.global && <Message negative>{errors.global}</Message>}
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
                <Button primary>Forgot Password</Button>
            </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm