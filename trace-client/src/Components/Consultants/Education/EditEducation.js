import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Message } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";
import { addEducation, getEducation } from "../../../actions/userActions";
import { connect } from "react-redux";

class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      loading: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getEducation(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.education) {
      const education = nextProps.users.education;

      this.setState({
        id: education._id,
        school: education.school,
        degree: education.degree,
        fieldOfStudy: education.fieldOfStudy,
        from: education.from,
        to: education.to
      });
    }
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();
    const data = {
      id: this.state.id,
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to
    };
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .addEducation(data)
        .then(() => this.props.history.push("/dashboard"))
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };
  validate = data => {
    const errors = {};

    if (!data.school)
      errors.school = "Please enter your School/University name";
    if (!data.degree) errors.degree = "Please enter your graduate degree";
    if (!data.fieldOfStudy)
      errors.fieldOfStudy = "Please enter your field of study";
    if (!data.from) errors.from = "Please enter the from date";
    if (!data.to) errors.to = "Please enter your to date";

    return errors;
  };

  render() {
    const { errors, loading } = this.state;

    return (
      <div className="container h-100">
        <h1 className="display-4 text-center">Edit Education</h1>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <Form onSubmit={this.onSubmit} loading={loading}>
              {errors.global && (
                <Message negative>
                  <Message.Header>Something went wrong</Message.Header>
                  <p>{errors.global}</p>
                </Message>
              )}
              <TextFieldGroup
                type="text"
                name="school"
                value={this.state.school || ""}
                label="School/University Name"
                onChange={this.onChange}
                error={errors.school}
              />
              <TextFieldGroup
                type="text"
                name="degree"
                value={this.state.degree || ""}
                label="Degree"
                onChange={this.onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                type="text"
                name="fieldOfStudy"
                value={this.state.fieldOfStudy || ""}
                label="Field of Study"
                onChange={this.onChange}
                error={errors.fieldOfStudy}
              />
              <TextFieldGroup
                type="date"
                name="from"
                value={this.state.from || ""}
                label="From date"
                onChange={this.onChange}
                error={errors.from}
              />
              <TextFieldGroup
                type="date"
                name="to"
                value={this.state.to || ""}
                label="To date"
                onChange={this.onChange}
                error={errors.to}
              />

              <button className="btn btn-secondary btn-lg btn-block">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

EditEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  getEducation: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { addEducation, getEducation })(
  EditEducation
);
