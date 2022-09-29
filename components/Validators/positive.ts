import { StaticValidator } from '../interfaces';

const positive: StaticValidator = ( value, message) => ({
    isValid: () => {
        const trimmed = value ? value.trim() : '';
        if (trimmed === '') {
            return true;
        }

        return parseInt(value) >= 0;
    },

    getMessage: () => {
        return message || 'Please enter a positive number.';
    },
});

export default positive;