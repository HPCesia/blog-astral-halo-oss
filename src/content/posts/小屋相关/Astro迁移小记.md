---
title: Astro 迁移小记
slug: astro-migration-journal
category: 小屋相关
tags:
  - Astro
published: 2025-03-15T16:59:30+08:00
description: 这个人在摸鱼一个月之后终于舍得更新了。花了两天时间搬迁到了 Astro，新的开始！
---

## 前言

各位，许久不见。上次更新已经是整整一个月前了，这些天在和毕业论文和找工作进行激烈的豆蒸，都没多少时间折腾新主题。不过超过一个月时间不更新，多少有点说不过去，所以抽了一天时间出来，把博客迁移到了基础功能写得差不多的新主题 [Astral Halo](https://github.com/HPCesia/astral-halo) 上来。

写一个 [Astro](https://astro.build/) 主题的想法，最初要追溯到 24 年 10 月。当时正在开发 [hexo-highlight-shiki](https://github.com/HPCesia/hexo-highlighter-shiki)，被 Hexo ~~（得益于厚重的历史）~~ 不能原生支持 ESM 气晕。虽然最后使用 esbuild 解决了问题，但是给博客更换一个现代的前端框架也顺势加入了日程表。至于为什么是 Astro？一方面是在开发上述 Hexo 插件的时候，注意到了 Astro 是自带 [Shiki](https://shiki.tmrs.site/) 作为代码块语法高亮器的；另一方面，则是[小氯之前使用的主题](https://github.com/chlorine3545/hugo-theme-efimero)的[原版](https://github.com/kkbt0/Hugo-Landscape)的原版：[Fuwari](https://github.com/saicaca/fuwari)，是个 Astro 主题，正好可以参考。

Astral Halo 主题本身则是从 25 年 1 月初开始动工的。最初的时候属于是两眼一抹黑，Fuwari 的源码看着是一头雾水，充斥着各种看不懂的逻辑。花了三个月时间，从简单粗暴地复制逻辑地面向报错编程，到 AI 辅助编写脚本，再到现在进化到 AI 只能帮倒忙，总算是做出现在的主题。直到昨天把博客迁移过来以后，我才发现了许多此前并未注意到的 bug。不过目前来看，至少是能跑的，所以暂且慢慢修复，再慢慢把 TODO list 肝完。

## 主题风格

我自己并没有什么设计天赋，所以主题也就主打一个缝合怪，把自己喜欢的东西缝进去。主题的基底，是小屋使用的上一个主题 [Solitude](https://solitude.js.org/cn)；更准确的来说，是[张洪Heo](https://blog.zhheo.com/) 的博客主题，首页的整体布局缝自这里。精髓来自 Fuwari，我相当喜欢它的升降 Banner 的设计，所以花了点心思缝进了主题里，这也是我对这个主题最满意的功能之一。微妙的圆角和细边框则来自 [ShadcnUI](https://ui.shadcn.com/)，相比于 Solitude 的粗边框更得我心。不过我并没有使用 ShadcnUI 的组件，而是使用的 [DaisyUI](https://daisyui.com/)，这是一个纯 CSS 的 UI 库，免去了引入大量 JS 脚本。

主题配色最终选择的是青色+粉色+米色/青褐，是从原神的[希格雯](https://genshin-impact.fandom.com/zh/wiki/%E5%B8%8C%E6%A0%BC%E9%9B%AF)身上吸的颜色（准确地来说，是从[角色介绍的配图](https://www.bilibili.com/opus/1032545788390014999)里吸的颜色），配色水平比我硬凑的好多了。本来目标是粉粉嫩嫩的可爱风，但实际效果嘛……浅色配浅色的可阅读性完全是灾难级的，几种颜色彻底糊成一团，对屏幕阅读相当不友好。所以我最终把对比度拉高了不少，看着还算不错。

## 开发流程

[[posts/生活点滴/月寄-03|月寄（三）]] 里有提到，我在开发新主题的时候，有使用 [Roo Cline](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline)（现在叫 Roo Code）辅助开发。我的 Roo Cline 使用的是 VSCode 的 Copilot LLM API，优点是 GitHub 学生认证后 Copilot Pro 是免费的，缺点则是不能使用图像[^1]。Cursor 倒是没用过，有图像识别助力，想必开发速度能大大提高吧。

Astral Halo 用的是最新的 [TailWind4](https://tailwindcss.com/)，考虑到 AI 的对于较新或较小众的框架/语言的开发水平，我让 AI 负责的都是一次性代码和机械重复工作。一次性代码，主要是一些创建文章模板用的脚本，这些脚本只需要正常实现功能即可，代码的可阅读性、可维护性不重要，因此我让 AI 来编写。机械重复工作，则是有多份逻辑相似，但又不好提炼为模块的代码，需要重复填充，或是翻译不同语言的代码，这种工作正适合 AI 进行。比如，主题的创建文章草稿的功能，就是完全由 AI 编写的，我只负责提供最佳实践的思路和校验结果。

因为没有图像识别功能，所以样式就不能交给 AI 来写，只能自己手搓。样式写起来最累的，还是 Twikoo 的样式。因为不想慢慢覆盖 Twikoo 的原生样式，我选择的是导入 nocss 版本，从零开始直接手搓自己的样式。不过根据[小氯](https://chlo.is/)的说法，AI 对于搓 Twikoo 样式方面大概无能为力就是了。写这么久新主题，感觉所谓「前端三大护城河」里，只有 CSS 才是正儿八经的护城河（笑）。开发过程中，[DaisyUI](https://daisyui.com/) 给了我相当多的思路，其使用的一些 CSS 技巧，在和 [Swup.js](https://swup.js.org/) 豆蒸的时候相当实用——把 JS 脚本全干掉，就不用考虑 Swup 引入的 JS 脚本加载问题了。

虽然 Astro 的[群岛架构](https://docs.astro.build/zh-cn/concepts/islands/)提供了在 Astro 中嵌入 React、Vue、SolidJS 等一众前端框架组件的能力，但因为我自己并不会这些框架，只在集成 [Waline](https://waline.js.org/) 的时候用上了群岛功能，内嵌了 [Waline 提供的 Vue 组件](https://waline.js.org/cookbook/import/project.html#%E5%9C%A8-vue-%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%AF%BC%E5%85%A5)。后续开发过程中，可能也就音乐播放器会用得上群岛架构了。

总之，先慢慢修 bug 吧，今天再修一天，明天又得继续和毕业论文与春招搏斗了（悲）。

[^1]: 注：在写完这篇文章后的某次更新中，GitHub Copilot 已经可以上传附件并调用图像识别功能了。
