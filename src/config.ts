// WARNING: This file will be bundled into the build product.
// DO NOT add any sensitive information here.
// 警告: 该文件会被打包到构建产物中, 不要在此添加任何敏感信息
import type {
  ArticleConfig,
  AsideConfig,
  BuildConfig,
  CommentConfig,
  FastActionsConfig,
  FooterConfig,
  LicenseConfig,
  LinksConfig,
  NavbarConfig,
  ProfileConfig,
  SearchConfig,
  SiteConfig,
} from './types/config';
import { L } from '@astral-halo/i18n';

export const siteConfig: SiteConfig = {
  title: '璜珀的小屋',
  subtitle: '记录自己的摆烂日常与学习记录',
  lang: 'zh-CN', // "en" | "zh_CN" | "zh_TW"
  createAt: new Date('2024-08-19T12:00:00+08:00'),
  postsPerPage: 10,
  banner: {
    src: {
      light: 'assets/img/banner_light.webp',
      dark: 'assets/img/banner_dark.webp',
    },
    text: '欢迎来小屋做客！',
    homepageHeight: '100svh',
    postHeight: '40svh',
    pagesHeight: [
      // {
      //   pagePathRegex: /\/about\//,
      //   height: '50svh',
      // },
    ],
    defaultHeight: '40svh',
  },
};

// To avoid circular dependency
const t = L[siteConfig.lang].web;

export const buildConfig: BuildConfig = {
  showDraftsOnDev: true,
  inferRemoteImageSize: {
    enable: true,
    defaultSize: {
      width: 800,
      height: 600,
    },
  },
  enableImageZoom: true,
  themeNames: {
    light: 'latte',
    dark: 'macchiato',
  },
};

export const profileConfig: ProfileConfig = {
  avatar: '/assets/img/avatar.webp',
  name: '璜珀 · HPCesia',
  bio: '一个想要摆烂却又不甘于躺平的人',
  socialLinks: [
    {
      name: 'Keyoxide',
      url: 'https://keyoxide.org/33E55D3FDF9C66D7658412110E942E647BBF03FC',
      icon: 'mdi:key-variant',
    },
    {
      name: 'Email',
      url: 'mailto:me@hpcesia.com',
      icon: 'mdi:email',
    },
    {
      name: 'Fediverse',
      url: 'https://myce.li/@hpcesia',
      icon: 'ph:fediverse-logo',
    },
    {
      name: 'Codeberg',
      url: 'https://codeberg.org/HPCesia',
      icon: 'simple-icons:codeberg',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/HPCesia',
      icon: 'mdi:github',
    },
    {
      name: 'Bilibili',
      url: 'https://space.bilibili.com/73749124',
      icon: 'simple-icons:bilibili',
    },
  ],
};

export const linksConfig: LinksConfig = {
  items: [
    {
      groupName: '基石',
      groupDescription: '搭建小屋使用的各种物件',
      groupItems: [
        {
          name: 'Astro',
          url: 'https://astro.build/',
          avatar: 'https://astro.build/favicon.svg',
        },
        {
          name: '璜珀 · HPCesia',
          url: 'https://blog.hpcesia.com/',
          avatar: '/assets/img/avatar.webp',
          description: '自己在自己站点给自己打广告（雾）',
        },
      ],
    },
    {
      groupName: '邻友',
      groupDescription: '比较喜欢的博客',
      groupItems: [
        {
          name: 'Graden of Outlier',
          url: 'https://chlo.is',
          avatar: 'https://img.chlo.is/avatar/02.webp',
          description: 'An Element-chan who writes.',
        },
        {
          name: '微霞',
          url: 'https://yuuu.org/',
          avatar: 'https://cdn.yuuu.org/img/avatar.webp',
          description: '水风清，晚霞明',
        },
      ],
    },
    {
      groupName: '柱梁',
      groupDescription: '参考过的大佬们',
      groupItems: [
        {
          name: '张洪Heo',
          url: 'https://blog.zhheo.com/',
          avatar: 'https://bu.dusays.com/2022/12/28/63ac2812183aa.png',
          description: '分享设计与科技生活',
        },
        {
          name: "iMaeGoo's Blog",
          url: 'https://www.imaegoo.com/',
          avatar: 'https://gcore.jsdelivr.net/npm/imaegoo/avatar.jpg',
          description: '虹墨空间站',
        },
        {
          name: '清羽飞扬',
          url: 'https://blog.liushen.fun/',
          avatar: 'https://blog.liushen.fun/info/avatar.ico',
          description: '柳影曳曳，清酒孤灯，扬笔撒墨，心境如霜',
        },
        {
          name: 'Akilarの糖果屋',
          url: 'https://akilar.top/',
          avatar: 'https://akilar.top/img/siteicon/favicon.png',
          description: '欢迎光临糖果屋',
        },
        {
          name: 'FF',
          url: 'https://foolishfox.cn/',
          avatar: 'https://asset.foolishfox.cn/static/avatar.jpg',
          description: 'foolish fox',
        },
        {
          name: '杜老师说',
          url: 'https://dusays.com/',
          avatar: 'https://cdn.dusays.com/avatar.png',
          description: '师者，传道，授业，解惑！',
        },
        {
          name: '青桔气球',
          url: 'https://blog.qjqq.cn/',
          avatar: 'https://q2.qlogo.cn/headimg_dl?dst_uin=1645253&spec=640',
          description: '分享网络安全与科技生活',
        },
        {
          name: '轻笑Chuckle',
          url: 'https://www.qcqx.cn',
          avatar: 'https://www.qcqx.cn/head.webp',
          description: '漫天倾尘,风中轻笑',
        },
        {
          name: 'OrangeX4',
          url: 'https://blog.orangex4.workers.dev/',
          avatar: 'https://blog.orangex4.workers.dev/images/icons/profile.jpg',
          description: '方橙式的博客',
        },
        {
          name: '大大的小蜗牛',
          url: 'https://www.eallion.com/',
          avatar: 'https://www.eallion.com/eallion.png',
          description: '机会总是垂青于有准备的人',
        },
        {
          name: '梦爱吃鱼',
          url: 'https://blog.bsgun.cn/',
          avatar: 'https://oss-cdn.bsgun.cn/logo/avatar.256.png',
          description: '但愿日子清静抬头遇见的满是柔情',
        },
      ],
    },
    {
      groupName: '伙伴',
      groupDescription: '一同成长',
      groupItems: [
        {
          name: '❖星港◎Star☆',
          url: 'https://blog.starsharbor.com/',
          avatar: 'https://blog.starsharbor.com/img/avatar.webp',
          description: '以博客记录生活与热爱！',
        },
        {
          name: '栖童の小站',
          url: 'https://blog.linux-qitong.top/',
          avatar: 'https://blog.linux-qitong.top/img/avatar.webp',
          description: '越努力，越幸运.',
        },
        {
          name: 'xyx404',
          url: 'https://xyx404.github.io/',
          avatar: 'https://fastly.jsdelivr.net/npm/xyx404blogphoto@1.2.23/avatar.webp',
          description: '摆烂摆烂！',
        },
        {
          name: 'XingJiのBlog',
          url: 'https://love.xingji.fun/',
          avatar: 'https://i.p-i.vip/47/20240920-66ed7b168c38c.jpg',
          description: '迄今所有人生都大写着失败，但不妨碍我继续向前✨',
        },
        {
          name: 'Elykia',
          url: 'https://blog.elykia.cn/',
          avatar: 'https://bu.dusays.com/2024/10/25/671b2438203a6.gif',
          description: '致以无暇之人',
        },
        // {
        //   name: '小李同学 Coding',
        //   url: 'https://blog.xxfer.cn/',
        //   avatar: 'https://blog.xxfer.cn/img/config/kpbl.jpg',
        //   description: '在深度学习的真火里，寻找解释世界的终极灵丹妙药...',
        // },
        {
          name: 'Rimrose',
          url: 'https://rimrose.top',
          avatar: 'https://img.rimrose.work/QQ%E5%9B%BE%E7%89%8720231031210606.ico',
          description: '生活在阴沟里，依然有仰望星空的权利',
        },
        {
          name: '咖啡豆子coffee的小站',
          url: 'https://blog.kfdzcoffee.cn/',
          avatar: 'https://images.kfdzcoffee.cn/i/1/avatar.png',
          description: '所有奇迹的始发点',
        },
        {
          name: '瓦匠小站',
          url: 'https://airy.ink',
          avatar: 'https://airy.ink/logo.svg',
          description: '大家都是倔强的人！',
        },
        // {
        //   name: '小赵の破宅',
        //   url: 'https://www.ziyis.cn',
        //   avatar: 'http://doc.ziyis.cn/avatar.jpg',
        //   description: '让美好持续发生.',
        // },
      ],
    },
  ],
};

export const navbarConfig: NavbarConfig = {
  navbarCenterItems: [
    {
      title: t.navigation.archive.title(),
      items: [
        { text: t.navigation.archive.time(), href: '/archives/' },
        { text: t.navigation.archive.categories(), href: '/archives/categories/' },
        { text: t.navigation.archive.tags(), href: '/archives/tags/' },
      ],
    },
    { text: t.navigation.friendLinks(), href: '/links/' },
    { text: '碎语', href: '/musings/' },
    { text: '如今', href: '/now/' },
    { text: t.navigation.about(), href: '/about/' },
  ],
  navbarRightItems: {
    onlyWide: [
      {
        icon: 'material-symbols:rss-feed-rounded',
        text: t.button.subscribe(),
        href: '/rss.xml',
        blank: true,
      },
      {
        icon: 'material-symbols:directions-subway-rounded',
        text: '开往',
        href: 'https://www.travellings.cn/go.html',
        blank: true,
      },
    ],
    always: [
      {
        icon: 'material-symbols:search-rounded',
        text: t.button.search(),
        onclick: 'search_modal.showModal()',
      },
    ],
  },
};

export const fastActionsConfig: FastActionsConfig = {
  enable: true,
  items: [],
};

export const asideConfig: AsideConfig = {
  siteInfo: {
    contents: ['stats', 'tags'],
    stats: ['post-count', 'last-updated', 'site-words-count', 'site-run-days'],
  },
  recentComment: {
    enable: true,
    count: 5,
    showAvatar: true,
  },
};

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
};

export const footerConfig: FooterConfig = {
  columns: [
    {
      title: t.navigation.title(),
      items: [
        { text: t.navigation.home(), link: '/' },
        { text: t.navigation.archive.title(), link: '/archives/' },
        { text: '如今', link: '/now/' },
        { text: t.navigation.about(), link: '/about/' },
        { text: t.button.subscribe(), link: '/rss.xml' },
      ],
    },
    {
      title: '博客列表',
      items: [
        { text: '开往', link: 'https://www.travellings.cn/go.html' },
        { text: '集博栈', link: 'https://www.zhblogs.net/' },
        { text: 'BlogFinder', link: 'https://bf.zzxworld.com/' },
      ],
    },
  ],
  copyrightYear: 2024,
  rightItems: [
    [
      {
        text: '萌ICP备20249290号',
        link: 'https://icp.gov.moe/?keyword=20249290',
        class: 'font-bold',
      },
    ],
    [
      {
        text: 'Astral Halo',
        link: 'https://codeberg.org/HPCesia/AstralHalo',
        class: 'font-bold',
      },
    ],
  ],
};

export const articleConfig: ArticleConfig = {
  toc: true,
  wordCount: true,
  readingTime: true,
};

export const searchConfig: SearchConfig = {
  enable: true,
  provider: 'pagefind',
};

export const commentConfig: CommentConfig = {
  enable: true,
  provider: 'artalk',
  twikoo: {
    envId: 'https://comment.hpcesia.com/.netlify/functions/twikoo',
  },
  artalk: {
    serverURL: 'https://artalk.hpcesia.com',
    // locale: 'en', // Optional, default is site language.
  },
};
