---
title: Nix 配置：Dendritic 模式
category: 经验记录
slug: nix-and-dendritic-pattern
tags:
  - NixOS
published: 2025-12-31T18:26:26+08:00
---

你使用 NixOS（或者 nix-darwin/Home Manager）吗？你的 Nix 配置是什么样子的？这不是在查户口，也不是为了说一句「I use NixOS, btw」，而是想介绍一个全新（其实并不太新）的 Nix 配置范式：[Dendritic 模式](https://github.com/mightyiam/dendritic)。~~我承认，我就是想说那句「btw」。~~

> [!TIPS]
> 如果你从来没有听说过 Nix 与 NixOS，可以去看看这篇 [关于 Nix 语言与 NixOS 的简单介绍](https://nixos-cn.org/tutorials/concept/BinaryAndSourceDistribution.html)；如果想更进一步了解，可以看看 [NixOS & Flakes Book](https://nixos-and-flakes.thiscute.world/zh/)。

## 一般的 Nix 配置都长啥样

对于一个最小化安装的 NixOS 系统，整个系统的配置由一个固定的 `configuration.nix` 文件与一个自动扫描生成的 `hardware-configuration.nix` 两个 Nix 文件组成。理论上来说，可以一直只使用这两个文件，编写出几千上万行的单文件地狱级代码组成的配置文件，并构建出任何满足要求且可行的 NixOS 系统。但应该没人想阅读这种量级的单个源代码文件吧。

```typ
写这段代码的时候，只有上帝和我知道它是干嘛的 // 现在只有上帝知道。
```

没人想读，更没人想维护，除非你想跟未来的自己结仇。还好 Nix 有一个 `import` 功能，不然故事到这里就结束了。Nix 的 `import` 可以将一个 Nix 文件整体作为一个值来使用，例如 `a = import ./a.nix;` 这一语句，与 `a = <a.nix 的内容>` 是完全等价的。但如果只使用 Nix 原生的 `import`，对于需要各种复杂输入参数的 Nix 配置来说，手动维护各个 Nix 文件的函数输入是一个很麻烦的事情，所以 Nixpkgs 为 Nix 带来了模块系统。只需一行

```nix
imports = [./another-module.nix];
```

就可以将另一个内容符合 Nix 模块定义的文件作为整个 Nix 配置的一部分。通过这种方式，可以很快速地将多个 Nix 文件组织起来。因此，对多 Nix 配置文件的组织结构与方式就成了一个 Nix 配置的重点之一。如果你简单翻看过 GitHub 上 Star 数量比较高的 Nix 配置仓库，你会发现，这些仓库或多或少地都遵循了一种类似的组织结构，即将不同的功能划分到不同路径的文件当中。

以 [NixOS & Flakes Book](https://nixos-and-flakes.thiscute.world/zh/) 作者 [ryan4yin](https://github.com/ryan4yan) 的 [Nix 配置](https://github.com/ryan4yin/nix-config)为例，该配置将不同的功能按等级划分在了不同模块（例如基础、TUI、GUI 三个等级）下的不同文件中，并在多台主机中通过复用这些功能模块；通过一个手搓的函数实现自动导入一个文件夹中的所有 `.nix` 文件。大概长下面这样：

```
nix-config/
├── flake.nix
├── hosts/
│   └── laptop-01/
│       ├── configuration.nix  # <-- NixOS 入口
│       └── home.nix           # <-- Home Manager 入口
│
├── modules/                   # <-- 系统级模块
│   └── nixos/
│       ├── desktop.nix
│       ├── server.nix
│       └── ...
│
└── home/                      # <-- 用户级模块 (Home Manager)
    └── linux/
        ├── gui/
        │   ├── vscode/
        │   │   └── default.nix
        │   └── ...
        └── ...
```

每个模块的路径就是它的功能描述。这种“看文件名知其意”的模式，已经比“单文件地狱”好太多了。但生命不息折腾不止，Nix 玩家永远在找轮子和造轮子中无限循环。于是有人更进一步，将这种范式提炼出来，提出了这篇文章的主题——[Dendritic 模式](https://github.com/mightyiam/dendritic)。

## Dendritic 模式是什么？

Dendritic 模式是一种基于 [`flake-parts`](https://flake.parts/) 的 Nix 配置组织方式，在这种组织方式下，每一个 `.nix` 文件都是一个 `flake-parts` 模块。而 `flake-parts` 是一个 Nix 配置框架，用于将一个 Nix flake 配置拆分为多个独立的可重用模块，以保持 flake 的整洁性和可维护性。Dendritic 模式利用了 [`flake-parts` 的 `modules` 功能](https://flake.parts/options/flake-parts-modules.html)定义并集成模块化的配置。

Dendritic 的名字意为“树枝状的”，它也确实以一种树状结构来组织文件。所有的模块都存放在 `modules` 目录下，并根据功能进行分类，通过 [vic/import-tree](https://github.com/vic/import-tree) 自动导入所有的模块。

一段时间以前，我把之前的 Nix 配置重构为了 Dendritic 模式。在此之前，我的 Nix 配置总体上是从 [Ryan Yin 的 Nix 配置](https://github.com/ryan4yin/nix-config) 那里抄来的架构，我自己只是稍微改了改 ~~(毕竟天下代码一大抄)~~。一开始的时候，抄来的成熟的配置架构用起来还是很快乐的——直到我遇到需要横跨 NixOS 和 Home Manager 的配置。一旦配置需要横跨 NixOS 和 Home Manager，整个配置就会变得比较繁琐：虽然配置对应的功能与文件路径是相关的，但是几个从文件路径上看关系不大的配置文件事实上是耦合在一起的。

一个简单的例子是在启用某类软件时禁用桌面环境提供的同类软件包。比如我选择使用 DeaDBeeF 作为我的音乐播放器后，我想禁用 KDE Plasma 6 自带的音乐播放器 Elisa。为此，在旧的架构中，我需要依靠注释手动维护 `home` 和 `modules` 两个目录中的不同的文件的同步关系：

```nix
# modules/nixos/desktop.nix
{ pkgs, ...}: {
  # ...
  environment.plasma6.excludePackages = with pkgs.kdePackages; [
    konsole # 因为 Ghostty
    kdepim-runtime # 因为 Thunderbird
    kate # 因为 VSCode
    elisa # 因为 DeaDBeeF
  ];
}
```

```nix
# home/linux/gui/thunderbird.nix
{
  programs.thunderbird.enable = ture;
}
```

这些关联的配置是否可以同步，完全取决于我修改配置时有没有按照注释去同步修改其他地方的配置。这可不兴赌啊！要知道，最不可靠的就是未来的自己会不会记得遵守过去的约定，注释和文档过时也是家常便饭的事。然而，在 Dendritic 模式中，我完全可以通过同一个文件中编写不同的模块来实现跨 NixOS 与 Home Manager 的配置的同步：

```nix
# modules/desktop/thunderbird.nix
{
  flake.modules.nixos.desktop = {pkgs, ...}: {
    environment.plasma6.excludePackages = with pkgs.kdePackages; [
      kdepim-runtime # No needed if using Thunderbird.
    ];
  };

  flake.modules.homeManager.desktop = _: {
    programs.thunderbird = {
      enable = true;
    };
  };
}
```

此时 `kdepim-runtime` 是否启用是与 Thunderbird 这一模块是否被导入是完全一致的。

为什么原先就要这么麻烦？因为通常情况下，Nixpkgs 提供的 `imports` 功能是局限于 NixOS/Home Manager/nix-darwin 内部的，你在 Home Manager 里导入的模块无法修改外层的 NixOS 配置。与此同时，在外层的 NixOS 配置中，也难以访问 Home Manager 中的配置，除非硬编码 Home Manager 的用户名。

那为什么不自定义几个 option？就像这样：

```nix
{lib, pkgs, config, ...}: {
  options.myoption.app.deadbeef.enable = lib.mkEnableOption "Enable DeaDBeeF";
  config = lib.mkIf config.myoption.app.deadbeef.enable {
    environment.plasma6.excludePackages = with pkgs.kdePackages; [elisa];
  };
}
```

```nix
{lib, pkgs, osConfig, ...}: {
  config = lib.mkIf osConfig.myoption.app.deadbeef.enable {
    home.packages = [];
  };
}
```

当然可以！但每加一个横跨 NixOS 与 Home Manager 的程序就得写一套这样的 option，久而久之，你就创造了一个全新的复杂系统，只有上帝看得懂，真是可喜可贺可喜可贺。况且由于 Nix 的几个 LSP 实现的功能都并不够强大，这种方式在自动补全上也没有什么优势。

通过上面的例子，我们可以看到 Dendritic 模式的核心优势：**将高度耦合的配置项聚合到同一个文件中**。这带来了几个显而易见的好处：

1.  原子性：一个功能的所有相关配置都在一个模块里。启用或禁用这个功能，只需要在主机配置中添加或移除这一个模块的导入，而不需要在文件系统的多个角落里进行增删改查。
2.  可发现性：想了解一个程序或一项服务是如何配置时，不再需要在 `nixos/`、`home/`、`services/` 等多个目录中来回跳转，寻找散落的配置片段。所有相关的逻辑都集中在一个地方，极大地提高了配置的可读性和可维护性。
3.  减少心智负担：不再需要通过注释或者单纯依靠记忆来维护不同配置文件之间的隐式依赖。配置本身就是自洽和内聚的。

## 编写一个符合 Dendritic 模式的配置

> 叽里咕噜说半天搞啥名堂呢，快把焚决交出来！

有的，兄弟/姐妹/any pronoun you want，有的，这不就给你安排上了！Dendritic 模式的介绍仓库里提供了一个[最基础的模板](https://github.com/mightyiam/dendritic/tree/master/example)，不过我个人更推荐去啃别人实际的 Dendritic 模式的配置来做参考。啃别人的仓库是一个麻烦事，因为一个显而易见的事实：个人的配置仓库不是为了让别人学习而设计的。我自然也「深受其害」，啃了半天才大概看明白配置仓库的大致结构。

首先创建一个简单的目录结构，这就是接下来的配置的主要内容。

```
nix-config/
├── flake.nix
└── modules/ 
    ├── flake/
    ├── hosts/
    └── ...      # <--- 任何你想要的功能分类方式
```

首先自然是最基本的，给 `flake.nix` 添加主要的输入和唯一的输出：

```nix
# flake.nix
{
  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    import-tree.url = "github:vic/import-tree";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [(inputs.import-tree ./modules)];
    };
}
```

其中 `import-tree ./modules` 的作用就是导入 `./modules` 文件夹中所有不以 `_` 开头的 `.nix` 文件，方便省略掉大部分的 `imports = [...]`；`flake-parts` 是 Dendritic 模式的核心组件；`nixpkgs` 应该不用多说，不过使用的分叉也不一定是 `unstable`，根据实际情况选择即可。接下来就该构建整个配置了。

```nix
# modules/flake/default.nix
{inputs, ...}: {
  imports = [inputs.flake-parts.flakeModules.modules]; # 使用 flake module
  systems = ["x86_64-linux"]; # 根据实际情况添加对应的平台，例如 aarch64-darwin 等。
}
```

```nix
# modules/flake/nixos.nix
{
  inputs,
  lib,
  config,
  withSystem,
  ...
}: let
  prefix = "hosts/"; # 主机对应的 flake module 的前缀，可以修改
  collectHostsModules = modules:
    lib.filterAttrs
    (name: _: lib.hasPrefix prefix name)
    modules;
in {
  flake.nixosConfigurations =
    lib.pipe
    (collectHostsModules config.flake.modules.nixos) # 此处依照实际的 NixOS 配置所在的 flake module
    [
      # 删除主机配置名称的前缀，例如 `hosts/abc` -> `abc`
      (lib.mapAttrs' (
        name: value: {
          name = lib.removePrefix prefix name;
          inherit value;
        }
      ))
      # 生成 NixOS 配置所需的结构
      (lib.mapAttrs' (
        name: module: {
          inherit name;
          value = inputs.nixpkgs.lib.nixosSystem {
            modules = [
              {networking.hostName = name;}
              module
            ];
          }
        }
      ))
    ];
}
```

这样一来，名称为 `"hosts/<hostname>"` 的 flake module 的内容就会变成一个名为 `<hostname>` 的 NixOS 配置。在这之后，只需在 `modules/hosts` 目录中添加主机对应的 flake module，并在该模块中导入所有该主机需要的功能即可，例如：

```nix
# modules/hosts/foobar.nix
{
  flake.modules.nixos."hosts/foobar" = _: {
    nixpkgs.system = "x86_64-linux";

    imports = with config.flake.modules.nixos; [
      # 这些 flake module 的名称仅作为示范，不代表你只能这样取名
      core
      "hardware/cpu/intel"
      "hardware/gpu/amd"
      "services/caddy"
      "services/ollama"
      ...
    ];
    
    fileSystems."/" = {...};
  };
}
```

而导入的这些模块，则写在 `modules/{core,hardware,services}/*.nix` 这样与模块名和功能相对应的路径中。

## 写在结尾

说实话，断更四个月然后憋出来一个三千字不到的水货文章（甚至包含这三段话），我的码字速度还是太懈怠了。虽然开的草稿越来越多，但实际上写了超过三分之一的少之又少。[[posts/旅行回忆/塞尔维亚旅游回忆（上）|塞尔维亚游记]]发出来已经一年多了，到现在也没写好中下两篇，以至于实际上已经快把当时的故事给忘光了。看到隔壁[小氯](https://chlo.is/)动不动就更新一篇万字长文，压力更大了。

这篇文章断断续续写了大概两个月，从刚换到 Dendritic 模式之后就开始动笔了，但是由于之前在备战考研二战，考完了又在到处旅游，实在是没什么空写东西，所以一直拖到了现在。好在赶在 2025 年的尾巴上写完了，不然 2025 年的更新状况就太难看了，可喜可贺可喜可贺。

希望后面还有更多东西能够写出来吧，2026 再见！
