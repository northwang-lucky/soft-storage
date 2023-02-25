import { BASE_PATH, DOMAIN } from '@smart-storage-lib/config';
import { NavItem } from 'vuepress/config';

export const nav_en: NavItem[] = [
  { text: 'Guide', link: '/guide/' },
  { text: 'API', link: '/api/' },
  {
    text: 'Demos',
    items: [
      { text: 'Vue 3 Demo', link: `https://${DOMAIN}${BASE_PATH}/vue-demo/` },
      { text: 'React Demo', link: `https://${DOMAIN}${BASE_PATH}/react-demo/` },
    ],
  },
];

export const nav_zh: NavItem[] = [
  { text: '指南', link: '/zh/guide/' },
  { text: 'API', link: '/zh/api/' },
  {
    text: '演示',
    items: [
      { text: 'Vue 3 演示', link: `https://${DOMAIN}${BASE_PATH}/vue-demo/` },
      { text: 'React 演示', link: `https://${DOMAIN}${BASE_PATH}/react-demo/` },
    ],
  },
];
