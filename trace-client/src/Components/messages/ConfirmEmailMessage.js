import React from 'react';
import {Message} from 'semantic-ui-react';

const ConfirmEmailMessage = () => (
    <Message warning
             header='Could you check something!'
             list={[
                 'This e-mail has been registered, but is yet to be verified. Please click the link in your e-mail.',
             ]} />
);

export default ConfirmEmailMessage