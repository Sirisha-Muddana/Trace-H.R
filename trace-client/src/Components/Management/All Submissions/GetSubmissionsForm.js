import React, { Component } from "react";
import { Table } from "semantic-ui-react";

const color = "teal";

class SubmissionsForm extends Component {
  render() {
    const getSubmissions = this.props.getSubmissions.map(submissions => (
      <Table.Row key={submissions._id}>
        <Table.Cell textAlign="center">{submissions.createdAt}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.consultantName}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.skillset}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.vendor}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.client}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.interviewDate}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.feedback}</Table.Cell>
        <Table.Cell textAlign="center">{submissions.recruiter}</Table.Cell>
        <Table.Cell textAlign="center" />
      </Table.Row>
    ));
    return (
      <Table color={color} key={color} size="small" celled singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">
              Date Submitted
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Consultant Name
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Skillset</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Vendor</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Client</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Interview Date
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Feedback</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Recruiter</Table.HeaderCell>
          </Table.Row>
          {getSubmissions}
        </Table.Header>
      </Table>
    );
  }
}

export default SubmissionsForm;
