import { defineConfig } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'later-zc的知识笔记',
  description: 'later-zc 的知识笔记，包含前后端常用基础知识、踩坑记录、开发心得等',
  srcDir: './src',
  base: '/keep-down/',
  head: [['link', { rel: 'icon', href: '/keep-down/favicon.ico' }]],
  cleanUrls: true,
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar,
    outline: {
      label: '目录',
      level: [1, 6],
    },
    lastUpdated: {
      text: '最近更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
    search: {
      provider: 'local',
    },
    logo: '/logo.png',

    editLink: {
      pattern: 'https://github.com/later-zc/keep-down/tree/main/src/:path',
      text: '在 GitHub 上编辑此页',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/later-zc/keep-down' }],
  },
})
