import React from "react";
import { Message } from "semantic-ui-react";

const SuccessMessage = () => (
  <Message
    success
    header="Registration successful"
    content="You're all signed up. Please login to continue."
  />
);

export default SuccessMessage;
