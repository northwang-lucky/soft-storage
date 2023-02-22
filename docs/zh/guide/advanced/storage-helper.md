# 存储模块助手

Smart Storage 提供了 hook 函数 `useStorageHelper`，可以使用存储模块的其他能力。

## Vue 和 React 用户

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/vue-hooks';
// import { createLocalStorage } from '@smart-storage/react-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createLocalStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

</CodeScroll>

现在，您可以在组件中使用 `useStorageHelper` hook（React 与 Vue 相同）：

<CodeScroll>

```vue
<script setup lang="ts">
import { useStorageHelper } from '@smart-storage/vue-hooks';
import { storage } from './storage';

const storageHelper = useStorageHelper(storage);

// 获取存储模块的大小（存储键的总数）
storageHelper.size();
// 检查键是否在存储模块中（无类型提示）
storageHelper.contains('nonexistent');
// 将存储模块恢复到其初始状态（即创建存储模块时为初始化选项提供的值）
storageHelper.initialize();
</script>
```

</CodeScroll>

## 独立使用

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createLocalStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

</CodeScroll>

在任一地方使用:

<CodeScroll>

```ts
import { useStorageHelper } from '@smart-storage/hooks';
import { storage } from './storage';

const storageHelper = useStorageHelper(storage);

// 获取存储模块的大小(存储键的总数)
storageHelper.size();
// 检查键是否在存储模块中(无类型提示)
storageHelper.contains('nonexistent');
// 将存储模块恢复到其初始状态（即创建存储模块时为初始化选项提供的值）
storageHelper.initialize();
```

</CodeScroll>

## 关于 clear() API

::: tip
`storageHelper.clear()` 是不受支持的 API。点击 [常见问题 > 关于 remove()和 clear()函数](./../other/questions-and-answers.html#关于-remove-和-clear-方法) 了解更多。
:::
