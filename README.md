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
