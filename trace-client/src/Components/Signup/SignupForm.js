import React, {Component} from "react";
import PropTypes from 'prop-types';
import Validator from 'validator';
import classnames from 'classnames';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },

            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    validate = data => {
        const errors = {};
        if (!data.firstName) errors.firstname = "Please enter your First name";
        if (!data.lastName) errors.lastname = "Please enter your Last Name";
        if (!Validator.isEmail(data.email)) errors.email = "Please enter a valid email";
        if (!data.password) errors.password = "Please enter a password";
        return errors;
    }

    handleSubmit(e) {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.props.userSignupRequest(this.state.data).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Signed up successfully. Please log in!'
                    })
                    this.context.router.history.push('/login');
                }
            )
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
                <h3 id="heading">Sign Up</h3>
                <div className={classnames("form-group", {'has-danger': errors.email})}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        value={data.firstName}
                        type="text"
                        name="firstName"
                        className="form-control"
                        onChange={this.onChange}
                    />
                    {errors.firstname && <span className="help-block">{errors.firstname}</span>}
                </div>
                <div className={classnames("form-group", {'has-danger': errors.email})}>
                <label htmlFor="lastName">Last Name</label>
                    <input
                        value={data.lastName}
                        type="text"
                        name="lastName"
                        className="form-control"
                        onChange={this.onChange}
                    />
                    {errors.lastname && <span className="help-block">{errors.lastname}</span>}
                </div>
                <div className={classnames("form-group", {'has-danger': errors.email})}>
                <label htmlFor="email">Email Address</label>
                    <input
                        value={data.email}
                        type="text"
                        name="email"
                        className="form-control"
                        onChange={this.onChange}
                    />
                    {errors.email && <span className="help-block">{errors.email}</span>}
                </div>
                <div className={classnames("form-group", {'has-danger': errors.email})}>
                <label htmlFor="password">Password</label>
                    <input
                        value={data.password}
                        type="password"
                        name="password"
                        className="form-control"
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

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SignupForm;
