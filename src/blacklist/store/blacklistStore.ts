import { defineStore } from 'pinia';

const FILE_BLACKLIST_KEY = 'file_blacklist_data';
const FOLDER_BLACKLIST_KEY = 'folder_blacklist_data';

export interface BlacklistItem {
  name: string;
  type: 'file' | 'folder';
  addedAt: number;
}

export const useBlacklistStore = defineStore('blacklist', {
  state: () => ({
    fileBlacklist: [] as string[],
    folderBlacklist: [] as string[],
  }),
  getters: {
    // 获取所有文件名黑名单
    getAllFileBlacklist: (state) => state.fileBlacklist,
    // 获取所有文件夹黑名单
    getAllFolderBlacklist: (state) => state.folderBlacklist,
    // 获取所有黑名单项目
    getAllBlacklist: (state) => [...state.fileBlacklist, ...state.folderBlacklist],
    // 获取黑名单项目总数
    getTotalCount: (state) => state.fileBlacklist.length + state.folderBlacklist.length,
  },
  actions: {
    // 从localStorage加载文件名黑名单
    loadFileBlacklistFromStorage() {
      try {
        const stored = localStorage.getItem(FILE_BLACKLIST_KEY);
        if (stored) {
          this.fileBlacklist = JSON.parse(stored);
        }
      } catch (error) {
        console.error('Failed to load file blacklist from localStorage:', error);
        this.fileBlacklist = [];
      }
    },

    // 从localStorage加载文件夹黑名单
    loadFolderBlacklistFromStorage() {
      try {
        const stored = localStorage.getItem(FOLDER_BLACKLIST_KEY);
        if (stored) {
          this.folderBlacklist = JSON.parse(stored);
        }
      } catch (error) {
        console.error('Failed to load folder blacklist from localStorage:', error);
        this.folderBlacklist = [];
      }
    },

    // 保存文件名黑名单到localStorage
    saveFileBlacklistToStorage() {
      try {
        localStorage.setItem(FILE_BLACKLIST_KEY, JSON.stringify(this.fileBlacklist));
      } catch (error) {
        console.error('Failed to save file blacklist to localStorage:', error);
      }
    },

    // 保存文件夹黑名单到localStorage
    saveFolderBlacklistToStorage() {
      try {
        localStorage.setItem(FOLDER_BLACKLIST_KEY, JSON.stringify(this.folderBlacklist));
      } catch (error) {
        console.error('Failed to save folder blacklist to localStorage:', error);
      }
    },

    // 清除文件名黑名单缓存
    clearFileBlacklistStorage() {
      try {
        localStorage.removeItem(FILE_BLACKLIST_KEY);
      } catch (error) {
        console.error('Failed to clear file blacklist from localStorage:', error);
      }
    },

    // 清除文件夹黑名单缓存
    clearFolderBlacklistStorage() {
      try {
        localStorage.removeItem(FOLDER_BLACKLIST_KEY);
      } catch (error) {
        console.error('Failed to clear folder blacklist from localStorage:', error);
      }
    },

    // 添加文件名到黑名单
    addFileToBlacklist(name: string) {
      if (!this.fileBlacklist.includes(name)) {
        this.fileBlacklist.push(name);
        this.saveFileBlacklistToStorage();
      }
    },

    // 添加文件夹名到黑名单
    addFolderToBlacklist(name: string) {
      if (!this.folderBlacklist.includes(name)) {
        this.folderBlacklist.push(name);
        this.saveFolderBlacklistToStorage();
      }
    },

    // 从文件名黑名单移除
    removeFileFromBlacklist(name: string) {
      this.fileBlacklist = this.fileBlacklist.filter(item => item !== name);
      this.saveFileBlacklistToStorage();
    },

    // 从文件夹名黑名单移除
    removeFolderFromBlacklist(name: string) {
      this.folderBlacklist = this.folderBlacklist.filter(item => item !== name);
      this.saveFolderBlacklistToStorage();
    },

    // 清空文件名黑名单
    clearFileBlacklist() {
      this.fileBlacklist = [];
      this.saveFileBlacklistToStorage();
    },

    // 清空文件夹名黑名单
    clearFolderBlacklist() {
      this.folderBlacklist = [];
      this.saveFolderBlacklistToStorage();
    },

    // 清空所有黑名单
    clearAllBlacklist() {
      this.fileBlacklist = [];
      this.folderBlacklist = [];
      this.saveFileBlacklistToStorage();
      this.saveFolderBlacklistToStorage();
    },

    // 检查文件名是否在黑名单中
    isFileBlacklisted(name: string): boolean {
      return this.fileBlacklist.includes(name);
    },

    // 检查文件夹名是否在黑名单中
    isFolderBlacklisted(name: string): boolean {
      return this.folderBlacklist.includes(name);
    },

    // 检查项目是否在任何黑名单中
    isBlacklisted(name: string): boolean {
      return this.isFileBlacklisted(name) || this.isFolderBlacklisted(name);
    },

    // 初始化store时自动加载数据
    initialize() {
      this.loadFileBlacklistFromStorage();
      this.loadFolderBlacklistFromStorage();
    },

    // 删除指定文件夹下在黑名单中的文件/文件夹
    async deleteBlacklistedItemsInFolder(folderPath: string): Promise<{ success: string[], failed: string[], errors: string[] }> {
      const result = {
        success: [] as string[],
        failed: [] as string[],
        errors: [] as string[]
      };

      try {
        const { readDir, remove } = await import('@tauri-apps/plugin-fs');
        // 递归读取文件夹内容
        const walkDir = async (dir: string) => {
          let entries: any[] = [];
          try {
            entries = await readDir(dir);
          } catch (e) {
            result.errors.push(`读取目录失败: ${dir} (${e})`);
            return;
          }
          for (const entry of entries) {
            const fullPath = dir.replace(/[/\\]+$/, '') + '/' + entry.name;
            if (entry.isDirectory) {
              if (this.isFolderBlacklisted(entry.name)) {
                // 判断是否为空
                let children: any[] = [];
                try {
                  children = await readDir(fullPath);
                } catch (e) {
                  result.errors.push(`读取子目录失败: ${fullPath} (${e})`);
                  continue;
                }
                if (children.length === 0) {
                  try {
                    await remove(fullPath);
                    result.success.push(fullPath);
                  } catch (e) {
                    result.errors.push(`删除文件夹失败: ${fullPath} (${e})`);
                  }
                } else {
                  result.failed.push(`${fullPath} (文件夹非空)`);
                }
              } else {
                await walkDir(fullPath);
              }
            } else if (entry.isFile) {
              if (this.isFileBlacklisted(entry.name)) {
                try {
                  await remove(fullPath);
                  result.success.push(fullPath);
                } catch (e) {
                  result.errors.push(`删除文件失败: ${fullPath} (${e})`);
                }
              }
            }
          }
        };
        await walkDir(folderPath);
      } catch (error) {
        result.errors.push(`清理过程中出错: ${error}`);
      }
      return result;
    },

    // 兼容旧版本的方法
    loadFromStorage() {
      this.initialize();
    },

    saveToStorage() {
      this.saveFileBlacklistToStorage();
      this.saveFolderBlacklistToStorage();
    },

    clearStorage() {
      this.clearFileBlacklistStorage();
      this.clearFolderBlacklistStorage();
    },

    addToBlacklist(name: string) {
      this.addFileToBlacklist(name);
    },

    removeFromBlacklist(name: string) {
      this.removeFileFromBlacklist(name);
    },

    clearBlacklist() {
      this.clearAllBlacklist();
    },
  },
});