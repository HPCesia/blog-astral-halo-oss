// @ts-check
import { buildConfig, siteConfig } from './src/config.ts';
import { CDN } from './src/constants/cdn.ts';
import { pluginLanguageBadge } from './src/plugins/expressive-code-lang-badget.ts';
import { rehypeComponentsAsync } from './src/plugins/rehype-components-async.ts';
import { rehypeComponentsList } from './src/plugins/rehype-components-list.ts';
import { rehypeWrapTables } from './src/plugins/rehype-wrap-tables.ts';
import { remarkArticleReferences } from './src/plugins/remark-article-references';
import { remarkCreateTime } from './src/plugins/remark-create-time.ts';
import { remarkExcerpt } from './src/plugins/remark-excerpt.ts';
// import { remarkHeadingShift } from './src/plugins/remark-heading-shift.ts';
import { remarkImageProcess } from './src/plugins/remark-image-process.ts';
import { remarkObsidianCallout } from './src/plugins/remark-obsidian-callout.ts';
import { remarkReadingTime } from './src/plugins/remark-reading-time.ts';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMathJaxCHtml from 'rehype-mathjax/chtml';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkMath from 'remark-math';
import Icons from 'unplugin-icons/vite';
import VitePluginFont from 'vite-plugin-font-wasm';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.hpcesia.com/',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    icon(),
    sitemap({ filter: (page) => !page.includes('/archives/') && !page.includes('/about/') }),
    pagefind(),
    AstroPWA({
      manifest: {
        name: siteConfig.title,
        short_name: siteConfig.title,
        description: siteConfig.subtitle,
        lang: siteConfig.lang,
        theme_color: '#4f94c9', // Should be the same as the primary color in src/styles/global.css
        background_color: '#f2e8e0', // Should be the same as the base-100 color in src/styles/global.css
      },
      pwaAssets: {
        config: true,
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\/$/],
      },
    }),
    expressiveCode({
      themes: ['catppuccin-latte', 'catppuccin-macchiato'],
      themeCssSelector: (theme) => `[data-theme="${buildConfig.themeNames[theme.type]}"]`,
      plugins: [pluginLineNumbers(), pluginLanguageBadge()],
      shiki: {
        langAlias: {
          pip: 'ini',
        },
      },
    }),
    mdx(),
    solidJs({ devtools: true }),
  ],
  redirects: {
    ...['a604572f', 'a0486011', 'e5415539', '4ca8244b', 'af3287de', 'ba26509c'].reduce(
      (acc, abbrlink) => {
        acc[`/posts/${abbrlink}`] =
          `https://solitude.blog-archive.hpcesia.com/posts/${abbrlink}`;
        return acc;
      },
      {}
    ),
    ...Object.entries({
      // 经验记录
      '7ebs5q10': 'solve-vscode-write-settings-in-nixos-home-manager',
      f363aaf1: 'set-proxy-for-docker-in-wsl',
      '2dcf5c58': 'how-to-optimize-scanned-ebooks',
      '8f0728e5': 'hello-authelia',
      '78d7e501': 'hello-pytorch-1-5',
      '63c8a3ae': 'hello-pytorch-1',
      q1bcy000: 'my-awesome-windows-apps',
      '5252cfe9': 'typst-experiences',
      bb896ab4: 'vscode-extension-recommendations',
      ba9eeffb: 'cpp-dev-env-in-vscode-on-windows',
      // 旅行回忆
      '841b8c27': 'serbia-travel-journal-1',
      e13ddf8: 'notes-of-starrail-land',
      // 生活点滴
      '7e74b210': 'data-loss-by-foolish-mistake',
      '41922e15': 'monthly-journal-1',
      75352449: 'monthly-journal-2',
      a77e8b62: 'monthly-journal-3',
      '8207d653': 'monthly-journal-4',
      '98bae8d1': 'miscellaneous-notes-1',
      q1rx087a: 'miscellaneous-notes-2',
      ae952b18: 'weekly-journal-1',
      '45a2901b': 'weekly-journal-2',
      aa60fb25: 'weekly-journal-3',
      '1ec6f507': 'weekly-journal-4',
      // 小屋相关
      e139b07d: 'astro-migration-journal',
      a06e351a: 'fluid-theme-modification-notes',
      '1f77b1be': 'hexo-blog-search-engine-indexing',
      '48acad6d': 'how-to-build-blog-with-hexo',
      '8c78f339': 'how-to-use-hoyolab-emotions-in-twikoo',
      // 学习笔记
      d6f83120: 'notes-on-theory-of-several-complex-variables-1-1',
      ef7d6a4: 'notes-on-theory-of-several-complex-variables-1-2',
      9632325: 'derivations-of-some-finite-difference-methods',
      fc617a15: 'kmp-algorithm-notes',
    }).reduce((acc, [oldPath, newPath]) => {
      acc[`/posts/${oldPath}`] = `/posts/${newPath}`;
      return acc;
    }, {}),
  },
  markdown: {
    remarkRehype: { footnoteLabel: '脚注' },
    remarkPlugins: [
      // remarkHeadingShift,
      remarkMath,
      remarkDirective,
      // @ts-expect-error Types of the plugin are not correct
      remarkDirectiveRehype,
      remarkCreateTime,
      remarkReadingTime,
      remarkExcerpt,
      remarkImageProcess,
      remarkObsidianCallout,
      remarkArticleReferences,
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content: {
            type: 'text',
            value: '#',
          },
          properties: {
            'aria-label': 'Anchor link',
          },
        },
      ],
      [
        rehypeMathJaxCHtml,
        {
          chtml: {
            fontURL: CDN.mathjaxFont,
          },
        },
      ],
      rehypeWrapTables,
  [rehypeComponentsAsync, { components: rehypeComponentsList }],
    ],
  },
  vite: {
    plugins: [
      tailwindcss(),
      VitePluginFont.vite({
        // @ts-ignore
        css: {
          fontWeight: '',
        },
      }),
      Icons({ compiler: 'solid' }),
    ],
    build: {
      rollupOptions: {
        external: ['workbox-window'],
      },
    },
  },
});
