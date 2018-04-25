import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
import Validator from 'validator';
import classnames from 'classnames';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',
                password: ''
            },

            isLoading: false,
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Please enter a valid email";
        if (!data.password) errors.password = "Please enter a password";
        return errors;
    }

    handleSubmit(e) {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0) {
            this.props.login(this.state.data).then(
            (res) => this.context.router.history.push('/dashboard'),
            );
        }
        e.preventDefault();
    }

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    render() {
        const {data, errors} = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <h3 id="heading">Sign in </h3>

                <div className={classnames("form-group", {'has-danger': errors.email})}>
                    <label className="control-label" htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <span className="help-block">{errors.email}</span>}
                </div>
                <div className={classnames("form-group", {'has-danger': errors.password})}>
                    <label className="control-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <span className="help-block">{errors.password}</span>}
                </div>
                <div className="wrapper">
                    <input type="submit" value="Submit" className="btn"/>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(
    null
    , {
        login
    }
)
(LoginForm)
