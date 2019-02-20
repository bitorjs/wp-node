const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();



app.use((ctx) => {
  if (ctx.request.url == '/about') {
    ctx.body = 'aa';
  } else {
    ctx.body = 'sdfsd';
  }
});

app.listen(1029);

import fs from 'fs';