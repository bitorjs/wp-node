import Koa from 'koa';
import KoaRouter from 'koa-router';
import decorators from 'bitorjs-decorators';

import config from '../config';

// // 注入扩展
// const appExtends = require.context("./src/extend", true, /.*\.js$/);
// appExtends.keys().map(key => {
//   let appModule = appExtends(key);
//   appModule = appModule.default || appModule;
//   appModule(app)
// })


// 自动注册 中间件
const beforeRoutes = [],
  routes = [],
  afterRoutes = [],
  appExtends = [];

export default class extends Koa {

  constructor() {
    super()
  }

  registerRoutes(RouterController) {
    const instance = new RouterController(this);
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
    this.use(router.routes())
  }

  watch(requireContext) {
    requireContext.keys().map(key => {
      let m = requireContext(key);
      if (key.match(/\/middlewares\/routes.*\.js$/)) {
        routes.push(m.default || m)
      } else if (key.match(/\/middlewares\/before.*\.js$/)) {
        beforeRoutes.push(m.default || m)
      } else if (key.match(/\/middlewares\/after.*\.js$/)) {
        afterRoutes.push(m.default || m)
      } else if (key.match(/\/extend\/.*\.js$/)) {
        appExtends.push(m.default || m)
      }
    })
  }

  start(client, port = 1029) {

    client(this)

    appExtends.map(ex => {
      ex(this)
    })

    beforeRoutes.map(middleware => {
      this.use(middleware)
    })

    routes.map(route => {
      this.registerRoutes(route)
    })

    afterRoutes.map(middleware => {
      this.use(middleware)
    })

    this.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`)
    });
  }

};