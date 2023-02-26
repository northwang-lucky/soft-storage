import { DOMAIN_CN } from '@soft-storage-lib/config';
import fs from 'fs-extra';
import { resolve } from 'path';
import { ThemeConfig } from 'vuepress-theme-vt';
import { defineConfig4CustomTheme } from 'vuepress/config';
import { nav_en, nav_zh } from './configs/nav';
import { sidebar_en, sidebar_zh } from './configs/sidebar';

const __51la_js__ = fs.readFileSync(resolve(__dirname, './51la/index.js'), 'utf-8').replace('__DOMAIN_CN__', DOMAIN_CN);

export default defineConfig4CustomTheme<ThemeConfig>({
  port: 5175,
  base: '/docs/',
  title: 'Soft Storage',
  description: 'Softer storage management',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, __51la_js__],
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Soft Storage',
      description: 'Softer storage management',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Soft Storage',
      description: '更“舒适”的 Web Storage 管理',
    },
  },
  markdown: {
    extractHeaders: ['h2'],
  },
  theme: 'vt',
  themeConfig: {
    logo: '/logo.png',
    docsDir: 'docs',
    repo: 'northwang-lucky/soft-storage',
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
