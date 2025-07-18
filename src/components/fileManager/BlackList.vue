<template>
  <div class="blacklist-container">
    <a-card title="黑名单管理" :bordered="false">
      <!-- 添加黑名单项目 -->
      <div class="add-section">
        <a-space direction="vertical" size="large" style="width: 100%">
          <!-- 文件名黑名单输入区 -->
          <div class="add-item">
            <div class="add-header">
              <a-space>
                <span class="add-title">文件名黑名单</span>
                <a-tag color="blue">文件</a-tag>
              </a-space>
            </div>
            <a-textarea
              v-model="fileTextArea"
              placeholder="输入文件名，每行一个，可批量粘贴\n例如：\ntemp.txt\ncache.pdf\nlog.txt"
              :rows="6"
              style="width: 100%"
              @keyup.enter.ctrl="addFiles"
            />
            <a-space style="margin-top: 8px;">
              <a-button type="primary" @click="addFiles" :disabled="!fileTextArea.trim()">
                <template #icon>
                  <icon-plus />
                </template>
                添加
              </a-button>
              <a-button @click="clearFileTextArea">
                <template #icon>
                  <icon-delete />
                </template>
                清空
              </a-button>
            </a-space>
          </div>

          <!-- 文件夹名黑名单输入区 -->
          <div class="add-item">
            <div class="add-header">
              <a-space>
                <span class="add-title">文件夹名黑名单</span>
                <a-tag color="green">文件夹</a-tag>
              </a-space>
            </div>
            <a-textarea
              v-model="folderTextArea"
              placeholder="输入文件夹名，每行一个，可批量粘贴\n例如：\ntemp\ncache\nlogs"
              :rows="6"
              style="width: 100%"
              @keyup.enter.ctrl="addFolders"
            />
            <a-space style="margin-top: 8px;">
              <a-button type="primary" @click="addFolders" :disabled="!folderTextArea.trim()">
                <template #icon>
                  <icon-plus />
                </template>
                添加
              </a-button>
              <a-button @click="clearFolderTextArea">
                <template #icon>
                  <icon-delete />
                </template>
                清空
              </a-button>
            </a-space>
          </div>
        </a-space>
      </div>

      <!-- 文件夹清理功能 -->
      <div class="cleanup-section">
        <a-divider />
        <div class="cleanup-header">
          <a-space>
            <span class="section-title">文件夹清理</span>
            <a-tag color="orange">删除黑名单项目</a-tag>
          </a-space>
        </div>
        <a-space>
          <a-input
            v-model="targetFolder"
            placeholder="输入要清理的文件夹路径"
            style="width: 400px"
          />
          <a-button type="primary" status="warning" @click="cleanupFolder" :disabled="!targetFolder.trim()">
            <template #icon>
              <icon-delete />
            </template>
            清理文件夹
          </a-button>
        </a-space>
      </div>

      <!-- 黑名单列表 -->
      <div class="list-section">
        <a-tabs>
          <!-- 文件名黑名单 -->
          <a-tab-pane key="files" title="文件名黑名单">
            <div class="tab-content">
              <div class="list-header">
                <a-space>
                  <span class="list-title">文件名黑名单 ({{ blacklistStore.fileBlacklist.length }})</span>
                  <a-button 
                    type="outline" 
                    status="warning" 
                    size="small"
                    @click="clearFileBlacklist"
                    :disabled="blacklistStore.fileBlacklist.length === 0"
                  >
                    <template #icon>
                      <icon-delete />
                    </template>
                    清空文件名黑名单
                  </a-button>
                </a-space>
              </div>

              <!-- 空状态 -->
              <a-empty v-if="blacklistStore.fileBlacklist.length === 0" description="暂无文件名黑名单项目" />

              <!-- 文件名黑名单列表 -->
              <a-list v-else :data="blacklistStore.fileBlacklist" class="blacklist-list">
                <template #item="{ item, index }">
                  <a-list-item class="list-item">
                    <div class="item-content">
                      <icon-file class="file-icon" />
                      <span class="item-name">{{ item }}</span>
                      <a-tag size="small" color="blue">文件</a-tag>
                    </div>
                    <template #actions>
                      <a-button 
                        type="text" 
                        status="danger" 
                        size="small"
                        @click="removeFileFromBlacklist(item)"
                      >
                        <template #icon>
                          <icon-delete />
                        </template>
                        移除
                      </a-button>
                    </template>
                  </a-list-item>
                </template>
              </a-list>
            </div>
          </a-tab-pane>

          <!-- 文件夹名黑名单 -->
          <a-tab-pane key="folders" title="文件夹名黑名单">
            <div class="tab-content">
              <div class="list-header">
                <a-space>
                  <span class="list-title">文件夹名黑名单 ({{ blacklistStore.folderBlacklist.length }})</span>
                  <a-button 
                    type="outline" 
                    status="warning" 
                    size="small"
                    @click="clearFolderBlacklist"
                    :disabled="blacklistStore.folderBlacklist.length === 0"
                  >
                    <template #icon>
                      <icon-delete />
                    </template>
                    清空文件夹名黑名单
                  </a-button>
                </a-space>
              </div>

              <!-- 空状态 -->
              <a-empty v-if="blacklistStore.folderBlacklist.length === 0" description="暂无文件夹名黑名单项目" />

              <!-- 文件夹名黑名单列表 -->
              <a-list v-else :data="blacklistStore.folderBlacklist" class="blacklist-list">
                <template #item="{ item, index }">
                  <a-list-item class="list-item">
                    <div class="item-content">
                      <icon-folder class="folder-icon" />
                      <span class="item-name">{{ item }}</span>
                      <a-tag size="small" color="green">文件夹</a-tag>
                    </div>
                    <template #actions>
                      <a-button 
                        type="text" 
                        status="danger" 
                        size="small"
                        @click="removeFolderFromBlacklist(item)"
                      >
                        <template #icon>
                          <icon-delete />
                        </template>
                        移除
                      </a-button>
                    </template>
                  </a-list-item>
                </template>
              </a-list>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>

      <!-- 缓存管理 -->
      <div class="cache-section">
        <a-divider />
        <div class="cache-header">
          <a-space>
            <span class="cache-title">缓存管理</span>
            <a-tag color="blue">localStorage</a-tag>
          </a-space>
        </div>
        <a-space>
          <a-button size="small" @click="saveAllToStorage">
            <template #icon>
              <icon-save />
            </template>
            保存所有
          </a-button>
          <a-button size="small" @click="loadAllFromStorage">
            <template #icon>
              <icon-refresh />
            </template>
            重新加载
          </a-button>
          <a-button size="small" status="warning" @click="clearAllStorage">
            <template #icon>
              <icon-delete />
            </template>
            清除所有缓存
          </a-button>
        </a-space>
      </div>
    </a-card>

    <!-- 清理结果对话框 -->
    <a-modal
      v-model:visible="cleanupResultVisible"
      title="清理结果"
      :footer="false"
      width="600px"
    >
      <div class="cleanup-result">
        <div v-if="cleanupResult.success.length > 0" class="result-section">
          <h4>成功删除 ({{ cleanupResult.success.length }})</h4>
          <a-list :data="cleanupResult.success" size="small">
            <template #item="{ item }">
              <a-list-item>
                <icon-check-circle style="color: #52c41a; margin-right: 8px;" />
                {{ item }}
              </a-list-item>
            </template>
          </a-list>
        </div>

        <div v-if="cleanupResult.failed.length > 0" class="result-section">
          <h4>删除失败 ({{ cleanupResult.failed.length }})</h4>
          <a-list :data="cleanupResult.failed" size="small">
            <template #item="{ item }">
              <a-list-item>
                <icon-exclamation-circle style="color: #faad14; margin-right: 8px;" />
                {{ item }}
              </a-list-item>
            </template>
          </a-list>
        </div>

        <div v-if="cleanupResult.errors.length > 0" class="result-section">
          <h4>错误信息 ({{ cleanupResult.errors.length }})</h4>
          <a-list :data="cleanupResult.errors" size="small">
            <template #item="{ item }">
              <a-list-item>
                <icon-close-circle style="color: #ff4d4f; margin-right: 8px;" />
                {{ item }}
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBlacklistStore } from '../../blacklist/store/blacklistStore';
import { Message, Modal } from '@arco-design/web-vue';
import {
  IconFile,
  IconFolder,
  IconDelete,
  IconSave,
  IconRefresh,
  IconCheckCircle,
  IconExclamationCircle,
  IconCloseCircle,
  IconPlus
} from '@arco-design/web-vue/es/icon';

const blacklistStore = useBlacklistStore();
const fileTextArea = ref('');
const folderTextArea = ref('');
const targetFolder = ref('');
const cleanupResultVisible = ref(false);
const cleanupResult = ref({
  success: [] as string[],
  failed: [] as string[],
  errors: [] as string[]
});

// 文件名黑名单添加
const addFiles = () => {
  const lines = fileTextArea.value.trim().split('\n').map(line => line.trim()).filter(line => line);
  if (lines.length === 0) {
    Message.warning('请输入要添加的文件名');
    return;
  }
  let addedCount = 0;
  let skippedCount = 0;
  lines.forEach(item => {
    if (!blacklistStore.isFileBlacklisted(item)) {
      blacklistStore.addFileToBlacklist(item);
      addedCount++;
    } else {
      skippedCount++;
    }
  });
  fileTextArea.value = '';
  if (addedCount > 0) Message.success(`已添加 ${addedCount} 个文件名`);
  if (skippedCount > 0) Message.warning(`跳过 ${skippedCount} 个重复的文件名`);
};
const clearFileTextArea = () => {
  fileTextArea.value = '';
  Message.info('已清空文件名输入框');
};
// 文件夹名黑名单添加
const addFolders = () => {
  const lines = folderTextArea.value.trim().split('\n').map(line => line.trim()).filter(line => line);
  if (lines.length === 0) {
    Message.warning('请输入要添加的文件夹名');
    return;
  }
  let addedCount = 0;
  let skippedCount = 0;
  lines.forEach(item => {
    if (!blacklistStore.isFolderBlacklisted(item)) {
      blacklistStore.addFolderToBlacklist(item);
      addedCount++;
    } else {
      skippedCount++;
    }
  });
  folderTextArea.value = '';
  if (addedCount > 0) Message.success(`已添加 ${addedCount} 个文件夹名`);
  if (skippedCount > 0) Message.warning(`跳过 ${skippedCount} 个重复的文件夹名`);
};
const clearFolderTextArea = () => {
  folderTextArea.value = '';
  Message.info('已清空文件夹名输入框');
};

// 从文件名黑名单移除
const removeFileFromBlacklist = (item: string) => {
  blacklistStore.removeFileFromBlacklist(item);
  Message.success(`已从文件名黑名单移除 "${item}"`);
};

// 从文件夹名黑名单移除
const removeFolderFromBlacklist = (item: string) => {
  blacklistStore.removeFolderFromBlacklist(item);
  Message.success(`已从文件夹名黑名单移除 "${item}"`);
};

// 清空文件名黑名单
const clearFileBlacklist = () => {
  Modal.confirm({
    title: '确认清空',
    content: '确定要清空所有文件名黑名单吗？',
    onOk: () => {
      blacklistStore.clearFileBlacklist();
      Message.success('已清空文件名黑名单');
    }
  });
};

// 清空文件夹名黑名单
const clearFolderBlacklist = () => {
  Modal.confirm({
    title: '确认清空',
    content: '确定要清空所有文件夹名黑名单吗？',
    onOk: () => {
      blacklistStore.clearFolderBlacklist();
      Message.success('已清空文件夹名黑名单');
    }
  });
};

// 清理文件夹
const cleanupFolder = async () => {
  const folder = targetFolder.value.trim();
  if (!folder) {
    Message.warning('请输入要清理的文件夹路径');
    return;
  }
  Modal.confirm({
    title: '确认清理',
    content: `确定要清理文件夹 "${folder}" 中的黑名单项目吗？\n\n注意：只有空的文件夹才会被删除。`,
    onOk: async () => {
      try {
        Message.loading('正在清理文件夹...');
        const result = await blacklistStore.deleteBlacklistedItemsInFolder(folder);
        cleanupResult.value = result;
        cleanupResultVisible.value = true;
        const totalSuccess = result.success.length;
        const totalFailed = result.failed.length;
        const totalErrors = result.errors.length;
        if (totalSuccess > 0) {
          Message.success(`清理完成！成功删除 ${totalSuccess} 个项目`);
        }
        if (totalFailed > 0) {
          Message.warning(`${totalFailed} 个项目删除失败（文件夹非空）`);
        }
        if (totalErrors > 0) {
          Message.error(`${totalErrors} 个项目处理出错`);
        }
      } catch (error) {
        Message.error(`清理过程中出错: ${error}`);
      }
    }
  });
};

// 保存所有到localStorage
const saveAllToStorage = () => {
  blacklistStore.saveFileBlacklistToStorage();
  blacklistStore.saveFolderBlacklistToStorage();
  Message.success('已保存所有黑名单到localStorage');
};

// 从localStorage重新加载所有
const loadAllFromStorage = () => {
  blacklistStore.loadFileBlacklistFromStorage();
  blacklistStore.loadFolderBlacklistFromStorage();
  Message.success('已从localStorage重新加载所有黑名单');
};

// 清除所有localStorage缓存
const clearAllStorage = () => {
  Modal.confirm({
    title: '确认清除缓存',
    content: '确定要清除所有localStorage缓存吗？这将不会删除当前的黑名单数据。',
    onOk: () => {
      blacklistStore.clearFileBlacklistStorage();
      blacklistStore.clearFolderBlacklistStorage();
      Message.success('已清除所有localStorage缓存');
    }
  });
};
</script>

<style scoped>
.blacklist-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}
.add-section {
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--color-fill-2);
  border-radius: 6px;
}
.add-item {
  margin-bottom: 24px;
}
.add-item:last-child {
  margin-bottom: 0;
}
.add-header {
  margin-bottom: 12px;
}
.add-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text-1);
}
.textarea-section {
  margin-top: 12px;
}
.cleanup-section {
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--color-fill-1);
  border-radius: 6px;
  border: 1px solid var(--color-border);
}
.cleanup-header {
  margin-bottom: 12px;
}
.section-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text-1);
}
.list-section {
  margin-bottom: 24px;
}
.tab-content {
  padding-top: 16px;
}
.list-header {
  margin-bottom: 16px;
}
.list-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text-1);
}
.blacklist-list {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
}
.list-item {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
}
.list-item:last-child {
  border-bottom: none;
}
.item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}
.file-icon {
  color: var(--color-text-3);
  font-size: 16px;
}
.folder-icon {
  color: var(--color-text-3);
  font-size: 16px;
}
.item-name {
  color: var(--color-text-1);
  font-size: 14px;
  word-break: break-all;
  flex: 1;
}
.cache-section {
  margin-top: 24px;
}
.cache-header {
  margin-bottom: 12px;
}
.cache-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text-1);
}
.cleanup-result {
  max-height: 400px;
  overflow-y: auto;
}
.result-section {
  margin-bottom: 20px;
}
.result-section h4 {
  margin-bottom: 8px;
  color: var(--color-text-1);
}
@media (max-width: 768px) {
  .blacklist-container {
    padding: 16px;
  }
  .add-section .arco-space {
    flex-direction: column;
    align-items: stretch;
  }
  .add-section .arco-input {
    width: 100% !important;
  }
  .cleanup-section .arco-space {
    flex-direction: column;
    align-items: stretch;
  }
  .cleanup-section .arco-input {
    width: 100% !important;
  }
}
</style>
