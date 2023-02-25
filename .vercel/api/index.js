const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api/proxy/*', (req, rsp, next) => {
  const target = `${req.protocol}://${req.headers.host}`;
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '/api/proxy': '',
    },
    logger: console,
  });
  proxy(req, rsp, next);
});

module.exports = app;
