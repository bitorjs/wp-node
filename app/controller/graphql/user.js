import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';
// import { graphql, buildSchema }  from 'graphql'
const { composeWithMysql ,graphql} = require("graphql-compose-mysql")


@Controller('/graphql')
export default class {

  @Get('/')
  async abbb(ctx, next) {

    await ctx.render('graphql');
  }

  @Post('/')
  async g(ctx, next){
    try {
      const schema = await composeWithMysql({
        mysqlConfig: {
            host: "localhost",
            port: 3306,
            user: "root",
            password: "root",
            database: "test"
        },
      });

      let qr = await graphql(schema, ctx.request.body.query, {},{});

      ctx.body = qr;
    } catch (error) {
      console.log(error)
    }
    
  }

  @Get('/test')
  async c(ctx, next) {
    try {
    //定义schema
    var schema = buildSchema(`
    type User{
        name: String
        sex: String
        intro: String
    }
    type Query {
        user:User
    }
    `);
    //定义服务端数据
    var root= {
      user: {
          name: 'zhaiqianfeng',
          ip: '男',
          intro: '博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3'
      },
      tag: {
        id:1,
      }
    };

    
    let qr = await graphql(schema, `{
            user {
              name
              ip
            }
        }`, {},{});
    ctx.body = JSON.stringify(qr,null,2);
    } catch (error) {
      console.log(error)
    }
    
  }
}