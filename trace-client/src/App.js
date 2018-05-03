import React from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import Main from './Components/Routes/Main';
import Navbar from './Components/Navigation/Navbar';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Sidebar from './Components/Navigation/Sidebar';

const App = ({isAuthenticated}) => (
    <div className="App">
        {!isAuthenticated ? (
            <div>
                <Navbar/>
                <Main/>
            </div>
        ) : (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-md-10">
                        <div className="container-fluid">
                            <Main/>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
)

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.isAuthenticated
    };
}

export default withRouter(connect(mapStateToProps)(App));
