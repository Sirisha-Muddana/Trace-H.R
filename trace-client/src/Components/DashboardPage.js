import React from "react";
import {connect} from 'react-redux';
import ConfirmEmailMessage from './messages/ConfirmEmailMessage';
import PropTypes from 'prop-types';
import MarkettingSales from './Sales/MarkettingSales';
import UserAccess from './Consultants/UserAccess';

const DashboardPage = ({isConfirmed, userAccessRole}) => (

    <div>
        {!isConfirmed && <ConfirmEmailMessage/>}

        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                    <button className="btn btn-sm btn-outline-secondary">Share</button>
                    <button className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                    <span data-feather="calendar"></span>
                    This week
                </button>
            </div>
        </div>

        {userAccessRole==="ACCESS LEVEL 1" && <UserAccess /> }
        {userAccessRole==="ACCESS LEVEL 2" && <MarkettingSales /> }


    </div>
)
DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    userAccessRole: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        isConfirmed: !!state.auth.user.confirmed,
        userAccessRole: state.auth.user.userAccessRole
    };
}

export default connect(mapStateToProps)(DashboardPage);
