import { resolve } from 'path';
import { ThemeConfig } from 'vuepress-theme-vt';
import { defineConfig4CustomTheme } from 'vuepress/config';
import { nav_en, nav_zh } from './configs/nav';
import { sidebar_en, sidebar_zh } from './configs/sidebar';

export default defineConfig4CustomTheme<ThemeConfig>({
  port: 5175,
  base: '/docs/',
  title: 'Smart Storage',
  description: 'Smarter storage management',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      {},
      /* js */ `
      !(function (p) {
        'use strict';
        !(function (t) {
          var s = window,
            e = document,
            i = p,
            c = ''.concat('https:' === e.location.protocol ? 'https://' : 'http://', 'sdk.51.la/js-sdk-pro.min.js'),
            n = e.createElement('script'),
            r = e.getElementsByTagName('script')[0];
          (n.type = 'text/javascript'),
            n.setAttribute('charset', 'UTF-8'),
            (n.async = !0),
            (n.src = c),
            (n.id = 'LA_COLLECT'),
            (i.d = n);
          var o = function () {
            s.LA.ids.push(i);
          };
          s.LA ? s.LA.ids && o() : ((s.LA = p), (s.LA.ids = []), o()), r.parentNode.insertBefore(n, r);
        })();
      })({ id: 'Jz3z8mTL8bi2NMgJ', ck: 'Jz3z8mTL8bi2NMgJ', autoTrack: true, hashMode: true });`,
    ],
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Smart Storage',
      description: 'Smarter storage management',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Smart Storage',
      description: '更“聪明”的 Web Storage 管理',
    },
  },
  markdown: {
    extractHeaders: ['h2'],
  },
  theme: 'vt',
  themeConfig: {
    logo: '/logo.png',
    docsDir: 'docs',
    repo: 'northwang-lucky/smart-storage',
    docsBranch: 'main',
    editLinks: true,
    lastUpdated: true,
    enableDarkMode: true,
    locales: {
      '/': {
        editLinkText: 'Help us improve this page!',
        selectText: 'Languages',
        label: 'English',
        nav: nav_en,
        sidebar: sidebar_en,
      },
      '/zh/': {
        editLinkText: '帮助我们改善此页面！',
        selectText: '选择语言',
        label: '简体中文',
        nav: nav_zh,
        sidebar: sidebar_zh,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@imgs': resolve(__dirname, '../imgs'),
      },
    },
  },
});
