import { defineConfig } from 'vuepress/config';
import { resolve } from 'path';

export default defineConfig({
  base: '/smart-storage/docs/',
  port: 5175,
  title: 'Smart Storage',
  description: 'Smarter storage management',
  plugins: ['@vuepress/plugin-back-to-top'],
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: true,
    repo: 'northwang-lucky/smart-storage',
    docsBranch: 'main',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      {
        text: 'Languages',
        items: [
          { text: 'English', link: '/guide/' },
          { text: '简体中文', link: '/zh/guide/' },
        ],
      },
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
          children: ['advanced/storage-helper', 'advanced/module-protect'],
        },
      ],
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
