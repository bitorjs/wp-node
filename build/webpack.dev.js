const webpack = require('webpack')
const WebpackMerge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const base = require('./webpack.base');


// https://www.cnblogs.com/skylor/p/7008756.html 【webpack整理】
module.exports = WebpackMerge(base, {
  mode: 'development', // development || production or webpack --mode developmen
  entry: [
    /* 轮询文件内容 */
    'webpack/hot/poll?1000',
  ],
  target: 'node',
  plugins: [
    /* HMR plugin */
    new webpack.HotModuleReplacementPlugin(),
    /* 当 HMR 替换时在浏览器控制台输出对用户更友好的模块名字信息 */
    new webpack.NamedModulesPlugin(),
    new WebpackShellPlugin({
      onBuildEnd: [
        `npm run dev`
      ]
    })
  ]
});