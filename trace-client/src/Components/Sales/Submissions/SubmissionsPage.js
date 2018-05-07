import React, { Component } from "react";
import PropTypes from "prop-types";
import SubmissionsForm from "./SubmissionsForm";
import { connect } from "react-redux";
import { fetchSubmissions } from "../../../actions/submissionListActions";
import { Link } from "react-router-dom";
import { Table, Button, Header, Divider, Menu, Input } from "semantic-ui-react";

class SubmissionsPage extends Component {
  componentDidMount() {
    this.props.fetchSubmissions();
  }

  render() {
    const { submissionList } = this.props.submission;
    let allSubmissions;

    if (submissionList.length > 0) {
      allSubmissions = submissionList.map(submissions => (
        <SubmissionsForm key={submissions._id} submissions={submissions} />
      ));
    } else {
      allSubmissions = (
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="center">Empty</Table.Cell>
          </Table.Row>
        </Table.Body>
      );
    }

    return (
      <div>
        <Divider hidden />
        <Header textAlign="center" as="h1">
          Marketting Sales
        </Header>
        <Menu borderless>
          <Menu.Item>
            <Button as={Link} to="/newSubmission" primary>
              Add new entry
            </Button>
          </Menu.Item>
          <Menu.Item position="right">
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu>
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">
                Date Created
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Consultant Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Skillset</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Interview Date
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Feedback</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Recruiter</Table.HeaderCell>
              <Table.HeaderCell width={3} textAlign="center">
                Action
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {allSubmissions}
        </Table>
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
