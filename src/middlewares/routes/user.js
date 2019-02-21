import {
  Controller,
  Get
} from 'bitorjs-decorators';
import jwt from 'jsonwebtoken';

@Controller('/user')
export default class {

  @Get('/')
  c(ctx, next) {
    ctx.response.body = '<h1>index3102 page</h1>'
  }

  @Get('/login')
  b(ctx, next) {
    ctx.response.body = '<h1>已登录</h1>'
    const token = jwt.sign({
      name: 'user',
      _id: '1'
    }, 'my_token', {
      expiresIn: '2h'
    });
    return ctx.body = {
      code: '000001',
      data: token,
      msg: '登录成功'
    }
  }

  @Get('*')
  a(ctx, next) {
    ctx.response.body = '<h1>未找到 user 中指定页面</h1>'
  }
}