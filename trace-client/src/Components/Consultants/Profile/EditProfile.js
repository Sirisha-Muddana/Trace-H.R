import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Message } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";
import { createProfile, getCurrentProfile } from "../../../actions/userActions";
import { connect } from "react-redux";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      cellphone: "",
      dateOfBirth: "",
      skillset: "",
      onProject: "",
      endDate: "",
      loading: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.profile) {
      const profile = nextProps.users.profile;

      const skillset = profile.skillset.join(", ");
      this.setState({
        street: profile.address.street,
        apartment: profile.address.apartment,
        city: profile.address.city,
        state: profile.address.state,
        zip: profile.address.zip,
        cellphone: profile.cellphone,
        dateOfBirth: profile.dateOfBirth,
        skillset: skillset,
        onProject: profile.onProject,
        endDate: profile.endDate
      });
    }
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = () => {
    const data = {
      street: this.state.street,
      apartment: this.state.apartment,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      cellphone: this.state.cellphone,
      dateOfBirth: this.state.dateOfBirth,
      skillset: this.state.skillset,
      onProject: this.state.onProject,
      endDate: this.state.endDate
    };

    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .createProfile(data)
        .then(() => this.props.history.push("/dashboard"))
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.street) errors.street = "Please enter an apartment street";
    if (!data.apartment) errors.apartment = "Please enter a apartment";
    if (!data.city) errors.city = "Please enter a city";
    if (!data.state) errors.state = "Please enter a state";
    if (!data.zip) errors.zip = "Please enter a zip code";
    if (!data.cellphone) errors.cellphone = "Please enter a cellphone";
    if (!data.skillset) errors.skillset = "Please enter a skillset";
    if (!data.onProject) errors.onProject = "Please enter ";
    return errors;
  };

  render() {
    const { errors, loading } = this.state;
    return (
      <div className="container h-100">
        <h1 className="display-4 text-center">Edit Profile</h1>
        <div className="row justify-content-md-center h-100">
          <div className="card-wrapper" id="salesForm">
            <Form onSubmit={this.onSubmit} loading={loading}>
              {errors.global && (
                <Message negative>
                  <Message.Header>Something went wrong</Message.Header>
                  <p>{errors.global}</p>
                </Message>
              )}

              <div className="row">
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="street"
                    value={this.state.street}
                    label="Street Address"
                    onChange={this.onChange}
                    error={errors.street}
                  />
                </div>
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="apartment"
                    value={this.state.apartment}
                    label="Apartment number"
                    onChange={this.onChange}
                    error={errors.apartment}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="city"
                    value={this.state.city}
                    label="City"
                    onChange={this.onChange}
                    error={errors.city}
                    max="5"
                  />
                </div>
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="state"
                    value={this.state.state}
                    label="State"
                    onChange={this.onChange}
                    error={errors.state}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="number"
                    name="zip"
                    value={`${this.state.zip}`}
                    label="Zip Code"
                    onChange={this.onChange}
                    error={errors.zip}
                  />
                </div>
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="number"
                    name="cellphone"
                    value={`${this.state.cellphone}`}
                    label="Phone number"
                    onChange={this.onChange}
                    error={errors.cellphone}
                    max="10"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form">
                  <TextFieldGroup
                    type="text"
                    placeholder="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                    name="skillset"
                    value={this.state.skillset}
                    label="List your skillset"
                    onChange={this.onChange}
                    error={errors.skillset}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="text"
                    name="onProject"
                    value={this.state.onProject}
                    label="On project?"
                    onChange={this.onChange}
                    error={errors.onProject}
                  />
                </div>
                <div className="col-md-6 form">
                  <TextFieldGroup
                    type="date"
                    name="endDate"
                    value={this.state.endDate}
                    label="End date"
                    onChange={this.onChange}
                    error={errors.endDate}
                  />
                </div>
              </div>

              <br />
              <button className="btn btn-lg btn-secondary btn-block">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
