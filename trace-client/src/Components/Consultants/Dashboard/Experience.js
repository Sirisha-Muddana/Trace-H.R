import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { deleteExperience } from "../../../actions/userActions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

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
            {exp.to === "" ? (
              " Present"
            ) : (
              <Moment format="MMM/YYYY">{exp.to}</Moment>
            )}
          </Table.Cell>
          <Table.Cell width={3}>
            <Button.Group>
              <Button as={Link} to={`/editExperience/${exp._id}`} size="mini">
                Edit
              </Button>
              <Button.Or />
              <Button
                color="red"
                size="mini"
                onClick={this.onDeleteClick.bind(this, exp._id)}
              >
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

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
