---
title: Fluid 主题无侵入改造记录
slug: fluid-theme-modification-notes
category: 小屋相关
tags:
  - Hexo
cover: https://images.hpcesia.com/671f2b14c3570.webp
published: 2024-08-26T15:54:36+08:00
description: 非侵入式改造 Hexo 的 Fluid 主题的经验记录
---

:::collapse{title="更新日志"}

- 2024-09-07
  - 更新主题更换提醒。

- 2024-09-03
  - 规范了更新日志格式。

- 2024-08-27
  - 新增「文章时效性显示」、「随机文章跳转」与「代码块美化」相关内容。

- 2024-08-26
  - 新增「顶部阅读进度条」与「建站时间显示」相关内容。

- 2024-08-26
  - 发布文章。

:::

> [!WARNING]
> ~~本博客已更换至 [Solitude](https://solitude.js.org/zh/) 主题，Fluid 主题相关内容仅供参考。~~
>
> 本博客已更换至 [Astral Halo](https://github.com/HPCesia/astral-halo) 主题，Solitude 与 Fluid 主题相关内容仅供参考。

[Hexo](https://hexo.io) 的 [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) 主题是一个很好的主题，功能基本完整，页面简洁，加载浏览都很流畅。但是我对这个主题的页面仍有想修改的地方，特此记录。

同时为了保证在更新主题是不会影响我的修改，因此本文中所有修改都是**非侵入式**（不修改主题源代码）的。

## 文章时效性提示

在 `source/custom/js` 目录下新建 `outdate-notice.js` 文件：

```javascript
// source/custom/js/outdate-notice.js
window.onload = function () {
  //不同的日期显示不同的样式，200 天为黄色提示，400天为红色提示，可以自己定义。
  let warningDay = 200;
  let errorDay = 600;
  // 确保能够获取到文章时间以及在文章详情页
  let times = document.getElementsByTagName('time');
  if (times.length === 0) {
    return;
  }
  let posts = document.getElementsByClassName('post-content');
  if (posts.length === 0) {
    return;
  }

  // 获取系统当前的时间
  let pubTime = new Date(times[0].dateTime); /* 文章发布时间戳 */
  let now = Date.now(); /* 当前时间戳 */
  let interval = parseInt(now - pubTime);
  let days = parseInt(interval / 86400000);
  /* 发布时间超过指定时间（毫秒） */
  //note warning 以及 note danger 是 Next 主题的自定义模板语法，如果使用其他主题，请自行更改样式以达到最佳显示效果
  if (interval > warningDay * 3600 * 24 * 1000 && interval < errorDay * 3600 * 24 * 1000) {
    posts[0].innerHTML =
      '<div class="note note-warning">' +
      '<h5>文章时效性提示</h5><p>这是一篇发布于 ' +
      days +
      ' 天前的文章，部分信息可能已发生改变，请注意甄别。</p>' +
      '</div>' +
      posts[0].innerHTML;
  } else if (interval >= errorDay * 3600 * 24 * 1000) {
    posts[0].innerHTML =
      '<div class="note note-danger">' +
      '<h5>文章时效性提示</h5><p>这是一篇发布于 ' +
      days +
      ' 天前的文章，部分信息可能已发生改变，请注意甄别。</p>' +
      '</div>' +
      posts[0].innerHTML;
  }
};
```

在之前创建的 `scripts/injector.js` 中新增：

```javascript
// scripts/injector.js
// 注入文章时效性提示
hexo.extend.injector.register(
  'body_end',
  `<script src="custom/js/outdate-notice.js"></script>`,
  'post'
);
```

使用 `hexo cl` + `hexo d -g` 重新生成并部署即可。

## 代码块美化

在 `scripts` 目录下新建 `code-pretty.js` 文件：

```javascript
// scripts/code-pretty.js
'use strict';

// 获取唯一 ID
function getUuid() {
  return Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
}

hexo.extend.filter.register(
  'after_post_render',
  (data) => {
    const { line_number, lib } = hexo.theme.config.code.highlight;

    let reg;
    if (lib === 'highlightjs') {
      if (line_number) {
        reg = /(<figure class="highlight.+?>)(.+?hljs (.*?)".+?)(<\/figure>)/gims;
      } else {
        reg = /(<div class="code-wrapper.+?>)(.+?hljs (.*?)".+?)(<\/div>)/gims;
      }
    } else if (lib === 'prismjs') {
      reg = /(<div class="code-wrapper.+?>)(.+?data-language="(.*?)".+?)(<\/div>)/gims;
    }

    data.content = data.content.replace(
      reg,
      (match, begin, inner, lang, end, offset, string) => {
        const collapseId = `collapse-${getUuid()}`;
        const collapseBtn = `<i class="iconfont icon-code" type="button" data-toggle="collapse" data-target="#${collapseId}"></i>`;
        const collapseDiv = `<div class="collapse show" id="${collapseId}">${inner}</div>`;
        const langSpan = `<span>${lang.toUpperCase()}</span>`;
        return begin + collapseBtn + langSpan + collapseDiv + end;
      }
    );

    return data;
  },
  10000 // 应该在完成其他渲染后执行，因此将优先级设大一点
);
```

> [!TIP]
> 如果需要修改代码块右上角图标，请更换 `collapseBtn` 的 icon 部分 `"iconfont icon-code"`。

再在 `custom/css` 中新建 `code-pretty.styl` 文件

```stylus
// custom/css/code-pretty.styl
.markdown-body .highlight table,
.markdown-body .code-wrapper pre {
  border-radius: 0 0 0.5rem 0.5rem;
}

.markdown-body .highlight,
.markdown-body .code-wrapper {
  background-color: #e6ebf1;
  border-radius: 0.625rem;

  // 折叠图标
  > i {
    color: #777777;
    margin-left: 10px;
    line-height: 2rem;
    transform: none;
    transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;

    // &.collapsed {
    //   transform: rotate(-90deg);
    // }
  }

  // 代码语言
  > span {
    color: #777777;
    margin-left: 10px;
    font-weight: bold;
  }
}

.copy-btn {
  font-size: 1rem;
  color: darkslategrey;

  > i {
    font-size: 1rem !important;
    font-weight: bold;
  }
}

[data-user-color-scheme='dark'] {
  .copy-btn {
    color: #c4c6c9;
    transition: color 0.2s ease-in-out;
  }
}

[data-user-color-scheme='dark'] {
  .markdown-body .highlight,
  .markdown-body .code-wrapper {
    background-color: #696969;
    transition: background-color 0.2s ease-in-out;

    > i {
      color: #c4c6c9;
    }

    > span {
      color: #c4c6c9;
      transition: color 0.2s ease-in-out;
    }
  }
}
```

在 `_config.fluid.yml` 中的 `custom_css` 配置项中添加：

```yaml
# _config.fluid.yml
custom_css:
  - custom/css/code-pretty
```

使用 `hexo cl` + `hexo d -g` 重新生成并部署即可。

## 浏览器恶搞标签

在 `source` 目录下新建 `custom/js` 目录，再在其中新建 `label-page.js` 文件，内容为：

```javascript
// custom/js/label-page.js
// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    document.title = '(´;ω;｀) 你不要我了吗 - ' + OriginTitle;
    clearTimeout(titleTime);
  } else {
    document.title = OriginTitle;
    titleTime = setTimeout(function () {
      document.title = OriginTitle;
    }, 2000);
  }
});
```

随后在 `_config.fluid.yml` 中的 `custom_js` 配置项中添加：

```yaml
# _config.fluid.yml
custom_js:
  - /custom/js/label-page.js # 浏览器恶搞标题
```

使用 `hexo cl` + `hexo d -g` 重新生成并部署即可。

## 背景动态线条

### 简单版

添加[背景动态线条](https://github.com/hustcc/canvas-nest.js)只需要在 `_config.fluid.yml` 中新增 `custom_html` 配置项并添加如下内容：

```yaml
# _config.fluid.yml
custom_html:
  - <script type="text/javascript" color="255,255,255" opacity="1.0" zIndex="-1" count="110" src="https://cdn.jsdelivr.net/npm/canvas-nest.js@1.0.1/dist/canvas-nest.js"></script>
```

使用 `hexo cl` + `hexo d -g` 重新生成并部署即可。

### 修改版

由于 `canvas-nest.js` 的 `2.0.0` 以后所有版本都与 Fluid 主题有冲突，而 `1.0.1` 版本不能修改点的颜色，只能修改线条颜色，因此还可以选择将 `1.0.1` 版本的 `js` 文件下载到本地进行修改。

下载[源文件](https://cdn.jsdelivr.net/npm/canvas-nest.js@1.0.1/dist/canvas-nest.js)到本地 `source/custom/js` 目录下，分别修改以下内容：

- 在 `c: get_attribute(script, "color", "0,0,0"),` 后新增一行

```javascript add={2}
// source/custom/js/canvas-nest.js
    p: get_attribute(script, "pointColor", "0,0,0"), //pointColor
```

- 在`context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")"` 后新增一行

```javascript add={2}
// source/custom/js/canvas-nest.js
context.fillStyle = "rgba(" + config.p + ")",
```

然后在 `_config.fluid.yml` 中新增 `custom_html` 配置项并添加如下内容：

```yaml
# _config.fluid.yml
custom_html:
  - <script type="text/javascript" color="255,255,255" pointColor="252,228,236" opacity="1.0" zIndex="-1" count="110" src="/custom/js/canvas-nest.js"></script>
```

使用 `hexo cl` + `hexo d -g` 重新生成并部署即可。

## 顶部阅读进度条

在 `source/custom/js` 目录下新建 `read-progress-bar.js` 文件：

```javascript
// source/custom/js/read-progress-bar.js
document.addEventListener('DOMContentLoaded', function () {
  var winHeight = window.innerHeight,
    docHeight = document.documentElement.scrollHeight,
    progressBar = document.querySelector('#content_progress');
  progressBar.max = docHeight - winHeight;
  progressBar.value = window.scrollY;

  document.addEventListener('scroll', function () {
    progressBar.max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.value = window.scrollY;
  });
});
```

再在 `source/custom/css` 目录下新建 `read-progress-bar.css` 文件：

```css
/* source/custom/css/read-progress-bar.css */
#content_progress {
  /* Positioning */
  position: fixed;
  left: 0;
  top: 0;
  z-index: 32766;
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: transparent;
  color: #ffffff80; /* 使用半透明白色，适配夜间模式 */
}

#content_progress::-webkit-progress-bar {
  background-color: transparent;
}

#content_progress::-webkit-progress-value {
  background-color: #ffffff80;
}

#content_progress::-moz-progress-bar {
  background-color: #ffffff80;
}
```

接着在 `scripts` 目录下新建 `injector.js` 文件：

```javascript
// scripts/injector.js
// 注入阅读进度条
hexo.extend.injector.register(
  'head_begin',
  '<progress id="content_progress" value="0"></progress>',
  'post'
);
```

最后在 `_config.fluid.yml` 中的 `custom_js` 和 `custom_css` 配置项中添加：

```yaml
# _config.fluid.yml
custom_js:
  - custom/js/read-progress-bar.js
custom_css:
  - custom/css/read-progress-bar.css
```

使用 `hexo cl` + `hexo d -g` 重新生成并部署即可。

## 建站时间

在 `source/custom/js` 目录下新建 `create-time.js` 文件：

```javascript
// source/custom/js/create-time.js
var now = new Date();
function createtime() {
  var grt = new Date('08/19/2024 12:00:00'); //在此处修改你的建站时间，格式：月/日/年 时:分:秒
  now.setTime(now.getTime() + 250);
  days = (now - grt) / 1000 / 60 / 60 / 24;
  dnum = Math.floor(days);
  hours = (now - grt) / 1000 / 60 / 60 - 24 * dnum;
  hnum = Math.floor(hours);
  if (String(hnum).length == 1) {
    hnum = '0' + hnum;
  }
  minutes = (now - grt) / 1000 / 60 - 24 * 60 * dnum - 60 * hnum;
  mnum = Math.floor(minutes);
  if (String(mnum).length == 1) {
    mnum = '0' + mnum;
  }
  seconds = (now - grt) / 1000 - 24 * 60 * 60 * dnum - 60 * 60 * hnum - 60 * mnum;
  snum = Math.round(seconds);
  if (String(snum).length == 1) {
    snum = '0' + snum;
  }
  document.getElementById('timeDate').innerHTML = '本站已创建 ' + dnum + ' 天 ';
  document.getElementById('times').innerHTML = hnum + ' 小时 ' + mnum + ' 分 ' + snum + ' 秒';
}
setInterval('createtime()', 250);
```

在 `_config.fluid.yml` 中的 `custom_js` 配置项中添加：

```yaml
# _config.fluid.yml
custom_js:
  - custom/js/create-time.js
```

最后在 `_config.fluid.yml` 中修改 `footer/content` 配置项，新增一行

```html
<br /><span id="timeDate">天数载入中</span><span id="times">...</span><br />
```

即将 `footer/content` 配置项修改为如下形式：

```yaml
# _config.fluid.yml
footer:
  content: '
    <a href="https://hexo.io" target="_blank" rel="nofollow noopener"><span>Hexo</span></a>
    <i class="iconfont icon-love"></i>
    <a href="https://github.com/fluid-dev/hexo-theme-fluid" target="_blank" rel="nofollow noopener"><span>Fluid</span></a>
    <br><span id="timeDate">天数载入中</span><span id="times">...</span><br>
  '
```

使用 `hexo cl` + `hexo d -g` 重新生成并部署即可。

## 随机文章跳转

该方法需要先生成 sitemap，可以参考[[posts/小屋相关/Hexo搭建个人博客的实践记录|我的另一篇文章]]。

先在 `source/custom/js` 目录下新建 `random-post.js` 文件：

```javascript
// source/custom/js/random-post.js
function randomPost() {
  fetch('/sitemap.xml')
    .then((res) => res.text())
    .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then((data) => {
      let ls = data.querySelectorAll('url loc');
      let locationHref, locSplit;
      do {
        locationHref = ls[Math.floor(Math.random() * ls.length)].innerHTML;
        locSplit = locationHref.split('/')[3] || '';
        // } while (locSplit == '' || locSplit == 'tags');
        //若所有文章都如 https://…….com/posts/2022/07/…… 格式，主域名后字符是 posts，则循环条件改为：
      } while (locSplit !== 'posts');
      location.href = locationHref;
    });
}
```

在 `_config.fluid.yml` 中的 `custom_js` 配置项中添加：

```yaml
# _config.fluid.yml
custom_js:
  - custom/js/random-post.js
```

随后在喜欢的位置放上 `javascript:randomPost();` 的跳转链接，例如在导航栏：

```yaml
# _config.fluid.yml
menu:
  - {
      key: 'random',
      name: '随机文章',
      link: 'javascript:randomPost();',
      icon: 'iconfont icon-random',
    }
```

使用 `hexo cl` + `hexo d -g` 重新生成并部署即可。

> [!TIP]
> 以上代码中 `icon: "iconfont icon-random"` 使用了我自己的 Iconfont 图标库而非[主题内置 Iconfont 图标库](https://hexo.fluid-dev.com/docs/icon/)，有需要请自行到 [Iconfont](https://www.iconfont.cn/) 创建自己的图标库。

## 新增标签语法

<!-- 参看 [[posts/小屋相关/Fluid主题移植标签语法|另一篇文章]] -->

参看[另一篇文章](/posts/a0486011)

## 参考资料

本篇文章内容参考了类似的大量文章内容，特此感谢（排名不分先后）

- [Hexo博客美化 - 龙泽雨的博客](https://zeyulong.com/posts/3edad46f)
- [Hexo-Fluid搭建与魔改纪录 - 弥冬のBlog](https://wakutsu0223.top/2023/02/24/Hexo-Fluid%E6%90%AD%E5%BB%BA%E4%B8%8E%E9%AD%94%E6%94%B9%E7%BA%AA%E5%BD%95)
- [Hexo-3-Fluid主题魔改 - 遥望](https://www.eurekady.com/article/Fluid/e3b7f02954e5)
- [Hexo博客Fluid主题魔改记录 - KEVIN'S BLOG](https://blog.kevinchu.top/2023/07/17/hexo-theme-fluid-modify)
- [网页动态背景——随鼠标变换的动态线条 - 孤独的飞行者 - 博客园](https://www.cnblogs.com/qq597585136/p/7019755.html)
- [建议添加“文章时效性”提示 · Issue #1051 · fluid-dev/hexo-theme-fluid](https://github.com/fluid-dev/hexo-theme-fluid/issues/1051)
- [Hexo-Fluid 博客美化和修改 | Kiyan's Blog](https://kiyanyang.github.io/posts/f92be1eb/)
- [使用 Hexo 过滤器实现 Fluid 主题的代码折叠 | Kiyan's Blog](https://kiyanyang.github.io/posts/c4dd4019/)
- [利用 SiteMap 随机访问站内页面：：木木木木木](https://immmmm.com/randompost-by-sitemap/)
