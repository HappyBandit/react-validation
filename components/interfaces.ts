import React from 'react';
import { FormHTMLAttributes } from 'react';
import { Omit } from 'yargs';

export interface IFormProps extends Partial<Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>> {
    /**
     * triggered on submit with `valid` determined by the validation of the input,
     */
    onSubmit: (valid: boolean) => void;
}

export interface IInputObject {
    isValid: () => boolean;
}

export interface IWrapperOutput {
    valid: boolean;
    message: string | React.ReactElement;
}

export interface IValidatorOutput {
    isValid: () => boolean;
    getMessage: () => string | React.ReactElement;
}

export type StaticValidator = (value: string, message?: string) => IValidatorOutput;
export type CustomValidator = (validationFunction: () => boolean, message?: string) => IValidatorOutput;
export type Validator = StaticValidator | CustomValidator;