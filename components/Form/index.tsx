import React, { useCallback, useRef } from 'react';
import FormContext from '../formContext';
import { IFormProps, IInputObject } from '../interfaces';

/**
 * Wrapper required to catch and validate submit events.
 */
const Form: React.FC<IFormProps> = ( { onSubmit, ...formProps } ): React.ReactElement => {
    const { current: inputs } = useRef<{ [key: string]: IInputObject }>( {} );

    const addInput = useCallback(( uuid, newInput: IInputObject ): () => void => {
        inputs[uuid] = newInput;

        return () => {
            delete inputs[uuid];
        };
    }, []);
    const handleSubmit = useCallback(( event: React.FormEvent ) => {
        event.preventDefault();

        let valid = true;

        Object.values( inputs ).forEach( ( input ) => {
            if ( !input.isValid() ) {
                valid = false;
            }
        } );

        onSubmit( valid );
    }, [onSubmit]);

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
