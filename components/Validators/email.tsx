import React from 'react';
import { StaticValidator } from '../interfaces';

const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b$/i;

const email: StaticValidator = (value, message) => ({
    isValid: () => {
        const trimmed = value ? value.trim() : '';
        if (trimmed === '') {
            return true;
        }

        return emailRegex.test(value);
    },

    getMessage: () => {
        return message || 'Please enter a valid e-mail address.';
    },
});

export default email;