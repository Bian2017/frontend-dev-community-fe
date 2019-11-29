const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  devtool: 'eval-source-map', // 方便后期调试
  mode: 'development',
  // 精简打包日志信息
  stats: {
    // 不添加 children 信息
    children: false
  }
})

module.exports = webpackConfig
