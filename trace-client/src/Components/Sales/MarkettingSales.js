import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSales } from "../../actions/salesListActions";
import PropTypes from "prop-types";
import {
  Table,
  Button,
  Dropdown,
  Header,
  Divider,
  Menu,
  Input
} from "semantic-ui-react";
import { feedback } from "../common/common";

class MarkettingSales extends Component {
  componentWillMount() {
    this.props.fetchSales();
  }

  render() {
    const tableHeader = (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Date Created</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            Consultant Name
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Skillset</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Interview Date</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Feedback</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Recruiter</Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign="center">
            Action
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
    const salesList = this.props.sales.map(sales => (
      <Table.Body key={sales._id}>
        <Table.Row>
          <Table.Cell textAlign="center">{sales.createdAt}</Table.Cell>
          <Table.Cell textAlign="center">{sales.consultantName}</Table.Cell>
          <Table.Cell textAlign="center">{sales.skillset}</Table.Cell>
          <Table.Cell textAlign="center">{sales.interviewDate}</Table.Cell>
          <Table.Cell textAlign="center">
            <Dropdown placeholder="Status" fluid selection options={feedback} />
          </Table.Cell>
          <Table.Cell>{sales.recruiter}</Table.Cell>
          <Table.Cell>
            <Button.Group>
              <Button size="mini">Edit</Button>
              <Button.Or />
              <Button size="mini">Save</Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    ));

    return (
      <div>
        <Divider hidden />
        <Header textAlign="center" as="h1">
          Marketting Sales
        </Header>
        <Menu borderless>
          <Menu.Item>
            <Button as={Link} to="/newSales" primary>
              Add new entry
            </Button>
          </Menu.Item>
          <Menu.Item position="right">
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu>
        <Table celled fixed singleLine>
          {tableHeader}
          {salesList}
        </Table>
      </div>
    );
  }
}

MarkettingSales.propTypes = {
  fetchSales: PropTypes.func.isRequired,
  sales: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    sales: state.sales.salesList
  };
};

export default connect(mapStateToProps, { fetchSales })(MarkettingSales);
