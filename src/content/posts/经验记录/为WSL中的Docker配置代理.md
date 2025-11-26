---
title: 为 WSL 中的 Docker 配置 systemd 以使用宿主机代理
slug: set-proxy-for-docker-in-wsl
category: 经验记录
tags:
  - Windows
cover: https://images.hpcesia.com/677918f98fbc1.webp
published: 2025-01-04T19:19:35+08:00
description: 为 Windows 10 上的 WSL2 安装的原生 Docker 配置代理
---

## WSL 中使用 Systemd 为 Docker 配置代理

对于 Windows 11 22H2 以上版本来说，为 WSL2 里的 Docker 配置代理，只需要将 WSL2 的网络切换为镜像模式，即可像配置原生 Linux 一样配置代理。但对 Windows 10 用户来说，配置代理就会麻烦一点。由于 WSL2 每次宿主机开机时，分配的虚拟网卡地址不一样，因此不能直接使用 127.0.0.1 访问宿主机上的代理。同时 Docker 使用 systemd 启动，写在终端中的代理配置，如

```fish
export hostip=(cat /etc/resolv.conf | grep -oP '(?<=nameserver\ ).*')
export https_proxy="http://$hostip:7890"
export http_proxy="http://$hostip:7890"
```

是不能正常生效的。

网络上的相关教程基本都使用的是固定 ip，这样每次开机都需要改动 ip，或者写脚本固定分配给 WSL2 的ip。我研究了一段时间后，发现可以直接通过修改 systemd 配置来让 Docker 也使用宿主机的代理。

以下以 Clash 为例，代理端口为 7890，WSL2 中用户名称为 hpcesia，请自行改动相关内容。首先创建配置文件：

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo vim /etc/systemd/system/docker.service.d/proxy.conf
```

在其中输入如下内容，注意替换端口号：

```ini
# proxy.conf
[Service]
ExecStartPre=sudo /bin/bash -c "echo http_proxy=http://$(cat /etc/resolv.conf | grep -oP '(?<=nameserver\\ ).*'):7890 > /tmp/docker_env"
ExecStartPre=sudo /bin/bash -c "echo https_proxy=http://$(cat /etc/resolv.conf | grep -oP '(?<=nameserver\\ ).*'):7890 >> /tmp/docker_env"

[Service]
EnvironmentFile=-/tmp/docker_env
Environment=no_proxy="127.0.0.1,localhost"
```

再重启 docker 即可。

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

使用 hello-world 镜像进行测试，可以正常拉取，说明配置成功。

## 参考资料

- [systemd.exec 中文手册 [金步国]](https://www.jinbuguo.com/systemd/systemd.exec.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)
- [systemd.service 中文手册 [金步国]](https://www.jinbuguo.com/systemd/systemd.service.html#ExecStartPre=)
