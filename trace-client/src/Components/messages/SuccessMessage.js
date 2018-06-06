import React from "react";
import { Message } from "semantic-ui-react";

const SuccessMessage = () => (
  <Message
    success
    header="Registration successful"
    content="Email sent. Please verify your email to continue."
  />
);

export default SuccessMessage;
