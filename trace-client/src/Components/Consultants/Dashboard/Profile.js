import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/userActions";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import { withRouter } from "react-router-dom";
import { Loader } from "semantic-ui-react";

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.users;
    let profileContent;

    if (loading) {
      profileContent = <Loader active inline="centered" />;
    } else {
      if (Object.keys(profile).length > 1) {
        profileContent = (
          <div>
            <p className="lead text-muted">
              Welcome {user.firstName} {user.lastName}
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
          </div>
        );
      } else {
        // User is logged in but has no profile
        profileContent = (
          <div>
            <p className="lead text-muted">
              Welcome {user.firstName} {user.lastName}
            </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/createProfile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard" style={{ backgroundColor: "white" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

export default withRouter(
  connect(mapStateToProps, { getCurrentProfile })(Profile)
);
