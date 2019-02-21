const WebpackShellPlugin = require('webpack-shell-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./webpack.base');

module.exports = WebpackMerge(base, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new WebpackShellPlugin({
      onBuildEnd: [
        `npm run dev`
      ]
    })
  ]
});