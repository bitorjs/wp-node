import KoaAppliction from './inject';
import config from './config';
// import views from 'koa-views';
// import KoaRouter from 'koa-router';

// import path from 'path';
let client = app => {
  // app.use(views(path.join(__dirname, '../app/view'), {
  //   extension: 'ejs',
  //   // map: {
  //   //   html: 'nunjucks'
  //   // }
  // }))

  // const router = new KoaRouter();

  // function aa() {
  //   return (ctx, next) => {
  //     console.log('...netx4')
  //     next()
  //   }
  // }

  // router.get('/views', async (ctx, next) => {
  //   console.log('apge')
  //   await ctx.render('user')

  // })
  // app.use(async (ctx, next) => {
  //   console.log('...netx1')
  //   await next()
  // })
  // app.use(async (ctx, next) => {
  //   console.log('...netx2')
  //   await next()
  // })
  // app.use(async (ctx, next) => {
  //   console.log('...netx3')
  //   await next()
  // })

  // app.use(aa())
  // app.use(router.routes())


  app.watch(require.context("./app", true, /.*\.js$/));
  app.watch(require.context("./config", true, /.*\.js$/));
}

new KoaAppliction().start(client, config.port);