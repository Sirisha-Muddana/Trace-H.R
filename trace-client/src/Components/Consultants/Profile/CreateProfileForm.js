import React, { Component } from "react";
import PropTypes from "prop-types";
import InlineError from "../../messages/InlineError";
import { Form, Message, Dropdown } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";
import { stateOptions } from "../../common/common";
//import SelectListGroup from "../../common/SelectListGroup";

class CreateProfileForm extends Component {
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
    this.dropdownOnChange = this.dropdownOnChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });

  dropdownOnChange = (e, data) =>
    this.setState({ ...this.state, onProject: data.value });

  onStateChange = (e, data) =>
    this.setState({ ...this.state, state: data.value });

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
      onProject: this.state.onProject
    };
    if (this.state.endDate) data.endDate = this.state.endDate;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.street) errors.street = "Please enter an street";
    if (!data.apartment) errors.apartment = "Please enter an apartment";
    if (!data.city) errors.city = "Please enter a city";
    if (!data.state) errors.state = "Please enter a state";
    if (!data.zip) errors.zip = "Please enter a zip code";
    if (data.zip.length < 5 || data.zip.length > 5)
      errors.zip = "Zip code has to be 5 digits";
    if (!data.cellphone) errors.cellphone = "Please enter a cellphone number";
    if (data.cellphone.length < 10 || data.cellphone.length > 10)
      errors.cellphone = "Cellphone number has to be 10 digits";
    if (!data.skillset) errors.skillset = "Please enter a skillset";
    if (!data.onProject) errors.onProject = "Please select Yes or No ";
    if (data.onProject === "Yes" && !data.endDate)
      errors.endDate = "Please enter a tentative end date ";

    return errors;
  };

  render() {
    const { errors, loading } = this.state;
    const options = [
      {
        key: "Yes",
        text: "Yes",
        value: "Yes"
      },
      {
        key: "No",
        text: "No",
        value: "No"
      }
    ];
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
          <div className="col-md-4 form">
            <TextFieldGroup
              type="text"
              name="city"
              value={this.state.city}
              label="City"
              onChange={this.onChange}
              error={errors.city}
            />
          </div>
          <div className="col-md-4 form">
            <Form.Field required error={!!errors.state}>
              <label htmlFor="state">Select state</label>
              <Dropdown
                name="state"
                defaultValue={this.state.state}
                onChange={this.onStateChange}
                options={stateOptions}
                placeholder="Select a state"
                fluid
                selection
                search
              />
              {errors.state && <InlineError text={errors.state} />}
            </Form.Field>
          </div>
          <div className="col-md-4 form">
            <TextFieldGroup
              type="number"
              name="zip"
              value={this.state.zip}
              label="Zip Code"
              onChange={this.onChange}
              error={errors.zip}
              max="5"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 form">
            <TextFieldGroup
              type="date"
              name="dateOfBirth"
              value={this.state.dateOfBirth}
              label="Date of birth"
              onChange={this.onChange}
              error={errors.dateOfBirth}
            />
          </div>
          <div className="col-md-6 form">
            <TextFieldGroup
              type="number"
              name="cellphone"
              value={this.state.cellphone}
              label="Phone number"
              onChange={this.onChange}
              error={errors.cellphone}
              max="10"
              min="10"
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
            <Form.Field required error={!!errors.onProject}>
              <label htmlFor="onProject">Are you currently on a project?</label>
              <Dropdown
                name="onProject"
                onChange={this.dropdownOnChange}
                options={options}
                placeholder="Select an option"
                fluid
                selection
              />
              {errors.onProject && <InlineError text={errors.onProject} />}
            </Form.Field>
            {/*<SelectListGroup
              type="text"
              name="onProject"
              value={data.onProject}
              label="On project?"
              onChange={this.onChange}
              options={options}
              placeholder="Select an option"
              error={errors.onProject}
            />*/}
          </div>
          {this.state.onProject === "Yes" && (
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
          )}
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
