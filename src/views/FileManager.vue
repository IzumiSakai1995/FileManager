<template>
  <div class="file-manager-container">
    <a-card title="文件管理" :bordered="false">
      <div class="file-manager-content">
        <div class="toolbar">
          <a-space>
            <a-button type="primary" @click="selectFolder">
              <template #icon>
                <icon-folder-add />
              </template>
              选择文件夹
            </a-button>
            <a-button @click="refresh">
              <template #icon>
                <icon-refresh />
              </template>
              刷新
            </a-button>
            <a-button @click="goToBlacklist">
              <template #icon>
                <icon-lock />
              </template>
              黑名单管理
            </a-button>
          </a-space>
        </div>

        <a-divider />

        <div class="current-path">
          <a-space>
            <icon-folder />
            <span>当前路径：</span>
            <a-tag color="blue">{{ currentPath || '未选择文件夹' }}</a-tag>
          </a-space>
        </div>

        <div class="file-list" v-if="currentPath">
          <a-table
            :data="fileList"
            :loading="loading"
            :pagination="pagination"
            @page-change="onPageChange"
          >
            <template #columns>
              <a-table-column title="名称" data-index="name">
                <template #cell="{ record }">
                  <a-space>
                    <icon-file v-if="!record.isDirectory" />
                    <icon-folder v-else />
                    <span>{{ record.name }}</span>
                  </a-space>
                </template>
              </a-table-column>
              <a-table-column title="类型" data-index="type">
                <template #cell="{ record }">
                  <a-tag :color="record.isDirectory ? 'green' : 'blue'">
                    {{ record.isDirectory ? '文件夹' : '文件' }}
                  </a-tag>
                </template>
              </a-table-column>
              <a-table-column title="大小" data-index="size">
                <template #cell="{ record }">
                  <span v-if="!record.isDirectory">{{ formatFileSize(record.size) }}</span>
                  <span v-else>-</span>
                </template>
              </a-table-column>
              <a-table-column title="修改时间" data-index="modifiedTime">
                <template #cell="{ record }">
                  {{ formatDate(record.modifiedTime) }}
                </template>
              </a-table-column>
              <a-table-column title="操作">
                <template #cell="{ record }">
                  <a-space>
                    <a-button 
                      type="text" 
                      size="small"
                      @click="openItem(record)"
                    >
                      打开
                    </a-button>
                    <a-button 
                      type="text" 
                      status="danger" 
                      size="small"
                      @click="deleteItem(record)"
                    >
                      删除
                    </a-button>
                  </a-space>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>

        <div v-else class="empty-state">
          <a-empty description="请选择一个文件夹开始管理文件">
            <template #image>
              <icon-folder style="font-size: 64px; color: var(--color-text-3);" />
            </template>
            <a-button type="primary" @click="selectFolder">
              选择文件夹
            </a-button>
          </a-empty>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Message, Modal } from '@arco-design/web-vue';
import {
  IconFolderAdd,
  IconRefresh,
  IconLock,
  IconFile,
  IconFolder
} from '@arco-design/web-vue/es/icon';

interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modifiedTime: Date;
}

const router = useRouter();
const currentPath = ref('');
const fileList = ref<FileItem[]>([]);
const loading = ref(false);

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
  showTotal: true,
  showJumper: true,
  showPageSize: true
});

// 选择文件夹
const selectFolder = async () => {
  try {
    // 这里应该调用Tauri的文件选择器
    // 暂时使用模拟数据
    currentPath.value = '/path/to/selected/folder';
    await loadFileList();
    Message.success('文件夹选择成功');
  } catch (error) {
    Message.error('选择文件夹失败');
  }
};

// 刷新文件列表
const refresh = async () => {
  if (currentPath.value) {
    await loadFileList();
    Message.success('文件列表已刷新');
  }
};

// 加载文件列表
const loadFileList = async () => {
  if (!currentPath.value) return;
  
  loading.value = true;
  try {
    // 这里应该调用Tauri的文件系统API
    // 暂时使用模拟数据
    const mockData: FileItem[] = [
      {
        name: 'document.txt',
        path: '/path/to/document.txt',
        isDirectory: false,
        size: 1024,
        modifiedTime: new Date()
      },
      {
        name: 'images',
        path: '/path/to/images',
        isDirectory: true,
        size: 0,
        modifiedTime: new Date()
      },
      {
        name: 'temp.pdf',
        path: '/path/to/temp.pdf',
        isDirectory: false,
        size: 2048576,
        modifiedTime: new Date()
      }
    ];
    
    fileList.value = mockData;
    pagination.total = mockData.length;
  } catch (error) {
    Message.error('加载文件列表失败');
  } finally {
    loading.value = false;
  }
};

// 打开文件或文件夹
const openItem = (item: FileItem) => {
  if (item.isDirectory) {
    // 进入文件夹
    currentPath.value = item.path;
    loadFileList();
  } else {
    // 打开文件
    Message.info(`打开文件: ${item.name}`);
  }
};

// 删除文件或文件夹
const deleteItem = (item: FileItem) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除 ${item.isDirectory ? '文件夹' : '文件'} "${item.name}" 吗？`,
    onOk: async () => {
      try {
        // 这里应该调用Tauri的文件删除API
        Message.success(`已删除 ${item.name}`);
        await loadFileList();
      } catch (error) {
        Message.error('删除失败');
      }
    }
  });
};

// 跳转到黑名单管理
const goToBlacklist = () => {
  router.push('/blacklist');
};

// 分页变化
const onPageChange = (page: number) => {
  pagination.current = page;
  loadFileList();
};

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 格式化日期
const formatDate = (date: Date): string => {
  return date.toLocaleString();
};
</script>

<style scoped>
.file-manager-container {
  max-width: 1200px;
  margin: 0 auto;
}

.file-manager-content {
  min-height: 400px;
}

.toolbar {
  margin-bottom: 16px;
}

.current-path {
  margin-bottom: 16px;
  padding: 12px;
  background-color: var(--color-fill-1);
  border-radius: 6px;
}

.file-list {
  margin-top: 16px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .toolbar .arco-space {
    flex-direction: column;
    align-items: stretch;
  }
  
  .current-path {
    font-size: 14px;
  }
}
</style> 