# Koa

Koa 没有任何预置的中间件，可快速地编写服务端应用程序。它丢弃了传统的回调函数，使用 async 函数，并增强了错误处理。

## 一、Koa 核心概念

- Koa Application(应用程序)

- Context(上下文)

- Request 请求、Response 响应

**Koa 工作原理：**

洋葱模型

- 执行的顺序: 顺序执行
- 回调的顺序: 反向执行
- 先进后出

## 二、常用中间件

### 2.1 koa-body 中间件

一个功能齐全的请求体解析器。支持 multipart、urlencoded 和 json 请求体。提供与 Express 的 bodyParser、multer 相同的功能。

### 2.2 koa-router 中间件

路由中间件

### 2.3 @koa/cors 中间件

跨域中间件

### 2.4 koa-combine-routers 中间件

koa-combine-routers 中间件用于组合多个 koa-router 实例。

### 2.5 koa-static 中间件

koa-static 是静态资源请求中间件，静态资源主要指 html、js、css、jpg、png 等等。

### 2.6 koa-helmet 中间件

koa-helmet 可以帮助你的 app 抵御一些比较常见的安全 web 安全隐患，它其实是将 9 个安全中间件集中到了一起，做了合并，大部分都是对于**http header**的操作。

### 2.7 koa-compose 中间件

koa-compose 是将 koa/koa-router 各个中间件合并执行。

## 三、webpack 配置

### 3.1 指定 target

webpack-node-externals 对 node_modules 下的文件进行一些排除处理，这样就不会处理 node_modules 下面的一些文件

## 四、package.json 配置

### 4.1 npm-check-updates

npm-check-updates 可以用来更新 package.json 依赖。

检测 package.json 是否有更新的依赖。

> npx ncu

若需要升级依赖包

> npx ncu -u

### 4.2 cross-env

> cross-env 是跨平台设置和使用环境变量的脚本。

在大多数 Windows 命令行中在使用 NODE_ENV = production 设置环境变量时会报错。同样，Windows 和 Linux 命令如何设置环境变量也有所不同。 使用 cross-env 可以设置在不同的平台上有相同的 NODE_ENV 参数。

```JSON
"dev": "cross-env NODE_ENV=dev nodemon --exec babel-node --inspect ./src/index.js",
"build": "cross-env NODE_ENV=prod webpack --config config/webpack.config.prod.js",
```

### 4.3 babel-node

babel-node

> npx babel-node ./index.js

热更新、热调试

nodemon

> nodemon --exec babel-node ./index.js

### 4.4 rimraf 包

以包的形式包装`rm -rf`命令，用来删除文件和文件夹。
