const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const utils = require('./utils');

const webpackconfig = {
  /**
   * 使用'node'，webpack 会编译为用于「类 Node.js」环境（使用 Node.js 的 require ，
   * 而不是使用任意内置模块（如 fs 或 path）来加载 chunk）。
   */
  target: 'node',
  entry: {
    server: path.join(utils.APP_PATH, 'index.js')
  },
  resolve: {
    ...utils.getWebpackResolveConfig()
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
        // 注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。
        // 通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production') 。
        NODE_ENV:
          process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod' ? "'production'" : "'development'"
      }
    })
  ],
  /**
   * 配置以下选项，可以使原本运行在node环境的代码也可以运行在其他环境。
   * 这些选项可以配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块。
   *
   * 值为true 表示提供提供polyfill
   */
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
};

module.exports = webpackconfig;
