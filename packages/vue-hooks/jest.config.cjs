const config = require('../../config/jest.config.cjs');

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
module.exports = {
  ...config,
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};
