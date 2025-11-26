---
title: My Awesome Windows Apps
slug: my-awesome-windows-apps
category: 经验记录
tags:
  - Windows
description: 记录一些个人用过的优质 Windows 软件
published: 2025-04-21T23:39:02+08:00
---

## 前言

这篇文章记录的是我个人用过或者云过的优质 Windows 软件。软件介绍中会记录软件的官网，避免迷路；对于开源软件，还会额外记录软件的源代码仓库地址。

所有软件均按首字母进行排序。

标记说明：

- :icon{name="mdi:star"}：我个人喜欢的软件。
- :icon{name="mdi:source-branch"}：开源软件。
- :icon{name="mdi:globe"}：多语言软件，指至少同时包含中文和英文的软件。
- :icon{name="mdi:terminal"}：**只能**使用命令行操作的软件，不包括 TUI 软件。
- :icon{name="mdi:attach-money"}：**必须**付费才能使用的软件。
- :icon{name="mdi:warning"}：存在某些问题的软件，会具体说明。

## AI 工具

### AnythingLLM :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://anythingllm.com/) | [源代码](https://github.com/Mintplex-Labs/anything-llm)

### Cherry Studio :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://cherry-ai.com/) | [源代码](https://github.com/CherryHQ/cherry-studio)

整合式的 LLM 对话软件，可以使用各家的 API，连接各种 MCP 进行对话/翻译/助理等工作。

### LM Studio :icon{name="mdi:globe"}

[官网](https://lmstudio.ai/)

功能强大的 LLM 本地部署工具。适合高端显卡用户，可以方便地配置各种模型参数，并下载适合自己显卡的模型。

### Ollama :icon{name="mdi:star"} :icon{name="mdi:source-branch"} :icon{name="mdi:terminal"}

[官网](https://ollama.com/) | [源代码](https://github.com/ollama/ollama)

轻量的本地 LLM 部署工具，适合消费级显卡用户使用，可以自动混合使用 GPU 与 CPU 进行模型推理。相比 LM Studio，Ollama 的国内网络环境拉取模型速度比较快，但是没有 GUI 页面，CLI 使用和 Docker 比较类似。

## 安全

### Bitwarden :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://bitwarden.com/) | [源代码](https://github.com/bitwarden/clients)

开源的在线密码管理器，可以自行部署[^1]。有浏览器扩展和 Windows 应用。

### Gpg4win :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://www.gpg4win.org/) | [源代码](https://git.gnupg.org/cgi-bin/gitweb.cgi?p=gpg4win.git)

适用于 Windows 系统的 GnuPG 官方发行版。~~主要作用是给 GitHub 提交加一个 Verified 标志。~~

### KeePass :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://keepass.info/) | [源代码](https://sourceforge.net/projects/keepass/)

强大且可定制的开源本地密码管理器。

## 包管理器

### Chocolaty :icon{name="mdi:source-branch"}

[官网](https://chocolatey.org/) | [源代码](https://github.com/chocolatey/choco)

Windows 命令行包管理器，有[配套 GUI](https://github.com/chocolatey/ChocolateyGUI)。

### Scoop :icon{name="mdi:source-branch"} :icon{name="mdi:terminal"}

[官网](https://scoop.sh/) | [源代码](https://github.com/ScoopInstaller)

Windows 命令行软件安装器，有一定的包管理能力。

### UniGetUI :icon{name="mdi:star"} :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://www.marticliment.com/unigetui/) | [源代码](https://github.com/marticliment/UniGetUI)

Windows 上各种 CLI 包管理器的整合 GUI。

### Winget :icon{name="mdi:source-branch"} :icon{name="mdi:terminal"}

[官网](https://learn.microsoft.com/zh-cn/windows/package-manager/) | [源代码](https://github.com/microsoft/winget-cli/)

Windows 程序包管理器服务的客户端接口。

## 开发工具

### GitUI :icon{name="mdi:source-branch"}

[源代码](https://github.com/gitui-org/gitui)

Rust 版 LazyGit。作者给出的 BenchMark 中，GitUI 在解析整个 Linux 的源代码仓库时，用时为 LazyGit 的一半，占用内存更是不到十分之一，且更加稳定。

### LazyGit :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[源代码](https://github.com/jesseduffield/lazygit)

好用的 Git TUI，适合不想记 Git 命令行操作又懒得开 Git GUI 的情况。

## 浏览器

本节所有软件默认带 :icon{name="mdi:globe"} 标记。~~一个现代浏览器要是还不支持多语言，不如直接埋了算了。~~

### Chrome :icon{name="mdi:source-branch"}

[官网](https://www.google.com/chrome/) | [源代码](https://github.com/chromium/chromium)

市占率最高的浏览器，也是绝大多数网页的主要兼容对象。Google 的同步功在大陆地区属于不可用状态，需要自行配置代理使用。

### Firefox :icon{name="mdi:source-branch"}

[官网](https://www.mozilla.org/zh-CN/firefox/) | [源代码](https://searchfox.org/mozilla-central/source)

唯一的非营利属性主流浏览器（虽然市占率已经低得不能看了（悲））。Firefox 的同步功能在国内也能流畅访问，这点算是优势了。此外 Firefox 还高度可自定义，可以自己搓 CSS、调配置，来获得真正「自己的」浏览器。~~但是魔改一时爽，更新火葬场。~~

### Floorp :icon{name="mdi:star"} :icon{name="mdi:source-branch"}

[官网](https://floorp.app/) | [源代码](https://github.com/Floorp-Projects/Floorp)

基于 Firefox ESR 的开源浏览器，更新较慢，支持多行/垂直标签页和工作区功能（多行/垂直标签页设置需要手动打开）。Floorp 也自带并默认开启了很多实用的 Firefox 配置项，属于是懒人福音版 Firefox。

### LibreWolf :icon{name="mdi:source-branch"}

[官网](https://librewolf.net/) | [源代码](https://codeberg.org/librewolf/source)

### Microsoft Edge

[官网](https://www.microsoft.com/edge)

微软自带的浏览器，纵向标签页和工作区还是比较好用的。且同步功能国内无需魔法即可访问，作为 Chrome 的替代品还是不错的。

此外这个浏览器还是「不可替代」的，因为牢软在 Windows 11 中将系统里的网页链接设置为只能跳转到 Edge 打开，卸掉 Edge 直接不能打开，有点恶心人了（反垄断法呢，救一救啊）。

### Thorium :icon{name="mdi:source-branch"}

[官网](https://thorium.rocks/) | [源代码](https://github.com/Alex313031/Thorium)

Chromium 性能天花板，号称是最快的浏览器，低配置特攻。隐私保护上比 Chrome 强很多，去掉了很多谷歌的遥测，但终究还是 Chromium，Manifest V3 还是逃不掉的

### Zen :icon{name="mdi:source-branch"}

[官网](https://zen-browser.app/) | [源代码](https://github.com/zen-browser/desktop)

Zen 是一个基于 Firefox 的浏览器，Arc 浏览器平替，只支持垂直标签页。

## 视频

### Potplayer :icon{name="mdi:globe"} :icon{name="mdi:warning"}

[官网](https://potplayer.daum.net/)

强大的多媒体播放器。

:icon{name="mdi:warning"}：[违反 FFmpeg 公共许可证](https://github.com/FFmpeg/web/blob/master/src/shame#L63)

### MPV :icon{name="mdi:star"} :icon{name="mdi:source-branch"}

[官网](https://mpv.io/)

功能强大的多媒体播放器，默认 GUI 较简陋，但可扩展性极强。有一个开箱即用的 lazy-mpv 项目，更适合普通人使用。

## 同步

### KDE Connect :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://kdeconnect.kde.org/) | [源代码](https://invent.kde.org/network/kdeconnect-kde)

KDE 旗下用于电脑与手机协同的开源软件，可以共享剪贴板、跨设备访问文件、用手机遥控电脑、通过电脑查找手机位置、在电脑上查看手机的通知等。

### Syncthing :icon{name="mdi:star"} :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://syncthing.net/) | [源代码](https://github.com/syncthing/syncthing)

文件夹同步软件，可以在不同设备中同步文件夹。自带 Web GUI，但是只能命令行启动。可以自行配置开机静默启动的脚本，或使用第三方包装器。

## 图像处理

### Inkscape :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://inkscape.org/zh-hans/) | [源代码](https://gitlab.com/inkscape/inkscape)

专业的矢量图编辑器。

### Krita :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://krita.org/zh-cn/) | [源代码](https://invent.kde.org/graphics/krita)

KDE 旗下的开源专业绘画软件。

### Paint.NET :icon{name="mdi:globe"}

[官网](https://www.getpaint.net/)

轻量级的图像编辑软件，适合不想启动 PhotoShop 这种重量级软件的场合。类似于 Notepad 和 IDE 的使用场景区别。

## 文本编辑器

### Micro :icon{name="mdi:source-branch"}

[源代码](https://github.com/zyedidia/micro)

轻量级 TUI 文本编辑器，Nano 的替代品。其快捷键符合 Windows 用户的习惯，也有 Nano 同款快捷键提示栏，学习曲线很平整。还自带简单的语法高亮，也可以添加 lua 插件，兼具一定的可拓展性。

### NeoVim :icon{name="mdi:source-branch"}

[官网](https://neovim.io/) | [源代码](https://github.com/neovim/neovim/)

TUI 文本编辑器，适合轻中量级文本编辑场景。使用 Lua 作为配置文件，可扩展性很强，可以通过配置与扩展支持 LSP，喜欢用 Vim 的话可以花时间把 NeoVim 配置成 IDE。

### Notepad 3 :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://rizonesoft.com/downloads/notepad3/) | [源代码](https://github.com/rizonesoft/Notepad3)

轻量级文本编辑器，适合用来干查看日志、调整配置文件、临时编写简单脚本的轻量使用场景，不用打开 VSCode 或其他 IDE。

### Visual Studio Code :icon{name="mdi:star"} :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://code.visualstudio.com/) | [源代码](https://github.com/microsoft/vscode)

开源[^2]的 GUI 文本编辑器，Electron 的性能巅峰之作，微软的开源项目头牌之一。

一点简单的使用建议：通过不同的配置文件和工作区来管理 VSCode，保证默认情况下能以最快速度打开 VSCode 而不必等待无用插件加载。

## 下载

### Aria2 :icon{name="mdi:source-branch"} :icon{name="mdi:terminal"}

[官网](https://aria2.github.io/) | [源代码](https://github.com/aria2/aria2)

### Internet Download Manager :icon{name="mdi:globe"} :icon{name="mdi:attach-money"}

[官网](https://www.internetdownloadmanager.com/)

下载速度很好、网页嗅探能力很强的下载器。

### Motrix :icon{name="mdi:source-branch"} :icon{name="mdi:globe"} :icon{name="mdi:warning"}

[官网](https://motrix.app/) | [源代码](https://github.com/agalwood/Motrix)

Aria2 的包装版，使用修改的 Aria2 作为内核。

:icon{name="mdi:warning"}：自 2023 年后不再维护

## 压缩

### 7-Zip :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://www.7zip.com/cn/) | [源代码](https://sourceforge.net/projects/sevenzip/)

老牌开源压缩软件，界面比较简陋。

### Bandizip :icon{name="mdi:globe"} :icon{name="mdi:warning"}

[官网](https://www.bandisoft.com/bandizip/)

免费好用的压缩软件。

:icon{name="mdi:warning"}：目前最新版的免费版本会有无法关闭的广告，甚至有桌面弹窗广告。可以通过下载[无广告的旧版](https://www.bandisoft.com/bandizip/old/6/)来解决该问题。

### NanaZip :icon{name="mdi:star"} :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[源代码](https://github.com/M2Team/NanaZip)

基于 7-Zip 的开源压缩软件，优化了 GUI 以及 Windows 10/11 上的使用体验。

## 音乐

### Dopamine :icon{name="mdi:source-branch"} :icon{name="mdi:globe"} :icon{name="mdi:warning"}

[官网](https://digimezzo.github.io/site/) | [源代码](https://github.com/digimezzo/dopamine-windows)

界面美观清爽的开源音乐播放器。

:icon{name="mdi:warning"}：不能识别音乐标签内的歌词

### Listen1 :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://listen1.github.io/listen1/) | [源代码](https://github.com/listen1/listen1_desktop)

N 合一的国内在线音乐平台播放器，可以不用安装国内的几个音乐平台的客户端了。

### MusicPlayer2 :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[源代码](https://github.com/zhongyang219/MusicPlayer2)

好用的本地音乐播放器。

### Nora :icon{name="mdi:source-branch"} :icon{name="mdi:globe"} :icon{name="mdi:warning"}

[官网](https://noramusic.netlify.app/) | [源代码](https://github.com/Sandakan/Nora)

基于 Electron 和 React 的音乐播放器。

:icon{name="mdi:warning"}: 无法播放部分未处理的 FLAC 格式音乐。

### Salt Player for Windows :icon{name="mdi:globe"} :icon{name="mdi:attach-money"}

[官网](https://moriafly.com/program/spw.html)

安卓上广受好评的 [Salt Player](https://moriafly.com/program/salt-player.html) 的 Windows 版本，目前处于开发测试阶段，需要在 Telegram 群上获取测试版本安装包。

## 邮件

### Thunderbird :icon{name="mdi:star"} :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://www.thunderbird.net/zh-CN/) | 源代码

Mozilla 旗下的开源邮件客户端，界面不太现代，但是使用可以使用插件修改。

### Mailspring :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://getmailspring.com/) | [源代码](https://github.com/Foundry376/Mailspring)

## 游戏

### Epic :icon{name="mdi:globe"}

[官网](https://www.epicgames.com/store/)

赠送大量游戏的游戏平台。

### GOG :icon{name="mdi:globe"}

[官网](https://www.gog.com/)

售卖未加密（DRM-free）游戏的游戏平台

### Playnite :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://www.playnite.link/) | [源代码](https://github.com/JosefNemec/Playnite/)

开源的本地游戏管理平台，可以管理各个游戏平台上的游戏与本地的游戏。优势在于统一管理分散在各种不同平台的游戏，并通过插件提供统一的游戏信息统计。如果玩的游戏的平台很混乱，或者玩的很多游戏是没有比较细游戏数据统计的，或者干脆就是本地的游戏，可以考虑使用该软件整合所有游戏。

### Steam :icon{name="mdi:globe"}

[官网](https://store.steampowered.com/)

使用体验上最好的游戏平台，靠着使用体验来让人买正版游戏。

## 终端

### Alacritty :icon{name="mdi:source-branch"}

[官网](https://alacritty.org/) | [源代码](https://github.com/alacritty/alacritty)

Rust 编写的高性能跨平台终端模拟器。速度比 WezTerm 更快，但是功能支持少一些（如连字特性）。使用 YAML 作为配置文件，没有图形化配置界面。是少数支持触控屏使用的终端模拟器。需要使用 Tmux 才能实现其他终端的一些功能。

### Warp

[官网](https://www.warp.dev/)

嵌入 AI 功能的终端模拟器。颜值高，功能多，但是强制登录后使用。

### WezTerm :icon{name="mdi:source-branch"}

[官网](http://wezterm.org/) | [源代码](https://github.com/wezterm/wezterm)

Rust 编写的高性能跨平台终端模拟器。使用 Lua 作为配置文件，可扩展性和配置文件可复用性都很强。

正式版本长期（一年）未更新，但是开发并未暂停，一部分 BUG 可以通过使用 nightly 版本解决。

### Windows Terminal :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://learn.microsoft.com/zh-cn/windows/terminal/) | [源代码](https://github.com/microsoft/terminal)

Windows 11 自带的终端模拟器。颜值高，集成 Windows 和微软的部分功能（如 WSL、Azure 等）。

## 自定义

### Rainmeter :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://www.rainmeter.net/) | [源代码](https://github.com/rainmeter/rainmeter)

知名的桌面美化软件。

### Sucrose Wallpaper Engine :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[源代码](https://github.com/Taiizor/Sucrose)

Wallpaper Engine 的开源替代品。

### Wallpaper Engine :icon{name="mdi:globe"} :icon{name="mdi:attach-money"}

[官网](https://www.wallpaperengine.io/)

著名的小红车，为桌面添加各式各样的动态壁纸~~以及**滥用**地使用它传输资源~~。

### WindHawk :icon{name="mdi:source-branch"} :icon{name="mdi:globe"}

[官网](https://windhawk.net/) | [源代码](https://github.com/ramensoftware/windhawk)

各种实用的 Windows 软件修改的集合。常见用处是修改 Windows 11 ~~天怒人怨的~~右键菜单与开始菜单。

## BLACKLIST

虽然是 Awesome 软件，但黑名单感觉还是有必要记一个的。

### 360、2345 等一众全家桶

味大，无需多言。典型的有 360、2345、百度、腾讯、搜狗、瑞星等，尽量避免下载这些全家桶软件。

其中 360 安全卫士极速版可用于快速清理被各种全家桶污染的系统，自己卸载起来也还算简单；几个输入法可以使用，但需要火绒之类的软件清理弹窗广告。

### Notepad++

作者曾表示会在不认可其政治观点的使用者的源代码中添加随机字符（虽然作者随后称之为玩笑）。

即便你有审查其代码下毒情况的能力与精力，也不建议花费在这个有众多相似生态位替代品的软件上。

## 致谢

本篇文章灵感来自于 [awesome-windows](https://github.com/0PandaDEV/awesome-windows) 项目。

[^1]: 自行部署建议使用 Rust 编写的轻量版本 [VaultWarden](https://github.com/dani-garcia/vaultwarden)。

[^2]: VSCode 绝大部分是开源的，但是少部分功能（如微软账号登录和遥测）和官方插件（如 Pylance）是闭源的。
