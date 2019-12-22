import React from 'react';
import { StaticValidator } from '../interfaces';

const required: StaticValidator = (value, message) => ({
    isValid: (): boolean => {
        return !!value && value.trim() > '';
    },

    getMessage: (): string | React.ReactElement => {
        return message || 'Please enter a value.';
    },
});

export default required;