var path = require('path');
const cwd = process.cwd();
const babel = require(path.join(cwd, '.babelrc.js'));

const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter((catalogue) => {
    return ['.bin'].indexOf(catalogue) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });


// https://www.cnblogs.com/skylor/p/7008756.html 【webpack整理】
module.exports = {
  mode: 'production', // development || production or webpack --mode developmen
  entry: ['./src/server.js'],
  context: cwd,

  output: {
    filename: 'server.js',
    path: path.resolve(cwd, 'dist'),
    libraryTarget: 'commonjs', // window|var|umd|amd|commonjs|jsonp
  },
  externals: nodeModules,
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    filename: true,
    dirname: true,
    setImmediate: true,
    __filename: false,
    __dirname: false
  },
  resolve: {
    extensions: [
      '.js', '.json' // 少写 extensions 会引起 webpack-dev-server 强制使用 iframe 模式，否则会报错
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
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