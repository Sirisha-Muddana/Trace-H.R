import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { deleteEducation } from "../../../actions/userActions";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <Table.Body key={edu._id}>
        <Table.Row>
          <Table.Cell width={5} textAlign="left">
            {edu.school}
          </Table.Cell>
          <Table.Cell width={4} textAlign="left">
            {edu.degree}
          </Table.Cell>
          <Table.Cell width={4} textAlign="left">
            <Moment format="MMM/YYYY">{edu.from}</Moment> -
            {edu.to === "" ? (
              " Present"
            ) : (
              <Moment format="MMM/YYYY">{edu.to}</Moment>
            )}
          </Table.Cell>
          <Table.Cell width={3}>
            <Button.Group>
              <Button as={Link} to={`/editEducation/${edu._id}`} size="mini">
                Edit
              </Button>
              <Button.Or />
              <Button
                color="red"
                size="mini"
                onClick={this.onDeleteClick.bind(this, edu._id)}
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
        <h4 className="mb-4">Education Credentials</h4>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="left">School</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Degree</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Years</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {education}
        </Table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
