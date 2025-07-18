# Blacklist Store with localStorage Cache

这个blacklist store实现了localStorage缓存功能，确保数据在页面刷新后能够持久化保存。

## 功能特性

- ✅ 自动保存到localStorage
- ✅ 应用启动时自动加载数据
- ✅ 错误处理和容错机制
- ✅ 手动缓存管理方法
- ✅ TypeScript类型支持

## Store Actions

### 核心方法

- `addToBlacklist(name: string)` - 添加项目到黑名单
- `removeFromBlacklist(name: string)` - 从黑名单移除项目
- `clearBlacklist()` - 清空黑名单

### 缓存管理方法

- `loadFromStorage()` - 从localStorage加载数据
- `saveToStorage()` - 保存数据到localStorage
- `clearStorage()` - 清除localStorage缓存
- `initialize()` - 初始化store（加载缓存数据）

## 使用示例

### 基本使用

```typescript
import { useBlacklistStore } from './store/blacklistStore';

const blacklistStore = useBlacklistStore();

// 添加项目（会自动保存到localStorage）
blacklistStore.addToBlacklist('example.txt');

// 移除项目（会自动保存到localStorage）
blacklistStore.removeFromBlacklist('example.txt');

// 清空黑名单（会自动保存到localStorage）
blacklistStore.clearBlacklist();

// 获取所有黑名单项目
console.log(blacklistStore.blacklist);
```

### 使用BlacklistManager类

```typescript
import { BlacklistManager } from './blacklist';

const manager = new BlacklistManager();

// 添加项目
manager.addItem('file1.txt');
manager.addItem('file2.pdf');

// 检查项目是否在黑名单中
if (manager.isBlacklisted('file1.txt')) {
  console.log('file1.txt is blacklisted');
}

// 获取黑名单项目数量
console.log(`Blacklist has ${manager.getCount()} items`);

// 手动管理缓存
manager.saveToStorage();
manager.loadFromStorage();
manager.clearStorage();
```

## 缓存机制

1. **自动保存**: 每次调用 `addToBlacklist`、`removeFromBlacklist` 或 `clearBlacklist` 时，数据会自动保存到localStorage
2. **自动加载**: 应用启动时，store会自动从localStorage加载之前保存的数据
3. **错误处理**: 如果localStorage操作失败，会在控制台输出错误信息，但不会影响应用的正常运行
4. **容错机制**: 如果localStorage中的数据格式不正确，会重置为空数组

## 存储键名

数据存储在localStorage中的键名为：`blacklist_data`

## 注意事项

- localStorage有存储大小限制（通常为5-10MB）
- 数据以JSON格式存储，确保数据可序列化
- 在隐私模式下，localStorage可能不可用
- 建议在生产环境中添加数据验证和清理机制 