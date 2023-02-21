# 快速开始

Smart Storage 提供三种方式来管理存储：

- 结合 **Vue 3**中的 `ref` API
- 结合 **React**中的 `useState` API
- 在任何支持 `cjs` 模块或 `esm` 模块的项目中独立使用

此外，如果您只想使用 Web Storage 的浅层模块化封装，您可以直接转到 [直接使用](#直接使用) 部分。

::: warning
请注意，永远不要使用`interface`来为 Smart Storage 定义类型。请使用`type`取代之。点击 [常见问题 > 关于 Interface](./other/questions-and-answers.html#关于-interface) 查看更多。
:::

## Vue 3 用户 <Badge text="vue >= 3.1.0" />

### 安装

<CodeSwitcher :languages="{ npm: 'npm', yarn: 'yarn', pnpm: 'pnpm' }">

::: slot npm

```bash
npm install @smart-storage/vue-hooks
```

:::

::: slot yarn

```bash
yarn add @smart-storage/vue-hooks
```

:::

::: slot pnpm

```bash
pnpm add @smart-storage/vue-hooks
```

:::

</CodeSwitcher>

### 创建存储模块

在您的项目中随意创建一个文件:

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/vue-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createLocalStorage<UserInfo>({
  // 存储键
  storageModuleKey: 'user_info',
  // 用于初始化
  initial: {
    hasSigned: false, // 非空属性必须初始化
    // 可选属性不能初始化
  },
});
```

### 在 Vue 组件中使用

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { getUserInfo } from '@/api'; // 假设您有一个获取用户信息的异步函数
import { useStorage } from '@smart-storage/vue-hooks';
import { storage } from './storage';

/* 在Typescript的帮助下，您可以轻松地解构hook的返回值 */
const {
  refs: { token, hasSigned },
  resetters: { resetToken, resetHasSigned },
  checkers: { containsToken, containsHasSigned },
} = useStorage(storage);

onMounted(() => {
  getUserInfo().then(res => {
    token.value = res.token; // vue响应式变量(组合式API)
    hasSigned.value = true; // 同上
  });
});

const onSignOut = () => {
  resetToken(); // 重置 token 的值
  resetHasSigned(); // 重置 hasSigned 的值
};
</script>

<template>
  <div>Contains token: {{ containsToken() }}</div>
  <div>Contains hasSigned: {{ containsHasSigned() }}</div>
  <button @click="onSignOut">Sign out</button>
</template>
```

## React 用户 <Badge text="react >= 16.8.0" />

### 安装

<CodeSwitcher :languages="{ npm: 'npm', yarn: 'yarn', pnpm: 'pnpm' }">

::: slot npm

```bash
npm install @smart-storage/react-hooks
```

:::

::: slot yarn

```bash
yarn add @smart-storage/react-hooks
```

:::

::: slot pnpm

```bash
pnpm add @smart-storage/react-hooks
```

:::

</CodeSwitcher>

### 创建存储模块

在您的项目中随意创建一个文件:

```ts
// storage.ts
import { createSessionStorage } from '@smart-storage/react-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createSessionStorage<UserInfo>({
  // 存储键
  storageModuleKey: 'user_info',
  // 用于初始化
  initial: {
    hasSigned: false, // 非空属性必须初始化
    // 可选属性不能初始化
  },
});
```

### 在函数式组件中使用

```tsx
import React, { useEffect } from 'react';
import { getUserInfo } from '@/api'; // 假设您有一个获取用户信息的异步函数
import { useStorage } from '@smart-storage/react-hooks';
import { storage } from './storage';

function UserInfoFC() {
  /* 在Typescript的帮助下，您可以轻松地解构hook的返回值 */
  const {
    tokenState: { token, setToken, resetToken, containsToken },
    hasSignedState: { hasSigned, setHasSigned, resetHasSigned, containsHasSigned },
  } = useStorage(storage);

  useEffect(() => {
    getUserInfo().then(res => {
      setToken(res.token);
      setHasSigned(true);
    });
  }, []);

  const onSignOut = () => {
    resetToken(); // 重置 token 的值
    resetHasSigned(); // 重置 hasSigned 的值
  };

  return (
    <>
      <div>Contains token: {containsToken()}</div>
      <div>Contains hasSigned: {containsHasSigned()}</div>
      <button onClick={onSignOut}>Sign out</button>
    </>
  );
}

export default UserInfoFC;
```

## 独立使用

### 安装

<CodeSwitcher :languages="{ npm: 'npm', yarn: 'yarn', pnpm: 'pnpm' }">

::: slot npm

```bash
npm install @smart-storage/hooks
```

:::

::: slot yarn

```bash
yarn add @smart-storage/hooks
```

:::

::: slot pnpm

```bash
pnpm add @smart-storage/hooks
```

:::

</CodeSwitcher>

### 创建存储模块

在您的项目中随意创建一个文件:

```ts
// storage.ts
import { createSessionStorage } from '@smart-storage/hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createSessionStorage<UserInfo>({
  // 存储键
  storageModuleKey: 'user_info',
  // 用于初始化
  initial: {
    hasSigned: false, // 非空属性必须初始化
    // 可选属性不能初始化
  },
});
```

### 在脚本中使用

```ts
import { getUserInfo } from '@/api'; // 假设您有一个获取用户信息的异步函数
import { useStorage } from '@smart-storage/hooks';
import { storage } from './storage';

const { token, hasSigned } = useStorage(storage);

(() => {
  getUserInfo().then(res => {
    token.set(res.token);
    hasSigned.set(true);
    console.log(hasSigned.get()); // true
  });
})();

const onSignOut = () => {
  token.reset(); // 将值设置为初始值。若未提供初始值，将设为 undefined
  hasSigned.reset();
  console.log(token.get(), token.exist()); // undefined, false
  console.log(hasSigned.get(), hasSigned.exist()); // false, true
};
```

## 关于 remove() API

::: tip
`remove()` 是不受支持的 API。点击 [常见问题 > 关于 remove() 和 clear() 函数](./other/questions-and-answers.html#关于-remove-和-clear-方法) 了解更多。
:::

## 直接使用

### 安装

<CodeSwitcher :languages="{ npm: 'npm', yarn: 'yarn', pnpm: 'pnpm' }">

::: slot npm

```bash
npm install @smart-storage/core
```

:::

::: slot yarn

```bash
yarn add @smart-storage/core
```

:::

::: slot pnpm

```bash
pnpm add @smart-storage/core
```

:::

</CodeSwitcher>

### 创建一个存储模块

```ts
// storage.ts
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

const storageModule = new StorageModule<UserInfo>('user_info', StorageType.SESSION);

const helper = storageModule.getHelper();
if (!helper.getExistence()) {
  // 这里的初始化是随心所欲的，没有限制
  helper.setModule({
    token: '',
    hasSigned: false,
  });
}

export { storageModule };
```

### 在脚本中使用

```ts
import { StorageModule, StorageType } from '@smart-storage/core';
import { getUserInfo } from '@/api'; // 假设您有一个获取用户信息的异步函数
import { storageModule } from './storage.ts';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

(() => {
  getUserInfo().then(res => {
    storageModule.setItem('token', res.token);
    storageModule.setItem('hasSigned', true);
    console.log(storageModule.getItem('hasSigned')); // true
    console.log(storageModule.contains('token')); // true
  });
})();

const onSignOut = () => {
  storageModule.removeItem('token');
  storageModule.setItem('hasSigned', false);
  console.log(storageModule.getItem('token')); // undefined
  console.log(storageModule.size()); // 1

  // 或者
  storageModule.clear();
  console.log(storageModule.size()); // 0
};
```

## Next

现在，您可以享受到 TypeScript 带来的类型提示了！
