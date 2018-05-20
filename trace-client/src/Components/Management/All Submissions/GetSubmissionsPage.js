import React, { Component } from "react";
import PropTypes from "prop-types";
import GetSubmissionsForm from "./GetSubmissionsForm";
import { connect } from "react-redux";
import { getSubmissions } from "../../../actions/submissionListActions";
import { Link } from "react-router-dom";
import { Button, Menu, Input, Loader } from "semantic-ui-react";

class GetSubmissionsPage extends Component {
  componentDidMount() {
    this.props.getSubmissions(this.props.match.params.id);
  }

  render() {
    const { getSubmissions, loading } = this.props.submission;
    let allSubmissions;

    if (loading) {
      allSubmissions = <Loader />;
    } else {
      if (Object.keys(getSubmissions).length > 0) {
        allSubmissions = <GetSubmissionsForm getSubmissions={getSubmissions} />;
      } else {
        allSubmissions = <h4> No Submissions found for this recruiter</h4>;
      }
    }

    return (
      <div>
        <h3 className="display-4 text-center">Submission List</h3>
        <Menu secondary>
          <Menu.Item>
            <Button as={Link} to="/newSubmission" secondary>
              Add new entry
            </Button>
          </Menu.Item>
          <Menu.Item position="right">
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu>
        {allSubmissions}
      </div>
    );
  }
}

GetSubmissionsPage.propTypes = {
  getSubmissions: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  submission: state.submission
});

export default connect(mapStateToProps, { getSubmissions })(GetSubmissionsPage);
