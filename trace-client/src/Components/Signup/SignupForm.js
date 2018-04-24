import React, { Component } from "react";
import PropTypes from 'prop-types';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(e) {
        this.props.userSignupRequest(this.state).then(
            () => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Signed up successfully. Please log in!'
                })
                this.context.router.history.push('/login');
            }
        )
        e.preventDefault();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }
    render() {
        return (
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <h3 id="heading">Sign Up</h3>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    value={this.state.firstName}
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    onChange={this.onChange}
                                />
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    value={this.state.lastName}
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    onChange={this.onChange}
                                />
                                <label htmlFor="email">Email Address</label>
                                <input
                                    value={this.state.email}
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    onChange={this.onChange}
                                />
                                <label htmlFor="password">Password</label>
                                <input
                                    value={this.state.password}
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="wrapper">
                                <input type="submit" value="Submit" className="btn" />
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
