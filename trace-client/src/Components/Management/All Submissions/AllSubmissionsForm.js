import React, { Component } from "react";
import { Table, Menu, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import _ from "lodash";

const color = "teal";

class AllSubmissionsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            searchTerm: '',
            searchList: this.props.recruiterList
        };
    }
    onChange = e => {
        e.preventDefault();
        this.setState({search: true});
        this.setState({searchTerm: e.target.value.toLowerCase()}, () => {
            let recruiters;
            recruiters = _.filter(this.props.recruiterList, recruiters => recruiters.firstName.toLowerCase().includes(this.state.searchTerm) || recruiters.lastName.toLowerCase().includes(this.state.searchTerm));
            this.setState({searchList: recruiters})
        });
    };
  render() {
    const recruiterList = this.state.searchList.map(recruiters => (
      <Table.Row key={recruiters._id}>
        <Table.Cell textAlign="center">
          <Link to={`/getSubmissions/${recruiters._id}`}>
            {recruiters.firstName} {recruiters.lastName}
          </Link>
        </Table.Cell>
      </Table.Row>
    ));
    return (
        <div>
            <Menu secondary>
                <Menu.Item>
                    <Input className="icon" icon="search" placeholder="Search..." onChange={this.onChange.bind(this)} />
                </Menu.Item>
            </Menu>
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
        </div>
    );
  }
}

export default AllSubmissionsForm;
