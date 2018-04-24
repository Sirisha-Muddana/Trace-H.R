import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state).then(
            (res) => this.context.router.history.push('/adminAccess'),
        );
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { email, password } = this.state;
        return (
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <h3 id="heading">Sign in {this.state.status}</h3>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={this.onChange}
                                />
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={password}
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

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(null, { login })(LoginForm)
