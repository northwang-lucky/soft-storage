const fs = require('fs-extra');
const sh = require('shelljs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../dist');

if (fs.existsSync(outputPath)) {
  fs.rmdirSync(outputPath);
}

const result = sh.exec('pnpm -F "smart-storage-*" build');
if (result.code !== 0) {
  throw new Error(result.stderr);
}

fs.mkdirSync(outputPath);
fs.moveSync(path.resolve(__dirname, '../playground/vue-demo/dist'), path.resolve(__dirname, '../dist/vue-demo'));
fs.moveSync(path.resolve(__dirname, '../playground/react-demo/dist'), path.resolve(__dirname, '../dist/react-demo'));
fs.moveSync(path.resolve(__dirname, '../docs/.vuepress/dist'), path.resolve(__dirname, '../dist/docs'));
