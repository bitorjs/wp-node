const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
const cwd = process.cwd();
const babel = require(path.join(cwd, '.babelrc.js'));

// the path(s) that should be cleaned
let pathsToClean = [
  'dist'
]

// the clean options to use
let cleanOptions = {
  root: cwd,
  exclude: ['shared.js'],
  verbose: true,
  dry: false
}

// https://www.cnblogs.com/skylor/p/7008756.html 【webpack整理】
module.exports = {
  mode: 'development', // development || production or webpack --mode developmen
  entry: './src/server.js',
  context: cwd,

  output: {
    filename: 'ddd.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs', // window|var|umd|amd|commonjs|jsonp
    // library: {
    //   root: ["DDD"],
    //   amd: "ddd-amd",
    //   commonjs: "ddd-common"
    // },
    // umdNamedDefine: true,
  },
  target: 'node',
  node: {
    console: true,

    global: true,

    process: true,

    Buffer: true,

    filename: true,

    dirname: true,

    setImmediate: true
  },
  resolve: {
    extensions: [
      '.js', '.json' // 少写 extensions 会引起 webpack-dev-server 强制使用 iframe 模式，否则会报错
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: "node-loader"
      }, {
        loader: "babel-loader",
        options: babel,
      }]
    }]
  },
  watchOptions: {
    ignored: [path.resolve(__dirname, './dist/**/*.*'), 'node_modules']
  }
};