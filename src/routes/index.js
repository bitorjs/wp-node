import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import jwt from 'jsonwebtoken';


@Controller('/')
export default class {

  @Get('/')
  a(ctx, next) {
    ctx.response.body = '<h1>index3102 page</h1>'
    next()
  }

  @Post('/login')
  a(ctx, next) {
    ctx.type = 'application/json;charset=UTF-8';
    const token = jwt.sign({
      name: 'huangzj',
      _id: '10010'
    }, '密钥', {
      expiresIn: '2h'
    });
    return ctx.body = {
      code: '000001',
      token: token,
      msg: '登录成功'
    }
  }
}