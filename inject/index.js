import Koa from 'koa';
import KoaRouter from 'koa-router';
import decorators from 'bitorjs-decorators';
import convert from 'koa-convert';
import compose from 'koa-compose';
var HashMap = require('hashmap');

const router = new KoaRouter();

// 自动注册 中间件
const appExtends = [],
plugins = [];

const _controllers = []
const _modules = [];

const _middlewares = new Map();
const _middlewareHashMap = new HashMap();

export default class extends Koa {

  constructor() {
    super()
    this.context.$config = {}
    this.$config = this.context.$config;
    console.log("this.ctx", this.ctx)
    const _use = this.use
    this.use = x => _use.call(this, convert(x))
  }

  registerMiddleware(filename, middleware) {
    if (_middlewares.has(filename)===false) {
      _middlewares.set(filename, middleware);
    } else {
      throw new Error(`Middleware [${filename}] has been declared`)
    }
  }

  registerController(controller) {
    const instance = new controller(this);
    instance.ctx = this.context;

    let controllMiddlewares = decorators.getMiddleware(controller);
    controllMiddlewares = controllMiddlewares || [];
    controllMiddlewares.reverse();
    
    const preMiddlewares = [];
    for (let index = 0; index < controllMiddlewares.length; index++) {
      let middleware = controllMiddlewares[index];
      if(Object.prototype.toString.call(middleware)==="[object String]") {
        
        if(_middlewares.has(middleware)) preMiddlewares.push(_middlewares.get(middleware));
      } else {
        // 直接注入中间件函数
        preMiddlewares.push(middleware)
      }
    }

    decorators.iterator(controller, (prefix, subroute) => {
      let path;
      if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
        subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
        subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
        path = `${prefix.path}${subroute.path}`
      } else {
        path = `${subroute.path}`
      }
      console.log(path)
      let middlewares =decorators.getMiddleware(instance,subroute.prototype)
      middlewares = middlewares ||[];
      middlewares.reverse();

      if(middlewares.length>0||preMiddlewares.length>0) {
        let controllerMiddlewares = [].concat(preMiddlewares);
        for (let index = 0; index < middlewares.length; index++) {
          let middleware = middlewares[index];
          if(Object.prototype.toString.call(middleware)==="[object String]") {
            if(_middlewares.has(middleware)) controllerMiddlewares.push(_middlewares.get(middleware));
          } else {
            // 直接注入中间件函数
            controllerMiddlewares.push(middleware)
          }
        }

        controllerMiddlewares.push(
          instance[subroute.prototype].bind(instance)
        )

        const fn = compose(controllerMiddlewares);
        router[subroute.method.toLowerCase()](path, fn)
      } else {
        router[subroute.method.toLowerCase()](path, instance[subroute.prototype].bind(instance))
      }
    })
  }

  watch(requireContext) {
    requireContext.keys().map(key => {
      console.log(key)
      let m = requireContext(key);
      m = m.default || m;
      let filename = key.replace(/(.*\/)*([^.]+).*/ig, "$2");

      if (key.match(/\/controller.*\.js$/)) {
        _controllers.push(m)
      } else if (key.match(/\/middleware\/.*\.js$/)) {
        _middlewareHashMap.set(filename, m)
      } else if (key.match(/\/extend\/.*\.js$/)) {
        appExtends.push(m)
      } else if (key.match(/\/plugin\.config\.js$/) != null) {
        m.forEach(item => {
          if (item.enable === true) _modules.push(item);
        })
      } else if (key.match(/\/development\.config\.js$/) != null) {
        if (this.$config.env === 'development') {
          this.$config = Object.assign(this.$config, m)
        }
      } else if (key.match(/\/production\.config\.js$/) != null) {
        if (this.$config.env === 'production') {
          this.$config = Object.assign(this.$config, m)
        }
      } else if (key.match(/\/app\.config\.js$/) != null) {
        this.$config = Object.assign(this.$config, m)
      }
    })
  }

  start(client, port = 1029) {

    client(this)

    console.info("挂载其它插件")
    _modules.forEach(m => {
      console.info("插件-", m.name)
      m.module(this, m)
    })

    console.info("注册所有中间件")
    _middlewareHashMap.forEach((m, filename) => {
      this.registerMiddleware(filename, m);
    })

    appExtends.map(ex => {
      ex(this)
    })

    _controllers.map(routeCtrl => {
      this.registerController(routeCtrl)
    })
    this.use(router.routes())

    this.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`)
    });

    return this;
  }

}