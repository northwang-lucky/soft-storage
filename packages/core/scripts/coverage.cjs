const open = require('open');
const { resolve } = require('path');

open(`file://${resolve(__dirname, '../coverage/lcov-report/index.html')}`);
