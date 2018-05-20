import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InlineError from "../../messages/InlineError";
import { Form, Message, Label, Input, Dropdown } from "semantic-ui-react";
import TextFieldGroup from "../../common/TextFieldGroup";
import { fetchUsers } from "../../../actions/userActions";

class PostSubmissionForm extends Component {
  state = {
    data: {
      consultantName: "",
      skillset: "",
      location: "",
      billingRate: "",
      vendor: "",
      client: "",
      interviewDate: "",
      interviewType: ""
    },
    loading: false,
    errors: {}
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

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
    if (!data.consultantName)
      errors.consultantName = "Please enter a consultantName";
    if (!data.skillset) errors.skillset = "Please enter a skillset";
    if (!data.location) errors.location = "Please enter a location";
    if (!data.billingRate) errors.billingRate = "Please enter a billing rate";
    if (!data.vendor) errors.vendor = "Please enter a vendor name";
    if (!data.client) errors.client = "Please enter a client name";
    if (!data.interviewDate)
      errors.interviewDate = "Please enter an interview date";
    if (!data.interviewType)
      errors.interviewType = "Please enter mode of interview";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    const { usersList } = this.props.users;
    const options = usersList.map(users => (
      <option key={users._id} value={users.user.firstName} />
    ));
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
            <Dropdown
              placeholder="Select Name"
              fluid
              search
              selection
              options={options}
            />
          </div>
          <div className="col-md-6 form">
            <TextFieldGroup
              type="text"
              name="skillset"
              value={data.skillset}
              label="Skillet"
              onChange={this.onChange}
              error={errors.skillset}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form">
            <TextFieldGroup
              type="text"
              name="location"
              value={data.location}
              label="Location"
              onChange={this.onChange}
              error={errors.location}
            />
          </div>
          <div className="col-md-6 form">
            <Form.Field required error={!!errors.billingRate}>
              <label htmlFor="billingRate">Billing Rate</label>
              <Input labelPosition="right" type="text">
                <Label basic>$</Label>
                <input
                  type="number"
                  name="billingRate"
                  value={data.billingRate}
                  onChange={this.onChange}
                />
                <Label>/hr</Label>
              </Input>
              {errors.billingRate && <InlineError text={errors.billingRate} />}
            </Form.Field>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form">
            <TextFieldGroup
              type="text"
              name="vendor"
              value={data.vendor}
              label="Vendor name"
              onChange={this.onChange}
              error={errors.vendor}
            />
          </div>
          <div className="col-md-6 form">
            <TextFieldGroup
              type="text"
              name="client"
              value={data.client}
              label="Client name"
              onChange={this.onChange}
              error={errors.client}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form">
            <TextFieldGroup
              type="date"
              name="interviewDate"
              value={data.interviewDate}
              label="Interview date"
              onChange={this.onChange}
              error={errors.interviewDate}
            />
          </div>
          <div className="col-md-6 form">
            <TextFieldGroup
              type="text"
              name="interviewType"
              value={data.interviewType}
              label="Interview type"
              onChange={this.onChange}
              error={errors.interviewType}
            />
          </div>
        </div>

        <br />
        <button className="btn btn-lg btn-secondary btn-block">Submit</button>
      </Form>
    );
  }
}

PostSubmissionForm.propTypes = {
  submit: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, { fetchUsers })(PostSubmissionForm);
