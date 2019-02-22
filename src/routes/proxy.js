import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import koaProxy from 'koa-proxy';

@Controller('/proxy')
export default class {

  @Get('/style')
  c(ctx, next) {
    koaProxy({
      host: 'http://auth.mzftech.cn',
      map: {
        style: 'style.css'
      }
    })(ctx, next)
  }

  @Post('/login')
  b(ctx, next) {
    koaProxy({
      host: 'http://auth2.mzftech.cn',
      map: {
        login: '/public/employee'
      }
    })(ctx, next)
  }

  @Get('*')
  a(ctx, next) {
    ctx.response.body = '<h1>未找到 proxy </h1>'
  }
}