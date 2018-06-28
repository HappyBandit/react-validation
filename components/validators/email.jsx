import React from 'react';
import PropTypes from 'prop-types';

const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b$/i;

class EmailValidator extends React.Component {
    isValid() {
        const value = this.props.value ? this.props.value.trim() : '';
        if (value === '') {
            return true;
        }

        return emailRegex.test(value);
    }

    getMessage() {
        return this.props.message;
    }

    render() {
        return null;
    }
}

EmailValidator.isValidator = true;

EmailValidator.propTypes = {
    value: PropTypes.any,
    message: PropTypes.string
};

EmailValidator.defaultProps = {
    message: 'Please enter a valid e-mail address.'
};

export default EmailValidator;
