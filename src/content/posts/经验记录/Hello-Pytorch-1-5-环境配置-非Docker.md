---
title: Hello, PyTorch (1.5) | 环境配置（非 Docker 版)
slug: hello-pytorch-1-5
category: 经验记录
tags:
  - Python
  - Hello
cover: https://images.hpcesia.com/677eaae0148b6.webp
published: 2025-01-31T23:30:36+08:00
---

## 安装 pixi

pixi 是一个跨平台的、与 conda 兼容的、通过 lock 文件保证可移植性的 python 管理工具。在终端中执行如下命令安装 pixi，其中进行了一次字符串替换，以使用 github 镜像站点进行下载：

- **Windows**：

  ```shell
  powershell -ExecutionPolicy ByPass -c "(irm -useb https://pixi.sh/install.ps1).Replace('https://github.com', 'https://github.site') | iex"
  ```

- **Linux/macOS**：

  ```shell
  curl -sSL https://pixi.sh/install.sh | sed 's|https://github.com|https://github.site|g' | bash
  ```

安装完成后，可以使用 `pixi` 命令进行包管理。建议参考[官网](https://pixi.sh/latest/#autocompletion)为 pixi 添加命令补全。还需要为 pixi 添加国内镜像源，以加速包的下载。在终端中执行如下命令：

```shell
pixi config edit --global
```

此时会用系统自带的文本编辑器打开一个文件，在其中粘贴如下内容：

```toml
~/.pixi/config.toml
[pypi-config]
index-url = "https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple"
```

## 使用 pixi 安装 Pytorch 环境

新建一个目录，例如 \~/workspace/python，用于存放所有新的 Python 项目的文件夹。在终端中进入该文件夹后执行如下命令：

```shell
pixi init any_name --format pyproject
```

这会创建一个 \~/workspace/python/any_name 文件夹，目录结构为：

```
any_name/
├── src/
│   └── any_name/
│       └── __init__.py
└── pyproject.toml
```

其中 `pyproject.toml` 是项目的配置文件，`src/` 是项目的源代码目录。打开 `pyproject.toml` 文件，添加如下内容：

```toml
# pyproject.toml
[tool.pixi.feature.gpu.system-requirements]
cuda = "12.0"

[tool.pixi.feature.gpu.dependencies]
cuda-version = "12.6"
pytorch-gpu = "*"

[tool.pixi.feature.cpu.dependencies]
pytorch-cpu = "*"

[tool.pixi.environments]
cpu = ["cpu"]
default = ["gpu"]
```

接着在终端中执行如下命令：

```shell
pixi add scipy matplotlib deepxde
```

安装 pyproject.toml 中列出的依赖和新增的绘图库和深度学习库依赖，其中 DeepXDE 是一个多后端的深度学习库，主要用于数学求解。
