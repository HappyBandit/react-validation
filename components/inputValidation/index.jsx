import React from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../form/formContext';

class InputValidation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            isValid: true
        };
        props.register(this);
    }

    isValid() {
        let valid = true;
        for (const key in this.refs) {
            const child = this.refs[key];
            if (valid && child) {
                valid = child.isValid();

                this.setState({
                    error: child.getMessage()
                });
            }
        }

        this.setState({
            isValid: valid
        });

        return valid;
    }

    clearError() {
        this.setState({
            isValid: true
        });
    }

    render() {
        const {
            ErrorComponent
        } = this.props;

        const childrenNew = [];
        const childrenOld = React.Children.toArray(this.props.children);

        for (const child of childrenOld) {
            if (child.type && child.type.isValidator) {
                childrenNew.push(React.cloneElement(child, {ref: child.type.name}));
            } else {
                childrenNew.push(child);
            }
        }

        return (
            <div className={`${this.props.className} ${!this.state.isValid ? ' has-error' : ''}`}>
                {childrenNew}
                <ErrorComponent isInvalid={!this.state.isValid} message={this.state.error} />
            </div>
        );
    }
}

InputValidation.propTypes = {
    /**
     * Additional class' to add
     */
    className: PropTypes.string,
    /**
     * Child component(s) to render
     */
    children: PropTypes.node.isRequired,
    /**
     * Used to connect error message to input
     */
    errorId: PropTypes.string,
    register: PropTypes.func,
    ErrorComponent: PropTypes.func
};

InputValidation.defaultProps = {
    className: '',
    errorId: '',
    register: () => {
    }
};

export default React.forwardRef((props, ref) => (
    <FormContext.Consumer>
        {({register, errorComponent}) => <InputValidation {...props} register={register} ErrorComponent={errorComponent} ref={ref} />}
    </FormContext.Consumer>
));

export {
    InputValidation
};
