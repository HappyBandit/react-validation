import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Form from './Form';
import { useInputValidation } from './hooks';
import { email, phone, required } from './Validators';

const Text = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const result = useInputValidation([ required(value, 'ENTER SOMETHING') ]);

    return (
        <div className="col-4 mb-3">
            <label htmlFor="validationCustomUsername">Username</label>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                </div>
                <input
                    type="text"
                    className={`form-control ${result.valid ? '' : 'is-invalid'}`}
                    id="validationCustomUsername"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    onChange={(event) => onChange(event.currentTarget.value)}
                />
                <div className="invalid-feedback">
                    {result.message}
                </div>
            </div>
        </div>
    );
};

const Phone = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const result = useInputValidation([ phone(value, 'ENTER A PHONE') ]);

    return (
        <div className="col-4 mb-3">
            <label htmlFor="phone">Username</label>
            <input
                type="text"
                className={`form-control ${result.valid ? '' : 'is-invalid'}`}
                id="phone"
                placeholder="Phone Number"
                onChange={(event) => onChange(event.currentTarget.value)}
            />
            <div className="invalid-feedback">
                {result.message}
            </div>
        </div>
    );
};

const Email = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const result = useInputValidation([
        required(value, 'ENTER SOMETHING'),
        email(value, 'MUST BE A VALID EMAIL'),
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

const ValidationStory = () => {
    const [ text, setText ] = useState(undefined);
    const [ phone, setPhone ] = useState(undefined);
    const [ email, setEmail ] = useState(undefined);

    return (
        <Form
            onSubmit={action('submit')}
        >
            <div className="row">
                <Text value={text} onChange={(value) => setText(value)}/>
                <Phone value={phone} onChange={(value) => setPhone(value)}/>
                <Email value={email} onChange={(value) => setEmail(value)}/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </Form>
    );
};

storiesOf('Components', module)
    .add('Validation', (): React.ReactElement => {
        return <ValidationStory/>;
    }, {
        info: `
A Hooks based validation system
  `,
    });
