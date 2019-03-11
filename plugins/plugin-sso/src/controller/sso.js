import {
  Controller,
  Get,
  Middleware
} from 'bitorjs-decorators';

@Controller('/sso')
export default class {

  @Get('/login')
  @Middleware("after")
  @Middleware("test")
  async a(ctx, next) {
    // 获取通行证
    let ticket = await ctx.sso.findTicketByStamp()

    ctx.body = 'ss'
  }

}