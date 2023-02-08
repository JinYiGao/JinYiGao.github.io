# Docker 学习笔记


最近，对微服务有点兴趣，就去学了一下docker，了解了一些基本的命令以及使用方法，汇成了这篇笔记，当然，还有很多没记下来(因为我还没学完...)，后面会慢慢完善......

## 1. Docker基本组成

- **镜像(Image)：**

  docker镜像类似于一个Class，通过镜像来创建容器，同一个镜像可以创建多个容器。

- **容器(container)：**

  通过镜像创建，启动、停止、删除命令。

- **仓库：**

  存储docker镜像。



## 2. 帮助命令

```shell
# 显示docker版本信息
docker version	
# 显示docker系统信息，包括镜像和容器数量
docker info 			
```



## 3. 镜像命令

- **查看本地所有镜像**

  ```shell
  # 查看本地所有镜像
  docker images	
  ```

- **搜索镜像**

  ```shell
  # 搜索镜像
  docker search 镜像名      
  ```

- **下载镜像** 

  ```shell
  # 下载镜像
  # 不写tag 则默认latest
  docker pull 镜像名[:tag]      
  ```

- **删除指定镜像**  

  ```shell
  # 删除指定镜像 
  # -f 强制删除
  docker rmi 镜像ID/镜像名 [-f]
  ```

- **创建镜像**

  当我们从 docker 镜像仓库中下载的镜像不能满足我们的需求时，我们可以通过以下两种方式对镜像进行更改，创建自己的镜像

  ```shell
  # 1. 从容器创建本地镜像副本
  docker commit -m "message" -a "author" 容器ID 镜像名:tag版本
  
  # 2. 从Dockerfile构建镜像
  ```

- **查看镜像构建历史**

  ```shell
  docker history imageID
  ```

- **修改镜像名**

  ```shell
  docker tag SOURCE_IMAGE[:tag] TARGET_IMAGE[:tag]
  ```

  

## 3. 容器命令

- **启动容器**

  ```shell
  # 通过镜像名 启动容器
  docker run [--name] [-d] [-it] [-p] [-P] 镜像名 [/bin/bash]    
  # 参数说明
  # --name="Name" 容器实例名字,用于区分容器
  # -d 后台方式运行,不会自动进入容器
  # -it 使用交互方式运行，进入到容器内部查看内容  
  # -p 指定端口映射,例如-p 8080:8080
  # 	1. -p ip:主机端口:容器端口
  # 	2. -p 主机端口:容器端口
  # 	3. -p 容器端口
  # 	4. 容器端口
  # -P 大写P，随机指定端口
  ```

- **列出容器**

  ```shell
  # -a 列出当前+历史运行过的容器
  # -n 列出最近运行过的n个容器
  # -q 仅列出容器ID
  docker ps [-a] [-n=?] [-q]
  ```

- **删除容器**

  ```shell
  # 根据Id删除容器, 不能删除正在运行的容器
  # -f 强制删除容器，包括正在运行的容器
  docker rm [-f] 容器ID         
  # 递归删除所有容器
  docker rm -f $(docker ps -aq)
  ```

- **容器操作**

  ```shell
  # 启动一个停止的容器
  docker start 容器ID   
  # 重启容器
  docker restart 容器ID 
  # 停止容器
  docker stop 容器ID 
  # 强制停止(杀掉)容器
  docker kill 容器ID             
  ```

- **进入运行中容器**

  ```shell
  # 进入当前正在运行的容器 (通常容器都是以后台方式运行，有时需要进入修改配置或者进行其他操作)
  # 方式1   -----进入容器后开启一个新的终端 (常用),使用exit退出时不会导致容器停止
  docker exec -it 容器id bashShell
  # 例如： docker exec -it 容器id /bin/bash
  
  # 方式2  ------进入创建容器时执行的终端，不会启动新的终端,使用exit退出时会导致容器停止
  docker attach 容器id
  ```

- **退出容器**

  ```shell
  # 从交互容器中退出，并停止容器
  exit
  # 从交互容器中退出，不停止容器
  Ctrl+P+Q                    
  ```

- **从容器内拷贝文件到主机上**

  ```shell
  # 拷贝容器内文件到主机
  docker cp 容器id:容器内路径 目的主机路径
  # 拷贝主机文件到容器内
  docker cp 目的主机路径 容器id:容器内路径 
  
  # ---拷贝是一个手动过程 未来可通过  -v 卷技术 实现容器主机同步
  ```

  

## 4. 常用其他命令

- **日志输出**

  ```shell
  # 输出容器日志
  # -tf 显示日志
  # --tail n 要显示的日志条数
  docker logs 容器ID [-tf] [--tail n]       
  ```

- **查看容器内进程信息**

  ```shell
  # 查看容器内进程信息                         
  docker top 容器ID
  ```

- **查看容器的元数据**

  ```shell
  # 查看容器的元数据
  docker inspect 容器ID
  ```



## 5. 容器数据卷

Docker容器产生的数据，如果不备份，那么当容器实例删除后，容器内的数据自然也就没有了。

为了能实现数据持久化，在docker中我们使用卷。

卷就是目录或文件，将主机目录挂载在一个或多个容器中，由docker挂载到容器，是一种**数据共享技术**。

卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker不会在容器删除时删除其挂载的数据卷。

**特点**：

1. 数据卷可在容器之间共享或重用数据
2. 卷中的更改可以直接实时生效
3. 数据卷中的更改不会包含在镜像的更新中
4. 数据卷的生命周期一直持续到没有容器使用它为止



- **数据卷使用**

  ```shell
  # 使用-v命令挂载
  docker run -it -v 主机目录:容器目录 imagename /bin/bash
  ```

- **具名挂载和匿名挂载**

  ```shell
  # 具名挂载
  # -v 命令同时指定了卷名和容器内路径
  docker run -d -P --name n1 -v volname:/etc/nginx nginx
  # -v 命令同时指定主机路径和容器内路径
  docker run -d -P --name n1 -v /home/nginx:/etc/nginx nginx
  
  # 匿名挂载
  # -v 命令只指定了容器内路径
  docker run -d -P --name n1 -v /etc/nginx nginx
  ```

- **列出所有数据卷**

  ```shell
  docker volume ls
  ```

- **查看数据卷元数据**

  ```shell
  docker volume inspect volume_name
  ```

- **设置容器对数据卷读写权限**

  ```shell
  # ro readonly 只读
  # rw readwrite 可读可写
  docker run -d -P --name n1 -v volname:/etc/nginx[:ro | :rw] nginx
  ```

  

## 6. Dockerfile

Dockerfile就是用来构建docker镜像的构建脚本。

- **Dockerfile基本指令**

  ```dockerfile
  # FROM 指定基础镜像 例如centos ubuntu
  FROM centos
  
  # MAINTAINER 声明维护者信息
  MAINTAINER jin,497189xxx@gmail.com
  
  # RUN 镜像构建(build)时需要执行的命令
  # 1. shell方式
  RUN 
  # 2. exec方式
  RUN ["可执行文件","参数1","参数2"]
  
  # WORKDIR 镜像进入时工作目录
  WORKDIR /home
  
  # VOLUME 主机卷挂载到的目录(容器内)
  VOLUME ["volume01", "volume02"]
  
  # EXPOSE 声明端口
  # 帮助镜像使用者理解这个镜像服务使用的端口，以方便配置映射
  # 在运行时使用随机端口映射时，会自动随机映射EXPOSE的端口
  EXPOSE 8080 3306
  
  # CMD 指定容器启动(docker run)时候执行的命令
  # 可以被docker run命令行参数中指定要运行的命令所覆盖
  # 如果存在多个CMD指令, 仅最后一个生效
  # 1. shell方式
  CMD /bin/bash
  # 2. exec方式
  CMD ["<可执行文件或命令>", "<参数1>", "<参数2>"]
  # 3. 为ENTRYPOINT指令提供参数
  CMD ["参数1", "参数2", ...]
  
  # ENTRYPOINT 类似于CMD指令 
  # 不会被docker run命令行参数指定的命令所覆盖，并且这些命令会被作为参数追加到ENTRYPOINT命令后
  # 如果存在多个ENTRYPOINT指令，仅最后一个生效
  ENTRYPOINT ["可执行文件或命令", "参数1", "参数2"]
  
  # ONBUILD 当另一个Dockerfile使用该Dockerfile构建的镜像时执行的命令
  ONBUILD
  
  # COPY 复制文件或目录到容器内指定路径
  COPY [00chown=<user>:<group>] 源路径 目标路径
  
  # ADD 和COPY指令类似
  # ADD优点: 在执行<源文件>为tar压缩文件时，压缩格式为 gzip, bzip2 以及 xz 的情况下，会自动复制并解压到 <目标路径>
  ADD 
  
  # ENV 构建时设置环境变量
  ENV key value
  ENV key1=value1 key2=value2 ...
  ```

- **使用Dockerfile构建镜像**

  ```shell
  # -f 文件路径
  # -t target 目标镜像
  # . 上下文路径，docker是C/S，docker在构建镜像时是在docker引擎下完成的
  #   在构建时需要将指定目录下的文件一起打包供docker引擎使用
  #   默认上下文路径是Dockerfile所在路径
  docker build -f dockerfile文件路径 -t 镜像名[:tag] .
  ```



## 7. Docker网络

### 7.1. Docker0

Docker使用Linux桥接，在宿主机虚拟一个Docker容器网桥(**docker0**)，Docker启动一个容器时会根据Docker网桥的网段分配给容器一个IP地址，称为Container-IP，同时Docker网桥是每个容器的默认网关。

因为在同一宿主机内的容器都接入同一个网桥，这样容器之间就能够通过容器的Container-IP直接 通信。

Docker容器网络就很好的利用了Linux虚拟网络技术，在本地主机和容器内分别创建一个虚拟接口，并让他们彼此联通（这样一对接口叫**veth pair**）
Docker中的网络接口默认都是虚拟的接口。虚拟接口的优势就是转发效率极高（因为Linux是在内核中进行数据的复制来实现虚拟接口之间的数据转发，无需通过外部的网络设备交换）

![image-20221106215525134](https://img.gujin.store/img/image-20221106215525134.png)

### 7.2. 自定义网络

**docker0缺点**：不支持容器名网络访问

- **查看所有的docker网络**

  ```shell
  docker network ls
  ```

- **网络模式**

  - **bridge**：桥接 (docker默认)
  - **none**：不配置网络
  - **host**：和宿主机共享网络
  - **container**：容器内网络连通 (直接互连，用的比较少，局限大)

- **创建网络**

  ```shell
  docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet
  ```

- **启动容器时指定网络**

  ```shell
  docker run -d -P --name name1 --net mynet tomcat 
  ```

**好处**：不同的集群使用不同的网络(而不是全部基于docker0)，保证集群的安全和健康

- **将容器连接到不同的网络**

  ```shell
  # 打通不同网络间的容器通信
  docker network connect mynet containner01
  ```

  

## 8. Docker镜像发布

### 8.1.  发布到DockerHub

```shell
# 登录
docker login
# 推送到仓库
docker push USR/IMAGE[:tag]
```

### 8.2.  发布到阿里云镜像仓库

详见阿里云官网



## 9. Docker可视化管理工具

### 9.1. Portainer

Portainer是一个可视化的容器镜像的图形管理工具，利用Portainer可以轻松构建，管理和维护Docker环境。 而且完全免费，基于容器化的安装方式，方便高效部署。

```shell
# 拉取，启动portainer
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

# 浏览器打开访问ip:9000即可进入面板
```



## 10. 练习用例

### 10.1. Docker安装Nginx

```shell
# 搜索镜像 (建议Docker Hub)
docker search nginx
# 下载镜像
docker pull nginx
# 启动镜像
docker run -d  --name="nginx0" -p 3344:80 nginx
# 查看是否启动成功
curl localhost:3344    # 或者直接浏览器打开访问3344端口
```

### 10.2. 构建自己的centos

```dockerfile
FROM centos:7
MAINTAINER Jin<497189xxx@qq.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $MYPATH
```



---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://www.gujin.store/posts/2021-10-04-docker-study-note/  

