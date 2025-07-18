<template>
  <a-layout-header style="background: #fff; box-shadow: 0 2px 8px #f0f1f2;">
    <div style="display: flex; align-items: center;">
      <!-- <img src="/vite.svg" alt="Logo" style="height: 32px; margin-right: 16px;" /> -->
      <a-menu 
        mode="horizontal" 
        :selected-keys="[currentRoute]" 
        @menu-item-click="onMenuClick" 
        style="flex: 1;"
      >
        <a-menu-item key="home">
          <template #icon>
            <icon-home />
          </template>
          首页
        </a-menu-item>
        <a-menu-item key="files">
          <template #icon>
            <icon-folder />
          </template>
          文件管理
        </a-menu-item>
        <a-menu-item key="blacklist">
          <template #icon>
            <icon-lock />
          </template>
          黑名单管理
        </a-menu-item>
        <a-menu-item key="about">
          <template #icon>
            <icon-info-circle />
          </template>
          关于
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  IconHome,
  IconFolder,
  IconLock,
  IconInfoCircle
} from '@arco-design/web-vue/es/icon';

const router = useRouter();
const route = useRoute();

// 计算当前路由对应的菜单键
const currentRoute = computed(() => {
  return route.name as string;
});

// 菜单点击处理
function onMenuClick(key: string) {
  // 根据菜单键导航到对应路由
  switch (key) {
    case 'home':
      router.push('/');
      break;
    case 'files':
      router.push('/files');
      break;
    case 'blacklist':
      router.push('/blacklist');
      break;
    case 'about':
      router.push('/about');
      break;
    default:
      router.push('/');
  }
}
</script>

<style scoped>
.a-layout-header {
  padding: 0 24px;
}

/* 菜单项样式 */
:deep(.arco-menu-item) {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 图标样式 */
:deep(.arco-menu-item .arco-icon) {
  font-size: 16px;
}
</style>
