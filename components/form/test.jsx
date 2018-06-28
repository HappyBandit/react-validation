import React from 'react';
import { shallow } from 'enzyme';

import Form from './';

describe('Form', () => {
    it('should render', () => {
        const tree = shallow(
            <Form className="class">
                Child
            </Form>
        );

        expect(tree).toMatchSnapshot();
    });

    it('should return true when all validators return true', () => {
        const tree = shallow(
            <Form className="class">
                Child
            </Form>
        );

        tree.instance().registerValidator({
            isValid: () => true
        });

        tree.instance().registerValidator({
            isValid: () => true
        });

        expect(tree.instance().isValid()).toEqual(true);
    });

    it('should return false when any validators return false', () => {
        const tree = shallow(
            <Form className="class">
                Child
            </Form>
        );

        tree.instance().registerValidator({
            isValid: () => true
        });

        tree.instance().registerValidator({
            isValid: () => false
        });

        expect(tree.instance().isValid()).toEqual(false);
    });

    it('should add validator when registerValidator called', () => {
        const tree = shallow(
            <Form className="class">
                Child
            </Form>
        );

        tree.instance().registerValidator('validator1');
        tree.instance().registerValidator('validator2');
        tree.instance().registerValidator('validator3');

        expect(tree.state('validators')).toEqual(['validator1', 'validator2', 'validator3']);
    });

    it('should return isValid response to onSubmit prop', () => {
        const mockCallback = jest.fn();
        const mockEvent = {
            preventDefault: jest.fn()
        };

        const tree = shallow(
            <Form className="class" onSubmit={mockCallback}>
                Child
            </Form>
        );

        tree.instance().isValid = () => 'VALID';
        tree.instance().handleSubmit(mockEvent);

        expect(mockCallback.mock.calls[0][0]).toEqual('VALID');
        expect(mockEvent.preventDefault.mock.calls.length).toBe(1);
    });
});
