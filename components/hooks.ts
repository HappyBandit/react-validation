import React, { useState, useContext, useEffect } from 'react';
import FormContext from './formContext';
import { IValidatorOutput, IWrapperOutput } from './interfaces';

function uuidV4(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c): string =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
    );
}

export const useInputValidation = (validators: IValidatorOutput[]): IWrapperOutput => {
    const [ valid, setValid ] = useState<boolean>(true);
    const [ message, setMessage ] = useState<string | React.ReactElement>(undefined);

    // Will only generate uuid on the first call, needed to update registration.
    const [ uuid ] = useState(() => uuidV4());
    const { register } = useContext(FormContext);

    function isValid(): boolean {
        let valid = true;
        setMessage(undefined);

        validators.every((validator): boolean => {
            if ( !validator.isValid() ) {
                valid = false;
                setMessage(validator.getMessage());
            }

            return valid;
        });

        setValid(valid);

        return valid;
    }

    useEffect((): void => register(uuid, {
        isValid,
    }));

    return { valid, message };
};

export const useValidators = (validators: IValidatorOutput[]): IWrapperOutput => {
    const result: IWrapperOutput = {
        valid: true,
        message: '',
    };

    validators.every((validator): boolean => {
        const isValid = validator.isValid();

        if ( !isValid ) {
            result.valid = false;
            result.message = validator.getMessage();
        }

        return isValid;
    });

    return result;
};
