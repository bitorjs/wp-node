import KoaAppliction from './inject';
import config from './config';
import views from 'koa-views';
import koaRoute from 'koa-router';
import path from 'path';

let client = app => {

  const route = new koaRoute();
  app.use(views(path.join(__dirname, '../app/view'), {
    extension: 'ejs',
    // map: {
    //   html: 'nunjucks'
    // }
  }))


  class A {
    async xxx(ctx, next) {
      await ctx.render('user')
      // ctx.body = 56;
      console.log(this, 1)
    }
  }
  const aa = new A()
  route['get']('/views', async (ctx, next) => await aa.xxx.call(aa, ctx, next))
  app.use(route.routes())

  app.watch(require.context("./app", true, /.*\.js$/));
  app.watch(require.context("./config", true, /.*\.js$/));


}

new KoaAppliction().start(client, config.port);