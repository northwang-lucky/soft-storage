const fs = require('fs-extra');
const path = require('path');

const repositories = fs.readdirSync(path.resolve(__dirname, '../packages')).filter(d => !d.startsWith('.'));
const readmePath = path.resolve(__dirname, '../README.md');

repositories.forEach(repo => {
  const workReadmePath = path.resolve(__dirname, `../packages/${repo}/README.md`);
  fs.copyFileSync(readmePath, workReadmePath);
});
