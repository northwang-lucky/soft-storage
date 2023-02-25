const fs = require('fs-extra');
const sh = require('shelljs');
const path = require('path');

const outputPath = path.resolve(__dirname, '../dist');

if (fs.existsSync(outputPath)) {
  fs.rmdirSync(outputPath, { recursive: true, force: true });
}

const result = sh.exec('pnpm -F "smart-storage-*" build');
if (result.code !== 0) {
  throw new Error(result.stderr);
}

fs.mkdirSync(outputPath);
fs.moveSync(path.resolve(__dirname, '../playground/vue-demo/dist'), path.resolve(outputPath, './vue-demo'));
fs.moveSync(path.resolve(__dirname, '../playground/react-demo/dist'), path.resolve(outputPath, './react-demo'));
fs.moveSync(path.resolve(__dirname, '../docs/.vuepress/dist'), path.resolve(outputPath, './docs'));

const indexHtmlPath = path.resolve(outputPath, './index.html');
fs.createFileSync(indexHtmlPath);
fs.writeFileSync(indexHtmlPath, /* html */ `<script>window.location.href = './docs/'</script>`);
