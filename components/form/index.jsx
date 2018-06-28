import React from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './formContext';

const DefaultError = ({message}) => (
    <div>{message}</div>
);

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validators: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerValidator = this.registerValidator.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.isValid());
    }

    isValid() {
        let valid = true;

        for (const validator of this.state.validators) {
            if (!validator.isValid()) {
                valid = false;
            }
        }

        return valid;
    }

    registerValidator(validator) {
        this.setState((previousState) => ({
            validators: [...previousState.validators, validator]
        }));
    }

    render() {
        const {
            className,
            children,
            errorComponent,
            // eslint-disable-next-line no-unused-vars
            onSubmit, // Needed so that it is not added as a duplicate on the form tag
            ...formProps
        } = this.props;

        const context = {
            register: this.registerValidator,
            errorComponent: errorComponent || DefaultError
        };

        return (
            <FormContext.Provider value={context}>
                <form className={className} onSubmit={this.handleSubmit} {...formProps} >
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}

Form.propTypes = {
    /**
     * Child component(s) to render
     */
    children: PropTypes.node.isRequired,
    /**
     * Additional class' to add
     */
    className: PropTypes.string,
    /**
     * Callback for Submit events
     */
    onSubmit: PropTypes.func
};

Form.defaultProps = {
    className: '',
    onSubmit: () => {
    }
};

export default Form;
