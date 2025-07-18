import { useBlacklistStore } from './store/blacklistStore';

// 示例：如何使用带有localStorage缓存的blacklist store
export class BlacklistManager {
  private store = useBlacklistStore();

  // 添加项目到黑名单
  addItem(name: string) {
    this.store.addToBlacklist(name);
    console.log(`Added "${name}" to blacklist`);
  }

  // 从黑名单移除项目
  removeItem(name: string) {
    this.store.removeFromBlacklist(name);
    console.log(`Removed "${name}" from blacklist`);
  }

  // 获取所有黑名单项目
  getItems(): string[] {
    return this.store.blacklist;
  }

  // 检查项目是否在黑名单中
  isBlacklisted(name: string): boolean {
    return this.store.blacklist.includes(name);
  }

  // 清空黑名单
  clearAll() {
    this.store.clearBlacklist();
    console.log('Blacklist cleared');
  }

  // 手动保存到localStorage
  saveToStorage() {
    this.store.saveToStorage();
    console.log('Blacklist saved to localStorage');
  }

  // 手动从localStorage加载
  loadFromStorage() {
    this.store.loadFromStorage();
    console.log('Blacklist loaded from localStorage');
  }

  // 清除localStorage缓存
  clearStorage() {
    this.store.clearStorage();
    console.log('localStorage cache cleared');
  }

  // 获取黑名单项目数量
  getCount(): number {
    return this.store.blacklist.length;
  }
}

// 使用示例：
/*
const blacklistManager = new BlacklistManager();

// 添加项目到黑名单（会自动保存到localStorage）
blacklistManager.addItem('example.txt');
blacklistManager.addItem('test.pdf');

// 检查项目是否在黑名单中
console.log(blacklistManager.isBlacklisted('example.txt')); // true

// 获取所有黑名单项目
console.log(blacklistManager.getItems()); // ['example.txt', 'test.pdf']

// 移除项目（会自动保存到localStorage）
blacklistManager.removeItem('example.txt');

// 清空黑名单（会自动保存到localStorage）
blacklistManager.clearAll();
*/
