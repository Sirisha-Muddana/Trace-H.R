import React, { Component } from "react";
import PropTypes from "prop-types";
import AllTimesheetsForm from "./AllTimesheetsForm";
import { connect } from "react-redux";
import { getAllUsers } from "../../../actions/userActions";
import { Menu, Input, Loader } from "semantic-ui-react";

class AllTimesheetsPage extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { allUsers, loading } = this.props.users;
    let users;

    if (loading) {
      users = <Loader />;
    } else {
      if (Object.keys(allUsers).length > 0) {
        users = <AllTimesheetsForm allUsers={allUsers} />;
      } else {
        users = <h4> No Candidates registered </h4>;
      }
    }
    return (
      <div>
        <h1 className="display-4 text-center">Timesheets</h1>
        <Menu secondary>
          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu>
        {users}
      </div>
    );
  }
}

AllTimesheetsPage.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { getAllUsers })(AllTimesheetsPage);
