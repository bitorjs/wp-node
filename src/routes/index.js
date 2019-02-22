import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';

@Controller('/')
export default class {

  @Get('/')
  a(ctx, next) {
    ctx.response.body = '<h1>index3102 page</h1>'
    next()
  }

  @Get('*')
  c(ctx, next) {
    ctx.response.body = '<h1>404 Not Found</h1>'
    ctx.redirect('/');
  }
}