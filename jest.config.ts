module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  "moduleNameMapper": {
    "/\.(css|less)$/": "identity-obj-proxy"
  },
  "resolver": undefined,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg|avif)$': 'jest-transform-stub',
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverage: true,
};
