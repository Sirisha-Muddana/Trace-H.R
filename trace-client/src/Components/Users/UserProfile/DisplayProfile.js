import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileById } from "../../../actions/userActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import { Loader } from "semantic-ui-react";

class DisplayProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.displayProfile === null && this.props.users.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { displayProfile, loading } = this.props.users;
    let profileContent;

    if (loading) {
      profileContent = <Loader active inline="centered" />;
    } else {
      if (Object.keys(displayProfile).length > 0) {
        profileContent = (
          <div className="mb-3">
            <div className="row mt-3">
              <div className="col-md-6">
                <Link to="/users" className="btn btn-light mb-3 float-left">
                  Back To Profiles
                </Link>
              </div>
              <div className="col-md-6" />
            </div>
            <ProfileHeader displayProfile={displayProfile} />
            <ProfileAbout displayProfile={displayProfile} />
            <ProfileCreds
              immigrationInfo={displayProfile.immigrationInfo}
              education={displayProfile.education}
              experience={displayProfile.experience}
            />
          </div>
        );
      }
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { getProfileById })(DisplayProfile);
