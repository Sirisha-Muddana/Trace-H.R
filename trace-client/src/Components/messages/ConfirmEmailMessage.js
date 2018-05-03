import React from 'react';
import {Message} from 'semantic-ui-react';

const ConfirmEmailMessage = () => (
    <Message warning
             header='Thank you for registering!'
             list={[
                 'Please click the link in your e-mail to verify your account.',
             ]} />
);

export default ConfirmEmailMessage
