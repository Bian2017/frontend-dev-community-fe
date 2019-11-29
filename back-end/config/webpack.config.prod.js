const webpackMerge = require('webpack-merge')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  // 精简打包日志信息
  stats: {
    children: false, // 关闭 children 信息
    warnings: false // 关闭警告
  },
  // 对JS打包处理
  optimization: {
    minimizer: [
      // 压缩代码
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false, // 不需要任何warning
          // 是否注释console
          drop_console: false,
          dead_code: true,
          drop_debugger: true,
          // 输出
          output: {
            comments: false, // 正式打包时就没有comments
            beautify: false
          },
          managle: true
        }
      })
    ],
    /**
     * 分离公共代码
     */
    splitChunks: {
      // 缓存chunk
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
