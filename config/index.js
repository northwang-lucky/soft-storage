const MODE = process.env.MODE || 'vercel';

const DOMAIN = MODE === 'github' ? 'northwang-lucky.github.io' : 'smart-storage.vercel.app';
const BASE_PATH = MODE === 'github' ? '/smart-storage-pages' : '';

module.exports = {
  DOMAIN,
  BASE_PATH,
};
