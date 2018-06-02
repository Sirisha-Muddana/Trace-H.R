import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";

class ProfileHeader extends Component {
  render() {
    const { displayProfile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="text-center">
              <h1 className="display-4 text-center">
                {displayProfile.user.firstName}
                {displayProfile.user.lastName}
              </h1>
              <p>
                {displayProfile.address.street},{" "}
                {displayProfile.address.apartment}
              </p>
              {isEmpty(displayProfile.address) ? null : (
                <p>
                  {displayProfile.address.city}, {displayProfile.address.state}
                  {"-"}
                  {displayProfile.address.zip}
                </p>
              )}
              <p>
                <strong>Cell: </strong>
                {displayProfile.cellphone}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
