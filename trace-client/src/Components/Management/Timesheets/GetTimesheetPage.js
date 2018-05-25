import React, { Component } from "react";
import PropTypes from "prop-types";
import GetTimesheetForm from "./GetTimesheetForm";
import { connect } from "react-redux";
import { getTimesheets } from "../../../actions/timesheetsActions";
import { Menu, Input, Loader } from "semantic-ui-react";

class GetTimesheetPage extends Component {
  componentDidMount() {
    this.props.getTimesheets(this.props.match.params.id);
  }

  render() {
    const { getTimesheets, loading, new_item } = this.props.timesheets;
    let allTimesheets;
    if (loading) {
      allTimesheets = <Loader active inline="centered" />;
    } else {
      if (Object.keys(getTimesheets).length > 0) {
        allTimesheets = (
          <GetTimesheetForm getTimesheets={getTimesheets} new_item={new_item} />
        );
      } else {
        allTimesheets = <h4> No Timesheets found</h4>;
      }
    }

    return (
      <div>
        <h3 className="display-4 text-center">Timesheets</h3>
        <Menu secondary>
          <Menu.Item position="right">
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu>
        {allTimesheets}
      </div>
    );
  }
}

GetTimesheetPage.propTypes = {
  getTimesheets: PropTypes.func.isRequired,
  timesheets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheets
});

export default connect(mapStateToProps, { getTimesheets })(GetTimesheetPage);
