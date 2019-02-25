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
  async a(ctx, next) {
    // ctx.body = 'sss'
    try {
      return await ctx.render('user');
    } catch (error) {
      console.log(error)
    }

    // axios.post('/login').then(res => {
    //   console.log('axios ... post ')
    // }).catch(err => {
    //   console.log('axios post ... ')
    // })
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