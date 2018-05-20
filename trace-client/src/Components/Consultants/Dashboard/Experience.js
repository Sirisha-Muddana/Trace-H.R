import React, { Component } from "react";
import Moment from "react-moment";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Experience extends Component {
  render() {
    const experience = this.props.experience.map(exp => (
      <Table.Body key={exp._id}>
        <Table.Row>
          <Table.Cell width={5} textAlign="left">
            {exp.company}
          </Table.Cell>
          <Table.Cell width={4} textAlign="left">
            {exp.title}
          </Table.Cell>
          <Table.Cell width={4} textAlign="left">
            <Moment format="MMM/YYYY">{exp.from}</Moment> -
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format="MMM/YYYY">{exp.to}</Moment>
            )}
          </Table.Cell>
          <Table.Cell width={3}>
            <Button.Group>
              <Button as={Link} to={`/editSubmission/${exp._id}`} size="mini">
                Edit
              </Button>
              <Button.Or />
              <Button color="red" size="mini">
                Delete
              </Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="left">Company</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Title</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Years</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {experience}
        </Table>
      </div>
    );
  }
}

export default Experience;
