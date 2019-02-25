var path = require('path');
const fs = require('fs');
const pkg = require('../package.json');
const cwd = process.cwd();

const babel = require(path.join(cwd, '.babelrc.js'));
const nodeModules = {};

fs.readdirSync('node_modules')
  .filter((catalogue) => {
    return ['.bin', ...Object.keys(pkg['dependencies'])].indexOf(catalogue) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

// https://www.cnblogs.com/skylor/p/7008756.html 【webpack整理】
module.exports = {
  entry: './index.js',
  context: cwd,
  output: {
    filename: 'server.js',
    path: path.resolve(cwd, 'dist'),
    libraryTarget: 'commonjs', // window|var|umd|amd|commonjs|jsonp
  },
  externals: nodeModules,
  target: 'node',
  // 增加node配置
  // 官方文档：这些选项可以配置是否 polyfill 或 mock 某些 Node.js全局变量和模块。这可以使最初为 Node.js 环境编写的代码，在其他环境（如浏览器）中运行。
  // node: {
  //   console: true,
  //   global: true,
  //   process: true,
  //   Buffer: true,
  //   filename: true,
  //   dirname: true,
  //   setImmediate: true,
  //   __filename: false,
  //   __dirname: false
  // },
  resolve: {
    extensions: [
      '.js', '.json'
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      // exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: babel,
      }]
    }]
  },
  watchOptions: {
    ignored: [path.resolve(cwd, './dist/**/*.*'), 'node_modules']
  }
};