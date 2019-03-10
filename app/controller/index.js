import {
  Controller,
  Get,
  Post,
  Middleware
} from 'bitorjs-decorators';
import jwt from 'jsonwebtoken';
import { ENGINE_METHOD_ALL } from 'constants';

@Controller('/')
@Middleware(async (ctx, next)=>{
  console.log("..222", ctx.$config.env)
  next()
})
@Middleware("before")
export default class {

  @Get('/views')
  async abbb(ctx, next) {
    // ctx.set('Content-Type', 'text/html')
    // 
    await ctx.render('user');
    // try {
    // } catch (error) {
    //   console.log(error)
    // }
    console.log('page ...')
  }

  @Get('/views/1')
  async abbb(ctx, next) {
    
    return 1;
  }

  @Post('/login')
  @Middleware(async (ctx, next)=>{
    console.log("..rrrr")
    next()
  })
  b(ctx, next) {
    ctx.$get('/views/1?a=2&b=3',{
      a:1,
      b:2
    }).then(res=>{
      console.log("%%%%%%",res)
      debugger
    })
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