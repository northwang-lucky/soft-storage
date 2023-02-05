const fs = require('fs-extra');
const path = require('path');

const outputPath = path.resolve(__dirname, '../coverage');

if (fs.existsSync(outputPath)) {
  fs.rmdirSync(outputPath, { recursive: true, force: true });
}

const pkgs = fs.readdirSync(path.resolve(__dirname, '../packages'));
fs.mkdirSync(outputPath);
pkgs.forEach(pkg => {
  fs.moveSync(
    path.resolve(__dirname, `../packages/${pkg}/coverage/clover.xml`),
    path.resolve(__dirname, `../coverage/${pkg}-clover.xml`)
  );
});
