const { defineConfig } = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const nodeResolve = require('@rollup/plugin-node-resolve');

module.exports = defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: './dist/index.es.js',
      format: 'esm',
    },
  ],
  plugins: [typescript(), commonjs(), terser(), nodeResolve()],
});
