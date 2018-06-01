import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Message } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";
import { addExperience, getExperience } from "../../../actions/userActions";
import { connect } from "react-redux";

class EditExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      description: "",
      loading: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getExperience(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.experience) {
      const experience = nextProps.users.experience;

      this.setState({
        id: experience._id,
        title: experience.title,
        company: experience.company,
        location: experience.location,
        from: experience.from,
        to: experience.to,
        description: experience.description
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
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      description: this.state.description
    };
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .addExperience(data)
        .then(() => this.props.history.push("/dashboard"))
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };
  validate = data => {
    const errors = {};

    if (!data.title) errors.title = "Please enter your Job title";
    if (!data.company) errors.company = "Please enter your Client name";
    if (!data.from) errors.from = "Please enter the from date";
    if (!data.to) errors.to = "Please enter your to date";

    return errors;
  };

  render() {
    const { errors, loading } = this.state;

    return (
      <div className="container h-100">
        <h1 className="display-4 text-center">Edit Experience</h1>
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
                name="title"
                value={this.state.title || ""}
                label="Job Title"
                onChange={this.onChange}
                error={errors.title}
              />
              <TextFieldGroup
                type="text"
                name="company"
                value={this.state.company || ""}
                label="Client name"
                onChange={this.onChange}
                error={errors.company}
              />
              <TextFieldGroup
                type="text"
                name="location"
                value={this.state.location || ""}
                label="Job Location"
                onChange={this.onChange}
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

EditExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  getExperience: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { addExperience, getExperience })(
  EditExperience
);
