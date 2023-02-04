import { defineConfig } from 'vuepress/config';
import { resolve } from 'path';

export default defineConfig({
  base: '/smart-storage/docs/',
  port: 5175,
  title: 'Smart Storage',
  description: 'Smarter storage management',
  plugins: ['@vuepress/plugin-back-to-top'],
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/global.css' }],
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
      description: '更“聪明”的WebStorage管理',
    },
  },
  themeConfig: {
    logo: '/logo.png',
    docsDir: 'docs',
    lastUpdated: true,
    repo: 'northwang-lucky/smart-storage',
    docsBranch: 'main',
    editLinks: true,
    locales: {
      '/': {
        editLinkText: 'Edit this page on GitHub',
        selectText: 'Languages',
        label: 'English',
        nav: [
          { text: 'Guide', link: '/guide/' },
          { text: 'API', link: '/api/' },
          {
            text: 'Demos',
            items: [
              { text: 'Vue 3 Demo', link: 'https://northwang-lucky.github.io/smart-storage/vue-demo/' },
              { text: 'React Demo', link: 'https://northwang-lucky.github.io/smart-storage/react-demo/' },
            ],
          },
        ],
        sidebar: {
          '/guide/': [
            { title: 'Getting Started', collapsable: false, children: ['', 'quick-start'] },
            {
              title: 'Advanced',
              collapsable: false,
              children: ['advanced/storage-helper', 'advanced/module-protect', 'advanced/version-control'],
            },
          ],
          '/api/': [
            {
              title: 'API',
              path: '/api/',
              collapsable: false,
              children: ['vue-hooks', 'react-hooks', 'hooks', 'core'],
            },
          ],
        },
      },
      '/zh/': {
        editLinkText: '在GitHub上编辑此页',
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          { text: '指南', link: '/zh/guide/' },
          { text: 'API', link: '/zh/api/' },
          {
            text: '演示',
            items: [
              { text: 'Vue 3 演示', link: 'https://northwang-lucky.github.io/smart-storage/vue-demo/' },
              { text: 'React 演示', link: 'https://northwang-lucky.github.io/smart-storage/react-demo/' },
            ],
          },
        ],
        sidebar: {
          '/zh/guide/': [
            { title: '快速上手', collapsable: false, children: ['', 'quick-start'] },
            {
              title: '进阶指南',
              collapsable: false,
              children: ['advanced/storage-helper', 'advanced/module-protect'],
            },
          ],
        },
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
