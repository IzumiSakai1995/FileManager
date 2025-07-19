/**
 * 路由配置
 * 
 * 路由结构：
 * - / (首页) - 欢迎页面，展示应用功能和快速导航
 * - /files (文件管理) - 文件浏览器和管理功能
 * - /blacklist (黑名单管理) - 文件名和文件夹名黑名单管理
 * - /about (关于) - 应用信息、技术栈和联系方式
 * 
 * 路由特性：
 * - 使用 Vue Router 4
 * - 支持路由元信息 (meta)
 * - 自动设置页面标题
 * - 懒加载组件
 */

import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// 页面组件
const Home = () => import('./views/Home.vue');
const FileManager = () => import('./views/FileManager.vue');
const BlackList = () => import('./components/fileManager/BlackList.vue');
const About = () => import('./views/About.vue');

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      icon: 'home'
    }
  },
  {
    path: '/files',
    name: 'files',
    component: FileManager,
    meta: {
      title: '文件管理',
      icon: 'folder'
    }
  },
  {
    path: '/blacklist',
    name: 'blacklist',
    component: BlackList,
    meta: {
      title: '黑名单管理',
      icon: 'shield'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: '关于',
      icon: 'info-circle'
    }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫
router.beforeEach((to, _, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - FileManager` : 'FileManager';
  next();
});

export default router;
