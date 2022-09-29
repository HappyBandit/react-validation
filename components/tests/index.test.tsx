import {render, cleanup, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { Form, useInputValidation, Validators } from '../index';

const mocks = {
    submit: jest.fn(),
};

const Email = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const result = useInputValidation([
        Validators.required(value, 'ENTER SOMETHING'),
        Validators.email(value, 'MUST BE A VALID EMAIL'),
    ]);

    return (
        <div className="col-4 mb-3">
            <label htmlFor="email">Email</label>
            <input
                type="text"
                className={`form-control ${result.valid ? '' : 'is-invalid'}`}
                id="email"
                placeholder="Email"
                onChange={(event) => onChange(event.currentTarget.value)}
            />
            <div className="invalid-feedback">
                {result.message}
            </div>
        </div>
    );
};

const RenderComponent = () => {
    const [ email, setEmail ] = useState(undefined);

    return (
        <Form
            onSubmit={mocks.submit}
        >
            <div className="row">
                <Email
                    value={email}
                    onChange={(value) => setEmail(value)}
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </Form>
    );
};

describe('<Validation />', () => {
    afterEach(cleanup);

    it('should render', () => {
        const { container, queryByText } = render(<RenderComponent/>);

        expect(container.firstChild).toMatchSnapshot();
        expect(queryByText('ENTER SOMETHING')).toBeNull();
        expect(queryByText('MUST BE A VALID EMAIL')).toBeNull();
        expect(queryByText('Submit')).toBeTruthy();
    });

    it('should rerender and trigger on submit', () => {
        const { getByText, queryByText } = render(<RenderComponent/>);

        fireEvent.click(getByText('Submit'));

        expect(queryByText('ENTER SOMETHING')).toBeTruthy();
        expect(queryByText('MUST BE A VALID EMAIL')).toBeNull();
        expect(mocks.submit).toBeCalledWith(false);
    });

    it('should rerender and trigger on submit after an invalid email entered', () => {
        const { getByText, queryByText, getByPlaceholderText } = render(<RenderComponent/>);

        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'email' } });
        fireEvent.click(getByText('Submit'));

        expect(queryByText('ENTER SOMETHING')).toBeNull();
        expect(queryByText('MUST BE A VALID EMAIL')).toBeTruthy();
        expect(mocks.submit).toBeCalledWith(false);
    });

    it('should rerender and trigger on submit after a valid email entered', () => {
        const { getByText, queryByText, getByPlaceholderText } = render(<RenderComponent/>);

        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'email@real.com' } });
        fireEvent.click(getByText('Submit'));

        expect(queryByText('ENTER SOMETHING')).toBeNull();
        expect(queryByText('MUST BE A VALID EMAIL')).toBeNull();
        expect(mocks.submit).toBeCalledWith(true);
    });

    describe('Validators', () => {
        describe('required', () => {
            it('should return false and default message with undefined input', () => {
                const { isValid, getMessage } = Validators.required(undefined);

                expect(isValid()).toEqual(false);
                expect(getMessage()).toEqual('Please enter a value.');
            });

            it('should return false with an input with only spaces', () => {
                const { isValid } = Validators.required('   ');

                expect(isValid()).toEqual(false);
            });

            it('should return true with a valid input', () => {
                const { isValid } = Validators.required(' test ');

                expect(isValid()).toEqual(true);
            });

            it('should return expected message', () => {
                const { getMessage } = Validators.required(undefined, 'test message');

                expect(getMessage()).toEqual('test message');
            });
        });

        describe('phone', () => {
            it('should return true and default message with undefined input', () => {
                const { isValid, getMessage } = Validators.phone(undefined);

                expect(isValid()).toEqual(true);
                expect(getMessage()).toEqual('Please enter a valid phone number.');
            });

            it('should return true with an input with only spaces', () => {
                const { isValid } = Validators.phone('   ');

                expect(isValid()).toEqual(true);
            });

            it('should return false with an invalid input', () => {
                const { isValid } = Validators.phone(' test ');

                expect(isValid()).toEqual(false);
            });

            it('should return true with a valid input', () => {
                const { isValid } = Validators.phone('612-555-1234');

                expect(isValid()).toEqual(true);
            });

            it('should return expected message', () => {
                const { getMessage } = Validators.phone(undefined, 'test message');

                expect(getMessage()).toEqual('test message');
            });
        });

        describe('email', () => {
            it('should return true and default message with undefined input', () => {
                const { isValid, getMessage } = Validators.email(undefined);

                expect(isValid()).toEqual(true);
                expect(getMessage()).toEqual('Please enter a valid e-mail address.');
            });

            it('should return true with an input with only spaces', () => {
                const { isValid } = Validators.email('   ');

                expect(isValid()).toEqual(true);
            });

            it('should return false with an invalid input', () => {
                const { isValid } = Validators.email(' test ');

                expect(isValid()).toEqual(false);
            });

            it('should return true with a valid input', () => {
                const { isValid } = Validators.email('email@test.com');

                expect(isValid()).toEqual(true);
            });

            it('should return expected message', () => {
                const { getMessage } = Validators.email(undefined, 'test message');

                expect(getMessage()).toEqual('test message');
            });
        });

        describe('custom', () => {
            it('should return false and default message with undefined input', () => {
                const { isValid, getMessage } = Validators.custom(undefined);

                expect(isValid()).toEqual(false);
                expect(getMessage()).toEqual('Please enter a value.');
            });

            it('should return true with a function that returns true', () => {
                const { isValid } = Validators.custom(() => true);

                expect(isValid()).toEqual(true);
            });

            it('should return false with an invalid input', () => {
                const { isValid } = Validators.custom(() => false);

                expect(isValid()).toEqual(false);
            });

            it('should return expected message', () => {
                const { getMessage } = Validators.custom(undefined, 'test message');

                expect(getMessage()).toEqual('test message');
            });
        });
    });
});
