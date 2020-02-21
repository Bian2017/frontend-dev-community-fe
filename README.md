# 前端开发者社区

## 一、项目启动

1. 安装依赖

```
npm install
```

2. 启动项目

```
npm run serve
```

要启动该项目，还需运行 Node 后台项目。Node 后台项目的的代码参考地址见[链接](https://github.com/Bian2017/frontend-dev-community-be)。

## 三、项目小结

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

### 3.3 jsconfig.json

目录中存在 jsconfig.json 文件表示该目录是 JavaScript 项目的根目录。jsconfig.json 文件指定根文件和 JavaScript 语言服务提供的功能选项。

> 提示：如果您不使用 JavaScript，则无需担心 jsconfig.json。
> 提示：jsconfig.json 源于 tsconfig.json，是 TypeScript 的配置文件。jsconfig.json 相当于 tsconfig.json 的“allowJs”属性设置为 true。

**为什么我需要一个 jsconfig.json 文件？**

Visual Studio Code 的 JavaScript 支持可以在两种不同的模式下运行：

- 文件范围 - 没有 jsconfig.json：在此模式下，在 Visual Studio Code 中打开的 JavaScript 文件被视为独立单元。 只要文件 a.js 没有显式引用文件 b.ts（使用///引用指令或 CommonJS 模块），两个文件之间就没有共同的项目上下文。

- 显式项目 - 使用 jsconfig.json：JavaScript 项目是通过 jsconfig.json 文件定义的。 目录中存在此类文件表示该目录是 JavaScript 项目的根目录。 文件本身可以选择列出属于项目的文件，要从项目中排除的文件，以及编译器选项（见下文）。

当您在工作空间中有一个定义项目上下文的 jsconfig.json 文件时，JavaScript 体验会得到改进。 因此，当您在新工作空间中打开 JavaScript 文件时，我们提供了一个创建 jsconfig.json 文件的提示。

## 四、注意

### 4.1 依赖包升级

在我们的前端项目中，除了我们自己安装的第三方库可以去考虑升级以外，官方的关于 vue-cli 相关的依赖库，最好去使用 vue-cli 进行升级`vue upgrade`。
