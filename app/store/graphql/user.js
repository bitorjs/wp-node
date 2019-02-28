// Import the required libraries
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql/index');

// 用“id”和“name”两个字符串字段定义User类型。User的类型是GraphQLObjectType，他的子字段具有自己的类型（在这种情况下，GraphQLString）。
var userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString,
      description: "item id"
    },
    name: { type: GraphQLString },
  }
});

// 定义一个顶级字段架构“User”，它接收一个参数“id”，并根据ID，来返回用户。请注意，`query`是GraphQLObjectType，就像“User”。然而我们在上面定义的“user”这个字段，是一个userType。
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts：` args `描述参数，接受` user`查询。
        args: {
          id: { type: GraphQLString }
        },
        // 怎么去"resolve" 或者实现解决函数的描述？传入查询，在这种情况下，我们使用从上面的“ID”参数作为一个key，获取来自'data'的'User'
        resolve: function (_, args) {
          return 0;//data[args.id];
        }
      }
    }
  })
});

module.exports = schema;