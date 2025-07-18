<template>
  <div class="home-container">
    <a-card title="欢迎使用 FileManager" :bordered="false">
      <div class="welcome-content">
        <div class="hero-section">
          <img src="/vite.svg" alt="Logo" class="hero-logo" />
          <h1>FileManager</h1>
          <p class="hero-description">
            一个功能强大的文件管理器，支持黑名单管理和文件清理功能
          </p>
        </div>

        <a-divider />

        <div class="features-section">
          <h2>主要功能</h2>
          <a-row :gutter="[16, 16]">
            <a-col :span="8" :xs="24" :sm="12" :md="8">
              <a-card hoverable class="feature-card">
                <template #cover>
                  <div class="feature-icon">
                    <icon-folder style="font-size: 48px; color: #1890ff;" />
                  </div>
                </template>
                <a-card-meta title="文件管理">
                  <template #description>
                    浏览和管理您的文件系统，支持多种文件操作
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>

            <a-col :span="8" :xs="24" :sm="12" :md="8">
              <a-card hoverable class="feature-card">
                <template #cover>
                  <div class="feature-icon">
                    <icon-lock style="font-size: 48px; color: #52c41a;" />
                  </div>
                </template>
                <a-card-meta title="黑名单管理">
                  <template #description>
                    管理文件名和文件夹名黑名单，防止误删重要文件
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>

            <a-col :span="8" :xs="24" :sm="12" :md="8">
              <a-card hoverable class="feature-card">
                <template #cover>
                  <div class="feature-icon">
                    <icon-delete style="font-size: 48px; color: #faad14;" />
                  </div>
                </template>
                <a-card-meta title="智能清理">
                  <template #description>
                    根据黑名单自动清理指定文件夹中的文件
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </div>

        <a-divider />

        <div class="quick-actions">
          <h2>快速操作</h2>
          <a-space wrap>
            <a-button type="primary" size="large" @click="goToFiles">
              <template #icon>
                <icon-folder />
              </template>
              文件管理
            </a-button>
                         <a-button type="primary" size="large" @click="goToBlacklist">
               <template #icon>
                 <icon-lock />
               </template>
               黑名单管理
             </a-button>
            <a-button size="large" @click="goToAbout">
              <template #icon>
                <icon-info-circle />
              </template>
              关于
            </a-button>
          </a-space>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  IconFolder,
  IconLock,
  IconDelete,
  IconInfoCircle
} from '@arco-design/web-vue/es/icon';

const router = useRouter();

const goToFiles = () => {
  router.push('/files');
};

const goToBlacklist = () => {
  router.push('/blacklist');
};

const goToAbout = () => {
  router.push('/about');
};
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-content {
  text-align: center;
}

.hero-section {
  margin-bottom: 40px;
}

.hero-logo {
  height: 80px;
  margin-bottom: 20px;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: var(--color-text-1);
}

.hero-description {
  font-size: 1.2rem;
  color: var(--color-text-2);
  margin-bottom: 0;
}

.features-section {
  margin-bottom: 40px;
}

.features-section h2 {
  margin-bottom: 24px;
  color: var(--color-text-1);
}

.feature-card {
  height: 100%;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  background-color: var(--color-fill-1);
}

.quick-actions {
  margin-bottom: 20px;
}

.quick-actions h2 {
  margin-bottom: 24px;
  color: var(--color-text-1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .feature-card {
    margin-bottom: 16px;
  }
}
</style> 