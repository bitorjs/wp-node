import {
  Controller,
  Get
} from 'bitorjs-decorators';
import proxy from 'koa-proxy';

@Controller('/proxy')
export default class {

  @Get('/api')
  c(ctx, next) {
    return proxy({
      host: 'http://alicdn.com'
    })(ctx, netx)
  }

  @Get('/upload')
  b(ctx, next) {
    return proxy({
      host: 'http://alicdn.com'
    })(ctx, netx)
  }

  @Get('*')
  a(ctx, next) {
    ctx.response.body = '<h1>未找到 proxy </h1>'
  }
}