import Koa from 'koa';
import KoaRouter from 'koa-router';
const app = new Koa();
const router = new KoaRouter();
const files = require.context(".", true, /\/controllers\/.*\.js$/);
console.log(files.keys())
files.keys().map(key => {
  let m = files(key);
  console.log(m.default || m)
})

// 添加路由
router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>index32 page</h1>'
})

router.get('/home', async (ctx, next) => {
  ctx.response.body = '<h1>HOME page</h1>'
})

router.get('/404', async (ctx, next) => {
  ctx.response.body = '<h1>404 Not Found</h1>'
})

// 调用路由中间件
app.use(router.routes())

app.listen(1029, () => {
  console.log('server is running at http://localhost:1029')
});