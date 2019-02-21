const WebpackShellPlugin = require('webpack-shell-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./webpack.base');

// https://www.cnblogs.com/skylor/p/7008756.html 【webpack整理】
module.exports = WebpackMerge(base, {
  mode: 'production', // development || production or webpack --mode developmen
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new WebpackShellPlugin({
      onBuildEnd: [
        `npm run dev`
      ]
    })
  ]
});