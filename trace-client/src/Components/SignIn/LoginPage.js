import React, {Component} from 'react';
import LoginForm from "./LoginForm";

class LoginPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div id="section" className="col-md-6">
                        <LoginForm />
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;