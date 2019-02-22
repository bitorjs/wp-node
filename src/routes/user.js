import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import jwt from 'jsonwebtoken';

@Controller('/user')
export default class {

  @Post('/')
  c(ctx, next) {
    return ctx.response.body = {
      code: '000001',
      msg: '登录成功',
      data: {
        url: ctx.url,
        query: ctx.request.body,
        request: ctx.request
      }
    }
  }
  @Get('/login')
  c(ctx, next) {
    return ctx.response.body = {
      code: '000001',
      msg: '登录成功',
      data: {
        url: ctx.url,
        query: ctx.request.query || ctx.query,
        request: ctx.request
      }
    }
  }

  @Post('/login')
  b(ctx, next) {
    ctx.response.type = 'application/json;charset=UTF-8';
    const token = jwt.sign({
      name: 'user',
      _id: '1'
    }, 'my_token', {
      expiresIn: '2h'
    });
    return ctx.response.body = {
      code: '000001',
      token: token,
      msg: '登录成功',
      data: {
        url: ctx.url,
        query: ctx.request.body,
        request: ctx.request
      }
    }
  }

  @Post('/info')
  a(ctx, next) {
    return ctx.response.body = {
      code: '000001',
      msg: 'Info',
      data: {
        url: ctx.url,
        query: ctx.request.body,
        request: ctx.request
      }
    }
  }
}