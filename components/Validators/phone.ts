import { StaticValidator } from '../interfaces';

const phone: StaticValidator = (value, message) => ({
    isValid: () => {
        const trimmed = value ? value.trim() : '';
        if (trimmed === '') {
            return true;
        }

        return /^1?[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/.test((value).replace(/\D/g, ''));
    },

    getMessage: () => {
        return message || 'Please enter a valid phone number.';
    },
});

export default phone;
