---
title: Hexo 博客搜索引擎收录与 SEO 优化个人经验
slug: hexo-blog-search-engine-indexing
category: 小屋相关
tags:
  - Hexo
cover: https://images.hpcesia.com/671f2b140ea45.webp
published: 2024-09-03 18:36:32
description: 简单记录了将 Hexo 博客收录进搜索引擎与优化 SEO 的经验。
---

:::collapse{title="更新日志"}

- 2024-09-04
  - 新增「添加 nofollow 标签」相关内容。
- 2024-09-03
  - 发布文章。

:::

以下以 Bing 为例进行说明。

## 在 Bing Webmaster Tools 中登录并添加网站

[Bing Webmaster Tools](https://www.bing.com/webmasters) 是必应的网站管理员工具，可以添加个人网站并带进行一些网站操作。打开 [Webmaster](https://www.bing.com/webmasters) 后点击「开始」或右上角「登录」以登录到官网。可以选择三种登录账号：Google、Microsoft、Facebook。

![Bing Webmaster Tools 界面](https://images.hpcesia.com/671f2a7ce1e72.png)

初次登录会提示添加网站，有两种添加方式：从 GSC 导入、手动添加。如果网站已通过 GSC 收录，可以直接用 GSC，我选择手动添加。然后在右侧的输入框中输入网站URL即可。

![添加网站界面](https://images.hpcesia.com/671f2a7b0668e.png)

然后会要求验证网站。

## 验证网站

验证网站有多种方式，我选择的是下载 `BingSiteAuth.xml` 文件进行验证。

Webmaster 会要求你将这个文件放到网站的根目录，我们只需要将下载下来的 `BingSiteAuth.xml` 文件放到我们博客的 `source` 目录下，使用 `hexo d -g` 生成并推送到 GitHub 上即可，可以访问网站根目录下找到 `BingSiteAuth.xml`。

然后在 Webmaster 页面中点击验证即可。

## 添加网站地图

在博客根目录下打开终端，输入

```shell
npm install hexo-generator-sitemap --save
```

并在 `_config.yaml` 中新增如下配置项：

```yaml
## Sitemap Generator
sitemap:
  path: sitemap.xml
```

接着使用 `hexo d -g` 生成并推送到 GitHub 上。在 Webmaster 左侧边栏选择「网站地图」选项

![侧边栏](https://images.hpcesia.com/671f2a7de0ec7.png)

然后点击右上角的「提交网站地图」按钮，输入你的网站的 `sitemap.xml` 位置。按照上述配置方法，我输入的是 `https://blog.hpcesia.com/sitemap.xml`。等待一段时间后，网站地图就会审核成功，如图所示：

![网站地图添加成功样例](https://images.hpcesia.com/671f2a7ed326e.png)

等待 48 小时审核后，就可以在搜索引擎上搜索到自己的博客了。

![审核通过样式](https://images.hpcesia.com/671f2a7fd9d60.png)

## 编制 URL

审核通过后，可能还是搜不到自己的博客，这时候就需要打开左侧边栏的「URL 检查」界面

![20240829002900](https://images.hpcesia.com/671f2a80c4f60.png)

输入自己的博客主页链接检查 URL，如果提示「已发现但未爬网，该 URL 无法在必应上显示」，先确认自己博客没有问题，然后选择「请求编制索引」即可，等待一段时间应该就好了。如果一直不进行索引，可以去联系客服处理。

## GitHub Action 自动提交 URL

如果博客更新较勤，可以使用 [`Hexo-SEO-AutoPush`](https://github.com/Lete114/Hexo-SEO-AutoPush) 插件来配置 GitHub Action 以定期推送 URL 到搜索引擎上，提高爬虫抓取几率。

### 安装

```shell
npm install hexo-seo-autopush --save
```

### 配置文件

在博客根目录下的 `_config.yml` 配置文件中添加以下内容：

```yaml
# _config.yml
## enable: 开启/关闭 推送
## cron: 执行时间周期
## deployBranch: 部署分支
## count: 每次提交最新的10篇文章，输入0或者不填写则默认为所有文章(建议是最新的10篇文章)
## date: 更新时间(updated)|创建日期(created)
## https://github.com/Lete114/hexo-seo-autopush.git
hexo_seo_autopush:
  cron: 0 4 * * *
  deployBranch:
  baidu:
    enable: true
    date: created
    count: 10
  bing:
    enable: true
    date: created
    count: 10
  google:
    enable: true
    date: created
    count: 10
```

由于生成的 actions 是在`.github/workflows/HexoSeoAutoPush.yml`，`.` 开头的文件或文件夹都会被视为隐藏文件，`hexo-deployer-git` 不会部署隐藏文件，所以需要新增配置项 `ignore_hidden`

```yaml
# _config.yml
deploy:
  type: 'git'
  repo: git@github.com:HPCesia/HPCesia.github.io.git
  branch: master
  ignore_hidden: false # 忽略隐藏文件及文件夹(目录)
```

### APIKEY 设置

打开博客部署的 GitHub 仓库的「Setting」选项卡：

![选项卡](https://images.hpcesia.com/671f2b119ce03.webp)

在侧边栏找到「Secrets and variables」选项，点开其中的「Actions」选项：

![](https://images.hpcesia.com/671f2b128b0b2.webp)

然后点击「New repository secret」：

![](https://images.hpcesia.com/671f2b1348547.webp)

在「Name」和「Secret」处分别填写下方表格中的内容：

| Name                | Value             | 说明                                                                                                   |
| ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------ |
| baidu_token         | UlxxxxxxxxxxxxxB9 | 【必填】Value 输入百度的 token                                                                         |
| bing_apikey         | 47xxxxxxxxxxxxx91 | 【必填】Value 输入必应的 apikey                                                                        |
| google_private_key  | xxxxxxxxxxxxxxxxx | 【必填】Value 输入谷歌的 private_key （注意：填写的时候需要使用**双引号**包起来，如: `"private_key"`） |
| google_client_email | xxxxxxxxxxxxxxxxx | 【必填】Value 输入谷歌的 client_email                                                                  |

后续跟随[插件说明](https://github.com/Lete114/Hexo-SEO-AutoPush?tab=readme-ov-file#baidu-key)操作即可。

## 添加 nofollow 标签

[`hexo-filter-nofollow`](https://github.com/hexojs/hexo-filter-nofollow) 插件可以自动化地为博客中的外链添加 `nofollow` 标签。

输入

```shell
npm i hexo-filter-nofollow --save
```

安装 `hexo-filter-nofollow` 插件，然后在 `_config.yml` 中添加配置项：

```yaml
# _config.yml
## hexo-filter-nofollow
## field - 插件的处理范围，默认值为 site，可选 post 或 site
##   post - 仅处理文章内容
##   site - 处理全站所有页面
## exclude - 域名白名单，不同的子域名视为不同的域名（如 www）
##   exclude1.com不包括 www.exclude1.com 或 en.exclude1.com
nofollow:
  enable: true
  field: site
  exclude:
    - 'exclude1.com'
    - 'exclude2.com'
```

使用 `hexo cl && hexo g && hexo d` 三连即可。

## 参考资料

- [将 GitHub Pages 个人博客录入搜索引擎（以 Bing 为例） - RainbowC0 - 博客园](https://www.cnblogs.com/RainbowC0/p/18107581)
- [Hexo+GitHub Pages搭建的个人博客加入到Bing搜索引擎 | WeiSJ&HEXO ](https://lengnian.github.io/posts/7cddb87d/)
- [【搜索优化】Hexo-next百度和谷歌搜索优化 | Ehcoo](https://www.ehcoo.com/seo.html)
- [Hexo博客之高级优化教程 | Wrysmile 的博客](https://www.wrysmile.cn/Hexo-03.html)
