import { SidebarConfig4Multiple } from 'vuepress/config';

export const sidebar_en: SidebarConfig4Multiple = {
  '/guide/': [
    { title: 'Getting Started', collapsable: false, children: ['introduction', 'quick-start'] },
    {
      title: 'Advanced',
      collapsable: false,
      children: ['advanced/storage-helper', 'advanced/module-protect', 'advanced/version-control'],
    },
  ],
  '/api/': [
    {
      title: 'API',
      collapsable: false,
      children: ['vue-hooks', 'react-hooks', 'hooks', 'core', 'shared'],
    },
  ],
};

export const sidebar_zh: SidebarConfig4Multiple = {
  '/zh/guide/': [
    { title: '快速上手', collapsable: false, children: ['introduction', 'quick-start'] },
    {
      title: '进阶指南',
      collapsable: false,
      children: ['advanced/storage-helper', 'advanced/module-protect'],
    },
  ],
};
