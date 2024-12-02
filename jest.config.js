// jest.config.js
export default {
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest',  // Use Babel to transform .js files
    },
    transformIgnorePatterns: [
        '/node_modules/(?!aws-sdk)/',  // Don't transform aws-sdk if you want to mock it
    ],
    moduleFileExtensions: ['js', 'json', 'node'], // Include JS extensions
};
