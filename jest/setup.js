// Jest setup file
// Contents loaded prior to running a test suite

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Fail tests on any warning
console.error = (message) => {
    throw new Error(message);
};
