import React, { Component } from "react";
import PropTypes from "prop-types";
import SubmissionsForm from "./SubmissionsForm";
import { connect } from "react-redux";
import { fetchSubmissions } from "../../../actions/submissionListActions";
import { Link } from "react-router-dom";
import { Button, Menu, Input, Loader } from "semantic-ui-react";

class SubmissionsPage extends Component {
  componentDidMount() {
    this.props.fetchSubmissions();
  }

  render() {
    const { submissionList, loading } = this.props.submission;
    let allSubmissions;
    if (loading) {
      allSubmissions = <Loader active inline="centered" />;
    } else {
      if (Object.keys(submissionList).length > 0) {
        allSubmissions = <SubmissionsForm submissionList={submissionList} />;
      } else {
        allSubmissions = <h4> No Submissions found</h4>;
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

SubmissionsPage.propTypes = {
  fetchSubmissions: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  submission: state.submission
});

export default connect(mapStateToProps, { fetchSubmissions })(SubmissionsPage);
