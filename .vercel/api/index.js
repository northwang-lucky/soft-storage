const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/smart-storage', (req, rsp, next) => {
  const target = `${req.protocol}://${req.headers.host}`;
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { '/smart-storage': '' },
    logger: console,
  });
  proxy(req, rsp, next);
});

module.exports = app;
