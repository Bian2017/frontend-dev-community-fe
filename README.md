# login

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## package.json

### corejs

core-js V3 目前与我们的项目不兼容，需安装 core-js V2 版本

> npm i core-js@2 -D

## 三、使用技巧

### 3.1 从 iconfont 官网下载的 iconfont 字体，其 class 属性`iconfont`与 layui 字体的 class 属性`iconfont`冲突，该如何解决？

可以在 iconfont 官网进行项目编辑，将`Font Family`一栏的 `iconfont` 改成 `iconfe`即可。

### 3.2 Vue Router

1. 采用命名路由好处

在路由跳转的时候，代码如下，使用 name 属性(命名路由)，而不采用 path。这样做的好处是当 path 路径发生变化时，就无需全文修改相关路径。

```HTML
<li class="layui-nav-item">
  <router-link :to="{name: 'login'}">登入</router-link>
</li>
```
