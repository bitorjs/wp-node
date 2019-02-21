import {
  Controller,
  Get
} from 'bitorjs-decorators';

@Controller('/')
export default class {

  @Get('/')
  a(ctx, next) {
    ctx.response.body = '<h1>index3102 page</h1>'
  }

  @Get('/home')
  b(ctx, next) {
    ctx.response.body = '<h1>HOME page</h1>'
  }

  @Get('/404')
  c(ctx, next) {
    ctx.response.body = '<h1>404 Not Found</h1>'
    ctx.redirect('/');
  }
}