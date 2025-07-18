<template>
  <div class="about-container">
    <a-card title="关于 FileManager" :bordered="false">
      <div class="about-content">
        <div class="app-info">
          <div class="app-logo">
            <img src="/vite.svg" alt="Logo" />
          </div>
          <h1>FileManager</h1>
          <p class="version">版本 1.0.0</p>
          <p class="description">
            一个基于 Tauri + Vue 3 + Arco Design 构建的现代化文件管理器
          </p>
        </div>

        <a-divider />

        <div class="features-section">
          <h2>功能特性</h2>
          <a-list>
            <a-list-item>
              <template #meta>
                <icon-folder style="color: #1890ff;" />
              </template>
              <a-list-item-meta title="文件管理">
                <template #description>
                  浏览和管理文件系统，支持文件操作和目录导航
                </template>
              </a-list-item-meta>
            </a-list-item>
            
            <a-list-item>
              <template #meta>
                <icon-lock style="color: #52c41a;" />
              </template>
              <a-list-item-meta title="黑名单管理">
                <template #description>
                  管理文件名和文件夹名黑名单，防止误删重要文件
                </template>
              </a-list-item-meta>
            </a-list-item>
            
            <a-list-item>
              <template #meta>
                <icon-delete style="color: #faad14;" />
              </template>
              <a-list-item-meta title="智能清理">
                <template #description>
                  根据黑名单自动清理指定文件夹中的文件
                </template>
              </a-list-item-meta>
            </a-list-item>
            
            <a-list-item>
              <template #meta>
                <icon-save style="color: #722ed1;" />
              </template>
              <a-list-item-meta title="数据持久化">
                <template #description>
                  使用 localStorage 保存黑名单数据，确保数据持久化
                </template>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>

        <a-divider />

        <div class="tech-stack">
          <h2>技术栈</h2>
          <a-row :gutter="[16, 16]">
            <a-col :span="6" :xs="12" :sm="8" :md="6">
              <a-card hoverable class="tech-card">
                <template #cover>
                  <div class="tech-icon">
                    <img src="https://tauri.app/img/tauri_logo_dark.svg" alt="Tauri" />
                  </div>
                </template>
                <a-card-meta title="Tauri">
                  <template #description>
                    跨平台桌面应用框架
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>

            <a-col :span="6" :xs="12" :sm="8" :md="6">
              <a-card hoverable class="tech-card">
                <template #cover>
                  <div class="tech-icon">
                    <img src="https://vuejs.org/images/logo.png" alt="Vue" />
                  </div>
                </template>
                <a-card-meta title="Vue 3">
                  <template #description>
                    渐进式 JavaScript 框架
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>

            <a-col :span="6" :xs="12" :sm="8" :md="6">
              <a-card hoverable class="tech-card">
                <template #cover>
                  <div class="tech-icon">
                    <img src="https://arco.design/favicon.ico" alt="Arco Design" />
                  </div>
                </template>
                <a-card-meta title="Arco Design">
                  <template #description>
                    企业级设计系统
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>

            <a-col :span="6" :xs="12" :sm="8" :md="6">
              <a-card hoverable class="tech-card">
                <template #cover>
                  <div class="tech-icon">
                    <img src="https://www.rust-lang.org/static/images/rust-logo-blk.svg" alt="Rust" />
                  </div>
                </template>
                <a-card-meta title="Rust">
                  <template #description>
                    系统编程语言
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </div>

        <a-divider />

        <div class="contact-section">
          <h2>联系我们</h2>
          <a-space direction="vertical" size="large">
            <div class="contact-item">
              <a-space>
                <icon-github />
                <span>GitHub: </span>
                <a href="https://github.com/your-username/filemanager" target="_blank">
                  github.com/your-username/filemanager
                </a>
              </a-space>
            </div>
            
            <div class="contact-item">
              <a-space>
                <icon-email />
                <span>邮箱: </span>
                <a href="mailto:your-email@example.com">
                  your-email@example.com
                </a>
              </a-space>
            </div>
            
            <div class="contact-item">
              <a-space>
                <icon-link />
                <span>官网: </span>
                <a href="https://your-website.com" target="_blank">
                  your-website.com
                </a>
              </a-space>
            </div>
          </a-space>
        </div>

        <a-divider />

        <div class="license-section">
          <h2>许可证</h2>
          <p>
            本项目采用 MIT 许可证。详情请查看 
            <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>
          </p>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {
  IconFolder,
  IconLock,
  IconDelete,
  IconSave,
  IconGithub,
  IconEmail,
  IconLink
} from '@arco-design/web-vue/es/icon';
</script>

<style scoped>
.about-container {
  max-width: 1000px;
  margin: 0 auto;
}

.about-content {
  text-align: center;
}

.app-info {
  margin-bottom: 40px;
}

.app-logo {
  margin-bottom: 20px;
}

.app-logo img {
  height: 80px;
}

.app-info h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  color: var(--color-text-1);
}

.version {
  font-size: 1.2rem;
  color: var(--color-text-2);
  margin-bottom: 16px;
}

.description {
  font-size: 1.1rem;
  color: var(--color-text-2);
  max-width: 600px;
  margin: 0 auto;
}

.features-section,
.tech-stack,
.contact-section,
.license-section {
  margin-bottom: 40px;
}

.features-section h2,
.tech-stack h2,
.contact-section h2,
.license-section h2 {
  margin-bottom: 24px;
  color: var(--color-text-1);
}

.tech-card {
  height: 100%;
  transition: transform 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-4px);
}

.tech-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: var(--color-fill-1);
}

.tech-icon img {
  height: 40px;
  width: auto;
}

.contact-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-item a {
  color: var(--color-primary-6);
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

.license-section p {
  color: var(--color-text-2);
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-info h1 {
    font-size: 2rem;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .contact-item {
    flex-direction: column;
    gap: 8px;
  }
}
</style> 