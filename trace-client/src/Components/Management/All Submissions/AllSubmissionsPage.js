import React, { Component } from "react";
import PropTypes from "prop-types";
import AllSubmissionsForm from "./AllSubmissionsForm";
import { connect } from "react-redux";
import { getRecruiterList } from "../../../actions/userActions";
import { Loader } from "semantic-ui-react";

class AllSubmissionsPage extends Component {
  componentDidMount() {
    this.props.getRecruiterList();
  }

  render() {
    const { recruiterList, loading } = this.props.users;
    let allRecruiters;
    if (loading) {
      allRecruiters = <Loader active inline="centered" />;
    } else {
      if (Object.keys(recruiterList).length > 0) {
        allRecruiters = <AllSubmissionsForm recruiterList={recruiterList} />;
      } else {
        allRecruiters = <h4> No Recruiters found</h4>;
      }
    }
    return (
      <div>
        <h3 className="display-4 text-center">Submission List</h3>
        {allRecruiters}
      </div>
    );
  }
}

AllSubmissionsPage.propTypes = {
  getRecruiterList: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { getRecruiterList })(
  AllSubmissionsPage
);
