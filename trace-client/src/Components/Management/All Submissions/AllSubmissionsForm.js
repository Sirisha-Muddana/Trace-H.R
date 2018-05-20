import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

const color = "teal";

class AllSubmissionsForm extends Component {
  render() {
    console.log(this.props.recruiterList);
    const recruiterList = this.props.recruiterList.map(recruiters => (
      <Table.Row key={recruiters._id}>
        <Table.Cell textAlign="center">
          <Link to={`/getSubmissions/${recruiters._id}`}>
            {recruiters.firstName} {recruiters.lastName}
          </Link>
        </Table.Cell>
      </Table.Row>
    ));
    return (
      <Table color={color} key={color} size="small" celled singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">
              Recruiter Name
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Today</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">This week</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">This month</Table.HeaderCell>
          </Table.Row>
          {recruiterList}
        </Table.Header>
      </Table>
    );
  }
}

export default AllSubmissionsForm;
