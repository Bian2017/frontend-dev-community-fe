const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const utils = require('./utils')

const webpackconfig = {
  /**
   * 使用'node'，webpack 会编译为用于「类 Node.js」环境（使用 Node.js 的 require ，
   * 而不是使用任意内置模块（如 fs 或 path）来加载 chunk）。
   */
  target: 'node',
  entry: {
    server: path.join(utils.APP_PATH, 'index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.join(__dirname, './node_modules')]
      }
    ]
  },
  externals: [nodeExternals()], // 忽视node_modules 中的所有模块
  plugins: [
    new CleanWebpackPlugin(),
    // 允许创建全局常量，用于webpack在打包的时候使用
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod' ? 'production' : 'development'
      }
    })
  ],
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true
  }
}

module.exports = webpackconfig