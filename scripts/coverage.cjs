const server = require('live-server');
const { resolve } = require('path');

const packageName = process.env.npm_package_config_name;
const options = {
  port: 5176,
  root: resolve(__dirname, `../packages/${packageName}/coverage/lcov-report`),
  file: 'index.html',
  open: true,
};
server.start(options);
