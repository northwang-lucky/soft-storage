import { SidebarConfig4Multiple } from 'vuepress/config';

const prefixed = (prefix: string, paths: string[]) => paths.map(path => prefix + path);

export const sidebar_en: SidebarConfig4Multiple = {
  '/guide/': [
    { title: 'Getting Started', collapsable: false, children: ['introduction', 'quick-start'] },
    {
      title: 'Advanced',
      collapsable: false,
      children: prefixed('/guide/', ['advanced/storage-helper', 'advanced/module-protect', 'advanced/version-control']),
    },
    {
      title: 'Other',
      collapsable: false,
      children: prefixed('/guide/', ['other/questions-and-answers', 'other/how-to-contribute']),
    },
  ],
  '/api/': [
    {
      title: 'API',
      path: '/api/',
      collapsable: false,
      children: prefixed('/api/', ['vue-hooks', 'react-hooks', 'hooks', 'core', 'shared']),
    },
  ],
};

export const sidebar_zh: SidebarConfig4Multiple = {
  '/zh/guide/': [
    { title: '快速上手', collapsable: false, children: ['introduction', 'quick-start'] },
    {
      title: '进阶指南',
      collapsable: false,
      children: prefixed('/zh/guide/', ['advanced/storage-helper', 'advanced/module-protect']),
    },
    {
      title: '其他',
      collapsable: false,
      children: prefixed('/zh/guide/', ['other/questions-and-answers']),
    },
  ],
};
