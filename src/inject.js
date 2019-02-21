import KoaRouter from 'koa-router';
import decorators from 'bitorjs-decorators';

export default (app) => {

  const routes = require.context("./auto", true, /.*\.js$/);

  function registerController(RouterController) {
    const instance = new RouterController(app)
    const router = new KoaRouter();

    decorators.iterator(RouterController, (prefix, subroute) => {
      let path;
      if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
        subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
        subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
        path = `${prefix.path}${subroute.path}`
      } else {
        path = `${subroute.path}`
      }
      console.log(path)
      router[subroute.method.toLowerCase()](path, instance[subroute.prototype].bind(instance))
    })

    // 调用路由中间件
    app.use(router.routes())
  }

  routes.keys().map(key => {
    let m = routes(key);

    if (key.match(/\/controllers\/.*\.js$/)) {
      console.log(m.default || m, key, 1)
      registerController(m.default || m)
    } else if (key.match(/\/middlewares\/.*\.js$/)) {
      console.log(m.default || m, key, 2)
      app.use(m.default || m)
    } else if (key.match(/\/extend\/.*\.js$/)) {
      console.log(m.default || m, key, 3)
      let e = m.default || m;
      e(app)
    }
  })
}