## 一、配置 SSH 服务

以下操作均在 CentOS 系统上进行。

### 1.1 修改 SSH 服务的端口号

1. 先查看 sshd 服务运行状态

> systemctl status sshd

或者

> service sshd status

2. 查看 sshd 服务默认监听的端口

> netstat -anlp | grep sshd

3. 修改 sshd 监听端口

打开 sshd 的配置文件：

> vi /etc/ssh/sshd_config

将配置文件的端口 22 修改成 10022

**修改前：**

```
# If you want to change the port on a SELinux system, you have to tell
# SELinux about this change.
# semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
#
#Port 22
```

**修改后：**

```
# If you want to change the port on a SELinux system, you have to tell
# SELinux about this change.
# semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
#
Port 10022
```

注意：

针对 CentOS 系统，因为内部集成了 SELinux 系统，所以还需进行如下配置：

> semanage port -a -t ssh_port_t -p tcp 10022

如果本机未安装 semanage 指令，则可以先反查哪个安装包提供了 semanage 指令：

> yum whatprovides semanage

然后根据提示的安装包名安装指定安装包(复制安装包名称时无需复制版本号)：

> yum install -y policycoretutils-python

4. 查看端口是否配置成功

> semanage port -l | grep ssh

5. 重启 sshd 的服务

> service sshd restart

6. 在本机上测试刚才设置的端口号是否生效

> ssh -p 10022 root

### 1.2 配置无密码登录

1. 在本地机器上生成公私钥

> cd ~/.ssh
> ssh-keygen

2. 在本地机器的 ~/.ssh 目录下创建名为 config 的配置文件，将如下配置复制到 config 文件中

```
Host tx
  Port 10022
  HostName 49.235.154.5
  User root
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes
```

- IdentityFile: 表示私钥位置;
- IdentitiesOnly: 指示 ssh 仅使用在命令行上指定的身份验证身份文件或在 ssh_config 文件中配置的身份验证身份文件；

3. 配置远程服务器 ECS

进入远程服务器 ECS 的~/.ssh 目录下，创建文件 authorized_keys。

> cd ~/.ssh
> touch authorized_keys

将之前本地机器上生成的公钥复制到文件 authorized_keys 中。

4. 连接远程服务器

> ssh tx

## 二、配置 Docker

Docker 主要特性

- 文件、资源、网络隔离；

- 变更管理、日志记录；

- 写时复制(采用写时复制方式创建根文件系统)；

### 2.1 安装 Docker

以下操作均在 CentOS 系统上进行。

1. 先删除旧的版本

> yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

2. 安装必须的依赖

> yum install -y yum-utils device-mapper-persistent-data lvm2

3. 添加 stable 的 Docker-ce 的源

> yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

4. 安装 docker-ce

> yum install docker-ce docker-ce-cli containerd.io

安装完毕后，可以测试下 docker 是否安装成功

> systemctl start docker # 开启 docker

查看 docker 的运行状态

> systemctl status docker

运行官方提供的 docker 测试应用

> docker run hello-world

### 2.2 Dokcer 常用操作

1. 列出容器

> docker ps

列出所有的容器(-a: 包括未运行的)

> docker ps -a

2. 镜像加速

在中国区，需添加下中国官方镜像加速。

在/etc/docker/daemon.json 添加如下配置：

```JSON
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

修改保存后重启 Docker 以使配置生效。

> systemctl daemon-reload
> systemctl restart docker

- daemon-reload 命令会做很多的事情，其中之一是重新生成依赖树(也就是 unit 之间的依赖关系)，所以当你修改了 unit 配置文件中的依赖关系后如果不执行 daemon-reload 命令是不会生效的。

### 2.3 安装 MongoDB

可以通过[dockerhub](https://hub.docker.com/search?q=mongo&type=image)安装 MongoDB。

> docker pull mongo # 安装 mongoDB 最新镜像

1. 查看镜像是否下载成功

> docker images # 查看本地下载哪些镜像

2. 将 MongoDB 端口 27017 的服务映射到宿主机 10050 端口上

> docker run -d --name my-mongo -p 10050:27017 mongo

- -d: 运行在后台；
- -p: 指定一个端口；

查看当前运行的服务:

> docker ps

3. 配置防火墙

开启防火墙:

> service firewalld start

将 10050 端口添加到放行的规则中：

> firewall-cmd --zone=public --add-port=10050/tcp --permanent

- --add-port：添加端口
- --permanent：永久

然后更新防火墙规则：

> firewall-cmd --reload

测试端口：

> curl http://49.235.154.4:10050

若无法连上该端口，则还需看下 ECS 服务器的安全组是否也设置了该端口。

### 2.4 删除已停止的容器

> docker rm boring_wilbur # boring_wilbur 为容器的名称

再使用 docker ps -a 可以发现之前的容器已经被删除。

注意：

如果容器正在运行中，是无法使用 docker rm 删除正在运行的容器。必须使用 docker stop 停止容器，然后使用 docker rm 删除该容器。

举例：将 mysql 进行测试

> docker run --name my-test-sql -e MYSQL_ROOT_PASSWORD=123456 -d mysql

或

> docker run --name my-test-sql -e MYSQL_ROOT_PASSWORD=123456 -p 13306:3306 -d mysql

- -d: 表示后台运行
- -p: 通过-p 可 mysql 的端口映射出来，3306 代表容器内部端口。

> docker rm my-test-sql # 此时会发现无法删除该容器

> docker stop my-test-sql # 停止 mysql 容器
> docker rm my-test-sql # 容器 mysql 删除成功

### 2.5 启动容器

启动容器 my-test-sql。

> docker start my-test-sql

获取容器的日志。

> docker logs -f my-test-sql

- -f: 表示跟踪日志输出

### 2.6 docker-compose

docker-compose 是一个用户定义和运行多个容器的 Docker 应用程序。在 Compose 中你可以使用 YAML 文件来配置你的应用服务。然后，只需要一个简单的命令，就可以创建并启动你配置的所有服务。

1. 安装 docker-compose

> sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose

添加执行权限:

> sudo chmod +x /usr/local/bin/docker-compose

2. 创建 docker-compose.yml

```yml
version: '3'
# 服务
services:
  # 服务mysql1
  mysql1:
    # 使用镜像为mysql最新镜像，故无需将:latest后缀
    image: mysql

    # 环境变量，传给容器内部，供容器内部使用
    environment:
      # mysql的root用户密码
      - MYSQL_ROOT_PASSWORD=123456

    ports:
      # 将容器内部的服务端口 3306 映射到宿主机上的端口 13306上
      - 13306:3306

  # 服务mysql2
  mysql2:
    # 使用镜像为mysql最新镜像，故无需将:latest后缀
    image: mysql

    # 环境变量，传给容器内部，供容器内部使用
    environment:
      # mysql的root用户密码
      - MYSQL_ROOT_PASSWORD=123456

    ports:
      # 将容器内部的服务端口 3306 映射到宿主机上的端口 13307上
      - 13307:3306
```

3. 运行 docker-compose

docker-compose up 命令会自动完成包括构建镜像，(重新)创建服务，启动服务，并关联服务相关容器的一系列操作。

> docker-compse up -d

- -d: 表示在后台运行。

停止所有容器服务

> docker-compose stop

删除容器服务

> docker-compose rm

### 2.7 创建私有的 Docker 仓库(Docker hub)

1. 创建账号

首先在 Docker hub 上创建自己的账号，这样就可以在 Docker hub 上创建属于我们自己的镜像。

2. 登录账号

在 ECS 服务器上登录自己的 Docker hub 账号：

> docker login

3. 远程推送自己的镜像

Docker 可以把我们的容器和应用打包成一个镜像，这个镜像可以在任何有 Docker 服务的地方运行起来。首先创建一个镜像

> docker commit 9a15c47f4a6c 8f6650c6d6fe/mysql:1.0

- 9a15c47f4a6c: 为容器 ID。此处可为容器 ID 或容器名。
- 8f6650c6d6fe: 为自己在 Docker hub 上的账号名称。
- "mysql:1.0" : 推送至远程仓库的镜像名称，其中 1.0 为 Tag。

可以在 docker image ls 中看到这个新定制的镜像。随后使用 docker push 将本地的镜像上传到镜像仓库。

> docker push 8f6650c6d6fe/mysql:1.0

4. 获取镜像

从 Docker hub 上获取自己创建的镜像。

> docker pull 8f6650c6d6fe/mysql:1.0

## 三、Visual Code

### 3.1 常用插件

#### 3.1.1 Settings Sync 插件

[参考链接](https://blog.csdn.net/toopoo/article/details/85810773)

在不同平台和机器之间切换 Visual Studio Code 的时候，有个需求就是同步自己的设置和插件。Visual Studio Code 的一个插件 setting sync 就提供这样一个功能，能让在任何地方都可以下载自己的配置，并且同步自己的插件。这个插件通过将设置上传到 github 的 gist 来实现。

1. 上传配置

shift + cmd + P 调出命令面板，输入 sync，选择上传。直接按 shift + option + U 上传，首次上传它会打开 github 页面，你需要登录，并在登陆后页面右上角按下 Generate new token，并且起一个名字，例如 setting sync。复制这个 token，因为一旦关闭这个页面你就看不到了。

2. 上传配置并保存 gist id

然后回到命令面板，粘贴上一步保存的 token 并回车，插件会开始上传配置(实际上是在 github 创建一个 gist 保存配置），成功后右下角会弹出一个提示，里面有配置的 gist id。也保存这个 id 到某个位置。

3. 下载配置

在新的机器上，也安装 setting sync 插件。在命令面板输入 sync，找到 sync 下载，首次下载同样会弹出 github 页面，这时候你不需要生成 token，你只需要把上一步保存的 token 粘贴并回车，然后命令面板要求输入 gist id，粘贴上一步保存的 gist id 并回车。新机器就可以下载 vsc 的配置并自动下载安装所有的插件。

4. 忘记 access token 的办法

如果没有保存 access token，可以在旧机器命令面板输入 sync 选择重置，然后重复步骤 1~3。

5. 如果你只是忘记了 gist id

可以到 https://gist.github.com/Bian2017 查看名称为 Visual Studio Code Settings Sync Gist 的 gist，里面就有 gist id(7bed94c5bb716984c75c8ddcef618a82)。
## 五、前端工程化

### 5.1 前端工程化

#### 5.1.1 什么是前端工程化

前端工程化是指将前端开发的流程规范化、标准化，包括开发流程、技术选型、代码规范、构建发布等，用于提升前端工程师的开发效率和代码质量。

**开发流程**

开发流程包括需求分析、版本控制、缺陷管理、文档管理、自动化、性能测试、发布部署...

**技术选型**

UI 框架:

iView、Ant、Element、Mint、Cube...

JS 框架:

MVVM、Template...

**代码规范**

标准:

Standard、airbnb、Prettier...

**构建发布**

Jenkins、Webpack、Gulp、Yarn、Docker、Rancher、Kubernetes、Harbor、ECS...

#### 5.1.2 为什么要进行前端工程化

- 复杂度高：前端项目的多功能、多页面、多状态、多系统；
- 规模大： 团队开发，多人协作，代码质量管理；
- 要求高： 页面性能优化(CDN/异步加载/请求合并)，CSS 兼容性、单页面应用、服务端渲染；

#### 5.1.3 怎么做前端工程化

- 从业务着手

简单的单页面应用，使用 glup 打包 + 同步工具实现开发全流程；

- 从复杂度考虑

框架最终要服务于我们的项目，而非累死累活的去维护框架；

- 从已知向未知扩展

不同的技术有不同的适应点，选择适合的才是最好的；
## 十、常用 Linux 指令

1. 查看操作系统版本

> lsb_release -a

2. 查看内核版本

> uname -a

3. 显示目前在 Linux 系统上的文件系统的磁盘使用情况统计

> df -Th

4. top 命令是 Linux 下常用的性能分析工具，能够实时显示系统中各个进程的资源占用状况，类似于 Windows 的任务管理器

> top

5. 从指定的 URL 链接上下载文件。

> wget http://mirrors.tuna.tsinghua.edu.cn/apache/tomcat/tomcat-9/v9.0.27/bin/apache-tomcat-9.0.27.tar.gz

6. 解压文件

> tar zxvf apache-tomcat-9.0.27.tar.gz

7. 压缩文件

> tar zcvf apache-tomcat.tar.gz apache-tomcat-9.0.27

8. 从众多进程中查看 docker 进程相关信息

> ps -ef | grep docker

9. 查看系统服务状态

- 查看 sshd 运行状态

> service sshd status

- 关闭 sshd 服务

> service sshd stop

- 重启 sshd 服务

> service sshd restart

10. 查看主机名

> cat /etc/hostname

通过修改 hostname 可直接修改主机名。
