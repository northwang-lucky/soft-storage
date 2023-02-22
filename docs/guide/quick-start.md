# Quick Start

Smart Storage provides three ways to manage storage:

- Combined with the `ref` API in **Vue 3**
- Combined with `useState` API in **React**
- Standalone use in any project that supports **cjs modules** or **esm modules**

In addition, if you only want to use a shallow modular wrapper for the browser's Storage API, you can go straight to the [Raw Usage](#raw-usage) section.

::: warning
Attention please! You should never use `interface` to define a type in Smart Storage, to instead of it, you can use `type`. Click [Q&A > About Interface](./other/questions-and-answers.html#about-interface) for more details.
:::

## For Vue 3 <Badge text="vue >= 3.1.0" />

### Install

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

### Create a Storage Module

Create a new file anywhere, and use like this:

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/vue-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createLocalStorage<UserInfo>({
  // This is storage key
  storageModuleKey: 'user_info',
  // Used to initialize
  initial: {
    hasSigned: false, // Non-nullable properties must be initialized
    // Optional properties cannot be initialized
  },
});
```

### Use Hooks in Component

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { getUserInfo } from '@/api'; // Suppose you have a function that gets user information
import { useStorage } from '@smart-storage/vue-hooks';
import { storage } from './storage';

/* You can easily deconstruct the hook's return value,
because TypeScript will give you great type hints */
const {
  refs: { token, hasSigned },
  resetters: { resetToken, resetHasSigned },
  checkers: { containsToken, containsHasSigned },
} = useStorage(storage);

onMounted(() => {
  getUserInfo().then(res => {
    token.value = res.token; // It's a ref
    hasSigned.value = true; // Same as above
  });
});

const onSignOut = () => {
  resetToken(); // Reset the value of token
  resetHasSigned(); // Reset the value of hasSigned
};
</script>

<template>
  <div>Contains token: {{ containsToken() }}</div>
  <div>Contains hasSigned: {{ containsHasSigned() }}</div>
  <button @click="onSignOut">Sign out</button>
</template>
```

## For React <Badge text="react >= 16.8.0" />

### Install

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

### Create a Storage Module

Create a new file anywhere, and use like this:

```ts
// storage.ts
import { createSessionStorage } from '@smart-storage/react-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createSessionStorage<UserInfo>({
  // This is storage key
  storageModuleKey: 'user_info',
  // Used to initialize
  initial: {
    hasSigned: false, // Non-nullable properties must be initialized
    // Optional properties cannot be initialized
  },
});
```

### Use Hooks in Component

```tsx
import React, { useEffect } from 'react';
import { getUserInfo } from '@/api'; // Suppose you have a function that gets user information
import { useStorage } from '@smart-storage/react-hooks';
import { storage } from './storage';

function UserInfoFC() {
  /* You can easily deconstruct the hook's return value,
  because TypeScript will give you great type hints */
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
    resetToken(); // Reset the value of token
    resetHasSigned(); // Reset the value of hasSigned
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

## For Standalone Use

### Install

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

### Create a Storage Module

Create a new file anywhere, and use like this:

```ts
// storage.ts
import { createSessionStorage } from '@smart-storage/hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createSessionStorage<UserInfo>({
  // This is storage key
  storageModuleKey: 'user_info',
  // Used to initialize
  initial: {
    hasSigned: false, // Non-nullable properties must be initialized
    // Optional properties cannot be initialized
  },
});
```

### Use Hooks in a Script File

```ts
import { getUserInfo } from '@/api'; // Suppose you have a function that gets user information
import { useStorage } from '@smart-storage/hooks';
import { storage } from './storage';

const { token, hasSigned } = useStorage(storage);

(() => {
  getUserInfo().then(res => {
    token.set(res.token);
    hasSigned.set(true);
    console.log(hasSigned.get()); // Output: true
  });
})();

const onSignOut = () => {
  token.reset(); // Set value to initial value, if not, it is set to undefined
  hasSigned.reset();
  console.log(token.get(), token.exist()); // Output: undefined, false
  console.log(hasSigned.get(), hasSigned.exist()); // Output: false, true
};
```

## How about `remove()` API?

::: tip
`remove()` is an unsupported API. Click [Q&A > About Remove and Clear](./other/questions-and-answers.html#about-remove-and-clear) for more details.
:::

## Raw Usage

### Install

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

### Create a Storage Module

```ts
// storage.ts
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

const storageModule = new StorageModule<UserInfo>('user_info', StorageType.SESSION);

const helper = storageModule.getHelper();
if (!helper.getExistence()) {
  // Here the initialization is arbitrary, no restrictions
  helper.setModule({
    token: '',
    hasSigned: false,
  });
}

export { storageModule };
```

### Use in Any Script File

```ts
import { StorageModule, StorageType } from '@smart-storage/core';
import { getUserInfo } from '@/api'; // Suppose you have a function that gets user information
import { storageModule } from './storage.ts';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

(() => {
  getUserInfo().then(res => {
    storageModule.setItem('token', res.token);
    storageModule.setItem('hasSigned', true);
    console.log(storageModule.getItem('hasSigned')); // Output: true
    console.log(storageModule.contains('token')); // Output: true
  });
})();

const onSignOut = () => {
  storageModule.removeItem('token');
  storageModule.setItem('hasSigned', false);
  console.log(storageModule.getItem('token')); // Output: undefined
  console.log(storageModule.size()); // Output: 1

  // Or
  storageModule.clear();
  console.log(storageModule.size()); // Output: 0
};
```

## Next

Now, you can enjoy the type hints brought by TypeScript!
