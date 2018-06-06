import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { resendConfirmation } from "../../actions/authActions";

class ConfirmEmailMessage extends Component {
  onClick() {
    this.props.resendConfirmation();
  }
  render() {
    return (
      <div>
        <Message warning>
          <Message.Header>Thank you for registering!</Message.Header>
          <Message.List>
            <Message.Item>
              Please click the link in your e-mail to verify your account.
            </Message.Item>
            <Message.Item>
              <Link to="/dashboard" onClick={this.onClick.bind(this)}>
                Resend confirmation email
              </Link>
            </Message.Item>
          </Message.List>
        </Message>
      </div>
    );
  }
}

ConfirmEmailMessage.propTypes = {
  resendConfirmation: PropTypes.func.isRequired
};

export default connect(null, { resendConfirmation })(ConfirmEmailMessage);
