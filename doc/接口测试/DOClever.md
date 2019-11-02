# DOClever

## 一、搭建 DOClever 服务

通过 Docker 搭建接口测试服务 DOClever。

在/home/doclever 目录下，创建 docker-compose.yml 文件，内容如下：

```yml
version: '2'
services:
  DOClever:
    image: lw96/doclever
    restart: always
    container_name: 'DOClever'

    # ports:容器暴露的实际端口
    ports:
      - 10060:10000

    # volumes代表着把容器中的数据挂载到你本地路径，本地路径
    volumes:
      # 进行持久化
      - /srv/doclever/file:/root/DOClever/data/file
      - /srv/doclever/img:/root/DOClever/data/img
      - /srv/doclever/tmp:/root/DOClever/data/tmp

    # environment: 环境变量。
    # DB_HOST：可以使用自定义数据库地址，或者使用容器中的mongodb
    # PORT：中设置的端口号10000为容器中的端口（尽量不变，只修改容器暴露的端口号，即ports下面的端口），而外部的端口可以自定义。
    environment:
      - DB_HOST=mongodb://mongo:27017/DOClever
      - PORT=10000

    # links 用于链接另一个容器服务。可以给出服务名和别名，也可以仅给出服务名，这样服务名和别名相同
    links:
      - mongo:mongo # 服务名: 别名

  mongo:
    # 指定镜像
    image: mongo:latest
    restart: always
    container_name: 'mongodb'

    # 挂载数据卷
    volumes:
      # 指定数据目录
      - /srv/doclever/db:/data/db
```

开启服务

> docker-compose up -d

## 二、设置 DOClever 的端口

接下来放行 DOClever 的端口 10060：

1. 开启防火墙

> service firewalld start

查看防火墙状态

> firewall-cmd --state

> firewall-cmd --list-all # 查看已放行的端口

2. 添加放行端口

> firewall-cmd --add-port=10060/tcp --zone=public --permanent

3. 使其生效

> firewall-cmd --reload

注意：若使用 ECS 服务器，则还需设置防火墙规则。

## 三、设置 DOClever 账号

- 设置总后台账号

登录 DOClever 总后台，初始用户名和密码是 DOClever，此时需登录下总后台修改下默认密码。

- 设置子账号

登录注册即可。
