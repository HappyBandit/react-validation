import { StaticValidator } from '../interfaces';

const number: StaticValidator = ( value, message) => ({
    isValid: () => {
        const trimmed = value ? value.trim() : '';
        if (trimmed === '') {
            return true;
        }

        return /^[0-9]+$/.test(value);
    },

    getMessage: () => {
        return message || 'Please enter a valid number.';
    },
});

export default number;