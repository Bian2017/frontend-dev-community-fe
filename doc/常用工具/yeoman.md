# yeoman

> Yeoman 是一种高效、开源的 Web 应用脚手架搭建系统，意在精简开发过程。Yeoman 因其专注于提供脚手架功能而声誉鹊起，它支持使用各种不同的工具和接口协同优化项目的生成。

## 5.2.3.1 快速开始

全局安装 yoeman

> npm install -g yo

创建我们的脚手架工程项目

> yo smu-gulp

## 二、generator-generator

generator-generator 用于创建一个 Yeoman 构建器的构建器项目

> Yeoman generator generating a Yeoman generator

> npm install -g generator-generator

快速开始

######

显示用于生成新生成器的向导

> yo generator

1. 创建 generator 的名称，名称需以 "generator-" 为前缀。

> 名称为 generator-smu-gulp

2. 添加描述

> This is a gulp demo project

3. 添加 Github 官网地址

> https://github.com/Bian2017/fullstack/tree/master/examples/gulp

4. 依次添加作者姓名、作者邮箱、作者首页、项目关键词

5. 选择是否发送 coverage 报告

6. 输入本地 node 版本号

> 10.13

7. 添加 Github 用户名

8. 选择哪种开源协议

> MIT

### 在生成的 generator-smu-gulp 配置

1. 修改 package.json 中版本

将 0.0.0 修改成 1.0.0

2. 创建我们的脚手架

[官网](https://yeoman.io/authoring/running-context.html)的 Running CONTEXT 介绍了 yeoman 生命周期，会执行一些函数钩子

```

initializing - Your initialization methods (checking current project state, getting configs, etc)

// 接收用户的输入
prompting - Where you prompt users for options (where you’d call this.prompt())

// 配置
configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
default - If the method name doesn’t match a priority, it will be pushed to this group.
writing - Where you write the generator specific files (routes, controllers, etc)
// 处理冲突
conflicts - Where conflicts are handled (used internally)
install - Where installations are run (npm, bower)
end - Called last, cleanup, say good bye, etc

```

- 把要拷贝项目的文件（examples/gulp 目录下的所有文件）全部拷贝到 generator-smu-gulp 目录下的 generators/app/templates

- 修改 generators/app/index.js

**修改前：**

```JS
const prompts = [
  {
    type: 'confirm',
    name: 'someAnswer',
    message: 'Would you like to enable this option?',
    default: true
  }
];

...

writing() {
  this.fs.copy(
    this.templatePath('dummyfile.txt'),
    this.destinationPath('dummyfile.txt')
  );
}

install() {
  this.installDependencies()
}
```

**修改后**

```JS
const prompts = [
  {
    type: 'confirm',
    name: 'install',
    message: 'Would you like to enable this option?',
    default: true
  }
];

...

writing() {
  this.fs.copy(
    // 把所有 templates 下面的文件到复制到新的 generators 里面
    this.templatePath('**'),
    // './'表示当前目录
    this.destinationPath('./')
  );
}

/*
 * 在安装过的过程中，会提示"Please install bower with npm instal -g bower and
 * try again."错误，由于官方已不再推荐通过 bower 安装依赖包，故需关闭它。
*/
install() {
  // 关闭bower
  this.installDependencies({ bower: false })
}
```

### 运行 generator

当在本地目录内完成上面的创建后，generator 还不能被当做全局的 npm module，我们可以通过在 "generator-项目名" 目录下运行"npm link"来实现 generator 的全局化。

1. 进入 generator-smu-gulp 目录下

> cd generator-smu-gulp/

2. 将这个项目下的依赖包链接到全局

> npm link

**npm link 补充说明**

> 开发 NPM 模块的时候，有时我们会希望，边开发边试用，比如本地调试的时候，require('myModule')会自动加载本地开发中的模块。Node 规定，使用一个模块时，需要将其安装到全局的或项目的 node_modules 目录之中。对于开发中的模块，解决方法就是在全局的 node_modules 目录之中，生成一个符号链接，指向模块的本地目录。npm link 就能起到这个作用，会自动建立这个符号链接。

### 测试

在本项目外层创建一个 test 文件夹(名称任意，本地测试)，用于进行本地测试

> yo smu-gulp

会弹出选项

是否打开 option，即是否安装我们的依赖

> Would you like to enable this option? (Y/n)

选择 y

### 发布

#### 切换官方镜像源

安装 nrm，通过它来快速进行镜像源的切换.

> nrm ls

切换官方镜像源

> nrm use npm

登录 npm 账号

> npm login

然后进入 generator-smu-gulp 目录下

> npm publish

测试:

> npm install -g yo

安装我们自己的 generator

> npm install -g generator-smu-gulp

创建脚手架项目

> yo smu-gulp

## yeomam 脚手架总结

- 全局 yo 命令安装，安装命令 yo <package>

脚手架的名称是 generator-前缀，如 yo smu-gulp

- 使用 generator-generator 快速创建脚手架生成项目

全局安装 npm install -g generator-genertor

- 使用 npm 进行发布

link 命令本地测试，发布时设置 npm registry
