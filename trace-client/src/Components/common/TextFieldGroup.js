import React from 'react';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';
import { Form } from 'semantic-ui-react';

const TextFieldGroup = ({
                            name,
                            placeholder,
                            value,
                            label,
                            error,
                            info,
                            type,
                            onChange,
                            disabled
                        }) => {
    return (

        <Form.Field required error={!!error}>
            <label htmlFor={label}>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                className="form-control"
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <InlineError text={error}/>}
        </Form.Field>
    )}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;
