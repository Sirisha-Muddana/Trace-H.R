import React, {Component} from 'react';
import SignupForm from './SignupForm';
import {connect} from 'react-redux';
import {userSignupRequest} from '../ReduxActions/userSignupRequest'
import PropTypes from 'prop-types';
import { addFlashMessage } from '../../actions/flashMessages'

class SignupPage extends Component {
    render() {
        const {userSignupRequest, addFlashMessage} = this.props;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div id="section" className="col-md-6">
                        <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest, addFlashMessage})(SignupPage);
