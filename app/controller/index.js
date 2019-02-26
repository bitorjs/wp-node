import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
import jwt from 'jsonwebtoken';

import axios from '../libs/axios';


@Controller('/')
export default class {

  @Get('/views')
  async abbb(ctx, next) {
    // ctx.set('Content-Type', 'text/html')
    // 
    try {
      await ctx.render('user');
    } catch (error) {
      console.log(error)
    }
  }

  @Post('/login')
  b(ctx, next) {
    console.log('login ........', ctx.url)
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