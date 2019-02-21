const webpack = require('webpack')
const WebpackMerge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const base = require('./webpack.base');

module.exports = WebpackMerge(base, {
  mode: 'development',
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