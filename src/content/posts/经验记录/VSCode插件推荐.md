---
title: VSCode 功能与美化扩展插件推荐
slug: vscode-extension-recommendations
category: 经验记录
tags:
  - VSCode
cover: https://images.hpcesia.com/671f2b1ec465f.webp
published: 2024-09-05T15:22:43+08:00
description: 推荐一些好用实用的 VSCode 扩展。
---

:::collapse{title="更新日志"}

- 2025-03-03
  - 新增插件推荐：
    - Roo Code
  - 移除插件推荐：
    - Continue
- 2024-10-23
  - 新增插件推荐：
    - Continue
  - 补充了部分扩展的效果图片
- 2024-09-10
  - 新增插件推荐：
    - SpaceBox UI Enhancer
- 2024-09-06
  - 新增插件推荐：
    - Excalidraw
    - CodeGeeX
    - Code Spell Checker
- 2024-09-05
  - 发布文章。

:::

## 功能

这节推荐的都是比较通用的功能性扩展，针对某个语言的扩展也不需要我来推荐，自有大把针对性的文章进行介绍。

### Path Intellisense

[Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) 扩展可以在输入文件路径的时候给出自动补全提示，方便输入。

### Project Manager

[Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) 扩展可以在侧边栏新增一个「项目管理器」选项，通过在项目管理器中保存项目，可以实现不同工作区之间的快速切换。

![项目管理器界面](https://images.hpcesia.com/671f2b182d4e2.webp)

### Error Lens

[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) 扩展可以直接把错误、警告与提示等信息直接显示在代码行后面，而不是只能把光标移动到下划线处才能看到。

![](https://images.hpcesia.com/671f2b18ef191.webp)

![](https://images.hpcesia.com/671f2b19c3004.webp)

### Todo Tree

[Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) 扩展可以搜索整个工作区内的「TODO」、「FIXME」、「BUG」等字段，并在侧边栏的选项中查看。

![效果演示](https://images.hpcesia.com/671f2b1a87449.webp)

### Trailing Spaces

[Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces) 扩展可以标红每行代码尾部多余的空格。

![效果演示](https://images.hpcesia.com/671f2a87a27fb.png)

### Excalidraw

[Excalidraw](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor) 扩展可以在 VSCode 内绘制手绘风格的矢量图片，支持导出 `.png` 和 `.svg` 格式。

![Excalidraw 绘图](https://images.hpcesia.com/671f2b1ec465f.webp)

### CodeGeeX

[CodeGeeX](https://marketplace.visualstudio.com/items?itemName=aminer.codegeex) 扩展可以调用本地或网络的大模型，来加速代码编写。CodeGeeX 的大模型在 GitHub 上开源，因此可以通过本地运行大模型，放心地在涉及商业秘密的项目中使用。

### Code Spell Checker

[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) 扩展可以检测代码中的英文拼写错误并给出修改建议。

### 翻译(英汉词典)

[翻译(英汉词典)](https://marketplace.visualstudio.com/items?itemName=CodeInChinese.EnglishChineseDictionary) 扩展可以在选中单词时在右下角给出单词的翻译，并且可以翻译下划线、驼峰等格式的单词，方便理解代码。

:::collapse{title="效果演示}

![](https://gcore.jsdelivr.net/gh/program-in-chinese/vscode_english_chinese_dictionary/截图/2018-12-25-vscode英汉词典批量1.gif)

![](https://gcore.jsdelivr.net/gh/program-in-chinese/vscode_english_chinese_dictionary/截图/2018-12-03_vscode英汉词典_形容词_名词组合.png)

![](https://gcore.jsdelivr.net/gh/program-in-chinese/vscode_english_chinese_dictionary/截图/2020-08-16_ACCOUNT_NUMBER.png)

![](https://gcore.jsdelivr.net/gh/program-in-chinese/vscode_english_chinese_dictionary/截图/2021-09-14-悬停显示翻译结果.gif)

:::

### 驼峰翻译助手

[驼峰翻译助手](https://marketplace.visualstudio.com/items?itemName=svenzhao.var-translation)扩展可以调用翻译 API，将中文直接翻译为英文的不同格式的变量名，再也不用发愁怎么命名变量。

![效果演示](https://gcore.jsdelivr.net/gh/SvenZhao/var-translation/images/vscode1.gif)

### Roo Code

Roo Code 是一个类似 Cursor 的 AI 代码助手插件。优势在于能够调用 VSCode 自带的 GitHub Copilot 的 API，对于有 GitHub Copilot Pro 免费访问的人（学生认证或 1k star 开源库的维护者）比较友好。不过 VSCode 的 API 不支持多模态，只能文字描述需求。

## 美化

### Material Icon Theme

[Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) 扩展是一个文件图标扩展，其为各种文件与文件夹都制作了特殊的图标，方便浏览。

![效果演示](https://images.hpcesia.com/671f2b1b63cdf.webp)

### background-cover

[background-cover](https://marketplace.visualstudio.com/items?itemName=manasxx.background-cover) 扩展可以直接在其自带的命令中修改更换 VSCode 背景图片。

![扩展配置命令](https://images.hpcesia.com/671f2b17609b2.webp)

更换背景图后效果如下：

![更换背景图效果](https://images.hpcesia.com/671f2b166c506.webp)

### SpaceBox UI Enhancer

[SpaceBox UI Enhancer](https://marketplace.visualstudio.com/items?itemName=SpaceBox.spacebox-ui) 扩展为 VSCode 的菜单增加了大量对效率影响较小的过渡动画效果。

> [!NOTE]
> 评论区反应 MacOS 下该插件可能不可用，请注意。

![动画效果演示](https://gcore.jsdelivr.net/gh/amnweb/SpaceBox-UI-Enhancer/images/demo.gif)
