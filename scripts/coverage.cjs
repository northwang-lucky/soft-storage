const open = require('open');
const { resolve } = require('path');

const packageName = process.env.npm_package_config_name;
open(`file://${resolve(__dirname, `../packages/${packageName}/coverage/lcov-report/index.html`)}`);
