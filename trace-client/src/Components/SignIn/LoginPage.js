import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/authActions';
import { Divider } from 'semantic-ui-react';

class LoginPage extends Component {

    submit = data =>
        this.props.login(data).then(() => this.props.history.push('/dashboard'));

    render() {
        return (
            <div>
                <LoginForm submit={this.submit}/>
                <Divider hidden></Divider>
                <Link to="/forgot_password">Forgot Password </Link>
            </div>
        )
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage)