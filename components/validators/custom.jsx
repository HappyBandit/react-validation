import React from 'react';
import PropTypes from 'prop-types';

class CustomValidator extends React.Component {
    isValid() {
        return this.props.validationFunction();
    }

    getMessage() {
        return this.props.message;
    }

    render() {
        return null;
    }
}

CustomValidator.isValidator = true;

CustomValidator.propTypes = {
    validationFunction: PropTypes.func.isRequired,
    message: PropTypes.string
};

CustomValidator.defaultProps = {
    message: 'Please enter a value.'
};

export default CustomValidator;
