import { StaticValidator } from '../interfaces';

const percent: StaticValidator = ( value, message) => ({
    isValid: () => {
        const trimmed = value ? value.trim() : '';
        if (trimmed === '') {
            return true;
        }

        return parseInt(value) >= 0 && parseInt(value) <= 100;
    },

    getMessage: () => {
        return message || 'Please enter a percentage.';
    },
});

export default percent;