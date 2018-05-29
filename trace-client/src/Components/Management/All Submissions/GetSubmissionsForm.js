import React, { Component } from "react";
import { Table, Menu, Input } from "semantic-ui-react";
import _ from "lodash";

const color = "teal";

class SubmissionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      searchTerm: "",
      searchList: this.props.getSubmissions
    };
  }
  onChange = e => {
    e.preventDefault();
    this.setState({ search: true });
    this.setState({ searchTerm: e.target.value.toLowerCase() }, () => {
      let submissions;
      submissions = _.filter(this.props.getSubmissions, submissions =>
        submissions.consultantName.toLowerCase().includes(this.state.searchTerm)
      );
      this.setState({ searchList: submissions });
    });
  };
  render() {
    const getSubmissions = this.state.searchList.map(submissions => (
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
      <div>
        <Menu secondary>
          <Menu.Item>
            <Input
              className="icon"
              icon="search"
              placeholder="Search..."
              onChange={this.onChange.bind(this)}
            />
          </Menu.Item>
        </Menu>
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
      </div>
    );
  }
}

export default SubmissionsForm;
