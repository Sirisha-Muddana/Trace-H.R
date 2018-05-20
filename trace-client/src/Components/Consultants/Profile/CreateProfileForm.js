import React, { Component } from "react";
import PropTypes from "prop-types";
/*
import InlineError from "../messages/InlineError";
*/
import { Form, Message } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";

class CreateProfileForm extends Component {
  state = {
    data: {
      street: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      cellphone: "",
      dateOfBirth: "",
      skillset: "",
      onProject: "",
      endDate: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
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
    const { data, errors, loading } = this.state;
    return (
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
              value={data.street}
              label="Street Address"
              onChange={this.onChange}
              error={errors.street}
            />
          </div>
          <div className="col-md-6 form">
            <TextFieldGroup
              type="text"
              name="apartment"
              value={data.apartment}
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
              value={data.city}
              label="City"
              onChange={this.onChange}
              error={errors.city}
            />
          </div>
          <div className="col-md-6 form">
            <TextFieldGroup
              type="text"
              name="state"
              value={data.state}
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
              value={data.zip}
              label="Zip Code"
              onChange={this.onChange}
              error={errors.zip}
              max="5"
            />
          </div>
          <div className="col-md-6 form">
            <TextFieldGroup
              type="number"
              name="cellphone"
              value={data.cellphone}
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
              value={data.skillset}
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
              value={data.onProject}
              label="On project?"
              onChange={this.onChange}
              error={errors.onProject}
            />
          </div>
          <div className="col-md-6 form">
            <TextFieldGroup
              type="date"
              name="endDate"
              value={data.endDate}
              label="End date"
              onChange={this.onChange}
              error={errors.endDate}
            />
          </div>
        </div>
        <br />
        <button className="btn btn-lg btn-secondary btn-block">Submit</button>
      </Form>
    );
  }
}

CreateProfileForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default CreateProfileForm;
