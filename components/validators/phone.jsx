import React from 'react';
import PropTypes from 'prop-types';

class PhoneValidator extends React.Component {
    isValid() {
        const value = this.props.value ? this.props.value.trim() : '';
        if (value === '') {
            return true;
        }

        return /^1?[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/.test((value).replace(/\D/g, ''));
    }

    getMessage() {
        return this.props.message;
    }

    render() {
        return null;
    }
}

PhoneValidator.isValidator = true;

PhoneValidator.propTypes = {
    value: PropTypes.any,
    message: PropTypes.string
};

PhoneValidator.defaultProps = {
    message: 'Please enter a valid phone number.'
};

export default PhoneValidator;
