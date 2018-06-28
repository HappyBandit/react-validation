import React from 'react';
import { shallow, render } from 'enzyme';

import { InputValidation } from './';

const mockError = ({message}) => (
    <div className="ERROR">{message}</div>
);


describe('InputValidation', () => {
    it('should render', () => {
        const tree = render(
            <InputValidation className="class" ErrorComponent={mockError}>
                Child
            </InputValidation>
        );

        expect(tree).toMatchSnapshot();
    });

    it('should reset isValid when clearError called', () => {
        const tree = shallow(
            <InputValidation className="class" ErrorComponent={mockError}>
                Child
            </InputValidation>
        );

        tree.setState({isValid: false});

        expect(tree.state('isValid')).toEqual(false);

        tree.instance().clearError();

        expect(tree.state('isValid')).toEqual(true);
    });

    it('should return true when all refs return isValid = true', () => {
        const tree = shallow(
            <InputValidation className="class" ErrorComponent={mockError}>
                Child
            </InputValidation>
        );

        tree.instance().refs = [{
            isValid: () => true,
            getMessage: () => 'message1'
        },{
            isValid: () => true,
            getMessage: () => 'message2'
        }];

        expect(tree.instance().isValid()).toEqual(true);
        expect(tree.state('isValid')).toEqual(true);
        expect(tree.state('error')).toEqual('message2');
    });

    it('should return false when any refs return isValid = false', () => {
        const tree = shallow(
            <InputValidation className="class" ErrorComponent={mockError}>
                Child
            </InputValidation>
        );

        tree.instance().refs = [{
            isValid: () => false,
            getMessage: () => 'message1'
        },{
            isValid: () => true,
            getMessage: () => 'message2'
        }];

        expect(tree.instance().isValid()).toEqual(false);
        expect(tree.state('isValid')).toEqual(false);
        expect(tree.state('error')).toEqual('message1');
    });
});
