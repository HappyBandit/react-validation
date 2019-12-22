import React, { useRef } from 'react';
import FormContext from '../formContext';
import { IFormProps, IInputObject } from '../interfaces';

const Form: React.FunctionComponent<IFormProps> = ( { onSubmit, ...formProps } ): React.ReactElement => {
    const { current: inputs } = useRef<{ [key: string]: IInputObject }>( {} );

    const addInput = ( uuid, newInput: IInputObject ): void => {
        inputs[uuid] = newInput;
    };
    const handleSubmit = ( event: React.FormEvent ) => {
        event.preventDefault();

        let valid = true;

        Object.values( inputs ).forEach( ( input ) => {
            if ( !input.isValid() ) {
                valid = false;
            }
        } );

        onSubmit( valid );
    };

    const context = {
        register: addInput,
    };

    return (
        <FormContext.Provider value={context}>
            <form {...formProps} onSubmit={handleSubmit}/>
        </FormContext.Provider>
    );
};

export default Form;
