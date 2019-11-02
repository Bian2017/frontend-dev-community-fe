const webpackMerge = require('webpack-merge')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  // 方便后期调试
  mode: 'production',
  stats: {
    children: false,
    warnings: false
  },
  // 对JS打包处理
  optimization: {
    minimizer: [
      // 官方推荐配置
      // new TerserWebpackPlugin({
      //   terserOptions: {
      //     // 不需要任何warning
      //     warnings: false,
      //     // 是否注释console
      //     drop_console: false,
      //     dead_code: true,
      //     drop_debugger: true,
      //     // 输出
      //     output: {
      //       comments: false, // 正式打包时就没有comments
      //       beautify: false
      //     },
      //     managle: true
      //   }
      // })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true
        }
      }
    }
  }
})

module.exports = webpackConfig
