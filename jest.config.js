module.exports = {
    setupFiles: ['./jest/setup.js'],

    moduleNameMapper: {
        '^.+\\.less$': 'identity-obj-proxy',
        '^.+\\.(png|jpg|gif|svg|ttf|woff|woff2|eot|xml)$': '<rootDir>/jest/mocks/file.js'
    },

    snapshotSerializers: ['enzyme-to-json/serializer']
};
