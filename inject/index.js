import Koa from 'koa';
import KoaRouter from 'koa-router';
import decorators from 'bitorjs-decorators';
import convert from 'koa-convert';


const router = new KoaRouter();

// 自动注册 中间件
const beforeRoutes = [],
  routes = [],
  afterRoutes = [],
  appExtends = [],
  plugins = [];

export default class extends Koa {

  constructor() {
    super()

    const _use = this.use
    this.use = x => _use.call(this, convert(x))
  }

  registerRoutes(RouterController) {
    const instance = new RouterController(this);
    decorators.iterator(RouterController, (prefix, subroute) => {
      let path;
      if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
        subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
        subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
        path = `${prefix.path}${subroute.path}`
      } else {
        path = `${subroute.path}`
      }
      console.log(path, subroute.method.toLowerCase())
      router[subroute.method.toLowerCase()](path, instance[subroute.prototype].bind(instance))
    })
  }

  watch(requireContext) {
    requireContext.keys().map(key => {
      let m = requireContext(key);
      if (key.match(/\/controller.*\.js$/)) {
        routes.push(m.default || m)
      } else if (key.match(/\/middlewares\/before.*\.js$/)) {
        beforeRoutes.push(m.default || m)
      } else if (key.match(/\/middlewares\/after.*\.js$/)) {
        afterRoutes.push(m.default || m)
      } else if (key.match(/\/extend\/.*\.js$/)) {
        appExtends.push(m.default || m)
      } else if (key.match(/\/plugins\.js$/)) {
        // plugins.push(m.default || m)
        let plugins = m.default || m;

        plugins.map(item => {
          item.module(this)
        })
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
      console.log(Object.prototype.toString.call(middleware))
    })

    routes.map(routeCtrl => {
      this.registerRoutes(routeCtrl)
    })
    this.use(router.routes())

    afterRoutes.map(middleware => {
      this.use(middleware)
    })

    debugger
    this.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`)
    });

    return this;
  }

}