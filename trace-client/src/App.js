import React from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import Main from "./Components/Routes/Main";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidebar from "./Components/Navigation/Sidebar";
import AuthNav from "./Components/Navigation/AuthNav";

const App = ({ isAuthenticated }) => (
  <div className="App">
    {!isAuthenticated ? (
      <div>
        <Main />
      </div>
    ) : (
      <div>
        <div className="wrapper">
          <Sidebar />
          <div id="main-panel" className="main-panel">
            <AuthNav />
            <Main />
          </div>
        </div>
      </div>
    )}
  </div>
);

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.isAuthenticated
  };
}

export default withRouter(connect(mapStateToProps)(App));
