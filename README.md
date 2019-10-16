## 一、配置 Docker

### 1. 安装 docker-compose:

> sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose

添加执行权限:

> sudo chmod +x /usr/local/bin/docker-compose

### 2. 安装 MongoDB 镜像

可以通过[dockerhub](https://hub.docker.com/search?q=mongo&type=image)安装 MongoDB。

> docker pull mongo # 安装 mongoDB 最新镜像

若安装失败，可以添加中国加速源的地址。在/etc/docker/daemon.json 添加如下配置：

```JSON
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

然后重启 Docker，使刚才的设置生效。

> service docker restart

#### 2.1 查看本地下载哪些镜像

> docker images

#### 2.2 将 MongoDB 端口 27017 的服务映射到宿主机 10050 端口上

> docker run -d --name my-mongo -p 10050:27017 mongo

- -d: 运行在后台；
- -p: 指定一个端口；

查看当前运行的服务:

> docker ps

#### 2.3 设置防火墙

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

## 二、常用 Linux 指令

1. 查看操作系统版本

> lsb_release -a

2. 查看内核版本

> uname -a

3. 显示目前在 Linux 系统上的文件系统的磁盘使用情况统计

> df -Th

4. top 命令是 Linux 下常用的性能分析工具，能够实时显示系统中各个进程的资源占用状况，类似于 Windows 的任务管理器

> top

5. 指定的 URL 下载文件。

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

## 三. 配置 SSH 服务

### 3.1 查看主机名

> cat /etc/hostname

可以直接修改 hostname

### 3.2 修改 SSH 服务的端口号

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

** 修改前：**

```
# If you want to change the port on a SELinux system, you have to tell
# SELinux about this change.
# semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
#
#Port 22
```

** 修改后：**

```
# If you want to change the port on a SELinux system, you have to tell
# SELinux about this change.
# semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
#
Port 10022
```

注意：

针对 Centos 系统，因为内部集成了 SELinux 系统，所以还需进行如下配置：

> semanage port -a -t ssh_port_t -p tcp 10022

如果本机未安装 semanage 指令，则可以先反查哪个安装包提供了 semanage 指令：

> yum whatprovides semanage

然后根据提示的安装包名安装指定安装包(复制安装包名称时无需复制版本号)：

> yum install -y policycoretutils-python

4. 查看端口是否配置成功

> semanage port -l |grep ssh

5. 重启 sshd 的服务

> service sshd restart

6. 测试刚才设置的端口号是否生效

> ssh -p 10022 root

### 3.3 配置无密码登录

1. 在本地生成公私钥

> cd ~/.ssh
> ssh-keygen

2. 在本地创建一个配置文件 config，将如下配置复制到 config 文件中

```
Host tx
  Port 10022
  HostName 49.235.154.5
  User root
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes
```

- IdentityFile: 私钥位置

3. 在远程服务器 ECS 的配置

创建文件 authorized_keys

> cd ~/.ssh

将之前本地生成的公钥复制到文件 authorized_keys 中。

4. 连接远程服务器

> ssh tx
