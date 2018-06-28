import React from 'react';
import PropTypes from 'prop-types';

class RequiredValidator extends React.Component {
    isValid() {
        return this.props.value.trim() > '';
    }

    getMessage() {
        return this.props.message;
    }

    render() {
        return null;
    }
}

RequiredValidator.isValidator = true;

RequiredValidator.propTypes = {
    value: PropTypes.any,
    message: PropTypes.string
};

RequiredValidator.defaultProps = {
    message: 'Please enter a value.'
};

export default RequiredValidator;
