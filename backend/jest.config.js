module.exports = {
  maxWorkers:1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Use 'ts-jest' directly under transform
  },
  testTimeout: 10000,  // Global timeout for all tests (in milliseconds)
  testMatch: ['**/test/**/*.test.ts'],
};
