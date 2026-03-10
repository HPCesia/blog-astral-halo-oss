---
title: 使用 Hexo + GitHub Page 搭建个人博客的实践记录。
slug: how-to-build-blog-with-hexo
category: 小屋相关
tags:
  - Hexo
cover: https://pic1.zhimg.com/70/v2-41e1b825c51055f39c22b95777bc620b_1440w.avis?source=172ae18b&biz_tag=Post
published: 2024-08-21T16:23:00+08:00
description: 简单记录了自己使用 Hexo 搭建博客的经验。
---

:::collapse{title="更新日志"}

- 2024-11-14
  - 更新了 gulp 压缩使用的脚本。
- 2024-10-28
  - 新增「域名」相关内容。
- 2024-09-03
  - 迁移「添加网站到搜索引擎」部分到[[小屋相关/Hexo博客收录搜索引擎|另一篇文章]]。
  - 规范了更新日志格式。
- 2024-08-30
  - 更新了「数学公式渲染」、「搜索引擎」、「评论系统」的部分内容。
- 2024-08-28
  - 更新了「数学公式渲染」相关内容。
- 2024-08-27
  - 新增「优化博客性能」相关内容。
- 2024-08-26
  - 新增「添加 RSS 订阅」相关内容。
- 2024-08-25
  - 新增「添加网站到搜索引擎」相关内容。
- 2024-08-24
  - 新增「字体修改」与「启用评论数学公式」相关内容。
- 2024-08-21
  - 发布文章。

:::

> [!NOTE]
> 为了方便自己以后更换电脑后重新配置这个博客，以及日常调试，在此将自己的建站经验记录下来。
>
> 本文仅适用于 Windows 平台。

## 环境搭建

### 前置环境

#### Node.js & npm

在终端中执行

```shell
node -v
```

检查当前环境是否安装 Node.js 以及当前的版本号，若未安装，需要在[官网](https://nodejs.cn/en/download)上下载并安装。Node.js 默认配置了 npm，因此不需要额外下载。

此外，中国大陆地区使用 npm 需要配置淘宝的镜像源：

```shell
npm config set registry https://registry.npmmirror.com
```

#### Git

在[官网](https://git-scm.com/download/win)上下载 Windows 版本的 Git 安装包并安装。

### Hexo

#### 安装

在终端中执行

```shell
npm install hexo-cli -g
```

进行 Hexo 的安装操作，在终端中执行

```shell
hexo -version
```

出现版本号即说明安装成功。

## 本地建站

### 初始化

新建一个用于存储博客数据的目录(如`D:\Blog`)并确保该目录为空，随后在终端中执行

```shell
cd D:\Blog
hexo init
```

等待一段时间，即可成功初始化。此时可使用

```shell
hexo s -g
```

来本地预览初始化成功的博客。

### GitHub 部署

注册 [GitHub](https://github.com/) 账号部分不进行叙述，请参考网上教程。

首先打开根目录下站点配置文件 `_config.yml`，配置有关 `deploy` 的部分：

```yaml
# _config.yml
## Deployment
### Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: 'git'
  repo: git@github.com:用户名/用户名.github.io.git
  branch: master
```

同时在博客根目录下终端执行

```shell
$ npm install hexo-deployer-git --save
```

安装部署插件。然后终端执行

```shell
hexo d
```

即可部署到 GitHub 上。打开上面输入的对应的 `用户名.github.io` 网站，如果能看到和 `hexo s` 一样的网站界面，就说明部署成功。

## 更多配置

这部分是我自己的博客配置，仅供参考。

### 短永久链接

Hexo 默认的永久地址格式是 `YYYY/MM/DD/title`，如果标题为中文，那就是灾难性的链接长度，因此需要更换更短的永久链接。

本站使用了 [`hexo-abbrlink`](https://github.com/ohroy/hexo-abbrlink) 插件固定博文的地址。附上我自己在 `_config.yml` 中的配置，仅供参考。

```yaml
# _config.yml
## abbrlink config
abbrlink:
  alg: crc32 #support crc16(default) and crc32
  rep: hex #support dec(default) and hex
  drafts: false #(true)Process draft,(false)Do not process draft. false(default)
  # Generate categories from directory-tree
  # depth: the max_depth of directory-tree you want to generate, should > 0
  auto_category:
    enable: true #true(default)
    depth: 3 #3(default)
    over_write: false
  auto_title: false #enable auto title, it can auto fill the title by path
  auto_date: false #enable auto date, it can auto fill the date by time today
  force: false #enable force mode,in this mode, the plugin will ignore the cache, and calc the abbrlink for every post even it already had abbrlink. This only updates abbrlink rather than other front variables.
```

### 主题

可以在 Hexo 官网的[主题列表](https://hexo.io/themes/)里选择心仪的主题进行更换，并参考主题的配置说明进行配置。

> [!CAUTION]
> 本博客已更换至 ~~[Solitude](https://solitude.js.org/zh/) 主题~~ [astral-halo](https://github.com/HPCesia/astral-halo) 主题，以下 Fluid 主题相关内容仅供参考。

本博客使用 [Fluid](https://hexo.fluid-dev.com/) 主题。

#### 站名与图标

按照 [Fluid 官方配置文档](https://hexo.fluid-dev.com/docs/start/)安装 Fluid 主题后，先在 `_config.yml` 中修改主站名、描述和网站语言

```yaml
# _config.yml
## Site
title: HPCesia 的摆烂小屋
subtitle: ''
description: '记录自己的摆烂日常与学习记录'
keywords:
author: HPCesia
language:
  - zh-CN
  - zh-TW
timezone: 'Asia/Shanghai' # 这个默认是主机时区，不用管
```

然后可以顺便在 `_config.fluid.yml` 中修改一下网站图标。

```yaml
# _config.fluid.yml
## 用于浏览器标签的图标
## Icon for browser tab
favicon: /img/fluid.png

## 用于苹果设备的图标
## Icon for Apple touch
apple_touch_icon: /img/fluid.png
```

这里建议将新图标放在 `./source` 文件夹中，在生成过程中会与主题自带的文件进行合并。

#### 字体

本博客使用[霞鹜文楷](https://github.com/lxgw/LxgwWenKai)字体，如需配置其他字体，请参考[主题配置指南](https://hexo.fluid-dev.com/docs/guide/#%E5%85%A8%E5%B1%80%E5%AD%97%E4%BD%93)

在 `_config.fluid.yml` 中搜索 `font_family` 即可找到字体配置

```yaml
# _config.fluid.yml
font:
  font_size: 16px
  font_family:
  letter_spacing: 0.02em
  code_font_size: 85%
```

在 `font_family` 后面添加 `"LXGW WenKai Screen"`，并在 `_config.fluid.yml` 中的 `custom_css` 下添加[霞鹜文楷屏幕阅读版网络字体仓库](https://github.com/CMBill/lxgw-wenkai-screen-web)中给出的链接：

```yaml
# _config.fluid.yml
custom_css:
  - https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-web/style.css
```

再使用 `hexo clean` + `hexo g`，即可更换字体。

#### 头图

在 `_config.fluid.yml` 中搜索 `banner_img` 即可找到各页面的头图配置。由于大陆访问 GitHub 的速度相当便秘，头图应该使用 `.webp` 格式进行高度压缩，以在质量不太拉胯的前提下加快加载速度。

#### 数学公式

本博客使用 mathjax 进行数学公式渲染，参考[主题配置指南](https://hexo.fluid-dev.com/docs/guide/#latex-%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F)进行了相应配置。

:::collapse{title="如果你想用 KaTeX"}

KaTeX 使用的 `hexo-markdown-it` 渲染引擎会与 `tocbot` 冲突，导致侧边栏一级目录跳转失效，经排查发现是一级标题对应的 `<h1>` 没有 `id` 导致的

**解决方案**：在 `scripts` 目录下新建 `hexo-markdown-it-bugfix.js` 文件：

```javascript
// scripts/hexo-markdown-it-bugfix.js
hexo.extend.filter.register('after_post_render', (post) => {
  if (post.content) {
    const uniqueIdStore = {};
    post.content = post.content.replace(/<h1>(.*?)<\/h1>/g, function (match, p1) {
      const cleanId = p1.trim().toLowerCase().replace(/\s+/g, '-').replace(/[?#&]/g, '');
      let uniqueId = cleanId;
      if (cleanId === '') {
        uniqueId = 'default';
      }
      if (uniqueIdStore[cleanId]) {
        uniqueId = `${cleanId}-${uniqueIdStore[cleanId]}`;
        uniqueIdStore[cleanId] += 1;
      } else {
        uniqueIdStore[cleanId] = 1;
      }
      if (!/<h1 id=".*?">/.test(match)) {
        return `<h1 id="${uniqueId}">${p1}</h1>`;
      }
      return match;
    });
  }
});
```

效果是为没有添加 `id` 的 `<h1>` 添加正确的 `id`。

:::

#### 评论

本博客使用 [Twikoo](https://twikoo.js.org/) 评论系统，请参考[配置指南](https://twikoo.js.org/quick-start.html)进行配置。

本博客使用的配置方法为配置指南中的 [MongoDB Atlas](https://www.mongodb.com/) + [Hugging Face](https://huggingface.co).

主题需要增加自定义 `.js` 文件来让 Twikoo 评论也能渲染公式。在 `_config.fluid.yml` 中的 `custom_js` 下添加

```yaml
# _config.fluid.yml
custom_js:
  - https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js
  - https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js
```

如果使用的是 mathjax 进行文章数学公式渲染，则还需要在 `custom_css` 下添加

```yaml
# _config.fluid.yml
custom_css:
  - https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css # Twikoo Katex 数学公式渲染
```

再重新 `hexo clean` + `hexo g`，即可在评论区激活数学公式渲染。

> [!NOTE]
> 如果发现评论头像无法加载，请参考[Twikoo 前端部署](https://twikoo.js.org/frontend.html#%E6%9B%B4%E6%8D%A2-cdn-%E9%95%9C%E5%83%8F)更换 `_config.fluid.yml` 的 `static_prefix` 配置项中关于 Twikoo 的静态资源链接。

#### 添加 RSS 订阅

安装 [`hexo-generator-feed`](https://github.com/hexojs/hexo-generator-feed) 插件:

```shell
npm install hexo-generator-feed --save
```

在 `_config.fluid.yml` 中追加配置项：

```yaml
# _config.fluid.yml
## hexo-generator-feed
plugins: hexo-generator-feed
feed:
  enable: true
  type: rss2 # 类型 atom | rss2
  path: rss2.xml # 文件路径, 默认是 atom.xml | rss2.xml
  limit: 5 # 展示文章的数量, 使用0或则false代表展示全部
  hub: #
  content: # 在RSS文件中是否包含内容, true | false, 默认不填为 false
  content_limit: 140 # 指定内容的长度作为摘要,仅仅在上面content设置为false和没有自定义的描述出现
  content_limit_delim: ' ' # 截取描述的分隔符, 以指定分隔符作为截取结束的标志.
  order_by: -date
  autodiscovery: true
  template:
```

然后随便找个位置，增加 `<a href="/rss2.xml" target="_blank" rel="nofollow noopener"><i class="iconfont icon-rss"></i>RSS</a>` 进行展示就行，我是放在页脚。

#### 更多主题修改

参看我的[[小屋相关/Fluid主题魔改记录|另一篇文章]]

### 域名

#### 如何挑选

首先确定一个喜欢的域名，先去找个域名注册网站查一下该域名是否可注册，然后在[哪煮米](https://www.nazhumi.com/)上找到满足自身要求的便宜且靠谱的域名服务商。

有国内备案需求最好选择国内的域名服务商，比如阿里云、腾讯云、华为云等；反之不需要备案，对个人隐私有需求，则选择能免费隐藏 whois 信息的国外域名服务商。

#### 切换域名

在域名服务商处增加一条 DNS 解析，将主域名或者某个子域名用 CNAME 解析到部署的 GitHub page 域名，然后在 `source` 目录下新建 `CNAME` 文件，文件内容是你刚刚添加解析的域名，比如在域名服务商那里添加了 `blog CNAME username.github.io`，就应该在 `CNAME` 文件中写上

```text
blog.your.domain
```

接着修改一下 `.config.yml` 与 `.config.主题.yml` 中关于博客域名相关配置，最后

```shell
hexo clean && hexo generate && hexo deploy
```

素质三连即可。

#### 域名邮箱

有自己的域名了，自然也要有自己的域名邮箱。域名邮箱的可选项并不多，不介意实名可以直接使用阿里云的[免费企业邮箱](https://common-buy.aliyun.com/?userCode=r3yteowb?spm=a2c6h.12873639.article-detail.8.85464bf1CFEevS&commodityCode=alimail&specCode=lx_18482&request=%7B%22ord_time%22:%223:Year%22,%22account_num%22:%225%22%7D#/buy)。反之则可以考虑域名服务商提供的邮件服务，或者 [Zoho](https://www.zoho.com/)（可免费注册域名邮箱，但是免费的只有网页版，没有 IMAP/SMTP/POP3）上注册一个。当然偶尔也会有公司会提供免费收发的域名邮箱注册，但一般是小公司且有时效性，可以将评论系统的回复提醒邮箱放在上面，但主力邮箱不建议放在上面，或者设置转发到稳定的邮箱，并且邮件容易进垃圾箱。

或者你还可以使用 Resend + CloudFlare 来制作丐版域名邮箱。首先你要在 CloudFlare 上托管你的域名，然后就可以利用 CloudFlare 的电子邮件路由功能将邮件转发到自己的已有邮箱中。随后在 Resend 中绑定你的域名，再申请个 API，就可以利用 Resend 来发邮件了。

### 将网站添加到搜索引擎

本节内容已整体迁移至[[小屋相关/Hexo博客收录搜索引擎|另一篇文章]]。

### 优化博客性能

#### 使用图床

使用图床来放置博客中的图片，能够减少博客部署的本体所占用的空间，并且当图床部署了 CDN 时，网站的加载速度也会极大提升。

使用图床，首先应该下载 [PicGo](https://picgo.github.io/PicGo-Doc/zh/)。这是一个开源的图床上传软件，可以聚合多个图床，预览图片，结合插件还可以做到上传时压缩图片。

##### 非自建图床

这部分没什么好说的，找一个信得过的图床，检查一下是否有 PicGo 插件支持该图床，用就完事了。个人推荐杜老师的[去不图床](https://7bu.top/)，这也是我目前在使用的图床。免费的可以考虑老牌免费图床 [sm.ms](https://sm.ms/)。

##### GitHub + jsDelivr CDN 图床

> [!WARNING]
> 该方法属于滥用 GitHub 仓库，既不道德，又有概率会封掉仓库，有条件用其他图床就不建议使用。

新建一个公开仓库，然后在 PicGo 中选择 GitHub 图床进行配置：

![](https://images.hpcesia.com/671f3f172d5e9.webp)

其中 Token 需要访问 [Personal Access Tokens (Classic)](https://github.com/settings/tokens) 生成，注意 token 只有生成的时候能看到，之后就不能再次打开了，因此需要注意妥善保存。

自定义域名部分则是选用了 jsDelivr CDN 进行，可以加快国内大陆地区的访问速度。

##### CloudFlare R2 存储自建图床

> [!NOTE]
> 这种方式需要用到绑定了银行卡的 PayPal 账户。仅给出参考链接。

- [从零开始搭建你的免费图床系统 （Cloudflare R2 + WebP Cloud + PicGo） - 少数派](https://sspai.com/post/90170)

#### 使用 gulp 压缩网站内容

此段内容参考[使用 gulp 压缩 Hexo 博客文件（兼容 ES6 标准） | Ming's Blog](https://blog.inkuang.com/2021/405/)编写。

##### 安装插件

在博客根目录下打开终端，输入：

```shell
npm install --global gulp-cli #全局安装 gulp 指令集
npm install gulp --save #安装 gulp 插件
```

安装 gulp 插件。随后输入

```shell
npm install gulp-clean-css gulp-terser gulp-html-minifier-terser --save-dev
```

安装附属插件。

##### 配置 gulp

在博客根目录下新建 `gulpfile.js`：

```javascript
// gulpfile.js
const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
var terser = require('gulp-terser');
const htmlmin = require('gulp-html-minifier-terser');

// 压缩 public 目录下的 css 文件
// 可接受参数的文档：https://github.com/jakubpawlowicz/clean-css#constructor-options
gulp.task('minify-css', () => {
  return gulp
    .src('./public/**/*.css') // 处理public目录下所有的css文件，下同
    .pipe(cleancss())
    .pipe(gulp.dest('./public'));
});

// 压缩public目录下的js文件
// 可接受参数的文档：https://github.com/terser/terser?tab=readme-ov-file#minify-options-structure
gulp.task('minify-js', () =>
  gulp
    .src(['./public/**/*.js', '!./public/**/*.min.js'])
    .pipe(
      terser({
        format: {
          semicolons: false, // 使用换行而非分号压缩 JS 脚本，对浏览器压缩性能无影响，但是方便调试
        },
      })
    )
    .pipe(gulp.dest('./public'))
);

// 压缩public目录下的html文件
// 可接受参数的文档：https://github.com/terser/html-minifier-terser#options-quick-reference
gulp.task('minify-html', () => {
  return gulp
    .src('./public/**/*.html')
    .pipe(
      htmlmin({
        removeComments: true, // 移除注释
        caseSensitive: true, // 以区分大小写的方式处理属性
        removeEmptyAttributes: true, // 移除值为空的参数
        removeRedundantAttributes: true, // 移除值跟默认值匹配的属性
        collapseBooleanAttributes: true, // 省略布尔属性的值
        preventAttributesEscaping: true, // 避免属性被转义
        collapseWhitespace: true, // 移除空格和空行
        conservativeCollapse: true, // 始终折叠为 1 个空格（永远不要完全移除它）。必须与 collapseWhitespace=true 一起使用。
        noNewlinesBeforeTagClose: true, // 从一个元素闭合标签前永远不要添加换行
        minifyCSS: true, // 压缩 HTML 中的 CSS
        minifyJS: {
          // 调用 terser 压缩 HTML 中的 JS，配置同 terser
          format: {
            semicolons: false,
            quote_style: 1, // 始终使用单引号包裹字符串，可以避免类似 `onclick="foo('bar')"` 这类属性出现 bug
          },
        },
        minifyURLs: true, // 压缩 HTML 中的链接
      })
    )
    .pipe(gulp.dest('./public'));
});

// 默认任务，不带任务名运行gulp时执行的任务
gulp.task('default', gulp.parallel('minify-css', 'minify-js', 'minify-html'));
```

此时在运行 `hexo g` 后手动运行 `gulp` 即可压缩文件。

##### 自动化配置

在博客根目录下找到 `package.json`，在 `scripts` 键下添加新脚本：

```json
// package.json
"scripts": {
  "postbuild": "gulp"
}
```

随后在 `scripts` 目录下新建 `generator.js`，添加以下内容：

```javascript
// scripts/generator.js
hexo.extend.generator.register('postbuild', function () {
  const { exec } = require('child_process');
  exec('npm run postbuild', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
    } else {
      console.log(`Output: ${stdout}`);
    }
  });
});
```

这样在运行 `hexo g` 后就会自动运行 `gulp` 对博客进行压缩。
