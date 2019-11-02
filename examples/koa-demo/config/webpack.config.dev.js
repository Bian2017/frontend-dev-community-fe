const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  // 方便后期调试
  devtool: 'eval-source-map',
  mode: 'development',

  stats: {
    children: false
  }
})

module.exports = webpackConfig
