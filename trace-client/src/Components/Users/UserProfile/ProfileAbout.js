import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileAbout extends Component {
  render() {
    const { displayProfile } = this.props;

    // Get first name
    const firstName = displayProfile.user.firstName;

    // Skill List
    const skills = displayProfile.skillset.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <hr />
            <h2 className="text-left text-info">{firstName}'s Skill Set</h2>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  displayProfile: PropTypes.object.isRequired
};

export default ProfileAbout;
