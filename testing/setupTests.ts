import nodeCrypto from 'crypto';
import '@testing-library/jest-dom/extend-expect';

// Polyfill for Validation logic
(global as any).crypto = {
    getRandomValues: function(buffer) {
        return nodeCrypto.randomFillSync(buffer);
    },
};
