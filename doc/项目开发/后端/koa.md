# Koa 框架

Koa 没有任何预置的中间件，可快速地编写服务端应用程序。它丢弃了传统的回调函数，使用 async 函数，并增强了错误处理。

[学习链接](http://javascript.ruanyifeng.com/nodejs/koa.html)

## 一、Koa 核心概念

### 1.1 Koa 基本组成

Koa 源码非常精简，只有四个文件：

- application.js: Application(或 Koa)负责管理中间件，以及处理请求；
- context.js: Context 维护了一个请求的上下文环境；
- request.js: Request 对`req`做了抽象和封装；
- response.js: Response 对`res`做了抽象和封装；

### 1.2 koa 与 express 区别

koa 和 express 最最大的区别在于，express 是一个面向**网站和 html**的框架，对于一些 SAAS 或者 RPC 服务来说，并不关心**模板引擎**不关心**页面渲染**，那么此时 express 就稍显臃肿。而 koa 已经剔除了几乎所有除了搭建 web 应用所需的最基本功能的所有冗余功能，而这，带给开发者以简洁之美，纵观 koa 框架源码，无论是 koa1.x 还是 koa2.x，处处都是简洁优雅的实现，虽然理解起来可能不是那么容易。任何行业抽象到最后，就是艺术，从 express 到 koa，便是 nodejs 的 web 框架从工具到艺术的升华。

参考: [Koa vs Express in NodeJS: 2018 Edition](https://raygun.com/blog/koa-vs-express/)

**Koa 中间件**

express 的中间件加载是一个串行的顺序，依靠 next 进入下一个中间件；对于 Koa 来说，中间件加载却是截然不同的呈现出 V 形：

- 执行的顺序: 顺序执行
- 回调的顺序: 反向执行
- 先进后出

![洋葱模型](https://romain.dorgueil.net/images/wsgi_middleware.png)

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

### 2.8 koa-compress 中间件

koa-compress 可以实现数据压缩，如对网页进行 gizp 压缩，让网页加载速度更快。

## 三、webpack 配置

Node 端 webpack 的环境配置如下：

- [公共配置]()
- [开发环境配置]()
- [正式环境配置]()

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

babel-cli 工具自带一个 babel-node 命令，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。

> npx babel-node ./src/index.js

### 4.4 自动重启工具 nodemon

> nodemon --exec --inspect babel-node ./index.js

- exec: 通常用于执行非 non-node 脚本；
- inspect: 开启调试；

### 4.5 rimraf 包

以包的形式包装`rm -rf`命令，用来删除文件和文件夹。
