const { defineConfig } = require('rollup');
const config = require('../../config/rollup.config.cjs');

module.exports = defineConfig({
  ...config,
  external: ['@smart-storage/shared'],
});
