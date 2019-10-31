# Yeoman

> Yeoman 是一种高效、开源的 Web 应用脚手架搭建系统，意在精简开发过程。Yeoman 因其专注于提供脚手架功能而声誉鹊起，它支持使用各种不同的工具和接口协同优化项目的生成。

**参考:**
[使用 YEOMAN 创建属于自己的前端工作流](https://segmentfault.com/a/1190000004896264)

## 一、快速开始

全局安装 yoeman、generator-generator

> npm install -g yo

> npm install -g generator-generator

**注：**

generator-generator 是用于构建脚手架的脚手架构建工具。

> Yeoman generator generating a Yeoman generator.

## 二、构建自己的脚手架

### 2.1 准备工作

运行`yo generator`命令，完成构建脚手架项目的前置设置。

1. 设置 generator 的名称，名称需以 **"generator-" 为前缀**。

> generator-smu-gulp

**注：**

命名规则很重要，因为 yeoman 会通过文件系统来查找可以使用的 generator。当项目名称写成 'generator-xxx'的格式时，用户可以通过`yo xxx`安装你的脚手架了。

2. 添加脚手架工具描述。

3. 添加 Github 官网地址。

4. 依次添加作者姓名、作者邮箱、作者首页、项目关键词。

5. 选择是否发送 coverage 报告。

6. 输入本地 node 版本号: `10.13`。

7. 添加 Github 用户名。

8. 选择哪种开源协议: `MIT`。

完成以上设置后，会在本地生成一个名为 [generator-smu-gulp](https://github.com/Bian2017/fullstack/tree/master/examples/generator-smu-gulp) 的脚手架项目，生成的脚手架目录结构如下：

```
├── .yo-rc.json
├── package.json
├── generators
│   ├── app
│       ├── templates
│           ├── dummyfile.txt
│       ├── index.js
```

其中：

- .yo-rc.json 用于存储项目配置，一般不会用到，无需关注；
- generators 目录即项目模板代码
- generators/app/templates 用于存放项目模板文件
- generators/app/index.js 定义项目手脚架的代码

### 2.2 编写自己的脚手架

#### 2.2.1 修改 package.json 版本

修改 package.json 中的 version，将 0.0.0 修改成 1.0.0。

**注：**

版本不能低于 1.0.0。

#### 2.2.2 复制项目工程模板代码

1. 删除 generators/app/templates 目录下默认生成的 dummyfile.txt；

2. 复制模板工程代码：

将希望脚手架生成的[工程项目模板代码](https://github.com/Bian2017/fullstack/tree/master/examples/gulp)(即 examples/gulp 目录下的所有文件)全部拷贝到 generator-smu-gulp/generators/app/templates 目录下。

#### 2.2.3 修改 index.js

每个 generator 都会继承 yeoman-generator 类，即 generators/app/index.js 文件。该类有几个重要的[生命周期节点](https://yeoman.io/authoring/running-context.html)：

- initializing - 初始化方法，用于获取项目状态、配置等；
- prompting - 调用 inquire 方法获取用户输入；
- configuring - 保存配置，创建 .editorconfig 等文件；
- writing - 执行文件写操作，即项目文件写入文件系统中；
- install - 执行安装操作，需调用 this.installDependencies 方法
- end - 最后执行，可清除临时文件等；

修改 index.js，修改内容如下。

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
    name: 'install',  // 会调用原型方法install ????
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
 * 在脚手架创建工程的过程中，会提示"Please install bower with npm instal -g
 * bower and try again."错误，由于官方已不再推荐通过 bower 安装依赖包，故需关闭它。
*/
install() {
  // 关闭bower
  this.installDependencies({ bower: false })
}
```

### 2.3 运行 generator

当在本地目录内完成上面的配置后，generator 还不能被当做全局的 npm module，我们可以通过在 generator-smu-gulp 目录下运行`npm link`来实现 generator 的全局化。

1. 进入 generator-smu-gulp 目录下

> cd generator-smu-gulp/

2. 将这个项目下的依赖包链接到全局

> npm link

**注：**

> 开发 NPM 模块的时候，有时我们会希望边开发边试用，比如本地调试的时候，`require('myModule')`会自动加载本地开发中的模块。Node 规定，使用一个模块时，需要将其安装到全局的或项目的 node_modules 目录之中。对于开发中的模块，解决方法就是在全局的 node_modules 目录之中，生成一个符号链接，指向模块的本地目录。npm link 就能起到这个作用，会自动建立这个符号链接。

### 2.4 本地测试

在本项目外创建一个 test 文件夹(名称任意)，用于进行本地测试。

运行如下命令：

> yo smu-gulp

会弹出选项："Would you like to enable this option? (Y/n)"，表示“是否打开 option，即是否安装我们的依赖”，选择 yes。

此时会生成我们的项目工程，可以看到，生成的项目工程与我们的[项目模板](https://github.com/Bian2017/fullstack/tree/master/examples/gulp)完全一致。

### 2.4 发布 npm 包

#### 2.4.1 切换官方镜像源

安装 nrm，通过它可快速进行镜像源的切换。

> nrm ls

使用`nrm use npm`命令来进行官方镜像源的切换。

#### 2.4.2 发布 npm 包

登录 npm 账号。

> npm login

进入自己的脚手架 generator-smu-gulp 项目下，运行`npm publish`。

#### 2.4.3 测试脚手架

> npm install -g yo

安装我们自己的项目脚手架工具。

> npm install -g generator-smu-gulp

创建我们的工程项目。

> yo smu-gulp

注： 全局 yo 命令安装，安装命令 yo <package>

脚手架的名称是 generator-前缀，如 yo smu-gulp。
