# 快速开始

Smart Storage 提供三种方式来管理存储：

- 结合 **Vue 3**中的 `ref` API
- 结合 **React**中的 `useState` API
- 在任何支持 `cjs` 模块或 `esm` 模块的项目中独立使用

## Vue 3 <Badge text="vue >= 3.1.0" />

### 安装

```sh
npm install @smart-storage/vue-hooks --save
```

### 创建存储模块

在您的项目中随意创建一个文件:

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/vue-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const { useStorage } = createLocalStorage<UserInfo>({
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
import { useStorage } from './storage';

/* 在Typescript的帮助下，您可以轻松地解构hook的返回值 */
const {
  refs: { token, hasSigned },
  resetters: { resetToken, resetHasSigned },
  checkers: { containsToken, containsHasSigned },
} = useStorage();

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

## React <Badge text="vue >= 3.1.0" />

### 安装

```sh
npm install @smart-storage/react-hooks --save
```

### 创建存储模块

在您的项目中随意创建一个文件:

```ts
// storage.ts
import { createSessionStorage } from '@smart-storage/react-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const { useStorage } = createSessionStorage<UserInfo>({
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
import { useStorage } from './storage';

function UserInfoFC() {
  /* 在Typescript的帮助下，您可以轻松地解构hook的返回值 */
  const {
    tokenState: { token, setToken, resetToken, containsToken },
    hasSignedState: { hasSigned, setHasSigned, resetHasSigned, containsHasSigned },
  } = useStorage();

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

```sh
npm install @smart-storage/hooks --save
```

### 创建存储模块

在您的项目中随意创建一个文件:

```ts
// storage.ts
import { createSessionStorage } from '@smart-storage/hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const { useStorage } = createSessionStorage<UserInfo>({
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
import { useStorage } from './storage';

const { token, hasSigned } = useStorage();

(() => {
  getUserInfo().then(res => {
    token.set(res.token);
    hasSigned.set(true);
    console.log(hasSigned.get()); // true
  });
})();

const onSignOut = () => {
  token.remove(); // 从存储模块中删除此键值对
  // 或者，您可以使用“token.reset()”，它可以将值设置为初始值
  hasSigned.set(false);
  console.log(token.get(), token.exist()); // undefined, false
};
```

## 直接使用

### 安装

```sh
npm install @smart-storage/core --save
```

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

  // Or
  storageModule.clear();
  console.log(storageModule.size()); // 0
};
```

## Next

现在，您可以享受到 TypeScript 带来的类型提示了！
