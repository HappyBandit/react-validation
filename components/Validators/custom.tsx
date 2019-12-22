import React from 'react';
import { CustomValidator } from '../interfaces';

const required: CustomValidator = (validationFunction, message) => ({
    isValid: () => {
        if(typeof validationFunction !== 'function'){
            console.error('Custom Validation is missing function');
            return false;
        }

        return validationFunction();
    },

    getMessage: () => {
        return message || 'Please enter a value.';
    },
});

export default required;