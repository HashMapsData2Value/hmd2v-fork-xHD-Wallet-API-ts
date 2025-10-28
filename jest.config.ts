module.exports = {
    preset: 'ts-jest/presets/default-esm',
    testPathIgnorePatterns: ["src"],
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            useESM: true
        }
    }
};
