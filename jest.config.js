/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    testEnvironment: "jsdom",
    collectCoverage: false,
    collectCoverageFrom: ["src/**/*.{js,jsx}"],
    coverageDirectory: "coverage",

    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    moduleNameMapper: {
        "\\.(png)$": "<rootDir>/src/test/imageMock.js",
        "axios": "axios/dist/node/axios.cjs",
        '^.+\\.(css|less)$': '<rootDir>/src/test/cssMock.js'
    },
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    }
};
