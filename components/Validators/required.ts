import { StaticValidator } from '../interfaces';

const required: StaticValidator = (value, message) => ({
    isValid: (): boolean => {
        return !!value && value.trim() > '';
    },

    getMessage: () => {
        return message || 'Please enter a value.';
    },
});

export default required;
