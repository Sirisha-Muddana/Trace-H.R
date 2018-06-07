import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const color = "teal";

class SubmissionsForm extends Component {
  render() {
    const submissionList = this.props.submissionList.map(submissions => (
      <Table.Row key={submissions._id}>
        <Table.Cell textAlign="center">{submissions.createdAt}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.consultantName}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.skillset}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.interviewDate}</Table.Cell>
        <Table.Cell textAlign="center" width={3}>
          <Dropdown placeholder="Status" fluid selection options={feedback} />
        </Table.Cell>
        {/*<Table.Cell textAlign="center" width={3}>
          <Dropdown placeholder="Status" fluid selection options={recruiters} />
        </Table.Cell>*/}
        <Table.Cell textAlign="center">
          <Button.Group>
            <Button
              as={Link}
              to={`/editSubmission/${submissions._id}`}
              size="mini"
            >
              Edit
            </Button>
            <Button.Or />
            <Button size="mini">Save</Button>
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    ));
    return (
      <div>
        <Table color={color} key={color} size="small" celled singleLine>
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
            {submissionList}
          </Table.Header>
        </Table>
      </div>
    );
  }
}

export default SubmissionsForm;
