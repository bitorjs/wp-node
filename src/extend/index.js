import koaBody from 'koa-body'; //koa-bodyparser内置Request Body的解析器, 支持x-www-form-urlencoded, application/json等格式的请求体，但不支持form-data的请求体,，需要借助 formidable 这个库，也可以直接使用 koa-body 支持multipart，urlencoded和json请求体
import koaStatic from 'koa-static'; // 配置静态文件服务的中间件
import koaJWT from 'koa-jwt'; //JWT(Json Web Tokens)
import koaHelmet from 'koa-helmet'; //增加如Strict-Transport-Security, X-Frame-Options, X-Frame-Options等网络安全HTTP头
import koaCompress from 'koa-compress'; // 启用类似Gzip的压缩技术减少传输内容
import koaLogger from 'koa-logger'; //请求日志的功能，包括请求的url、状态码、响应时间、响应体大小等信息,  koa-bunyan-logger 提供了更丰富的功能。
import koaCors from 'koa2-cors';
import path from 'path';
import views from 'koa-views';


import {
  getUploadFileExt,
  getUploadDirName,
  checkDirExist,
  getUploadFileName
} from '../libs/index';

const cwd = process.cwd();
export default app => {
  // app.use(log4js.koaLogger(log4js.getLogger("cheese"), {
  //   level: 'auto'
  // }))
  app.use(views(path.join(__dirname, '../src/html'), {
    extension: 'ejs',
    // map: {
    //   html: 'nunjucks'
    // }
  }))
  // app.use(koaLogger());
  app.use(koaHelmet());
  app.use(koaCors({
    origin: function (ctx) {
      if (ctx.url === '/test') {
        return false;
      }
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));
  app.use(koaJWT({
    secret: '密钥'
  }).unless({
    path: ['/', '/login', '/sso/login', '/views', '/favicon.ico']
  }));

  app.use(koaStatic(path.join(cwd, 'public')));
  app.use(koaBody({
    multipart: true, // 支持文件上传
    // encoding: 'gzip',
    // jsonStrict: false, // for json
    strict: false, // for method
    formidable: {
      uploadDir: path.join(cwd, 'public/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => { // 文件上传前的设置
        if (file.size === 0) return false;
        console.log(name, file)
        // 获取文件后缀
        const ext = getUploadFileExt(file.name);
        // 最终要保存到的文件夹目录
        const dirName = getUploadDirName();
        const dir = path.join(cwd, `public/upload/${dirName}`);
        // 检查文件夹是否存在如果不存在则新建文件夹
        checkDirExist(dir);
        // 获取文件名称
        const fileName = getUploadFileName(ext);
        // 重新覆盖 file.path 属性
        file.path = `${dir}/${fileName}`;
        app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
        app.context.uploadpath[name] = `${dirName}/${fileName}`;
      },
      onError: (err) => {
        console.log(err);
      }
    }
  }));
  app.use(koaCompress({
    filter: function (content_type) {
      return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  }));

}