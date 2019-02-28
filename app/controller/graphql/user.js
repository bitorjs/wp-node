import {
  Controller,
  Get,
  Post
} from 'bitorjs-decorators';

const {graphql} = require("graphql/index")
const userschema = require('../../store/graphql/user');

@Controller('/graphql')
export default class {

  @Get('/user')
  async c(ctx, next) {
    
    let qr = await graphql(userschema, `
    {
      user(id: 2) {
        fullName
        email
        posts {
          id
          body
          comments {
            body
            author { fullName }
          }
        }
      }
    }
    `)
    console.log(qr)
  }
}