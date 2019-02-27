import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';

@Controller('/sso')
export default class {

  @Get('/login')
  async a(ctx, next) {
    // 获取通行证
    let ticket = await ctx.sso.findTicketByStamp()

    // // 获取sso账号信息
    // let ssoData = await ctx.sso.verifyTicketAndGetAdmin(ticket)

    // if (ssoData) {
    //   // 至此，已获取sso信息，后面只需将用户置为登录状态
    //   console.log(ssoData.id)


    //   /****** 以下根据具体业务场景自己写 ******/
    //   /****** 例： ******/
    //   // koa-session 登录
    //   ctx.session.userId = ssoData.id
    //   ctx.success('登录成功')
    //   const params = qs.parse(ctx.request.querystring)
    //   // 登录成功后跳转到之前所在页面
    //   if (params.redirect) {
    //     ctx.response.redirect(params.redirect);
    //   }
    // }
    ctx.body = 'ss'
  }

}