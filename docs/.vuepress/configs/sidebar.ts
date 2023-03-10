import { SidebarConfig4Multiple } from 'vuepress/config';

const prefixed = (prefix: string, paths: string[]) => paths.map(path => prefix + path);

export const sidebar_en: SidebarConfig4Multiple = {
  '/guide/': [
    { title: 'Getting Started', collapsable: false, children: ['introduction', 'quick-start'] },
    {
      title: 'Advanced',
      collapsable: false,
      children: prefixed('/guide/advanced/', ['storage-helper', 'module-protect', 'version-control']),
    },
    {
      title: 'Other',
      collapsable: false,
      children: prefixed('/guide/other/', ['questions-and-answers', 'how-to-contribute', 'developer-guide']),
    },
  ],
  '/api/': [
    {
      title: 'API',
      path: '/api/',
      collapsable: false,
      children: prefixed('/api/', ['vue-hooks', 'react-hooks', 'hooks', 'core', 'shared']),
    },
    {
      title: 'Type Definition',
      path: '/api/#Type-Definition',
      collapsable: false,
      children: prefixed('/api/type-definition/', ['vue-hooks', 'react-hooks', 'hooks', 'core', 'shared']),
    },
  ],
};

export const sidebar_zh: SidebarConfig4Multiple = {
  '/zh/guide/': [
    { title: '快速上手', collapsable: false, children: ['introduction', 'quick-start'] },
    {
      title: '进阶指南',
      collapsable: false,
      children: prefixed('/zh/guide/advanced/', ['storage-helper', 'module-protect', 'version-control']),
    },
    {
      title: '其他',
      collapsable: false,
      children: prefixed('/zh/guide/other/', ['questions-and-answers', 'how-to-contribute', 'developer-guide']),
    },
  ],
  '/zh/api/': [
    {
      title: 'API',
      path: '/zh/api/',
      collapsable: false,
      children: prefixed('/zh/api/', ['vue-hooks', 'react-hooks', 'hooks', 'core', 'shared']),
    },
    {
      title: '类型定义',
      path: '/zh/api/#类型定义',
      collapsable: false,
      children: prefixed('/zh/api/type-definition/', ['vue-hooks', 'react-hooks', 'hooks', 'core', 'shared']),
    },
  ],
};
